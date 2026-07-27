// Inicializa os ícones do Lucide
lucide.createIcons();

// Dados das páginas simulando um roteamento
const pages = {
    mapa: {
        title: "Mapa de Unicity",
        content: "<img src='assets/AwakeningRPGMap.png' alt='Mapa de Unicity' style='width: 100%; max-width: 600px; border: 2px solid var(--neon-red); border-radius: 8px; margin-bottom: 1rem;'><br>Acesso aos distritos, Indústrias Wintech e Gasai, e as pontes Dawn e Sunset."
    },
    sistema: {
        title: "Sistema e Regras",
        content: "Parâmetros gerais de nivelamento, rolagens de dados e mecânicas de combate."
    },
    poderes: {
        title: "Poderes Usados",
        content: "Registro dos Meta-Humanos conhecidos e a descrição técnica de suas habilidades."
    },
    treinamentos: {
        title: "Treinamentos",
        content: "Log de evolução dos personagens no Instituto Éksodos ou treinamentos independentes."
    },
    personagens: {
        title: "Personagens e NPCs",
        content: "Fichas completas, alinhamentos, histórico criminal e corporativo."
    },
    historia: {
        title: "História",
        content: "Registros desde a Fundação e o evento Heaven's Fall."
    },
    missoes: {
        title: "Missões Disponíveis",
        content: "Quadro de missões, recompensas e nível de perigo estabelecido pela cidade."
    },
    organizacoes: {
        title: "Organizações",
        content: "Dados sigilosos sobre o Instituto Éksodos, Wintech, Gasai e o Submundo."
    }
};

const contentArea = document.getElementById('content-area');

// Função para renderizar uma página
function renderPage(pageId) {
    const pageData = pages[pageId];
    if(!pageData) return;

    contentArea.innerHTML = `
        <div class="page-container">
            <h1 class="page-title neon-text">${pageData.title}</h1>
            <div class="placeholder-card">
                <p>${pageData.content}</p>
                <br>
                <p style="color: var(--neon-red); font-size: 0.9em;">
                    > TERMINAL AGUARDANDO INSERÇÃO DE DADOS...
                </p>
            </div>
        </div>
    `;
}

// Lida com cliques no menu lateral
function navigate(pageId, btnElement) {
    // Remove active class
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked
    if(btnElement) {
        btnElement.classList.add('active');
    }
    
    // Render content
    renderPage(pageId);

    // Close menu on mobile
    if (window.innerWidth <= 768) {
        toggleMenu();
    }
}

// Menu Mobile
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Inicia na aba Mapa
window.onload = () => {
    renderPage('mapa');
};
