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

// Para coleções baseadas em Array (que ainda salvam listas, se necessário, ou convertem para docs)
// Na refatoração completa, o ideal é não usar "salvarListaToda", mas sim salvar item por item.
async function dbSaveList(collectionName, list) {
    // Abordagem temporária para não quebrar a lógica de Arrays do app.js original instantaneamente
    // O ideal seria o app.js passar a usar dicts ou salvar individualmente.
    // Vamos mapear os itens do array para documentos se eles tiverem ID.
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let id = item.id || item.uid || item.username || `item_${i}`;
        await dbSaveItem(collectionName, id, item);
    }
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
    dbUnsubscribes.forEach(unsub => unsub());
    dbUnsubscribes = [];

    // Coleções em Array
    const arrCollections = ["users", "approvals", "npcs", "loresHistoria"];
    arrCollections.forEach(colName => {
        dbUnsubscribes.push(db.collection(colName).onSnapshot((snapshot) => {
            let arr = [];
            snapshot.forEach(doc => {
                let data = doc.data();
                data.docId = doc.id; // Guarda o ID do doc real
                arr.push(data);
            });
            window.dbCache[colName] = arr;
            if(typeof triggerUIRefresh === 'function') triggerUIRefresh();
        }));
    });

    // Coleções em Dict
    const dictCollections = ["characters", "loresMapa", "bairros"];
    dictCollections.forEach(colName => {
        dbUnsubscribes.push(db.collection(colName).onSnapshot((snapshot) => {
            let dict = {};
            snapshot.forEach(doc => dict[doc.id] = doc.data());
            window.dbCache[colName] = dict;
            if(typeof triggerUIRefresh === 'function') triggerUIRefresh();
        }));
    });

    setTimeout(() => { 
        isDbLoaded = true; 
        if(typeof triggerUIRefresh === 'function') triggerUIRefresh(); 
        
        // Verifica se é administrador (supremo) para rodar a migração
        if (typeof isSupreme === 'function' && isSupreme()) {
            migrateGamedataToCollections();
        }
    }, 1500);
}

// ============================================================================
// FUNÇÕES DE AUTENTICAÇÃO
// ============================================================================
const auth = firebase.auth();

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
