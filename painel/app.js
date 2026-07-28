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
        content: `
            <div class="tabs-container" style="border-bottom: 1px solid var(--support-crimson); margin-bottom: 1.5rem; display: flex; gap: 1rem;">
                <button class="sub-tab-btn active" style="background: transparent; color: var(--neon-red); border: none; padding: 0.5rem 1rem; border-bottom: 2px solid var(--neon-red); cursor: pointer; font-weight: bold; font-family: inherit;">Atributos e Evolução</button>
                <button class="sub-tab-btn" style="background: transparent; color: var(--text-muted); border: none; padding: 0.5rem 1rem; cursor: not-allowed; font-family: inherit;">Combate (Em breve)</button>
            </div>
            
            <div class="content-section" style="line-height: 1.6; text-align: justify;">
                <p style="color: var(--text-muted);"><em>Cada personagem possui uma progressão que em base os padroniza, mas seus poderes ou especializações, habilidades, maestrias e vários outros fatores externos podem alterar esses padrões e torná-lo único, mas antes de chegar a isso, é necessário conhecer os fundamentos, os atributos, e para quê servem.</em></p>
                <br>
                <p>De tal maneira, é possível dizer que os atributos são importantes e cruciais para definir não só o desenvolvimento de um personagem, mas o jeito que o jogo e a ambientação o afetam. Os jogadores possuem total liberdade para montar <strong class="carmine-text" style="font-size: 1em;">builds</strong> e <em style="color: var(--text-main);">auto classificar</em> seus personagens de acordo com o que lhes convém definir e de acordo com a vontade do momento. Isso vai do jogador, para que não haja rótulos ou limitações além das que o próprio deseje impor.</p>
                
                <h3 class="neon-text" style="margin-top: 2.5rem; margin-bottom: 1.5rem; font-size: 1.3rem;">Níveis e Experiência (EXP)</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem;">
                    <div style="background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 3px solid var(--neon-red); padding: 1rem; text-align: center;"><strong>NV. I</strong><br><span class="carmine-text" style="font-size: 0.9em; font-family: monospace;">⟨⟨ 00 // 100 ⟩⟩</span></div>
                    <div style="background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 3px solid var(--neon-red); padding: 1rem; text-align: center;"><strong>NV. II</strong><br><span class="carmine-text" style="font-size: 0.9em; font-family: monospace;">⟨⟨ 00 // 300 ⟩⟩</span></div>
                    <div style="background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 3px solid var(--neon-red); padding: 1rem; text-align: center;"><strong>NV. III</strong><br><span class="carmine-text" style="font-size: 0.9em; font-family: monospace;">⟨⟨ 00 // 600 ⟩⟩</span></div>
                    <div style="background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 3px solid var(--neon-red); padding: 1rem; text-align: center;"><strong>NV. IV</strong><br><span class="carmine-text" style="font-size: 0.9em; font-family: monospace;">⟨⟨ 00 // 900 ⟩⟩</span></div>
                    <div style="background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 3px solid var(--neon-red); padding: 1rem; text-align: center;"><strong>NV. V</strong><br><span class="carmine-text" style="font-size: 0.9em; font-family: monospace;">⟨⟨ 00 // 1400 ⟩⟩</span></div>
                    <div style="background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 3px solid var(--neon-red); padding: 1rem; text-align: center;"><strong>NV. VI</strong><br><span class="carmine-text" style="font-size: 0.9em; font-family: monospace;">⟨⟨ 00 // 2500 ⟩⟩</span></div>
                </div>
                <p style="margin-top: 1.5rem; font-size: 0.9em; color: var(--text-muted); border-left: 2px solid var(--text-muted); padding-left: 10px;">— Exp. pode ser obtido por meio de <strong>missões, treinamentos, interações e eventos</strong>, além de formas alternativas que podem surgir com o tempo.</p>

                <h3 class="neon-text" style="margin-top: 2.5rem; margin-bottom: 1.5rem; font-size: 1.3rem;">Os Atributos</h3>
                
                <div style="margin-bottom: 1.2rem; padding: 1.2rem; background: rgba(139,0,0,0.05); border: 1px solid var(--support-crimson); border-radius: 4px;">
                    <h4 style="color: var(--text-main); display: flex; align-items: center; gap: 10px;"><i data-lucide="hand-metal" style="color: var(--neon-red);"></i> FORÇA</h4>
                    <p style="margin-top: 0.8rem; color: var(--text-muted);">A força condiz com a capacidade de causar dano a alvos ou de impulsionar algo, agindo da maneira mais natural possível e tendo como objetivo definir se o personagem <em>é capaz ou não</em> de causar dano, afinal, de empurrar algo ou de se projetar para algum lugar apenas por força.<br><br>Medida utilizada: <strong class="carmine-text" style="font-size: 1em;">Kg/F (quilograma força)</strong></p>
                </div>

                <div style="margin-bottom: 1.2rem; padding: 1.2rem; background: rgba(139,0,0,0.05); border: 1px solid var(--support-crimson); border-radius: 4px;">
                    <h4 style="color: var(--text-main); display: flex; align-items: center; gap: 10px;"><i data-lucide="shield" style="color: var(--neon-red);"></i> RESISTÊNCIA</h4>
                    <p style="margin-top: 0.8rem; color: var(--text-muted);">Capacidade de manter o desempenho em esforços e intensidade equivalentes ao seu nível, resistir e suportar trabalhos repetidos, resistindo ao cansaço físico e/ou mental. Também é utilizada para ditar a capacidade de aguentar danos, principalmente.<br><br>Medida utilizada: <strong class="carmine-text" style="font-size: 1em;">Kg</strong></p>
                </div>

                <div style="margin-bottom: 1.2rem; padding: 1.2rem; background: rgba(139,0,0,0.05); border: 1px solid var(--support-crimson); border-radius: 4px;">
                    <h4 style="color: var(--text-main); display: flex; align-items: center; gap: 10px;"><i data-lucide="zap" style="color: var(--neon-red);"></i> VELOCIDADE</h4>
                    <p style="margin-top: 0.8rem; color: var(--text-muted);">Capacidade de atingir alta velocidade em um curto espaço de tempo, partindo da inércia. A velocidade dita o quão longe e em quanto tempo o corpo inteiro do personagem consegue chegar de ponto A à ponto B.<br><br>Medida utilizada: <strong class="carmine-text" style="font-size: 1em;">km/h</strong></p>
                </div>

                <div style="margin-bottom: 1.2rem; padding: 1.2rem; background: rgba(139,0,0,0.05); border: 1px solid var(--support-crimson); border-radius: 4px;">
                    <h4 style="color: var(--text-main); display: flex; align-items: center; gap: 10px;"><i data-lucide="wind" style="color: var(--neon-red);"></i> AGILIDADE</h4>
                    <p style="margin-top: 0.8rem; color: var(--text-muted);">Rapidez com que um segmento corporal se desloca durante um gesto motor. Isso significa o quão rápido o personagem pode ser para desviar de obstáculos, esquivar, se pôr em prontidão para algo iminente e etc, é sobre os movimentos mais especificados.<br><br>Medida utilizada: <strong class="carmine-text" style="font-size: 1em;">m/s</strong></p>
                </div>

                <div style="margin-bottom: 1.2rem; padding: 1.2rem; background: rgba(139,0,0,0.05); border: 1px solid var(--support-crimson); border-radius: 4px;">
                    <h4 style="color: var(--text-main); display: flex; align-items: center; gap: 10px;"><i data-lucide="star" style="color: var(--neon-red);"></i> PODER / ESPECIALIDADE</h4>
                    <p style="margin-top: 0.8rem; color: var(--text-muted);">Trata-se da proficiência de um personagem quanto ao seu poder / especialidade. Quanto maior o nível do poder / especialidade, mais competente o personagem se torna em ação utilizando tal, até o ponto de masterizar e inovar.</p>
                    <ul style="margin-top: 1rem; padding-left: 20px; color: var(--text-muted);">
                        <li style="margin-bottom: 0.5rem;"><strong>Poderes:</strong> Podem melhorar a cada nível que sobem e ganham novos espaços para <em>habilidades</em>. Elas precisam condizer com o poder base e com o nível atual.</li>
                        <li><strong>Especialidades:</strong> Podem aprender uma <em>maestria</em> nova a cada nível, sempre baseada na sua especialidade.</li>
                    </ul>
                </div>

                <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-primary); border: 1px solid var(--neon-red); border-left: 4px solid var(--neon-red); border-radius: 4px;">
                    <p style="font-family: monospace; font-size: 0.9em; margin: 0;">
                        <span style="color: var(--text-muted);">PARA RECEBER A LISTA COM AS INTERPRETAÇÕES E VALORES DAS UNIDADES DE MEDIDA DOS ATRIBUTOS USE O COMANDO ABAIXO:</span><br>
                        <strong style="color: var(--text-main); font-size: 1.2em; display: inline-block; margin-top: 5px;">//nivelamento-atributo</strong>
                    </p>
                </div>
            </div>
        `
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
                ${pageData.content}
            </div>
        </div>
    `;

    // Re-renderiza os ícones do Lucide que foram inseridos dinamicamente
    lucide.createIcons();
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
