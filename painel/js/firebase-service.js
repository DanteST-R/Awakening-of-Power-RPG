// ══════════════════════════════════════════════════════
//   FIREBASE SERVICE (MODULARIZADO)
// ══════════════════════════════════════════════════════
const firebaseConfig = {
  apiKey: "AIzaSyCE-09rv1LWT49eARDOMmvVXWjmMZLIKY4",
  authDomain: "awakening-rpg.firebaseapp.com",
  projectId: "awakening-rpg",
  storageBucket: "awakening-rpg.firebasestorage.app",
  messagingSenderId: "1056616454117",
  appId: "1:1056616454117:web:33267324fe86bff0bac10c",
  measurementId: "G-B1BZ2YX642"
};

// Inicializa o Firebase se não estiver inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// CACHE GLOBAL DO BANCO DE DADOS
window.dbCache = {
    users: [],
    characters: {},
    approvals: [],
    npcs: [],
    loresHistoria: [],
    loresMapa: {},
    bairros: null
};

// Flags de carregamento
let isDbLoaded = false;
let dbUnsubscribes = [];

// ============================================================================
// FUNÇÕES DE ACESSO AO BANCO DE DADOS (Substituem o antigo syncToFirebase)
// ============================================================================
async function dbSaveItem(collectionName, docId, data) {
    try {
        await db.collection(collectionName).doc(docId).set(data, { merge: true });
        console.log(`[DB] Salvo em ${collectionName}/${docId}`);
    } catch (e) {
        console.error(`[DB] Erro ao salvar em ${collectionName}/${docId}: `, e);
    }
}

async function dbDeleteItem(collectionName, docId) {
    try {
        await db.collection(collectionName).doc(docId).delete();
        console.log(`[DB] Deletado ${collectionName}/${docId}`);
    } catch (e) {
        console.error(`[DB] Erro ao deletar ${collectionName}/${docId}: `, e);
    }
}

// Salva lista inteira mapeando por ID de cada item
async function dbSaveList(collectionName, list) {
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const id = item.id || item.uid || item.username || `item_${i}`;
        await dbSaveItem(collectionName, id, item);
    }
}

// Salva UM item individual por ID — ideal para adicionar sem sobrescrever os outros
async function dbSaveOneItem(collectionName, id, data) {
    return dbSaveItem(collectionName, id, data);
}

// Remove UM item do Firestore por ID
async function dbRemoveItem(collectionName, id) {
    return dbDeleteItem(collectionName, id);
}

async function dbSaveDict(collectionName, dict) {
    for (const key in dict) {
        await dbSaveItem(collectionName, key, dict[key]);
    }
}


// ============================================================================
// SCRIPT DE MIGRAÇÃO (Roda 1 vez pelo Supremo)
// ============================================================================
async function migrateGamedataToCollections() {
    if (localStorage.getItem('migrated_to_collections_v1')) return;
    console.log("Iniciando migração do documento 'gamedata' para coleções...");
    
    try {
        const collectionsToMigrateList = ["users", "npcs", "loresHistoria", "approvals"];
        const collectionsToMigrateDict = ["characters", "loresMapa", "bairros"];

        for (const col of collectionsToMigrateList) {
            const doc = await db.collection("gamedata").doc(col).get();
            if (doc.exists && doc.data().list) {
                await dbSaveList(col, doc.data().list);
            }
        }

        for (const col of collectionsToMigrateDict) {
            const doc = await db.collection("gamedata").doc(col).get();
            if (doc.exists && doc.data().dict) {
                await dbSaveDict(col, doc.data().dict);
            }
        }

        localStorage.setItem('migrated_to_collections_v1', 'true');
        console.log("Migração finalizada com sucesso!");
        alert("Migração de dados para coleções concluída!");
    } catch (e) {
        console.error("Erro na migração: ", e);
    }
}

// ============================================================================
// LISTENERS DE COLEÇÕES REAIS
// ============================================================================
function initFirebaseListeners() {
    // Cancela listeners anteriores para não duplicar
    dbUnsubscribes.forEach(unsub => unsub());
    dbUnsubscribes = [];
    isDbLoaded = false;

    // Coleções que são arrays de documentos
    const arrCollections = ["users", "approvals", "npcs", "loresHistoria"];
    arrCollections.forEach(colName => {
        const unsub = db.collection(colName).onSnapshot((snapshot) => {
            const arr = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                // Garante que o id do doc está no objeto (chave para save/delete corretos)
                if (!data.id) data.id = doc.id;
                data.docId = doc.id;
                arr.push(data);
            });
            window.dbCache[colName] = arr;
            if (isDbLoaded && typeof triggerUIRefresh === 'function') triggerUIRefresh();
        }, (err) => console.error(`[DB] Listener error em ${colName}:`, err));
        dbUnsubscribes.push(unsub);
    });

    // Coleções que são dicionários (chave → objeto)
    const dictCollections = ["characters", "loresMapa", "bairros"];
    dictCollections.forEach(colName => {
        const unsub = db.collection(colName).onSnapshot((snapshot) => {
            const dict = {};
            snapshot.forEach(doc => { dict[doc.id] = doc.data(); });
            window.dbCache[colName] = dict;
            if (isDbLoaded && typeof triggerUIRefresh === 'function') triggerUIRefresh();
        }, (err) => console.error(`[DB] Listener error em ${colName}:`, err));
        dbUnsubscribes.push(unsub);
    });

    // Marca como carregado após tempo razoável para snapshot inicial
    setTimeout(() => {
        isDbLoaded = true;
        console.log('[DB] Listeners prontos. Cache inicial carregado.');
        if (typeof triggerUIRefresh === 'function') triggerUIRefresh();
    }, 1500);
}

// ============================================================================
// FUNÇÕES DE AUTENTICAÇÃO
// ============================================================================
const auth = firebase.auth();

// Firebase Auth persiste a sessão automaticamente (IndexedDB/cookies).
// O app.js escuta o estado via auth.onAuthStateChanged no window.onload.

// Helpers para e-mail fantasma
const getGhostEmail = (username) => `${username.trim().toLowerCase()}@awakening.rpg`;

async function authRegister(username, password) {
    const email = getGhostEmail(username);
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        return { success: true, uid: userCredential.user.uid };
    } catch (error) {
        console.error("Erro no Auth Register: ", error);
        return { success: false, error: error.message };
    }
}

async function authLogin(username, password) {
    const email = getGhostEmail(username);
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, uid: userCredential.user.uid };
    } catch (error) {
        console.error("Erro no Auth Login: ", error);
        return { success: false, error: error.message };
    }
}

async function authLogout() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
