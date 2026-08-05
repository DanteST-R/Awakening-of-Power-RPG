// Inicializa os ícones do Lucide
lucide.createIcons();

// Lista de Poderes Proibidos — consultada na aprovação de fichas
const BANNED_POWERS = [
    "Criação e Manipulação de Buracos Negros",
    "Criação e Manipulação de Doenças",
    "Onipotência",
    "Onisciência",
    "Onipresença",
    "Omni-poderes",
    "Manipulação Absoluta da Realidade",
    "Reescrita da Existência",
    "Apagamento da Existência",
    "Aniquilação Total",
    "Causalidade Absoluta",
    "Manipulação do Destino",
    "Controle Absoluto da Morte",
    "Ressurreição Ilimitada",
    "Imortalidade Absoluta",
    "Invulnerabilidade Absoluta",
    "Poder Ilimitado / Sem Limites",
    "Cópia Absoluta de Qualquer Poder",
    "Nulificação Absoluta de Poderes",
    "Manipulação do Tempo (versão Absoluta)",
    "Viagem no Tempo sem restrições",
    "Controle Total da Mente",
    "Apagamento de Memórias (versão Absoluta)",
    "Recriação Universal",
    "Destruição Universal",
    "Manipulação de Dimensões (versão Absoluta)",
    "Poderes Divinos / Nivelados a Deuses",
    "Controle Absoluto de outros personagens"
];

// ═══ SISTEMA DE RANQUES — 13 Níveis (Bronze → Diamante) ═══
const RANK_DATA = [
    { nivel: 1, pedra: 'Bronze',    emoji: '⏣', cor: '#cd7f32', pr: 0,      recompensas: ['Acesso a missões Rank Bronze', '+15 Exp.', '+15 Pontos Gear'], narrativa: 'Seu personagem não possui fama negativa ou positiva, mas sua existência é apenas um boato ocasional comentado entre pequenos grupos.' },
    { nivel: 2, pedra: 'Ferro',     emoji: '⟠', cor: '#a19d94', pr: 100,    recompensas: ['Acesso a missões Rank Ferro', '+50 Exp.', '+50 Pontos Gear'], narrativa: 'Seu personagem já é conhecido em sua região de atuação. Seu nome começa a circular entre profissionais e pessoas ligadas ao meio, sendo reconhecido por alguns de seus feitos.' },
    { nivel: 3, pedra: 'Titânio',   emoji: '⟡', cor: '#878681', pr: 250,    recompensas: ['Acesso a missões Rank Titânio', '+150 Exp.', '+150 Pontos Gear'], narrativa: 'Seu personagem conquistou respeito dentro de sua área de atuação. Sua reputação já desperta atenção de organizações, aliados e possíveis adversários.' },
    { nivel: 4, pedra: 'Ouro',      emoji: '✦', cor: '#ffd700', pr: 500,    recompensas: ['Acesso a missões Rank Ouro', '+250 Exp.', '+250 Pontos Gear'], narrativa: 'O nome do personagem tornou-se amplamente conhecido. Seus feitos já são divulgados entre organizações e frequentemente mencionados em notícias, registros ou relatórios.' },
    { nivel: 5, pedra: 'Platina',   emoji: '✧', cor: '#e5e4e2', pr: 900,    recompensas: ['Acesso a missões Rank Platina', '+350 Exp.', '+350 Pontos Gear'], narrativa: 'Seu personagem é considerado um dos indivíduos mais competentes de sua geração. Sua presença em uma operação costuma ser suficiente para elevar a confiança dos aliados e preocupar seus inimigos.' },
    { nivel: 6, pedra: 'Paládio',   emoji: '⍟', cor: '#ced0d4', pr: 1500,   recompensas: ['Acesso a missões Rank Paládio', 'Direito de criar equipamentos (Classe Mítica)', '+450 Exp.', '+450 Pontos Gear'], narrativa: 'Seu personagem é uma figura de reconhecimento nacional. Suas ações influenciam diretamente grandes acontecimentos e seu nome é respeitado em praticamente qualquer organização.' },
    { nivel: 7, pedra: 'Irídio',    emoji: '❂', cor: '#dbdbd7', pr: 2400,   recompensas: ['Acesso a missões Rank Irídio', '+550 Exp.', '+550 Pontos Gear'], narrativa: 'Pouquíssimos indivíduos alcançam este patamar. O personagem tornou-se uma verdadeira lenda viva, sendo reconhecido mundialmente e considerado uma das maiores autoridades em combate ou atuação.' },
    { nivel: 8, pedra: 'Diamante',  emoji: '❖', cor: '#b9f2ff', pr: 3600,   recompensas: ['Acesso à missões Rank Diamante', '+650 Exp.', '+650 Pontos Gear'], narrativa: 'O personagem alcançou o mais alto grau de reconhecimento existente. Seu nome tornou-se parte da história e sua influência transcende organizações, países e gerações, sendo lembrado como uma verdadeira lenda.', ultimo: true }
];

// Nomes de rank por classe e nível
function getRankName(nivel, classe) {
    const r = RANK_DATA.find(x => x.nivel === nivel) || RANK_DATA[0];
    const prefixo = classe === 'Herói' ? 'Herói' : classe === 'Vilão' ? 'Vilão' : 'Vigilante';
    return `${prefixo} ${r.pedra} ${r.emoji}`;
}

// Dados das páginas simulando um roteamento
const pages = {
    perfil: {
        title: "Meu Perfil",
        content: `
            <div id="perfil-container">
                <!-- O conteúdo do perfil será injetado dinamicamente via JS (renderPerfil()) -->
            </div>
        `
    },
    mapa: {
        title: "Mapa de Unicity",
        content: `
            <p style="color: var(--text-muted); margin-bottom: 1.2rem;">
                <em>A metrópole de Unicity é dividida entre Alta Unicity (Noroeste e Sudoeste) e Baixa Unicity (Nordeste, Sudeste e Arquipélago). Clique nas áreas coloridas do mapa ou utilize os botões dos bairros abaixo para explorar os pontos de interesse, lore e nível de segurança de cada distrito.</em>
            </p>

            <div class="map-container-wrapper">
                <div class="map-image-wrapper">
                    <img src="assets/AwakeningRPGMap.png" alt="Mapa de Unicity" id="unicity-map-img">
                </div>
            </div>

            <h3 class="neon-text" style="font-size: 1.1rem; margin-top: 1.8rem; margin-bottom: 0.8rem;">EXPLORAR BAIRROS DE UNICITY:</h3>
            <div class="bairros-buttons-grid">
                <button class="bairro-btn delly" onclick="openBairroModal('delly')">
                    <span style="font-size:1rem;">🟥</span> Delly
                </button>
                <button class="bairro-btn amberling" onclick="openBairroModal('amberling')">
                    <span style="font-size:1rem;">🟨</span> Amberling
                </button>
                <button class="bairro-btn sammill" onclick="openBairroModal('sammill')">
                    <span style="font-size:1rem;">🟦</span> Sammill
                </button>
                <button class="bairro-btn dawn-hill" onclick="openBairroModal('dawn-hill')">
                    <span style="font-size:1rem;">🟩</span> Dawn Hill
                </button>
                <button class="bairro-btn central-sunset" onclick="openBairroModal('central-sunset')">
                    <span style="font-size:1rem;">🟧</span> Central Sunset
                </button>
                <button class="bairro-btn vienner" onclick="openBairroModal('vienner')">
                    <span style="font-size:1rem;">🟪</span> Vienner
                </button>
            </div>

            <!-- MODAL DETALHADO DO BAIRRO -->
            <div id="bairro-modal" class="level-modal-overlay" onclick="closeBairroModal(event)">
                <div class="level-modal-card" style="max-width: 680px;" onclick="event.stopPropagation()">
                    <div class="level-modal-header">
                        <h3 id="bairro-modal-title" style="display: flex; align-items: center; gap: 8px;">
                            <span id="bairro-modal-color">🟥</span> <span id="bairro-modal-name">Delly</span>
                        </h3>
                        <button class="level-modal-close" onclick="closeBairroModal()">&times;</button>
                    </div>

                    <p id="bairro-modal-quote" style="color: var(--neon-red); font-style: italic; margin-bottom: 1rem; font-weight: bold;"></p>

                    <div style="max-height: 400px; overflow-y: auto; padding-right: 8px;">
                        <div style="background: var(--bg-primary); padding: 1rem; border: 1px solid var(--support-crimson); border-radius: 4px; margin-bottom: 1rem; font-size: 0.9em; line-height: 1.6; color: var(--text-muted);" id="bairro-modal-description">
                        </div>

                        <div style="background: rgba(255,0,60,0.08); border-left: 3px solid var(--neon-red); padding: 0.8rem 1rem; margin-bottom: 1rem;">
                            <strong style="color: var(--text-main); display: flex; align-items: center; gap: 6px;">
                                🛡️ Segurança: <span id="bairro-modal-security" style="color: var(--neon-red);"></span>
                            </strong>
                            <p id="bairro-modal-security-desc" style="font-size: 0.85em; color: var(--text-muted); margin-top: 0.3rem;"></p>
                        </div>

                        <h4 style="color: var(--neon-red); font-size: 1rem; margin-bottom: 0.6rem; letter-spacing: 1px;">📍 PONTOS DE INTERESSE:</h4>
                        <ul id="bairro-modal-points" style="padding-left: 20px; color: var(--text-main); font-size: 0.9em; line-height: 1.8;">
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
    sistema: {
        title: "Sistema e Regras",
        content: `
            <div class="tabs-container" style="border-bottom: 1px solid var(--support-crimson); margin-bottom: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                <button id="tab-btn-atributos" class="sub-tab-btn active" onclick="switchSubTab('atributos')">Atributos e Evolução</button>
                <button id="tab-btn-equipamentos" class="sub-tab-btn" onclick="switchSubTab('equipamentos')">Equipamentos e Trajes</button>
                <button id="tab-btn-pontuacoes" class="sub-tab-btn" onclick="switchSubTab('pontuacoes')">Pontuações e Recursos</button>
                <button id="tab-btn-ranking" class="sub-tab-btn" onclick="switchSubTab('ranking')">Ranking</button>
            </div>
            
            <!-- SUB-ABA 1: ATRIBUTOS E EVOLUÇÃO -->
            <div id="subtab-atributos" class="content-section" style="line-height: 1.6; text-align: justify;">
                <p style="color: var(--text-muted);"><em>Cada personagem possui uma progressão que em base os padroniza, mas seus poderes ou especializações, habilidades, maestrias e vários outros fatores externos podem alterar esses padrões e torná-lo único, mas antes de chegar a isso, é necessário conhecer os fundamentos, os atributos, e para quê servem.</em></p>
                <br>
                <p>De tal maneira, é possível dizer que os atributos são importantes e cruciais para definir não só o desenvolvimento de um personagem, mas o jeito que o jogo e a ambientação o afetam. Os jogadores possuem total liberdade para montar <strong class="carmine-text" style="font-size: 1em;">builds</strong> e <em style="color: var(--text-main);">auto classificar</em> seus personagens de acordo com o que lhes convém definir e de acordo com a vontade do momento. Isso vai do jogador, para que não haja rótulos ou limitações além das que o próprio deseje impor.</p>
                
                <h3 class="neon-text" style="margin-top: 2.5rem; margin-bottom: 0.8rem; font-size: 1.3rem;">Níveis e Experiência (EXP)</h3>
                <p style="color: var(--neon-red); font-size: 0.85rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 6px;">
                    <i data-lucide="corner-down-right" style="color: var(--neon-red); width: 16px; height: 16px;"></i> 
                    <em>Clique em qualquer nível para ver a recompensa liberada do atributo <strong>Poder / Especialidade</strong>:</em>
                </p>

                <div class="level-grid">
                    <div class="level-btn" onclick="openLevelModal(1)">
                        <strong>NV. I</strong>
                        <span class="carmine-text" style="font-size: 0.85em; font-family: monospace;">⟨⟨ 00 // 100 ⟩⟩</span>
                        <br><span class="reward-tag"><i data-lucide="gift" style="width: 12px; height: 12px; vertical-align: middle;"></i> Ver Recompensa</span>
                    </div>
                    <div class="level-btn" onclick="openLevelModal(2)">
                        <strong>NV. II</strong>
                        <span class="carmine-text" style="font-size: 0.85em; font-family: monospace;">⟨⟨ 00 // 300 ⟩⟩</span>
                        <br><span class="reward-tag"><i data-lucide="gift" style="width: 12px; height: 12px; vertical-align: middle;"></i> Ver Recompensa</span>
                    </div>
                    <div class="level-btn" onclick="openLevelModal(3)">
                        <strong>NV. III</strong>
                        <span class="carmine-text" style="font-size: 0.85em; font-family: monospace;">⟨⟨ 00 // 600 ⟩⟩</span>
                        <br><span class="reward-tag"><i data-lucide="gift" style="width: 12px; height: 12px; vertical-align: middle;"></i> Ver Recompensa</span>
                    </div>
                    <div class="level-btn" onclick="openLevelModal(4)">
                        <strong>NV. IV</strong>
                        <span class="carmine-text" style="font-size: 0.85em; font-family: monospace;">⟨⟨ 00 // 900 ⟩⟩</span>
                        <br><span class="reward-tag"><i data-lucide="gift" style="width: 12px; height: 12px; vertical-align: middle;"></i> Ver Recompensa</span>
                    </div>
                    <div class="level-btn" onclick="openLevelModal(5)">
                        <strong>NV. V</strong>
                        <span class="carmine-text" style="font-size: 0.85em; font-family: monospace;">⟨⟨ 00 // 1400 ⟩⟩</span>
                        <br><span class="reward-tag"><i data-lucide="gift" style="width: 12px; height: 12px; vertical-align: middle;"></i> Ver Recompensa</span>
                    </div>
                    <div class="level-btn" onclick="openLevelModal(6)">
                        <strong>NV. VI</strong>
                        <span class="carmine-text" style="font-size: 0.85em; font-family: monospace;">⟨⟨ 00 // 2500 ⟩⟩</span>
                        <br><span class="reward-tag"><i data-lucide="gift" style="width: 12px; height: 12px; vertical-align: middle;"></i> Ver Recompensa</span>
                    </div>
                </div>

                <p style="margin-top: 1.5rem; font-size: 0.9em; color: var(--text-muted); border-left: 2px solid var(--text-muted); padding-left: 10px;">— Exp. pode ser obtido por meio de <strong>missões, treinamentos, interações e eventos</strong>, além de formas alternativas que podem surgir com o tempo.</p>

                <h3 class="neon-text" style="margin-top: 2.5rem; margin-bottom: 0.8rem; font-size: 1.3rem;">Os Atributos</h3>
                <p style="color: var(--neon-red); font-size: 0.85rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 6px;">
                    <i data-lucide="corner-down-right" style="color: var(--neon-red); width: 16px; height: 16px;"></i> 
                    <em>Clique em qualquer card de atributo para ver a interpretação de todos os seus Níveis (I ao VI):</em>
                </p>
                
                <!-- FORÇA -->
                <div class="attribute-card" onclick="openAttributeModal('forca')">
                    <h4 style="color: var(--text-main); display: flex; align-items: center; gap: 10px;"><i data-lucide="hand-metal" style="color: var(--neon-red);"></i> FORÇA</h4>
                    <p style="margin-top: 0.8rem; color: var(--text-muted);">A força condiz com a capacidade de causar dano a alvos ou de impulsionar algo, agindo da maneira mais natural possível e tendo como objetivo definir se o personagem <em>é capaz ou não</em> de causar dano, afinal, de empurrar algo ou de se projetar para algum lugar apenas por força.<br><br>Medida utilizada: <strong class="carmine-text" style="font-size: 1em;">Kg/F (quilograma força)</strong></p>
                    <span class="view-levels-btn"><i data-lucide="layers" style="width: 14px; height: 14px;"></i> Ver Interpretação de Níveis</span>
                </div>

                <!-- RESISTÊNCIA -->
                <div class="attribute-card" onclick="openAttributeModal('resistencia')">
                    <h4 style="color: var(--text-main); display: flex; align-items: center; gap: 10px;"><i data-lucide="shield" style="color: var(--neon-red);"></i> RESISTÊNCIA</h4>
                    <p style="margin-top: 0.8rem; color: var(--text-muted);">Capacidade de manter o desempenho em esforços e intensidade equivalentes ao seu nível, resistir e suportar trabalhos repetidos, resistindo ao cansaço físico e/ou mental. Também é utilizada para ditar a capacidade de aguentar danos, principalmente.<br><br>Medida utilizada: <strong class="carmine-text" style="font-size: 1em;">Kg</strong></p>
                    <span class="view-levels-btn"><i data-lucide="layers" style="width: 14px; height: 14px;"></i> Ver Interpretação de Níveis</span>
                </div>

                <!-- VELOCIDADE -->
                <div class="attribute-card" onclick="openAttributeModal('velocidade')">
                    <h4 style="color: var(--text-main); display: flex; align-items: center; gap: 10px;"><i data-lucide="zap" style="color: var(--neon-red);"></i> VELOCIDADE</h4>
                    <p style="margin-top: 0.8rem; color: var(--text-muted);">Capacidade de atingir alta velocidade em um curto espaço de tempo, partindo da inércia. A velocidade dita o quão longe e em quanto tempo o corpo inteiro do personagem consegue chegar de ponto A à ponto B.<br><br>Medida utilizada: <strong class="carmine-text" style="font-size: 1em;">km/h</strong></p>
                    <span class="view-levels-btn"><i data-lucide="layers" style="width: 14px; height: 14px;"></i> Ver Interpretação de Níveis</span>
                </div>

                <!-- AGILIDADE -->
                <div class="attribute-card" onclick="openAttributeModal('agilidade')">
                    <h4 style="color: var(--text-main); display: flex; align-items: center; gap: 10px;"><i data-lucide="wind" style="color: var(--neon-red);"></i> AGILIDADE</h4>
                    <p style="margin-top: 0.8rem; color: var(--text-muted);">Rapidez com que um segmento corporal se desloca durante um gesto motor. Isso significa o quão rápido o personagem pode ser para desviar de obstáculos, esquivar, se pôr em prontidão para algo iminente e etc, é sobre os movimentos mais especificados.<br><br>Medida utilizada: <strong class="carmine-text" style="font-size: 1em;">m/s</strong></p>
                    <span class="view-levels-btn"><i data-lucide="layers" style="width: 14px; height: 14px;"></i> Ver Interpretação de Níveis</span>
                </div>

                <!-- PODER / ESPECIALIDADE -->
                <div class="attribute-card" onclick="openAttributeModal('poder')">
                    <h4 style="color: var(--text-main); display: flex; align-items: center; gap: 10px;"><i data-lucide="star" style="color: var(--neon-red);"></i> PODER / ESPECIALIDADE</h4>
                    <p style="margin-top: 0.8rem; color: var(--text-muted);">Trata-se da proficiência de um personagem quanto ao seu poder / especialidade. Quanto maior o nível do poder / especialidade, mais competente o personagem se torna em ação utilizando tal, até o ponto de masterizar e inovar.</p>
                    <ul style="margin-top: 1rem; padding-left: 20px; color: var(--text-muted);">
                        <li style="margin-bottom: 0.5rem;"><strong>Poderes:</strong> Podem melhorar a cada nível que sobem e ganham novos espaços para <em>habilidades</em>. Elas precisam condizer com o poder base e com o nível atual.</li>
                        <li><strong>Especialidades:</strong> Podem aprender uma <em>maestria</em> nova a cada nível, sempre baseada na sua especialidade.</li>
                    </ul>
                    <span class="view-levels-btn"><i data-lucide="layers" style="width: 14px; height: 14px;"></i> Ver Interpretação de Níveis</span>
                </div>

                <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-primary); border: 1px solid var(--neon-red); border-left: 4px solid var(--neon-red); border-radius: 4px;">
                    <p style="font-family: monospace; font-size: 0.9em; margin: 0;">
                        <span style="color: var(--text-muted);">PARA RECEBER A LISTA COM AS INTERPRETAÇÕES E VALORES DAS UNIDADES DE MEDIDA DOS ATRIBUTOS USE O COMANDO ABAIXO:</span><br>
                        <strong style="color: var(--text-main); font-size: 1.2em; display: inline-block; margin-top: 5px;">//nivelamento-atributo</strong>
                    </p>
                </div>
            </div>

            <!-- MODAL DE INTERPRETAÇÃO DE ATRIBUTOS -->
            <div id="attribute-modal" class="level-modal-overlay" onclick="closeAttributeModal(event)">
                <div class="level-modal-card" style="max-width: 680px;" onclick="event.stopPropagation()">
                    <div class="level-modal-header">
                        <h3 id="attribute-modal-title" style="display: flex; align-items: center; gap: 10px;">FORÇA</h3>
                        <button class="level-modal-close" onclick="closeAttributeModal()">&times;</button>
                    </div>

                    <div style="max-height: 440px; overflow-y: auto; padding-right: 8px;" id="attribute-modal-body">
                    </div>
                </div>
            </div>

            <!-- SUB-ABA 2: EQUIPAMENTOS E TRAJES -->
            <div id="subtab-equipamentos" class="content-section" style="display: none; line-height: 1.6; text-align: justify;">
                <p style="color: var(--text-muted);"><em>Os jogadores podem criar equipamentos e trajes utilizando <strong>Gear Points (GP ⚙️)</strong>, uma moeda obtida através de missões, eventos, torneios, desafios especiais e conquistas. Cada criação exige uma quantidade de Gear Points compatível com sua categoria. Quanto maior a categoria, mais recursos, tempo e experiência são necessários.</em></p>

                <!-- COMO OBTER E VALORES -->
                <h3 class="neon-text" style="margin-top: 2rem; margin-bottom: 1rem; font-size: 1.2rem;">[ COMO OBTER E VALORES ]</h3>
                <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                    <div style="padding: 1rem 1.4rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 4px solid var(--neon-red); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <span style="font-size: 1rem;">📜 <strong>MISSÕES AUTO NARRADAS</strong></span>
                        <span class="carmine-text" style="font-weight: bold; font-family: monospace; font-size: 1.25rem; letter-spacing: 1px;">[ 15 à 30 GP ]</span>
                    </div>
                    <div style="padding: 1rem 1.4rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 4px solid var(--neon-red); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <span style="font-size: 1rem;">🎯 <strong>MISSÕES NARRADAS ( SECUNDÁRIAS )</strong></span>
                        <span class="carmine-text" style="font-weight: bold; font-family: monospace; font-size: 1.25rem; letter-spacing: 1px;">[ 40 à 80 GP ]</span>
                    </div>
                    <div style="padding: 1rem 1.4rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 4px solid var(--neon-red); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <span style="font-size: 1rem;">🔥 <strong>MISSÕES DE EVENTO ( PRINCIPAIS )</strong></span>
                        <span class="carmine-text" style="font-weight: bold; font-family: monospace; font-size: 1.25rem; letter-spacing: 1px;">[ 90 – 200 GP ]</span>
                    </div>
                </div>

                <div style="margin-top: 1.2rem; padding: 1rem; background: rgba(255,0,60,0.05); border: 1px solid var(--neon-red); border-radius: 4px; font-size: 0.9em; color: var(--text-muted);">
                    <p style="margin-bottom: 0.5rem;">❗ • <em>Feitos excepcionais podem garantir mais GP do que a quantidade padrão e outras recompensas narrativas podem ser definidas pelo narrador e/ou administração caso se aplique. Isso vale para qualquer uma das classes e o julgamento fica pela administração.</em></p>
                    <p>❗ • <em>Também é possível obter GP explorando locais propícios durante investigações pessoais, roubando ou recebendo de alguma forma narrativa (de maneira narrada e avaliada).</em></p>
                </div>

                <!-- COMO USAR GEAR POINTS -->
                <h3 class="neon-text" style="margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.2rem;">[ COMO USAR GEAR POINTS ]</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
                    <div style="padding: 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-radius: 4px;">
                        <h4 style="color: var(--neon-red); margin-bottom: 0.5rem;">🛠️ Criar novos equipamentos e trajes</h4>
                        <p style="font-size: 0.9em; color: var(--text-muted);">Com o uso da ficha de criação de trajes e equipamentos, você pode preencher a ficha e enviar para avaliação. Após avaliada, a administração pode aprovar ou ajustar o item.</p>
                    </div>
                    <div style="padding: 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-radius: 4px;">
                        <h4 style="color: var(--neon-red); margin-bottom: 0.5rem;">⚡ Melhorar equipamentos existentes</h4>
                        <p style="font-size: 0.9em; color: var(--text-muted);">Caso deseje melhorar alguma função ou subir a classe do item, utilize a ficha de criação para apresentar à avaliação sua ideia de upgrade.</p>
                    </div>
                    <div style="padding: 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-radius: 4px;">
                        <h4 style="color: var(--neon-red); margin-bottom: 0.5rem;">🔧 Reparar equipamentos destruídos</h4>
                        <p style="font-size: 0.9em; color: var(--text-muted);">Equipamentos e trajes podem ser danificados na narrativa. Essa possibilidade existe para que toda regalia seja bem cuidada pelo jogador.</p>
                    </div>
                </div>

                <!-- CLASSES DE TRAJE / EQUIPAMENTO -->
                <h3 class="neon-text" style="margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.2rem;">[ CLASSES DE TRAJE / EQUIPAMENTO ]</h3>
                
                <!-- CLASSE COMUM -->
                <div style="margin-bottom: 1.5rem; padding: 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 4px solid #aaa; border-radius: 4px;">
                    <h4 style="color: var(--text-main); font-size: 1.1rem;">CLASSE COMUM — [⭐]</h4>
                    <p style="color: var(--text-muted); font-size: 0.9em; margin-top: 0.3rem;"><em>Equipamentos simples, produzidos com materiais convencionais ou tecnologia básica.</em></p>
                    <div style="margin-top: 0.8rem; font-size: 0.9em;">
                        <strong style="color: var(--neon-red);">[ CARACTERÍSTICAS ]</strong>
                        <p style="color: var(--text-muted);">Apenas <strong>uma (1) função básica</strong> principal. Sem sistemas complexos. Baixo custo de manutenção. Fácil substituição.</p>
                    </div>
                    <div style="margin-top: 0.8rem; font-size: 0.9em;">
                        <strong style="color: var(--neon-red);">[ EXEMPLOS ]</strong>
                        <p style="color: var(--text-muted);">Colete tático • Óculos de visão noturna simples • Luvas de combate • Bastão retrátil • Uniforme de tecidos comuns.</p>
                    </div>
                    <div style="margin-top: 0.8rem; font-weight: bold; color: var(--text-main); font-family: monospace;">
                        Custo Médio: <span class="carmine-text">200 GP</span> (para obter, melhorar e reparar)
                    </div>
                </div>

                <!-- CLASSE AVANÇADO -->
                <div style="margin-bottom: 1.5rem; padding: 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 4px solid #ffcc00; border-radius: 4px;">
                    <h4 style="color: var(--text-main); font-size: 1.1rem;">CLASSE AVANÇADO — [⭐⭐]</h4>
                    <p style="color: var(--text-muted); font-size: 0.9em; margin-top: 0.3rem;"><em>Equipamentos militares ou de alta tecnologia, capazes de oferecer diversas vantagens.</em></p>
                    <div style="margin-top: 0.8rem; font-size: 0.9em;">
                        <strong style="color: var(--neon-red);">[ CARACTERÍSTICAS ]</strong>
                        <p style="color: var(--text-muted);">Até <strong>duas (2) funções especiais</strong>. Materiais reforçados. Sensores ou mecanismos eletrônicos. Grande resistência.</p>
                    </div>
                    <div style="margin-top: 0.8rem; font-size: 0.9em;">
                        <strong style="color: var(--neon-red);">[ EXEMPLOS ]</strong>
                        <p style="color: var(--text-muted);">Traje com proteção balística • Drone de reconhecimento • Exoesqueleto parcial • Máscara com filtros inteligentes • Armas modulares • Malha anti cortes.</p>
                    </div>
                    <div style="margin-top: 0.8rem; font-weight: bold; color: var(--text-main); font-family: monospace;">
                        Custo Médio: <span class="carmine-text">600 GP</span> (para obter, melhorar e reparar)
                    </div>
                </div>

                <!-- CLASSE SUPER -->
                <div style="margin-bottom: 1.5rem; padding: 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 4px solid var(--neon-red); border-radius: 4px;">
                    <h4 style="color: var(--text-main); font-size: 1.1rem;">CLASSE SUPER — [⭐⭐⭐]</h4>
                    <p style="color: var(--text-muted); font-size: 0.9em; margin-top: 0.3rem;"><em>Tecnologia de ponta ou experimental, extremamente rara. Produzida geralmente em laboratórios dedicados, bases militares avançadas e indústrias de tecnologia aplicada.</em></p>
                    <div style="margin-top: 0.8rem; font-size: 0.9em;">
                        <strong style="color: var(--neon-red);">[ CARACTERÍSTICAS ]</strong>
                        <p style="color: var(--text-muted);">Máximo de <strong>três (3) funções aplicadas</strong>. Alto desempenho. Materiais únicos. Equipamentos quase exclusivos. Para inutilizar um equipamento ou traje Super, normalmente será necessário outro equipamento de Classe Super ou um recurso narrativo equivalente aprovado pela administração.</p>
                    </div>
                    <div style="margin-top: 0.8rem; font-size: 0.9em;">
                        <strong style="color: var(--neon-red);">[ EXEMPLOS ]</strong>
                        <p style="color: var(--text-muted);">Armadura motorizada tecnológica • Veículo tático • Manto de camuflagem óptica • Exoesqueleto completo • Sistema de IA embarcado • Traje com múltiplos modos de combate • Equipamentos e trajes que interajam por interface diretamente ou mecanicamente, manualmente ou por I.A.</p>
                    </div>
                    <div style="margin-top: 0.8rem; font-weight: bold; color: var(--text-main); font-family: monospace;">
                        Custo Sugerido: <span class="carmine-text">2500 GP</span> (em média, para obter, melhorar e reparar)
                    </div>
                </div>

                <!-- FUNÇÕES E MELHORIAS -->
                <h3 class="neon-text" style="margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.2rem;">[ FUNÇÕES E MELHORIAS / UPGRADE ]</h3>
                <div style="padding: 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-radius: 4px; margin-bottom: 1.5rem; font-size: 0.9em; color: var(--text-muted);">
                    <p style="margin-bottom: 0.8rem;"><strong>FUNÇÕES:</strong> Cada função deve possuir um objetivo principal. Variações que alteram significativamente sua aplicação contam como funções independentes. Não é permitido criar funções "dois em um".</p>
                    <p style="margin-bottom: 0.8rem;"><strong>MELHORIAS / UPGRADE:</strong> Em vez de substituir um equipamento ou traje, o jogador pode evoluí-lo. Caso queira colocar mais funções em um item cheio, o custo é variável e pode exigir uma cena auto narrada adaptando o item.</p>
                    
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
                        <div style="padding: 1rem; background: rgba(139,0,0,0.25); border-left: 4px solid var(--neon-red); flex: 1; min-width: 200px;">
                            <strong style="font-size: 1rem; color: var(--text-main);">COMUM ➔ AVANÇADO</strong><br>
                            <span class="carmine-text" style="font-family: monospace; font-weight: bold; font-size: 1.45rem; display: inline-block; margin-top: 6px;">Custa 400 GP</span>
                        </div>
                        <div style="padding: 1rem; background: rgba(139,0,0,0.25); border-left: 4px solid var(--neon-red); flex: 1; min-width: 200px;">
                            <strong style="font-size: 1rem; color: var(--text-main);">AVANÇADO ➔ SUPER</strong><br>
                            <span class="carmine-text" style="font-family: monospace; font-weight: bold; font-size: 1.45rem; display: inline-block; margin-top: 6px;">Custa 1250 GP</span>
                        </div>
                    </div>

                    <div style="margin-top: 1rem;">
                        <strong style="color: var(--text-main);">Melhorias podem adicionar:</strong>
                        <ul style="margin-top: 0.4rem; padding-left: 20px;">
                            <li>Resistências específicas.</li>
                            <li>Novas funções.</li>
                            <li>Menor consumo de energia <em>(caso seja baseado em energia ou turnos)</em>.</li>
                            <li>Mais carga <em>(caso seja carregável)</em>.</li>
                            <li>Menor tempo de recarga <em>(caso seja carregável)</em>.</li>
                        </ul>
                    </div>
                </div>

                <!-- LIMITES E REGRAS -->
                <h3 class="neon-text" style="margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.2rem;">⚠️ [ LIMITES E REGRAS ]</h3>
                <div style="padding: 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-radius: 4px; font-size: 0.9em; color: var(--text-muted); display: flex; flex-direction: column; gap: 1rem;">
                    <p>• Para manter o equilíbrio, cada personagem pode iniciar com <strong>2 equipamentos ou 1 par de equipamento e 1 traje, ambos da classe comum</strong>. À medida em que o personagem sobe de ranque, pode escolher de graça +1 slot ou 1 upgrade.</p>
                    <p>• Só é possível usar <strong>1 traje por vez</strong>, a menos que possua sistema de equipagem automática ou substituição em tempo real.</p>
                    <p>• <strong>Equipamentos em Pares:</strong> Par de katanas não ocupa 2 espaços, mas não podem ser utilizados mais de três (3) equipamentos em pares por ação e não se pode ter mais de 3 pares no kit.</p>
                    <p>• <strong>Consumíveis / Arremessáveis:</strong> Recarregados ao fim de missões. Não consomem unidade de slot, mas a quantidade em ação é fixada na ficha de criação.</p>
                    <div style="margin-top: 2rem; padding: 1.2rem; background: rgba(10,10,10,0.8); border: 1px solid var(--support-crimson); border-radius: 4px; font-size: 0.9em; text-align: center;">
                        <p style="font-family: monospace; color: var(--text-muted); margin: 0;">
                            <span style="color: var(--text-muted);">❗ • PARA RECEBER A FICHA DE CRIAÇÃO DE TRAJE OU EQUIPAMENTOS USE OS COMANDOS ABAIXO:</span><br>
                            <strong style="color: var(--text-main); font-size: 1.1em; display: inline-block; margin-top: 8px;">//ficha-traje</strong> &nbsp;|&nbsp; 
                            <strong style="color: var(--text-main); font-size: 1.1em; display: inline-block; margin-top: 8px;">//ficha-equip</strong>
                        </p>
                    </div>
                </div>
            </div>

            <!-- SUB-ABA 3: PONTUAÇÕES E RECURSOS -->
            <div id="subtab-pontuacoes" class="content-section" style="display: none; line-height: 1.6; text-align: justify;">
                <div style="text-align: center; margin-bottom: 1.8rem;">
                    <p style="color: var(--text-muted); font-size: 0.9rem; font-style: italic;">
                        O Awakening of Power-RPG conta com diversos sistemas evolutivos e que funcionam à base de pontuações ou acumulação e gasto de recursos por quantidades e valores. Aqui vai uma lista explicativa de cada tipo de pontuação e recurso existentes no RPG:
                    </p>
                </div>

                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <!-- EXPERIÊNCIA -->
                    <div style="padding: 1.5rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 4px solid #ffcc00; border-radius: 4px; box-shadow: 0 0 15px rgba(255,204,0,0.05);">
                        <h4 style="color: #ffcc00; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; margin-bottom: 0.8rem;">
                            ✨ EXPERIÊNCIA ( Exp. // ✨ )
                        </h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">
                            A <strong>Experiência</strong> (ou <em>Exp. // ✨</em>) é a principal fonte de evolução quando se trata de nivelamento e desenvolvimento de personagem. Basicamente, quase todas as atividades do RPG tendem a ceder Exp. e o mesmo é utilizado para a progressão de seu personagem, o tornando essencialmente mais forte.
                        </p>
                        <div style="margin-top: 1rem; padding: 0.8rem 1rem; background: rgba(255,204,0,0.06); border: 1px solid rgba(255,204,0,0.3); border-radius: 3px; font-size: 0.88rem; color: var(--text-main);">
                            ⚡ <strong>Regra de Evolução:</strong> A Experiência é utilizada para subir o nível dos atributos. O Exp. é obtido ao realizar treinamentos e outras atividades como missões. Definindo desde já, ao subir o nível de algum atributo, o Exp. zera.
                        </div>
                    </div>

                    <!-- PONTOS DE RANK -->
                    <div style="padding: 1.5rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 4px solid #00ccff; border-radius: 4px; box-shadow: 0 0 15px rgba(0,204,255,0.05);">
                        <h4 style="color: #00ccff; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; margin-bottom: 0.8rem;">
                            PONTOS DE RANK ( PR )
                        </h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">
                            Os <strong>Pontos de Rank</strong> (<em>PR</em>) são a principal forma de subir de rank no RPG. Você pode obtê-los por meio de algumas atividades existentes no RPG, além das missões narradas que são basicamente a melhor maneira de conseguir PR devido à alta quantidade garantida, embora seja variável e dependa do desempenho do jogador de acordo com seus <strong>Atos de Classe</strong>.
                        </p>
                        <div style="margin-top: 1rem; padding: 0.8rem 1rem; background: rgba(0,204,255,0.06); border: 1px solid rgba(0,204,255,0.3); border-radius: 3px; font-size: 0.88rem; color: var(--text-main);">
                            🛡️ <strong>Atos de Classe:</strong> É um método de avaliação do qual a administração leva em consideração quando se deve ceder Pontos de Rank, e refere-se à quantidade de ações que são características da respectiva classe do personagem (<em>Herói, Vilão, Anti-Herói</em>).
                        </div>
                    </div>

                    <!-- GEAR POINTS -->
                    <div style="padding: 1.5rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 4px solid var(--neon-red); border-radius: 4px; box-shadow: 0 0 15px rgba(255,0,60,0.05);">
                        <h4 style="color: var(--neon-red); font-size: 1.2rem; display: flex; align-items: center; gap: 10px; margin-bottom: 0.8rem;">
                            ⚙️ GEAR POINTS ( GP // ⚙️ )
                        </h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">
                            Os <strong>Gear Points</strong> (<em>GP // ⚙️</em>) são a moeda de troca para evolução exclusivamente de itens como equipamentos, trajes e utilitários. Com GP é possível criar, melhorar, reparar e acessar outras funcionalidades referentes aos itens de suporte aos personagens, sejam eles Heróis, Vilões ou Anti-Heróis.
                        </p>
                    </div>
                </div>
            </div>

            <!-- MODAL DE RECOMPENSA DE NÍVEL -->
            <div id="level-modal" class="level-modal-overlay" onclick="closeLevelModal(event)">
                <div class="level-modal-card" onclick="event.stopPropagation()">
                    <div class="level-modal-header">
                        <h3 id="modal-level-title">NÍVEL I</h3>
                        <button class="level-modal-close" onclick="closeLevelModal()">&times;</button>
                    </div>
                    
                    <div class="level-modal-source">
                        ✨ <strong>Origem da Recompensa:</strong> Atributo <em>Poder / Especialidade</em>
                    </div>

                    <div class="level-modal-reward-box">
                        <div class="reward-title">🎁 Recompensa Liberada:</div>
                        <div id="modal-level-reward" style="color: var(--text-main); font-size: 1rem; font-weight: bold;">
                            1 EQUIPAMENTO + 1 TRAJE
                        </div>
                    </div>

                    <div class="level-modal-combos">
                        <strong style="color: var(--neon-red); display: block; margin-bottom: 0.3rem;">🔄 Combos Possíveis:</strong>
                        <div id="modal-level-combos" style="background: rgba(0,0,0,0.3); padding: 0.8rem; border: 1px dashed var(--support-crimson); border-radius: 4px; font-family: monospace; font-size: 0.85em; color: var(--text-main);">
                            [ 1 par / 1 unidade de equip. ]
                        </div>
                    </div>
                </div>
            </div>

            <!-- SUB-ABA 4: RANKING -->
            <div id="subtab-ranking" class="content-section" style="display: none; line-height: 1.6; text-align: justify;">
                <!-- INTRODUÇÃO -->
                <div style="
                    background: #000;
                    border: 2px solid var(--neon-red);
                    border-radius: 6px;
                    padding: 1.6rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 0 28px rgba(255,0,60,0.12), inset 0 0 40px rgba(0,0,0,0.7);
                ">
                    <p style="color: var(--text-muted); font-size: 0.93rem; line-height: 1.8; margin-bottom: 1.2rem;">
                        Feito com o intuito de dar metas e objetivos para os jogadores de uma maneira simples e direta, os ranks de classe são intitulados de forma crescente e suas nomenclaturas dependem da classe escolhida pelo jogador, sendo as classes:
                        <strong style="color:#fff;">Herói</strong>, <strong style="color:#fff;">Vilão</strong> e <strong style="color:#fff;">Anti-Herói</strong>.
                    </p>
                    <div style="border-left: 3px solid var(--neon-red); padding-left: 1rem; margin-bottom: 1rem;">
                        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.7;">
                            <strong style="color:#fff;">• Scaling de Rank:</strong><br>
                            Todas as classes possuem uma evolução equivalente, padronizada por quantidade de <strong style="color: var(--neon-red);">Pontos de Rank (PR)</strong>, obtidos para subir o ranking do personagem. Os Pontos de Rank representados por "PR" têm a única função de definir o quão distante ou próximo o personagem está de alcançar o próximo rank.
                        </p>
                    </div>
                    <div style="padding: 0.9rem 1rem; background: rgba(255,0,60,0.06); border: 1px solid var(--neon-red); border-radius: 4px; font-size: 0.87rem; color: var(--text-muted); margin-bottom: 1rem;">
                        <strong style="color: var(--neon-red);">❗</strong> Assim como o Exp., os P.R podem ser acumulados e consequentemente a contagem é continuada da última quantidade existente, tornando mais fácil subir o rank.
                    </div>
                    <div style="padding: 1.2rem; background: rgba(10,10,10,0.8); border: 1px solid #444; border-radius: 4px; font-size: 0.9rem; color: var(--text-main); margin-bottom: 1rem;">
                        <h4 class="neon-text" style="margin-bottom: 0.8rem; font-size: 1rem;">[ Como Obter PR ⟩⟩ ]</h4>
                        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px;">
                            <li><strong style="color: var(--neon-red);">Missões Auto Narradas:</strong> 10-15 PR</li>
                            <li><strong style="color: var(--neon-red);">Missões Secundárias (narradas):</strong> 30–60 PR</li>
                            <li><strong style="color: var(--neon-red);">Missões Principais (narradas):</strong> 70–120 PR</li>
                            <li><strong style="color: var(--neon-red);">Eventos:</strong> 50–200 PR</li>
                            <li><strong style="color: var(--neon-red);">Feitos Narrativos:</strong> À critério da avaliação da administração, baseando-se na interpretação e aprofundamento do personagem.</li>
                        </ul>
                    </div>
                    <div style="border-left: 3px solid var(--neon-red); padding-left: 1rem; margin-bottom: 1rem;">
                        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.7;">
                            <strong style="color:#fff;">• Rank das Classes e Diferenças:</strong><br>
                            Todas as classes possuem um número padrão de ranks e cada um possui o mesmo padrão de scaling independentemente da classe (Herói, Vilão ou Anti-Herói), o que torna o scaling justo.
                        </p>
                    </div>
                    <div style="padding: 0.9rem 1rem; background: rgba(255,0,60,0.06); border: 1px solid var(--neon-red); border-radius: 4px; font-size: 0.87rem; color: var(--text-muted);">
                        <strong style="color:#fff;">• Último Rank:</strong> Ao alcançar o último rank (💎 Diamante), todos os Pontos de Rank que você possuir podem ser transformados em <strong style="color: var(--neon-red);">Dinheiro ($)</strong>, à sua escolha.
                    </div>
                </div>

                <!-- GRADE DE RANQUES -->
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    ${RANK_DATA.map(r => `
                        <div style="
                            background: #000;
                            border: 1px solid ${r.cor}55;
                            border-left: 5px solid ${r.cor};
                            border-radius: 5px;
                            padding: 1.2rem 1.4rem;
                            box-shadow: 0 0 12px ${r.cor}22;
                            transition: box-shadow 0.3s;
                        ">
                            <!-- Header do rank -->
                            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 0.8rem;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="font-size: 1.6rem;">${r.emoji}</span>
                                    <div>
                                        <div style="font-family: 'Orbitron', monospace; font-weight: 900; font-size: 1.05rem; color: ${r.cor}; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 0 10px ${r.cor}88;">
                                            ${r.pedra}
                                        </div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">
                                            Herói ${r.pedra} &nbsp;|&nbsp; Vilão ${r.pedra} &nbsp;|&nbsp; Vigilante ${r.pedra}
                                        </div>
                                    </div>
                                </div>
                                <div style="
                                    background: #0a0a0a;
                                    border: 1px solid ${r.cor}66;
                                    border-radius: 4px;
                                    padding: 0.4rem 0.9rem;
                                    font-family: monospace;
                                    font-size: 0.85rem;
                                    color: ${r.cor};
                                    white-space: nowrap;
                                ">
                                    ${r.pr === 0 ? '00 // Rank Inicial' : '00 // ' + r.pr.toLocaleString('pt-BR')} PR
                                </div>
                            </div>
                            <!-- Recompensas -->
                            <div>
                                <span style="font-size: 0.75rem; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase;">— Recompensas —</span>
                                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                                    ${r.recompensas.map(rec => `
                                        <span style="
                                            padding: 0.3rem 0.8rem;
                                            background: ${r.cor}11;
                                            border: 1px solid ${r.cor}44;
                                            border-radius: 3px;
                                            font-size: 0.8rem;
                                            color: #fff;
                                            font-family: monospace;
                                        ">[ ${rec} ]</span>
                                    `).join('')}
                                </div>
                            </div>
                            <!-- Narrativa -->
                            <div style="margin-top: 1.2rem; padding: 1rem; background: rgba(0,0,0,0.4); border-left: 3px solid ${r.cor}; border-radius: 4px; font-size: 0.85rem; color: #ccc; font-style: italic; line-height: 1.6;">
                                "${r.narrativa}"
                            </div>
                            ${r.ultimo ? `
                                <div style="margin-top: 1rem; padding: 0.8rem; background: rgba(185,242,255,0.05); border: 1px solid #b9f2ff44; border-radius: 4px; font-size: 0.82rem; color: #b9f2ff; font-style: italic;">
                                    💎 Rank máximo atingido! Seus P.R. excedentes podem ser convertidos em $ a qualquer momento.
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `
    },
    poderes: {
        title: "Poderes Usados",
        render: () => `
            <div class="page-container">
                <h1 class="page-title neon-text">Poderes Usados</h1>

                <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 2rem;">
                    Registro dos Meta-Humanos conhecidos e a descrição técnica de suas habilidades.
                    Esta aba também contém a lista de <strong style="color: var(--neon-red);">Poderes Proibidos</strong>,
                    consultada automaticamente pelo sistema durante a aprovação de fichas.
                </p>

                <!-- ════ PODERES BANIDOS ════ -->
                <div style="
                    margin-bottom: 2.5rem;
                    background: #000;
                    border: 2px solid var(--neon-red);
                    border-radius: 6px;
                    padding: 1.8rem;
                    box-shadow: 0 0 30px rgba(255,0,60,0.12), inset 0 0 40px rgba(0,0,0,0.6);
                ">
                    <!-- Header -->
                    <div style="display:flex; align-items:center; gap:12px; margin-bottom:0.6rem;">
                        <span style="font-size:1.6rem;">&#x26D4;</span>
                        <h2 style="
                            font-family:'Orbitron',sans-serif;
                            font-size:1.4rem;
                            font-weight:900;
                            letter-spacing:3px;
                            color:#fff;
                            text-shadow: 0 0 8px var(--neon-red), 0 0 20px var(--neon-red);
                            text-transform:uppercase;
                            margin:0;
                        ">PODERES PROIBIDOS</h2>
                    </div>

                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.4rem; line-height:1.7; border-left: 3px solid var(--neon-red); padding-left: 0.8rem;">
                        Os poderes listados abaixo são <strong style="color:#fff;">absolutamente proibidos</strong> no universo Awakening RPG.
                        O sistema verifica esta lista <strong style="color:var(--neon-red);">automaticamente e de forma rígida</strong> ao analisar fichas.
                        Qualquer submissão contendo estes poderes — ou variações que os simulem — será
                        <span style="color:var(--neon-red);font-weight:bold;">bloqueada imediatamente</span>, sem possibilidade de revisão.
                        A lista também é cruzada com os <strong style="color:#fff;">níveis de poder</strong>: mesmo poderes não listados podem
                        ser recusados se o nível do personagem não suportar o impacto descrito.
                    </p>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 0.7rem;">
                        ${ BANNED_POWERS.map((power, i) => `
                            <div style="
                                display: flex; align-items: flex-start; gap: 10px;
                                padding: 0.75rem 1rem;
                                background: #0a0a0a;
                                border: 1px solid rgba(255,0,60,0.45);
                                border-left: 4px solid var(--neon-red);
                                border-radius: 3px;
                                transition: all 0.2s;
                            ">
                                <span style="color: var(--neon-red); font-size: 0.75rem; font-family:monospace; font-weight:bold; flex-shrink:0; opacity:0.6; padding-top:2px;">${String(i+1).padStart(2,'0')}</span>
                                <span style="color: #fff; font-size: 0.85rem; line-height:1.5; font-family:'Orbitron',sans-serif; letter-spacing:0.3px;">${power}</span>
                            </div>
                        `).join('') }
                    </div>

                    <div style="margin-top: 1.4rem; padding: 1rem 1.2rem; background: rgba(255,0,60,0.06); border: 1px solid rgba(255,0,60,0.25); border-radius: 4px; font-size: 0.82rem; color: var(--text-muted); line-height: 1.7;">
                        &#x2757; <em>Esta lista pode ser expandida pela administração a qualquer momento. Poderes similares, variações ou descrições que contornem as proibições também serão recusados. O sistema cruza a descrição do poder com os níveis de atributo: um poder de impacto extremo descrito por um personagem de nível baixo será automaticamente sinalizado como Overpowered. A decisão final é sempre da administração.</em>
                    </div>
                </div>

                <!-- ════ REGISTRO DE META-HUMANOS ════ -->
                <div>
                    <h2 class="neon-text" style="font-size: 1.4rem; margin-bottom: 1rem;">&#x1F4CB; REGISTRO DE META-HUMANOS</h2>
                    <div style="padding: 1.5rem; background: #000; border: 1px solid var(--support-crimson); border-radius: 4px; color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; text-align: center;">
                        <span style="font-size: 2rem; display: block; margin-bottom: 0.8rem;">&#x1F5C2;</span>
                        <p>Nenhum registro disponível ainda. Os Mestres podem adicionar Meta-Humanos conhecidos e suas habilidades aqui.</p>
                    </div>
                </div>
            </div>
        `
    },
    treinamentos: {
        title: "Treinamentos",
        render: () => `
            <div class="page-container">
                <h1 class="page-title neon-text">Treinamentos</h1>

                <!-- INTRODUÇÃO / EXPLICAÇÃO PRINCIPAL -->
                <div style="
                    background: #000;
                    border: 2px solid var(--neon-red);
                    border-radius: 6px;
                    padding: 1.6rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 0 25px rgba(255, 0, 60, 0.15), inset 0 0 30px rgba(0, 0, 0, 0.6);
                ">
                    <h3 style="
                        color: #fff;
                        font-family: 'Orbitron', sans-serif;
                        font-size: 1.1rem;
                        letter-spacing: 2px;
                        margin-bottom: 0.8rem;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <span style="color: var(--neon-red); font-weight: bold;">[ TREINAMENTO ⟩⟩ ]</span>
                    </h3>
                    <p style="
                        color: var(--text-muted);
                        line-height: 1.8;
                        font-size: 0.92rem;
                        text-align: justify;
                    ">
                        O treinamento é uma forma prática e versátil de evolução do personagem, cujo tem o intuito de melhorar e aprimorar suas capacidades, além de expandir seus limites. No Awakening of Power-RPG o treinamento funciona de duas formas, sendo elas o <strong style="color: #fff;">Treinamento Solo</strong>, onde o jogador deve realizar sozinho e o <strong style="color: #fff;">Treinamento Duo+</strong>, que deve ser realizado em dupla ou até quarteto. Em ambos os casos o jogador receberá <strong style="color: var(--neon-red);">Exp.</strong> como recompensa. À seguir as explicações dos dois modos:
                    </p>
                </div>

                <!-- BOTÕES DAS SUB-ABAS DE TREINO -->
                <div class="tabs-container" style="border-bottom: 1px solid var(--support-crimson); margin-bottom: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button id="tab-btn-treino-solo" class="sub-tab-btn active" onclick="switchTreinoTab('solo')">🎯 Treino Solo</button>
                    <button id="tab-btn-treino-duo" class="sub-tab-btn" onclick="switchTreinoTab('duo')">👥 Treino Duo+</button>
                </div>

                <!-- SUB-ABA 1: TREINO SOLO -->
                <div id="subtab-treino-solo" class="content-section" style="line-height: 1.6;">
                    <div style="background: #000; border: 1px solid var(--support-crimson); border-left: 4px solid var(--neon-red); border-radius: 4px; padding: 1.4rem; margin-bottom: 1.5rem;">
                        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; font-style: italic; margin-bottom: 1.2rem;">
                            — Para o treinamento individual, interprete o seu esforço da maneira que achar mais adequado, desde que essa maneira seja condizente com o resultado esperado, isso é, se você deseja receber Exp. para seu atributo de velocidade, você precisa fazer algo relacionado a isso, como uma corrida livre ou na esteira por exemplo. Suas recompensas irão variar de acordo com o número de palavras em sua cena de treinamento, como descrito abaixo:
                        </p>

                        <!-- METAS DE PALAVRAS E EXP -->
                        <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem;">
                            <div style="padding: 0.9rem 1.2rem; background: #080808; border: 1px solid rgba(255,0,60,0.3); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                                <span style="color: #fff; font-weight: bold; font-family: 'Orbitron', monospace;">📝 150 palavras ⟩⟩</span>
                                <span class="carmine-text" style="font-weight: bold; font-family: monospace; font-size: 1.15rem; letter-spacing: 1px;">[ 100 exp. ]</span>
                            </div>
                            <div style="padding: 0.9rem 1.2rem; background: #080808; border: 1px solid rgba(255,0,60,0.3); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                                <span style="color: #fff; font-weight: bold; font-family: 'Orbitron', monospace;">📝 200 palavras ⟩⟩</span>
                                <span class="carmine-text" style="font-weight: bold; font-family: monospace; font-size: 1.15rem; letter-spacing: 1px;">[ 250 exp. ]</span>
                            </div>
                            <div style="padding: 0.9rem 1.2rem; background: #080808; border: 1px solid rgba(255,0,60,0.3); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                                <span style="color: #fff; font-weight: bold; font-family: 'Orbitron', monospace;">📝 400 palavras ⟩⟩</span>
                                <span class="carmine-text" style="font-weight: bold; font-family: monospace; font-size: 1.15rem; letter-spacing: 1px;">[ 500 exp. ]</span>
                            </div>
                        </div>

                        <!-- REGRAS E AVISOS SOLO -->
                        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                            <div style="padding: 1rem; background: rgba(255,0,60,0.06); border: 1px solid var(--neon-red); border-radius: 4px; color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                                <strong style="color: var(--neon-red);">[ ❗ ]</strong> Neste modo, você pode treinar e receber exp. por no máximo <strong>2 Atributos diferentes</strong> ou apenas 1 se desejar, mas se optar por receber exp. por 2 atributos, você só poderá enviar 1 treino no dia (exceto duo).
                            </div>
                            <div style="padding: 1rem; background: rgba(255,0,60,0.06); border: 1px solid var(--neon-red); border-radius: 4px; color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                                <strong style="color: var(--neon-red);">[ ❗ ]</strong> O modo Solo pode ser feito até <strong>3× por semana</strong>!
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SUB-ABA 2: TREINO DUO+ -->
                <div id="subtab-treino-duo" class="content-section" style="display: none; line-height: 1.6;">
                    <div style="background: #000; border: 1px solid var(--support-crimson); border-left: 4px solid var(--neon-red); border-radius: 4px; padding: 1.4rem; margin-bottom: 1.5rem;">
                        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; font-style: italic; margin-bottom: 1.2rem;">
                            — Como já foi dito, o modo Duo pode conter até mais de dois jogadores durante o treinamento, isso pois a forma a qual ele é avaliado e validado é diferente do modo solo, tendo uma contagem de cenas que deve atingir uma meta pré estabelecida para que seja confirmado o fim do treinamento, e essa meta deve ser alcançada por todos os integrantes do treinamento. O treino em si, pode abrigar muitos métodos de procedimento, indo desde uma corrida competitiva até um combate ou até mesmo uma tutoria! Um outro detalhe importante é quê: Quanto mais pessoas estiverem envolvidas no treinamento, maior a recompensa, sendo o máximo de pessoas <strong>4 integrantes</strong>. Abaixo estão as metas de cenas e suas recompensas:
                        </p>

                        <!-- METAS DE CENAS E RECOMPENSAS -->
                        <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem;">
                            <div style="padding: 0.9rem 1.2rem; background: #080808; border: 1px solid rgba(255,0,60,0.3); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                                <span style="color: #fff; font-weight: bold; font-family: 'Orbitron', monospace;">🎬 4/4 cenas ⟩⟩</span>
                                <span class="carmine-text" style="font-weight: bold; font-family: monospace; font-size: 1.15rem; letter-spacing: 1px;">[ 150 exp. ]</span>
                            </div>
                            <div style="padding: 0.9rem 1.2rem; background: #080808; border: 1px solid rgba(255,0,60,0.3); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                                <span style="color: #fff; font-weight: bold; font-family: 'Orbitron', monospace;">🎬 6/6 cenas ⟩⟩</span>
                                <span class="carmine-text" style="font-weight: bold; font-family: monospace; font-size: 1.15rem; letter-spacing: 1px;">[ 300 exp. ]</span>
                            </div>
                            <div style="padding: 0.9rem 1.2rem; background: #080808; border: 1px solid rgba(255,0,60,0.3); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                                <span style="color: #fff; font-weight: bold; font-family: 'Orbitron', monospace;">🎬 8/8 cenas ⟩⟩</span>
                                <span class="carmine-text" style="font-weight: bold; font-family: monospace; font-size: 1.15rem; letter-spacing: 1px;">[ 600 exp. ]</span>
                            </div>
                        </div>

                        <!-- MULTIPLICADOR -->
                        <div style="padding: 1.2rem; background: rgba(0,0,0,0.8); border: 1px solid var(--neon-red); border-radius: 4px; margin-bottom: 1.5rem;">
                            <h4 style="color: var(--neon-red); font-family: 'Orbitron', monospace; font-size: 0.95rem; margin-bottom: 0.8rem; letter-spacing: 1px;">
                                ⚡ MULTIPLICADOR ⟩⟩
                            </h4>
                            <div style="display: flex; flex-direction: column; gap: 0.4rem; color: var(--text-main); font-family: monospace; font-size: 0.9rem; padding-left: 0.5rem;">
                                <span>— 2 Jogadores = <strong>1×</strong></span>
                                <span>— 3 Jogadores = <strong>1.5×</strong></span>
                                <span>— 4 Jogadores = <strong>2×</strong></span>
                            </div>
                        </div>

                        <!-- REGRAS E AVISOS DUO -->
                        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                            <div style="padding: 1rem; background: rgba(255,0,60,0.06); border: 1px solid var(--neon-red); border-radius: 4px; color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                                <strong style="color: var(--neon-red);">[ ❗ ]</strong> Diferentemente do modo solo, o modo Duo+ só pode ser realizado <strong>1× por semana</strong>! Mas se necessário, você pode fazê-lo para ajudar alguém a receber as recompensas da semana, mesmo que você, se já tiver feito, não vá receber.
                            </div>
                            <div style="padding: 1rem; background: rgba(255,0,60,0.06); border: 1px solid var(--neon-red); border-radius: 4px; color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                                <strong style="color: var(--neon-red);">[ ❗ ]</strong> Neste modo, todos os atributos físicos recebem a mesma quantidade em Exp. e a sua individualidade também receberá!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    personagens: {
        title: "Personagens e NPCs",
        render: () => {
            const npcs = getNpcs().filter(n => n.visivel);
            return `
                <div class="page-container">
                    <h1 class="page-title neon-text">Personagens e NPCs de Unicity</h1>
                    <p style="color: var(--text-muted); margin-bottom: 2rem; line-height: 1.6;">
                        Registros e informações públicas sobre as figuras mais influentes, ameaças conhecidas e NPCs de Unicity.
                    </p>

                    ${npcs.length === 0 ? `
                        <div style="padding: 2.5rem; background: #000; border: 1px solid var(--support-crimson); border-radius: 6px; text-align: center; color: var(--text-muted);">
                            <span style="font-size: 2rem; display: block; margin-bottom: 0.8rem;">🎭</span>
                            Nenhum NPC público registrado no momento.
                        </div>
                    ` : `
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                            ${npcs.map(npc => `
                                <div style="background: #000; border: 1px solid var(--support-crimson); border-left: 4px solid var(--neon-red); border-radius: 6px; padding: 1.4rem; box-shadow: 0 0 15px rgba(0,0,0,0.6);">
                                    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                                        <div style="width: 70px; height: 70px; border-radius: 6px; border: 2px solid var(--neon-red); overflow: hidden; background: #111; flex-shrink: 0;">
                                            <img src="${npc.foto || 'https://via.placeholder.com/150/111111/FF003C?text=NPC'}" style="width:100%; height:100%; object-fit:cover;">
                                        </div>
                                        <div>
                                            <h3 style="color: #fff; font-family: 'Orbitron', sans-serif; font-size: 1.1rem; margin: 0 0 4px 0;">${npc.nome}</h3>
                                            <span style="color: var(--neon-red); font-size: 0.8rem; font-weight: bold; font-family: monospace; display: block;">${npc.ranque || 'N/A'} (${npc.classe})</span>
                                        </div>
                                    </div>
                                    <div style="font-size: 0.85rem; color: var(--text-muted); display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: rgba(255,255,255,0.02); padding: 0.8rem; border-radius: 4px; margin-bottom: 1rem;">
                                        <span><strong>Força:</strong> Nv. ${npc.forca || 1}</span>
                                        <span><strong>Resistência:</strong> Nv. ${npc.resistencia || 1}</span>
                                        <span><strong>Velocidade:</strong> Nv. ${npc.velocidade || 1}</span>
                                        <span><strong>Agilidade:</strong> Nv. ${npc.agilidade || 1}</span>
                                        <span style="grid-column: span 2;"><strong>Poder/Espec:</strong> Nv. ${npc.poderLevel || 1} (${npc.nomePoder || 'N/A'})</span>
                                    </div>
                                    ${npc.boatos ? `
                                        <div style="background: rgba(255,0,60,0.06); border: 1px solid rgba(255,0,60,0.3); border-radius: 4px; padding: 0.8rem 1rem; font-size: 0.85rem; color: var(--text-main); line-height: 1.6;">
                                            <strong style="color: var(--neon-red); display: block; margin-bottom: 4px;">💬 BOATOS & INFORMAÇÕES:</strong>
                                            <em>"${npc.boatos}"</em>
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
            `;
        }
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

    // Se a página tem render() próprio, usa ele; senão usa o placeholder padrão
    if (typeof pageData.render === 'function') {
        contentArea.innerHTML = pageData.render();
    } else {
        contentArea.innerHTML = `
            <div class="page-container">
                <h1 class="page-title neon-text">${pageData.title}</h1>
                <div class="placeholder-card">
                    ${pageData.content}
                </div>
            </div>
        `;
    }

    if (pageId === 'perfil') {
        renderPerfil();
    }

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

// Alterna sub-abas (Atributos / Equipamentos / Pontuações / Ranking)
function switchSubTab(subTabId) {
    const atributosSec    = document.getElementById('subtab-atributos');
    const equipamentosSec = document.getElementById('subtab-equipamentos');
    const pontuacoesSec   = document.getElementById('subtab-pontuacoes');
    const rankingSec      = document.getElementById('subtab-ranking');

    const btnAtributos    = document.getElementById('tab-btn-atributos');
    const btnEquipamentos = document.getElementById('tab-btn-equipamentos');
    const btnPontuacoes   = document.getElementById('tab-btn-pontuacoes');
    const btnRanking      = document.getElementById('tab-btn-ranking');

    if (!atributosSec || !equipamentosSec || !pontuacoesSec) return;

    // Reset visibilidade
    atributosSec.style.display    = 'none';
    equipamentosSec.style.display = 'none';
    pontuacoesSec.style.display   = 'none';
    if (rankingSec) rankingSec.style.display = 'none';

    btnAtributos.classList.remove('active');
    btnEquipamentos.classList.remove('active');
    btnPontuacoes.classList.remove('active');
    if (btnRanking) btnRanking.classList.remove('active');

    if (subTabId === 'atributos') {
        atributosSec.style.display = 'block';
        btnAtributos.classList.add('active');
    } else if (subTabId === 'equipamentos') {
        equipamentosSec.style.display = 'block';
        btnEquipamentos.classList.add('active');
    } else if (subTabId === 'pontuacoes') {
        pontuacoesSec.style.display = 'block';
        btnPontuacoes.classList.add('active');
    } else if (subTabId === 'ranking' && rankingSec && btnRanking) {
        rankingSec.style.display = 'block';
        btnRanking.classList.add('active');
    }
}

// Alterna sub-abas da tela de Treinamentos (Treino Solo / Treino Duo+)
function switchTreinoTab(treinoType) {
    const soloSec = document.getElementById('subtab-treino-solo');
    const duoSec = document.getElementById('subtab-treino-duo');

    const btnSolo = document.getElementById('tab-btn-treino-solo');
    const btnDuo = document.getElementById('tab-btn-treino-duo');

    if (!soloSec || !duoSec || !btnSolo || !btnDuo) return;

    if (treinoType === 'solo') {
        soloSec.style.display = 'block';
        duoSec.style.display = 'none';
        btnSolo.classList.add('active');
        btnDuo.classList.remove('active');
    } else if (treinoType === 'duo') {
        soloSec.style.display = 'none';
        duoSec.style.display = 'block';
        btnSolo.classList.remove('active');
        btnDuo.classList.add('active');
    }
}

// Dados das Recompensas de Nível (Vêm do atributo Poder / Especialidade)
const levelRewardsData = {
    1: {
        title: "NÍVEL I",
        reward: "1 EQUIPAMENTO + 1 TRAJE",
        combos: "[ 1 par / 1 unidade de equip. ]"
    },
    2: {
        title: "NÍVEL II",
        reward: "2 EQUIPAMENTOS",
        combos: "[ 1 par + 1 unidade / 2 unidades ]"
    },
    3: {
        title: "NÍVEL III",
        reward: "3 EQUIPAMENTOS + 1 TRAJE",
        combos: "[ 2 pares + 1 unidade / 2 unidades + 1 par ]"
    },
    4: {
        title: "NÍVEL IV",
        reward: "4 EQUIPAMENTOS",
        combos: "[ 2 pares + 2 unidades / 3 pares + 1 unidade / 3 unidades + 1 par ]"
    },
    5: {
        title: "NÍVEL V",
        reward: "5 EQUIPAMENTOS + 1 TRAJE",
        combos: "[ 2 pares + 3 unidades / 3 pares + unidades ]"
    },
    6: {
        title: "NÍVEL VI",
        reward: "6 EQUIPAMENTOS",
        combos: "[ 3 pares é o máximo de pares que se pode ter, nesse caso, no último nível, você pode ter 3 unidades de equipamentos e 3 pares ]"
    }
};

// Abre modal com recompensa do Nível
function openLevelModal(levelNum) {
    const modal = document.getElementById('level-modal');
    const data = levelRewardsData[levelNum];

    if (!modal || !data) return;

    document.getElementById('modal-level-title').innerText = data.title;
    document.getElementById('modal-level-reward').innerText = data.reward;
    document.getElementById('modal-level-combos').innerText = data.combos;

    modal.classList.add('active');
}

// Fecha modal
function closeLevelModal(event) {
    const modal = document.getElementById('level-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Dados detalhados dos Bairros de Unicity (Lore & Pontos de Interesse)
const bairrosData = {
    'delly': {
        color: '🟥',
        name: 'Delly',
        quote: '"O distrito do poder / O coração financeiro de Unicity."',
        region: 'Alta Unicity (Noroeste)',
        description: 'Delly é o bairro mais antigo e influente de Unicity, sendo considerado o verdadeiro centro financeiro, político e empresarial da cidade. A maioria dos arranha-céus que compõem o horizonte de Unicity está concentrada aqui, formando uma paisagem dominada por vidro, aço e iluminação constante. É onde grandes empresários, políticos, magistrados e investidores vivem ou trabalham.<br><br>A sede mundial da WinTech fica localizada em Delly, ocupando um complexo inteiro de torres, centros de pesquisa pública, museu tecnológico e laboratórios subterrâneos sigilosos.',
        security: 'Extremamente Alta',
        securityDesc: 'O patrulhamento é intenso, com vigilância por câmeras em praticamente todas as ruas e resposta imediata das autoridades. Crimes violentos são raríssimos, embora crimes financeiros e conspirações corporativas ocorram nos bastidores.',
        points: [
            'Distrito Financeiro Morgan',
            'Torre WinTech (Sede Mundial)',
            'Bolsa de Valores de Unicity',
            'Parlamento Estadual',
            'Tribunal Superior de Unicity',
            'Museu da Fundação de Unicity',
            'Praça dos Fundadores',
            'Hotel Imperial Aurora',
            'Hospital Saint Helena'
        ]
    },
    'amberling': {
        color: '🟨',
        name: 'Amberling',
        quote: '"O conhecimento molda o futuro / O centro intelectual da cidade."',
        region: 'Alta Unicity (Centro-Norte)',
        description: 'Amberling é o grande centro acadêmico e cultural de Unicity. Planejado para concentrar universidades, centros de pesquisa e instituições de ensino, atraindo estudantes e pesquisadores de diversas partes do mundo. Suas ruas misturam edifícios de arquitetura clássica com laboratórios modernos, bibliotecas monumentais e parques.<br><br>Em uma área mais afastada está o campus do Instituto Éksodos, construído sobre uma extensa propriedade com dormitórios, hospital próprio, arenas de treinamento e segurança avançada.',
        security: 'Muito Alta',
        securityDesc: 'A circulação constante de estudantes, pesquisadores e funcionários públicos garante vigilância contínua. Furtos menores ocorrem em áreas comerciais, mas crimes graves são raros.',
        points: [
            'Instituto Éksodos (Campus Principal)',
            'Universidade Estadual de Unicity',
            'Biblioteca Central',
            'Jardim Botânico',
            'Museu de Ciências Naturais',
            'Centro Cultural Internacional',
            'Teatro Municipal',
            'Planetário',
            'Parque Memorial Heaven\'s Fall'
        ]
    },
    'sammill': {
        color: '🟦',
        name: 'Sammill',
        quote: '"Onde a cidade respira / Tradição encontra modernidade."',
        region: 'Alta Unicity (Sudoeste)',
        description: 'Sammill nasceu como um distrito industrial e foi revitalizado para se tornar uma agradável região residencial de classe média. Galpões antigos reformados abrigam cafés, galerias, estúdios e startups. Possui menos arranha-céus e mais casas, edifícios médios, parques e um porto interno.',
        security: 'Alta',
        securityDesc: 'Considerado um dos melhores bairros para morar, com baixos índices de criminalidade e boa presença policial. Pequenos grupos criminosos atuam esporadicamente perto das zonas industriais desativadas.',
        points: [
            'Parque Sammill',
            'Estádio Municipal',
            'Mercado Público',
            'Porto Antigo',
            'Aquário de Unicity',
            'Estação Central do Metrô'
        ]
    },
    'dawn-hill': {
        color: '🟩',
        name: 'Dawn Hill',
        quote: '"A natureza domina a paisagem / O bairro verde."',
        region: 'Baixa Unicity (Norte)',
        description: 'Ocupa a porção norte da Baixa Unicity com baixa densidade urbana e foco na preservação ambiental, reservas, colinas e lagos. Abriga condomínios fechados de alto padrão e centros de pesquisa ecológica desenvolvidos após o Heaven\'s Fall.',
        security: 'Muito Alta',
        securityDesc: 'Um dos bairros mais tranquilos e seguros de Unicity, com forte vigilância privada e comunitária.',
        points: [
            'Parque Nacional Dawn',
            'Lago Crystal',
            'Observatório Astronômico',
            'Usina Solar Municipal',
            'Centro de Pesquisas Ambientais'
        ]
    },
    'central-sunset': {
        color: '🟧',
        name: 'Central Sunset',
        quote: '"O coração pulsante / O verdadeiro centro de Unicity."',
        region: 'Baixa Unicity (Centro-Sul)',
        description: 'Bairro mais movimentado da cidade onde as pontes Dawn Bridge e Sunset Bridge desembocam. Concentra shopping centers, hotéis, cassinos, arena principal e transporte central. É a sede das Indústrias Gasai, que mantém um complexo tecnológico integrado e aberto ao público.',
        security: 'Moderada',
        securityDesc: 'Policiamento constante em avenidas principais, porém o enorme fluxo de pessoas facilita pequenos furtos, golpes e atuação discreta do crime organizado.',
        points: [
            'Gasai Industries (Complexo Tecnológico)',
            'Sunset Plaza',
            'Arena Unicity',
            'Centro de Convenções',
            'Cassino Royal Sunset',
            'Estação Central Ferroviária',
            'Porto Internacional',
            'Centro de Compras Skyline'
        ]
    },
    'vienner': {
        color: '🟪',
        name: 'Vienner',
        quote: '"A cidade nunca dorme."',
        region: 'Baixa Unicity (Arquipélago Sul)',
        description: 'Formado por ilhas e praias interconectadas por pontes menores. Polo de turismo e vida noturna com clubes, cassinos e marinas. Sob o brilho dos holofotes, abriga leilões ilegais, mercado negro e operações clandestinas ligadas ao crime organizado.',
        security: 'Baixa a Moderada',
        securityDesc: 'Patrulhada em áreas turísticas, mas com altos índices de criminalidade nas zonas portuárias e docas, onde vigilantes e meta-humanos entram frequentemente em ação.',
        points: [
            'Cassino Vienner',
            'Marina Internacional',
            'Porto de Cruzeiros',
            'Distrito Noturno',
            'Teatro Oceânico',
            'Farol de Vienner',
            'Mercado do Porto',
            'Ilha Memorial'
        ]
    }
};

// Abre modal com detalhes do Bairro selecionado
function openBairroModal(bairroKey) {
    const modal = document.getElementById('bairro-modal');
    const data = bairrosData[bairroKey];

    if (!modal || !data) return;

    document.getElementById('bairro-modal-color').innerText = data.color;
    document.getElementById('bairro-modal-name').innerText = data.name + ' — ' + data.region;
    document.getElementById('bairro-modal-quote').innerText = data.quote;
    document.getElementById('bairro-modal-description').innerHTML = data.description;
    document.getElementById('bairro-modal-security').innerText = data.security;
    document.getElementById('bairro-modal-security-desc').innerText = data.securityDesc;

    const pointsList = document.getElementById('bairro-modal-points');
    pointsList.innerHTML = data.points.map(pt => `<li>${pt}</li>`).join('');

    modal.classList.add('active');
}

// Fecha modal de Bairros
function closeBairroModal(event) {
    const modal = document.getElementById('bairro-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Dados das Interpretações de Nível dos Atributos (I ao VI)
const attributesLevelsData = {
    'forca': {
        title: '💪 FORÇA — Interpretação de Níveis',
        icon: 'hand-metal',
        levels: [
            { level: 'NV. I', name: 'Humano Comum', val: '105 Kg/F', desc: 'A força corresponde à de uma pessoa saudável sem treinamento específico. É suficiente para levantar, empurrar, carregar e golpear dentro dos limites naturais do corpo humano, dependendo mais da técnica do que da potência bruta.' },
            { level: 'NV. II', name: 'Condicionado', val: '262,5 Kg/F', desc: 'O personagem demonstra preparo físico acima da média. Seus golpes possuem maior impacto, consegue mover cargas mais pesadas e realizar esforços intensos por mais tempo sem perder eficiência rapidamente.' },
            { level: 'NV. III', name: 'Atleta de Elite', val: '525 Kg/F', desc: 'A força alcança o nível de atletas profissionais de modalidades de potência. Arrombar obstáculos simples, impulsionar o próprio corpo com explosões musculares e causar danos significativos tornam-se feitos consistentes.' },
            { level: 'NV. IV', name: 'Sobre-Humano', val: '1.050 Kg/F', desc: 'O personagem rompe os limites naturais da musculatura humana. É capaz de produzir impactos capazes de deformar estruturas resistentes, mover grandes massas e utilizar a própria força como ferramenta de mobilidade.' },
            { level: 'NV. V', name: 'Monstruoso', val: '2.100 Kg/F', desc: 'A força se torna devastadora. Objetos extremamente pesados podem ser manipulados com relativa facilidade, enquanto golpes passam a representar grande ameaça até mesmo contra materiais de alta resistência.' },
            { level: 'NV. VI', name: 'Lendário', val: '4.200 Kg/F', desc: 'A força alcança um patamar extraordinário. Cada movimento possui potencial para alterar significativamente o ambiente ao redor, permitindo feitos físicos considerados impossíveis para qualquer ser humano comum.' }
        ]
    },
    'resistencia': {
        title: '🛡️ RESISTÊNCIA — Interpretação de Níveis',
        icon: 'shield',
        levels: [
            { level: 'NV. I', name: 'Humano Comum', val: '100 Kg', desc: 'O corpo suporta atividades rotineiras e pequenos ferimentos. O cansaço surge naturalmente após esforços prolongados e impactos mais fortes podem incapacitar o personagem.' },
            { level: 'NV. II', name: 'Condicionado', val: '250 Kg', desc: 'A recuperação durante atividades melhora, suportando treinos intensos e impactos moderados com menor perda de desempenho. A fadiga demora mais para aparecer.' },
            { level: 'NV. III', name: 'Atleta de Elite', val: '500 Kg', desc: 'O organismo apresenta grande eficiência física e mental. O personagem permanece funcional durante confrontos longos e suporta lesões que normalmente afastariam uma pessoa comum.' },
            { level: 'NV. IV', name: 'Sobre-Humano', val: '1.000 Kg', desc: 'A resistência supera os limites biológicos naturais. O corpo absorve impactos severos, mantém desempenho elevado sob extrema pressão e continua combatendo mesmo após danos consideráveis.' },
            { level: 'NV. V', name: 'Monstruoso', val: '2.000 Kg', desc: 'Poucos ataques conseguem comprometer seu rendimento rapidamente. A exaustão demora muito a surgir e sua tolerância à dor e ao desgaste é excepcional.' },
            { level: 'NV. VI', name: 'Lendário', val: '4.000 Kg', desc: 'O personagem torna-se uma verdadeira fortaleza. Enfrenta longos períodos de combate, suporta danos extremos e mantém sua capacidade de lutar mesmo sob condições que derrotariam praticamente qualquer outro indivíduo.' }
        ]
    },
    'velocidade': {
        title: '⚡ VELOCIDADE — Interpretação de Níveis',
        icon: 'zap',
        levels: [
            { level: 'NV. I', name: 'Humano Comum', val: '25 km/h', desc: 'Capaz de correr dentro dos padrões naturais de uma pessoa saudável, alcançando boa aceleração apenas em curtas distâncias.' },
            { level: 'NV. II', name: 'Condicionado', val: '40 km/h', desc: 'A aceleração e a velocidade máxima superam a média humana. O personagem percorre distâncias rapidamente e responde melhor durante perseguições ou fugas.' },
            { level: 'NV. III', name: 'Atleta de Elite', val: '60 km/h', desc: 'Seu deslocamento rivaliza com os melhores velocistas do mundo. Arrancadas explosivas e manutenção da velocidade tornam-se grandes vantagens em combate e exploração.' },
            { level: 'NV. IV', name: 'Sobre-Humano', val: '100 km/h', desc: 'A velocidade ultrapassa qualquer capacidade humana conhecida. Grandes distâncias podem ser percorridas em poucos instantes e acompanhar seus movimentos torna-se difícil.' },
            { level: 'NV. V', name: 'Monstruoso', val: '180 km/h', desc: 'O deslocamento é extremamente veloz. O personagem cruza campos de batalha rapidamente, reduz drasticamente o tempo de reação dos adversários e domina confrontos através da mobilidade.' },
            { level: 'NV. VI', name: 'Lendário', val: '320 km/h', desc: 'A velocidade aproxima-se do extraordinário. Seus deslocamentos acontecem em frações de segundo, tornando extremamente difícil prever ou interceptar seus movimentos.' }
        ]
    },
    'agilidade': {
        title: '💨 AGILIDADE — Interpretação de Níveis',
        icon: 'wind',
        levels: [
            { level: 'NV. I', name: 'Humano Comum', val: '7,29 m/s', desc: 'Coordenação motora comum. Consegue esquivar, saltar e reagir dentro das limitações naturais de uma pessoa saudável.' },
            { level: 'NV. II', name: 'Condicionado', val: '11,67 m/s', desc: 'Movimentos mais precisos e rápidos. O personagem troca de direção com facilidade, melhora seus reflexos e executa gestos técnicos com maior eficiência.' },
            { level: 'NV. III', name: 'Atleta de Elite', val: '17,50 m/s', desc: 'A coordenação alcança nível profissional. Esquivas, acrobacias, mudanças bruscas de trajetória e reações rápidas tornam-se naturais.' },
            { level: 'NV. IV', name: 'Sobre-Humano', val: '29,17 m/s', desc: 'Os movimentos passam a desafiar os limites humanos. O personagem reage quase instantaneamente, executando manobras extremamente complexas mesmo sob pressão.' },
            { level: 'NV. V', name: 'Monstruoso', val: '52,50 m/s', desc: 'A agilidade torna-se um diferencial absoluto. O corpo responde com precisão impressionante, permitindo esquivas sucessivas, equilíbrio excepcional e domínio completo dos próprios movimentos.' },
            { level: 'NV. VI', name: 'Lendário', val: '93,33 m/s', desc: 'Cada movimento é executado com perfeição. Reflexos, coordenação e precisão alcançam um nível extraordinário, tornando o personagem extremamente difícil de atingir em combate direto.' }
        ]
    },
    'poder': {
        title: '⭐ PODER / ESPECIALIDADE — Interpretação de Níveis',
        icon: 'star',
        levels: [
            { level: 'NV. I', name: 'Iniciante', val: '', desc: 'O personagem compreende apenas os fundamentos de seu poder ou especialidade. Suas aplicações são simples, exigem concentração e ainda apresentam limitações evidentes.' },
            { level: 'NV. II', name: 'Aprendiz', val: '', desc: 'O domínio evolui para um uso consistente. Novas aplicações tornam-se possíveis e o personagem passa a explorar diferentes formas de utilizar suas capacidades.' },
            { level: 'NV. III', name: 'Experiente', val: '', desc: 'O uso do poder ou especialidade torna-se refinado. Técnicas mais complexas podem ser executadas com segurança, eficiência e maior controle.' },
            { level: 'NV. IV', name: 'Especialista', val: '', desc: 'O personagem domina profundamente sua área. Seu poder ou especialidade apresenta elevada versatilidade, permitindo adaptações rápidas às mais diversas situações.' },
            { level: 'NV. V', name: 'Mestre', val: '', desc: 'A proficiência aproxima-se da excelência absoluta. O personagem explora praticamente todo o potencial conhecido de sua habilidade, combinando técnicas e criando soluções avançadas.' },
            { level: 'NV. VI', name: 'Grão-Mestre', val: '', desc: 'O domínio alcança seu auge. O personagem não apenas utiliza seu poder ou especialidade com perfeição, mas também desenvolve novas aplicações, conceitos e técnicas que representam a evolução máxima de sua própria capacidade.' }
        ]
    }
};

// Abre modal de interpretação dos Níveis de Atributo
function openAttributeModal(attrKey) {
    const modal = document.getElementById('attribute-modal');
    const data = attributesLevelsData[attrKey];

    if (!modal || !data) return;

    document.getElementById('attribute-modal-title').innerText = data.title;
    
    const body = document.getElementById('attribute-modal-body');
    body.innerHTML = data.levels.map(lvl => `
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 4px solid var(--neon-red); border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap;">
                <strong style="color: var(--text-main); font-size: 1.05rem;">
                    ${lvl.level} — <span style="color: var(--neon-red);">${lvl.name}</span>
                </strong>
                ${lvl.val ? `<span class="carmine-text" style="font-family: monospace; font-weight: bold; font-size: 1rem; background: rgba(255,0,60,0.1); padding: 2px 8px; border-radius: 3px; border: 1px solid rgba(255,0,60,0.3);">⟨ ⚡ ${lvl.val} ⟩</span>` : ''}
            </div>
            <p style="color: var(--text-muted); font-size: 0.9em; line-height: 1.5; margin: 0;">${lvl.desc}</p>
        </div>
    `).join('');

    modal.classList.add('active');
}

// Fecha modal de Atributos
function closeAttributeModal(event) {
    const modal = document.getElementById('attribute-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Menu Mobile
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// ══════════════════════════════════════════════════════
//          SISTEMA DE AUTENTICAÇÃO — AWAKENING RPG
// ══════════════════════════════════════════════════════

// Configuração oficial do Firebase
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "awakening-rpg.firebaseapp.com",
  projectId: "awakening-rpg",
  storageBucket: "awakening-rpg.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};

// Inicialização segura do Firebase
let db = null;
try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("🔥 Firebase inicializado com sucesso!");
    }
} catch (e) {
    console.warn("⚠️ Firebase rodando em modo offline / fallback local:", e);
}

// Mestres Supremos (acesso automático como Admin Principal ao se registrar)
const SUPREME_MASTERS = ['DanteSTR', 'ghusAWK'];

// Senha mestre padrão (pode ser alterada)
const MASTER_DEFAULT_PASSWORD = 'AwakeningMaster2025';

// Chaves no localStorage
const KEY_USERS    = 'awrpg_users';
const KEY_SESSION  = 'awrpg_session';

// Retorna lista de usuários do localStorage (e sincroniza com Firebase se disponível)
function getUsers() {
    try { return JSON.parse(localStorage.getItem(KEY_USERS)) || []; }
    catch { return []; }
}

// Salva lista de usuários localmente e envia para a nuvem no Firestore
function saveUsers(users) {
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
    if (db) {
        users.forEach(u => {
            db.collection('users').doc(u.username.toLowerCase()).set(u, { merge: true }).catch(err => {
                console.warn("Erro ao sincronizar com Firestore:", err);
            });
        });
    }
}

// Retorna sessão atual
function getSession() {
    try { return JSON.parse(localStorage.getItem(KEY_SESSION)); }
    catch { return null; }
}

// Salva sessão
function saveSession(data) {
    localStorage.setItem(KEY_SESSION, JSON.stringify(data));
}

// Encerra sessão
function clearSession() {
    localStorage.removeItem(KEY_SESSION);
}

// ── Alternar aba Login / Alistar-se ─────────────────────
function switchAuthTab(tab) {
    const formLogin    = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const tabLogin     = document.getElementById('tab-login');
    const tabRegister  = document.getElementById('tab-register');

    if (tab === 'login') {
        formLogin.style.display    = 'flex';
        formRegister.style.display = 'none';
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        formLogin.style.display    = 'none';
        formRegister.style.display = 'flex';
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
    }
    // Limpa erros
    ['login-error','register-error'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.style.display = 'none'; el.textContent = ''; }
    });
}

// ── Selecionar disponibilidade ─────────────────────────
function selectAvail(btn) {
    document.querySelectorAll('.avail-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('reg-availability').value = btn.dataset.period;
}

// ── Toggle mostrar/ocultar senha ───────────────────────
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    btn.classList.toggle('hidden-mode', !isHidden);
    btn.classList.toggle('reveal-mode', isHidden);
}

// ── Mostrar erro no formulário ─────────────────────────
function showAuthError(elementId, msg) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
}

// ── Entrar no app após login ────────────────────────────
function enterApp(session) {
    saveSession(session);
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-root').style.display    = 'flex';

    // Atualiza info do usuário no sidebar
    const labelEl = document.getElementById('sidebar-user-label');
    const roleEl  = document.getElementById('sidebar-user-role');
    if (labelEl) labelEl.textContent = session.username;
    if (roleEl) {
        if (session.role === 'supreme') roleEl.textContent = '⚔️ MESTRE SUPREMO';
        else if (session.role === 'master') roleEl.textContent = '🛡️ MESTRE';
        else roleEl.textContent = '👤 JOGADOR';
    }

    lucide.createIcons();
    renderPage('mapa');
}

// ── Logout ─────────────────────────────────────────────
function handleLogout() {
    clearSession();
    document.getElementById('app-root').style.display    = 'none';
    document.getElementById('auth-screen').style.display = 'flex';
    // Limpa campos de senha por segurança
    ['login-password','reg-password','reg-confirm','master-password'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

// ── LOGIN DE JOGADOR ───────────────────────────────────
function handlePlayerLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const errorId  = 'login-error';

    if (!username || !password) {
        return showAuthError(errorId, 'Preencha todos os campos.');
    }

    const users = getUsers();
    const user  = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!user) {
        return showAuthError(errorId, 'Jogador não encontrado. Aliste-se primeiro.');
    }
    if (user.password !== btoa(password)) {
        return showAuthError(errorId, 'Senha incorreta.');
    }

    enterApp({ username: user.username, role: user.role, age: user.age, availability: user.availability });
}

// ── REGISTRO DE JOGADOR ────────────────────────────────
function handlePlayerRegister(e) {
    e.preventDefault();
    const username     = document.getElementById('reg-username').value.trim();
    const age          = document.getElementById('reg-age').value;
    const availability = document.getElementById('reg-availability').value;
    const password     = document.getElementById('reg-password').value;
    const confirm      = document.getElementById('reg-confirm').value;
    const errorId      = 'register-error';

    if (!username || !age || !availability || !password || !confirm) {
        return showAuthError(errorId, 'Preencha todos os campos e selecione sua disponibilidade.');
    }
    if (password !== confirm) {
        return showAuthError(errorId, 'As senhas não coincidem.');
    }
    if (password.length < 6) {
        return showAuthError(errorId, 'A senha deve ter pelo menos 6 caracteres.');
    }

    // Bloqueia se tentar se cadastrar com nome reservado dos Mestres Supremos
    const isSupremeName = SUPREME_MASTERS.some(m => m.toLowerCase() === username.toLowerCase());
    if (isSupremeName) {
        return showAuthError(errorId, 'Esse codinome é reservado para a Administração/Mestre.');
    }

    const users = getUsers();
    const exists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists) {
        return showAuthError(errorId, 'Esse nome de jogador já está em uso.');
    }

    // Todo novo registro de usuário pelo formulário comum COMEÇA APENAS COMO JOGADOR
    const newUser = {
        username,
        age: parseInt(age),
        availability,
        password: btoa(password), // armazenamento simples (base64)
        role: 'player'
    };

    users.push(newUser);
    saveUsers(users);

    enterApp({ username: newUser.username, role: newUser.role, age: newUser.age, availability: newUser.availability });
}

// ── LOGIN DE MESTRE ────────────────────────────────────
function handleMasterLogin(e) {
    e.preventDefault();
    const username = document.getElementById('master-username').value.trim();
    const password = document.getElementById('master-password').value;
    const errorId  = 'master-error';

    if (!username || !password) {
        return showAuthError(errorId, 'Preencha todos os campos.');
    }

    // Mestres Supremos entram pela lista de usuários registrados
    const users = getUsers();
    const user  = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (user && (user.role === 'supreme' || user.role === 'master')) {
        if (user.password !== btoa(password)) {
            return showAuthError(errorId, 'Senha incorreta.');
        }
        return enterApp({ username: user.username, role: user.role });
    }

    // Acesso via senha padrão de mestre (para admins não registrados ainda)
    if (password === MASTER_DEFAULT_PASSWORD) {
        const isSup = SUPREME_MASTERS.some(m => m.toLowerCase() === username.toLowerCase());
        return enterApp({ username, role: isSup ? 'supreme' : 'master' });
    }

    return showAuthError(errorId, 'Credenciais inválidas ou acesso não autorizado.');
}

// ── Inicialização — verifica sessão existente ──────────
window.onload = () => {
    const session = getSession();
    if (session && session.username) {
        enterApp(session);
    } else {
        // Garante que a tela de auth está visível
        document.getElementById('auth-screen').style.display = 'flex';
        document.getElementById('app-root').style.display    = 'none';
        lucide.createIcons();
    }
};

// ══════════════════════════════════════════════════════
//          MÓDULO DE PERFIL & PERSONAGENS (MEU PERFIL)
// ══════════════════════════════════════════════════════

const KEY_CHARACTERS = 'awrpg_characters';
const KEY_APPROVALS  = 'awrpg_approvals';

// Retorna personagens do localStorage
function getCharacters() {
    try { return JSON.parse(localStorage.getItem(KEY_CHARACTERS)) || {}; }
    catch { return {}; }
}

// Salva personagens no localStorage
function saveCharacters(chars) {
    localStorage.setItem(KEY_CHARACTERS, JSON.stringify(chars));
}

// Retorna fila de aprovações pendentes
function getApprovals() {
    try { return JSON.parse(localStorage.getItem(KEY_APPROVALS)) || []; }
    catch { return []; }
}

// Salva fila de aprovações
function saveApprovals(apps) {
    localStorage.setItem(KEY_APPROVALS, JSON.stringify(apps));
}

// Estado local da aba de perfil
let activeCharSlot = 1;

// Renderização principal do Perfil
function renderPerfil() {
    const session = getSession();
    const container = document.getElementById('perfil-container');
    if (!container || !session) return;

    const isSupreme = session.role === 'supreme' || session.role === 'master' || SUPREME_MASTERS.includes(session.username);
    const allChars = getCharacters();
    const userChars = allChars[session.username] || { char1: null, char2: null, avatar: null };

    container.innerHTML = `
        <div class="perfil-header-box">
            <div class="perfil-avatar-wrap">
                <img id="perfil-avatar-img" src="${userChars.avatar || 'https://via.placeholder.com/150/111111/FF003C?text=PERFIL'}" alt="Avatar">
                <label class="perfil-avatar-upload-btn" title="Alterar Foto de Perfil">
                    📷 <input type="file" accept="image/*" onchange="uploadAvatar(event)" style="display:none;">
                </label>
            </div>
            <div class="perfil-info-wrap">
                <h2 style="margin: 0; color: #fff; display: flex; align-items: center; gap: 10px;">
                    ${session.username}
                    ${isSupreme ? '<span class="supreme-badge">⚔️ MESTRE SUPREMO</span>' : '<span class="player-badge">👤 JOGADOR</span>'}
                </h2>
                <p style="color: var(--text-muted); font-size: 0.85em; margin-top: 5px;">
                    Disponibilidade: <strong>${session.availability ? session.availability.toUpperCase() : 'NÃO INFORMADA'}</strong> | Idade: <strong>${session.age || 'N/A'} anos</strong>
                </p>
            </div>
        </div>

        ${isSupreme ? `
            <div class="perfil-master-tabs" style="margin-top: 1.5rem;">
                <button class="perfil-subtab ${activePerfilSection === 'fichas' ? 'active' : ''}" onclick="switchPerfilSection('fichas')">👤 MEUS PERSONAGENS</button>
                <button class="perfil-subtab ${activePerfilSection === 'aprovacoes' ? 'active' : ''}" onclick="switchPerfilSection('aprovacoes')">⚡ CENTRAL DE APROVAÇÃO DOS MESTRES</button>
                <button class="perfil-subtab ${activePerfilSection === 'npcs' ? 'active' : ''}" onclick="switchPerfilSection('npcs')">🎭 CRIAR NPC</button>
            </div>
        ` : ''}

        <div id="perfil-section-content" style="margin-top: 1.5rem;">
        </div>
    `;

    renderPerfilSection();
}

let activePerfilSection = 'fichas';

function switchPerfilSection(sec) {
    activePerfilSection = sec;
    renderPerfil();
}

function uploadAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const session = getSession();
        const allChars = getCharacters();
        if (!allChars[session.username]) allChars[session.username] = { char1: null, char2: null };
        allChars[session.username].avatar = evt.target.result;
        saveCharacters(allChars);
        renderPerfil();
    };
    reader.readAsDataURL(file);
}

function renderPerfilSection() {
    const container = document.getElementById('perfil-section-content');
    if (!container) return;

    if (activePerfilSection === 'aprovacoes') {
        renderApprovalsSection(container);
    } else if (activePerfilSection === 'npcs') {
        renderCreateNpcSection(container);
    } else {
        renderCharactersSection(container);
    }
}

// Renderiza a seção de Fichas dos Personagens (Slot 1 e Slot 2)
function renderCharactersSection(container) {
    const session = getSession();
    const allChars = getCharacters();
    const userChars = allChars[session.username] || { char1: null, char2: null };

    const currentChar = userChars[`char${activeCharSlot}`] || getDefaultCharData();

    container.innerHTML = `
        <!-- SUB-ABAS DOS PERSONAGENS -->
        <div class="char-slots-bar">
            <button class="char-slot-btn ${activeCharSlot === 1 ? 'active' : ''}" onclick="switchCharSlot(1)">
                SLOT 1: ${userChars.char1 ? userChars.char1.nome : 'NOVO PERSONAGEM'}
            </button>
            <button class="char-slot-btn ${activeCharSlot === 2 ? 'active' : ''}" onclick="switchCharSlot(2)">
                SLOT 2: ${userChars.char2 ? userChars.char2.nome : 'NOVO PERSONAGEM'}
            </button>
        </div>

        <div class="ficha-card-scroll">
            <h3 class="neon-text" style="font-size: 1.2rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <span>FICHA DO PERSONAGEM — (SLOT ${activeCharSlot})</span>
                <span class="status-badge status-${currentChar.status || 'rascunho'}">${(currentChar.status || 'RASCUNHO').toUpperCase()}</span>
            </h3>

            <form id="ficha-form" onsubmit="saveFicha(event)">
                <!-- FOTO DO PERSONAGEM COMPRIMIDA -->
                <div style="display: flex; align-items: center; gap: 1.2rem; margin-bottom: 1.2rem; padding: 1.2rem; background: #000; border: 2px solid var(--neon-red); border-left: 5px solid var(--neon-red); border-radius: 6px; box-shadow: 0 0 15px rgba(255,0,60,0.2), inset 0 0 20px rgba(0,0,0,0.8);">
                    <div style="position: relative; width: 85px; height: 85px; border-radius: 6px; border: 2px solid var(--neon-red); box-shadow: 0 0 10px var(--neon-red); overflow: hidden; flex-shrink: 0; background: #000;">
                        <img id="char-photo-preview" src="${currentChar.foto || 'https://via.placeholder.com/150/111111/FF003C?text=PERSONAGEM'}" alt="Foto do Personagem" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div>
                        <strong style="color: #fff; font-size: 0.95rem; font-family: 'Orbitron', sans-serif; letter-spacing: 1px; display: block; margin-bottom: 4px; text-shadow: 0 0 6px var(--neon-red);">FOTO DO PERSONAGEM</strong>
                        <span style="color: var(--text-muted); font-size: 0.78rem; display: block; margin-bottom: 10px;">A imagem será redimensionada e comprimida automaticamente para consumo otimizado de memória.</span>
                        <label class="res-btn" style="display: inline-block; padding: 6px 14px; cursor: pointer; background: #000; border: 1px solid var(--neon-red); color: #fff; font-weight: bold; border-radius: 4px;">
                            📷 Selecionar Foto
                            <input type="file" accept="image/*" onchange="uploadCharPhoto(event)" style="display:none;">
                        </label>
                        <input type="hidden" id="fc-foto-data" value="${currentChar.foto || ''}">
                    </div>
                </div>

                <!-- DADOS BÁSICOS -->
                <div class="ficha-grid-2">
                    <div class="ficha-field">
                        <label>NOME DO PERSONAGEM *</label>
                        <input type="text" id="fc-nome" value="${currentChar.nome || ''}" required placeholder="Ex: Lucas Vance">
                    </div>
                    <div class="ficha-field">
                        <label>CODINOME (OPCIONAL)</label>
                        <input type="text" id="fc-codinome" value="${currentChar.codinome || ''}" placeholder="Ex: Shadowblade">
                    </div>
                    <div class="ficha-field">
                        <label>IDADE DO PERSONAGEM *</label>
                        <input type="number" id="fc-idade" value="${currentChar.idade || ''}" required placeholder="Ex: 22">
                    </div>
                    <div class="ficha-field">
                        <label>GÊNERO *</label>
                        <select id="fc-genero" required>
                            <option value="Masculino" ${currentChar.genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
                            <option value="Feminino" ${currentChar.genero === 'Feminino' ? 'selected' : ''}>Feminino</option>
                            <option value="Intersex" ${currentChar.genero === 'Intersex' ? 'selected' : ''}>Intersex</option>
                        </select>
                    </div>
                    <div class="ficha-field">
                        <label>ALTURA (100 cm a 210 cm) *</label>
                        <input type="number" id="fc-altura" min="100" max="210" value="${currentChar.altura || 175}" onchange="validateHeight(this)" required>
                    </div>
                    <div class="ficha-field">
                        <label>PESO (Máximo 200 Kg) *</label>
                        <input type="number" id="fc-peso" min="1" max="200" value="${currentChar.peso || 70}" onchange="validateWeight(this)" required>
                    </div>
                    <div class="ficha-field">
                        <label>CLASSE *</label>
                        <select id="fc-classe" required onchange="updateRankByClass(this.value)">
                            <option value="Herói" ${currentChar.classe === 'Herói' ? 'selected' : ''}>Herói</option>
                            <option value="Anti-Herói" ${currentChar.classe === 'Anti-Herói' ? 'selected' : ''}>Anti-Herói</option>
                            <option value="Vilão" ${currentChar.classe === 'Vilão' ? 'selected' : ''}>Vilão</option>
                        </select>
                    </div>
                    <div class="ficha-field">
                        <label>RANQUE (Baseado na Classe)</label>
                        <input type="text" id="fc-ranque" value="${currentChar.ranque || getRankName(1, currentChar.classe || 'Herói')}" readonly style="background: rgba(255,255,255,0.02); color: #ffd700; font-family: 'Orbitron', monospace; font-weight: bold;">
                    </div>
                </div>

                <!-- PONTOS DE RANK -->
                <div class="ficha-box-highlight" style="margin-top: 0.8rem; border-color: #ffd70044;">
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                        <label style="color: #ffd700; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 0;">PONTOS DE RANK (P.R.)</label>
                        <div class="resource-control">
                            <input type="number" id="fc-pr" value="${currentChar.pr || 0}" ${isSupreme() ? '' : 'readonly'} min="0">
                            ${isSupreme() ? `
                                <button type="button" class="res-btn" onclick="modResource('fc-pr', 100)">+100</button>
                                <button type="button" class="res-btn" onclick="modResource('fc-pr', 500)">+500</button>
                                <button type="button" class="res-btn remove-btn" onclick="modResource('fc-pr', -100)">-100</button>
                            ` : ''}
                        </div>
                    </div>
                    <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem;">
                        P.R. acumulados para subir de rank. Consulte a aba <strong>Ranking</strong> em Sistema para ver as metas.
                    </p>
                </div>

                <!-- EXP E GP -->
                <div class="ficha-box-highlight" style="margin-top: 1rem;">
                    <div class="ficha-grid-2">
                        <div class="ficha-field">
                            <label>EXP (EXPERIÊNCIA)</label>
                            <div class="resource-control">
                                <input type="number" id="fc-exp" value="${currentChar.exp || 0}" ${isSupreme() ? '' : 'readonly'}>
                                ${isSupreme() ? `
                                    <button type="button" class="res-btn" onclick="modResource('fc-exp', 50)">+50</button>
                                    <button type="button" class="res-btn" onclick="modResource('fc-exp', -50)">-50</button>
                                ` : ''}
                            </div>
                        </div>
                        <div class="ficha-field">
                            <label>GP (GEAR POINTS ⚙️)</label>
                            <div class="resource-control">
                                <input type="number" id="fc-gp" value="${currentChar.gp || 0}" readonly>
                                ${isSupreme() ? `
                                    <button type="button" class="res-btn" onclick="modResource('fc-gp', 100)">+100</button>
                                ` : ''}
                                <button type="button" class="res-btn remove-btn" onclick="modResource('fc-gp', -50)">Gastar -50</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- META-PODER / ESPECIALIDADE -->
                <h4 class="carmine-text" style="margin-top: 1.5rem; border-bottom: 1px solid var(--support-crimson); padding-bottom: 5px;">META-PODER OU ESPECIALIDADE</h4>
                <div class="ficha-grid-2">
                    <div class="ficha-field">
                        <label>CATEGORIA</label>
                        <select id="fc-categoria-poder" onchange="togglePoderTipo(this.value)">
                            <option value="Meta-Poder" ${currentChar.categoriaPoder !== 'Especialidade' ? 'selected' : ''}>Meta-Poder</option>
                            <option value="Especialidade" ${currentChar.categoriaPoder === 'Especialidade' ? 'selected' : ''}>Especialidade</option>
                        </select>
                    </div>
                    <div class="ficha-field">
                        <label>NOME DO META-PODER / ESPECIALIDADE</label>
                        <input type="text" id="fc-nome-poder" value="${currentChar.nomePoder || ''}" placeholder="Ex: Pirocinese Nanotécnica">
                    </div>
                    <div class="ficha-field" id="wrap-tipo-poder" style="${currentChar.categoriaPoder === 'Especialidade' ? 'display:none;' : ''}">
                        <label>TIPO DE META-PODER</label>
                        <select id="fc-tipo-poder">
                            <option value="Emissão" ${currentChar.tipoPoder === 'Emissão' ? 'selected' : ''}>Emissão</option>
                            <option value="Mutação" ${currentChar.tipoPoder === 'Mutação' ? 'selected' : ''}>Mutação</option>
                            <option value="Transformação" ${currentChar.tipoPoder === 'Transformação' ? 'selected' : ''}>Transformação</option>
                        </select>
                    </div>
                </div>
                <div class="ficha-field" style="margin-top: 0.8rem;">
                    <label>DESCRIÇÃO DO PODER / ESPECIALIDADE</label>
                    <textarea id="fc-desc-poder" rows="3" placeholder="Descreva o funcionamento do seu poder ou especialidade...">${currentChar.descPoder || ''}</textarea>
                    <!-- <button type="button" class="view-levels-btn" onclick="runPowerBalancer()" style="margin-top: 0.5rem; align-self: flex-start;">⚡ BALANCEAR PODER / ESPECIALIDADE (IA LOCAL)</button> -->
                </div>

                <!-- HABILIDADES / MAESTRIAS -->
                <h4 class="carmine-text" style="margin-top: 1.5rem; border-bottom: 1px solid var(--support-crimson); padding-bottom: 5px;" id="title-hab-maestria">
                    ${currentChar.categoriaPoder === 'Especialidade' ? 'MAESTRIAS' : 'HABILIDADES'}
                </h4>
                <div id="hab-container">
                    ${renderHabilidadesInputs(currentChar.habilidades || [{}])}
                </div>
                <button type="button" class="view-levels-btn" onclick="addHabilidadeInput()" style="margin-top: 0.5rem;">+ Adicionar Nova Habilidade/Maestria</button>

                <!-- HISTÓRIA DO PERSONAGEM -->
                <h4 class="carmine-text" style="margin-top: 1.5rem; border-bottom: 1px solid var(--support-crimson); padding-bottom: 5px;">HISTÓRIA DO PERSONAGEM</h4>
                <div class="ficha-field">
                    <textarea id="fc-historia" rows="5" placeholder="Conte a trajetória, origem e motivações do seu personagem em Unicity...">${currentChar.historia || ''}</textarea>
                </div>

                ${currentChar.status === 'aprovado' || isSupreme() ? `
                <h4 class="carmine-text" style="margin-top: 1.5rem; border-bottom: 1px solid var(--support-crimson); padding-bottom: 5px;">INFORMAÇÕES EXTRAS (PÓS-APROVAÇÃO)</h4>
                <div class="ficha-grid-2">
                    <div class="ficha-field" style="grid-column: span 2;">
                        <label>VOZ DO PERSONAGEM (Link / Nome do Dublador)</label>
                        <input type="text" id="fc-voz" value="${currentChar.voz || ''}" placeholder="Ex: Link do YouTube ou Nome do Ator">
                    </div>
                    <div class="ficha-field">
                        <label>CONEXÕES E LAÇOS</label>
                        <textarea id="fc-conexoes" rows="3" placeholder="Família, rivais, aliados...">${currentChar.conexoes || ''}</textarea>
                    </div>
                    <div class="ficha-field">
                        <label>INFORMAÇÕES EXTRAS</label>
                        <textarea id="fc-extras" rows="3" placeholder="Curiosidades, gostos, manias...">${currentChar.extras || ''}</textarea>
                    </div>
                    <div class="ficha-field" style="grid-column: span 2;">
                        <label>TRAUMAS (Apenas Admin pode editar)</label>
                        <textarea id="fc-traumas" rows="3" placeholder="Traumas adquiridos..." ${isSupreme() ? '' : 'readonly'}>${currentChar.traumas || ''}</textarea>
                    </div>
                </div>
                ` : ''}

                <!-- ATRIBUTOS -->
                <h4 class="carmine-text" style="margin-top: 1.5rem; border-bottom: 1px solid var(--support-crimson); padding-bottom: 5px;">ATRIBUTOS DOS PERSONAGENS</h4>
                <div class="ficha-grid-2">
                    <div class="ficha-field">
                        <label>FORÇA (Nv. 1 ao 6)</label>
                        <input type="text" value="Nv. 1 [00/100]" readonly style="background: rgba(255,255,255,0.02);">
                    </div>
                    <div class="ficha-field">
                        <label>RESISTÊNCIA (Nv. 1 ao 6)</label>
                        <input type="text" value="Nv. 1 [00/100]" readonly style="background: rgba(255,255,255,0.02);">
                    </div>
                    <div class="ficha-field">
                        <label>VELOCIDADE (Nv. 1 ao 6)</label>
                        <input type="text" value="Nv. 1 [00/100]" readonly style="background: rgba(255,255,255,0.02);">
                    </div>
                    <div class="ficha-field">
                        <label>AGILIDADE (Nv. 1 ao 6)</label>
                        <input type="text" value="Nv. 1 [00/100]" readonly style="background: rgba(255,255,255,0.02);">
                    </div>
                    <div class="ficha-field" style="grid-column: span 2;">
                        <label>PODER / ESPECIALIDADE (Nv. 1 ao 6)</label>
                        <input type="text" value="Nv. 1 [00/100]" readonly style="background: rgba(255,255,255,0.02);">
                    </div>
                </div>

                <!-- TRAJES E EQUIPAMENTOS -->
                <h4 class="carmine-text" style="margin-top: 1.5rem; border-bottom: 1px solid var(--support-crimson); padding-bottom: 5px;">EQUIPAMENTOS E TRAJES (SLOTS LIBERADOS POR NÍVEL DE PODER)</h4>
                
                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--neon-red); font-size: 0.9em;">TRAJES:</strong>
                    <div id="trajes-container" style="margin-top: 0.5rem;">
                        ${renderTrajesInputs(currentChar.trajes || [{}])}
                    </div>
                </div>

                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--neon-red); font-size: 0.9em;">EQUIPAMENTOS:</strong>
                    <div id="equips-container" style="margin-top: 0.5rem;">
                        ${renderEquipsInputs(currentChar.equips || [{}])}
                    </div>
                </div>

                <!-- BOTOES DE AÇÃO DA FICHA -->
                <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
                    <button type="submit" class="auth-submit-btn" style="flex:1;">💾 SALVAR FICHA DO PERSONAGEM</button>
                    ${!isSupreme() ? `
                        <button type="button" class="auth-submit-btn master-btn" onclick="submitForApproval()" style="flex:1;">⚡ ENVIAR FICHA PARA APROVAÇÃO DO MESTRE</button>
                    ` : ''}
                </div>
            </form>
        </div>
    `;
}

// Renderiza Painel de Aprovações do Mestre Supremo
function renderApprovalsSection(container) {
    const approvals = getApprovals();

    container.innerHTML = `
        <div class="ficha-card-scroll">
            <h3 class="neon-text" style="font-size: 1.2rem; margin-bottom: 1rem;">CENTRAL DE APROVAÇÃO DOS MESTRES SUPREMOS</h3>
            <p style="color: var(--text-muted); font-size: 0.85em; margin-bottom: 1.5rem;">
                Aqui os administradores podem analisar, aprovar, recusar, nerfar ou melhorar fichas, trajes e equipamentos submetidos pelos jogadores de Unicity.
            </p>

            ${approvals.length === 0 ? `
                <div style="padding: 2rem; text-align: center; border: 1px dashed var(--support-crimson); color: var(--text-muted);">
                    Nenhuma solicitação pendente no momento.
                </div>
            ` : `
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    ${approvals.map((app, index) => `
                        <div class="approval-card">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <strong style="color: #fff; font-size: 1.1rem;">${app.charData.nome} (${app.charData.codinome || 'Sem codinome'})</strong>
                                <span class="supreme-tag">Enviado por: ${app.username}</span>
                            </div>
                            <p style="color: var(--text-muted); font-size: 0.85em; margin-top: 6px;">
                                Classe: <strong>${app.charData.classe}</strong> | Poder: <strong>${app.charData.nomePoder} (${app.charData.tipoPoder || 'Especialidade'})</strong>
                            </p>
                            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                                <button class="res-btn" style="background: green; color: #fff;" onclick="approveFicha(${index})">✅ APROVAR FICHA</button>
                                <button class="res-btn" style="background: #ffaa00; color: #000;" onclick="nerfFicha(${index})">⚠️ PEDIR NERF / EDICÃO</button>
                                <button class="res-btn remove-btn" onclick="rejectFicha(${index})">❌ RECUSAR</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}

// Funções auxiliares da Ficha
function getDefaultCharData() {
    return {
        nome: '',
        codinome: '',
        idade: '',
        genero: 'Masculino',
        altura: 175,
        peso: 70,
        classe: 'Herói',
        ranque: getRankName(1, 'Herói'),
        pr: 0,
        exp: 0,
        gp: 0,
        categoriaPoder: 'Meta-Poder',
        nomePoder: '',
        tipoPoder: 'Emissão',
        descPoder: '',
        habilidades: [{}],
        trajes: [{}],
        equips: [{}],
        historia: '',
        voz: '',
        conexoes: '',
        extras: '',
        traumas: '',
        status: 'rascunho'
    };
}

function isSupreme() {
    const s = getSession();
    return s && (s.role === 'supreme' || s.role === 'master' || SUPREME_MASTERS.includes(s.username));
}

function switchCharSlot(slot) {
    activeCharSlot = slot;
    renderPerfil();
}

function validateHeight(input) {
    let val = parseInt(input.value);
    if (val < 100) input.value = 100;
    if (val > 210) input.value = 210;
}

function validateWeight(input) {
    let val = parseInt(input.value);
    if (val > 200) input.value = 200;
    if (val < 1) input.value = 1;
}

function updateRankByClass(classe) {
    const ranqueInput = document.getElementById('fc-ranque');
    if (!ranqueInput) return;
    // Rank inicial = Bronze (nível 1) com nomenclatura por classe
    ranqueInput.value = getRankName(1, classe);
}

function togglePoderTipo(cat) {
    const wrap = document.getElementById('wrap-tipo-poder');
    const title = document.getElementById('title-hab-maestria');
    if (wrap) wrap.style.display = (cat === 'Especialidade') ? 'none' : 'block';
    if (title) title.innerText = (cat === 'Especialidade') ? 'MAESTRIAS' : 'HABILIDADES';
}

function modResource(id, delta) {
    const input = document.getElementById(id);
    if (!input) return;
    let val = parseInt(input.value) || 0;
    val += delta;
    if (val < 0) val = 0;
    input.value = val;
}

function renderHabilidadesInputs(habs) {
    return habs.map((h, i) => `
        <div style="background: rgba(255,255,255,0.02); padding: 0.8rem; border: 1px solid var(--support-crimson); margin-bottom: 0.6rem; border-radius: 4px;">
            <div class="ficha-grid-2">
                <div class="ficha-field">
                    <label>NOME DA HABILIDADE / MAESTRIA #${i+1}</label>
                    <input type="text" class="hab-nome" value="${h.nome || ''}" placeholder="Ex: Explosão Concentrada">
                </div>
                <div class="ficha-field">
                    <label>TEMPO DE RECARGA (COOLDOWN)</label>
                    <input type="text" class="hab-recarga" value="${h.recarga || '1 Turno'}" placeholder="Ex: 2 Turnos / Instantâneo">
                </div>
            </div>
            <div class="ficha-field" style="margin-top: 0.5rem;">
                <label>DESCRIÇÃO</label>
                <input type="text" class="hab-desc" value="${h.desc || ''}" placeholder="Efeito técnico em combate...">
            </div>
        </div>
    `).join('');
}

function addHabilidadeInput() {
    const container = document.getElementById('hab-container');
    if (!container) return;
    const count = container.children.length + 1;
    const div = document.createElement('div');
    div.style.cssText = "background: rgba(255,255,255,0.02); padding: 0.8rem; border: 1px solid var(--support-crimson); margin-bottom: 0.6rem; border-radius: 4px;";
    div.innerHTML = `
        <div class="ficha-grid-2">
            <div class="ficha-field">
                <label>NOME DA HABILIDADE / MAESTRIA #${count}</label>
                <input type="text" class="hab-nome" placeholder="Ex: Nova Habilidade">
            </div>
            <div class="ficha-field">
                <label>TEMPO DE RECARGA (COOLDOWN)</label>
                <input type="text" class="hab-recarga" value="1 Turno" placeholder="Ex: 2 Turnos">
            </div>
        </div>
        <div class="ficha-field" style="margin-top: 0.5rem;">
            <label>DESCRIÇÃO</label>
            <input type="text" class="hab-desc" placeholder="Efeito técnico em combate...">
        </div>
    `;
    container.appendChild(div);
}

function renderTrajesInputs(trajes) {
    return trajes.map((t, i) => `
        <div class="ficha-grid-2" style="background: rgba(255,0,60,0.03); padding: 0.6rem; border: 1px solid var(--support-crimson); margin-bottom: 0.4rem;">
            <input type="text" class="trj-nome" value="${t.nome || ''}" placeholder="Nome do Traje">
            <select class="trj-classe">
                <option value="Comum ⭐" ${t.classe === 'Comum ⭐' ? 'selected' : ''}>Comum ⭐</option>
                <option value="Avançado ⭐⭐" ${t.classe === 'Avançado ⭐⭐' ? 'selected' : ''}>Avançado ⭐⭐</option>
                <option value="Super ⭐⭐⭐" ${t.classe === 'Super ⭐⭐⭐' ? 'selected' : ''}>Super ⭐⭐⭐</option>
            </select>
            <input type="text" class="trj-funcao" value="${t.funcao || ''}" placeholder="Função do Traje" style="grid-column: span 2;">
        </div>
    `).join('');
}

function renderEquipsInputs(equips) {
    return equips.map((e, i) => `
        <div class="ficha-grid-2" style="background: rgba(255,0,60,0.03); padding: 0.6rem; border: 1px solid var(--support-crimson); margin-bottom: 0.4rem;">
            <input type="text" class="eqp-nome" value="${e.nome || ''}" placeholder="Nome do Equipamento">
            <select class="eqp-classe">
                <option value="Comum ⭐" ${e.classe === 'Comum ⭐' ? 'selected' : ''}>Comum ⭐</option>
                <option value="Avançado ⭐⭐" ${e.classe === 'Avançado ⭐⭐' ? 'selected' : ''}>Avançado ⭐⭐</option>
                <option value="Super ⭐⭐⭐" ${e.classe === 'Super ⭐⭐⭐' ? 'selected' : ''}>Super ⭐⭐⭐</option>
            </select>
            <input type="text" class="eqp-funcao" value="${e.funcao || ''}" placeholder="Função do Equipamento" style="grid-column: span 2;">
        </div>
    `).join('');
}

// Salva Ficha no localStorage
// Comprime e redimensiona a foto do personagem usando HTML5 Canvas (max 300px, JPEG 75%)
function uploadCharPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_SIZE = 300; // Tamanho máximo de 300px
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_SIZE) {
                    height *= MAX_SIZE / width;
                    width = MAX_SIZE;
                }
            } else {
                if (height > MAX_SIZE) {
                    width *= MAX_SIZE / height;
                    height = MAX_SIZE;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Exporta como JPEG comprimido a 75% de qualidade (poucos KB de memória)
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);

            document.getElementById('char-photo-preview').src = compressedDataUrl;
            document.getElementById('fc-foto-data').value = compressedDataUrl;
        };
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
}

function saveFicha(e) {
    if (e) e.preventDefault();
    const session = getSession();
    if (!session) return;

    const allChars = getCharacters();
    if (!allChars[session.username]) allChars[session.username] = { char1: null, char2: null };

    // Coleta Habilidades
    const habNodes = document.querySelectorAll('#hab-container > div');
    const habilidades = Array.from(habNodes).map(node => ({
        nome: node.querySelector('.hab-nome')?.value || '',
        recarga: node.querySelector('.hab-recarga')?.value || '1 Turno',
        desc: node.querySelector('.hab-desc')?.value || ''
    }));

    // Coleta Trajes
    const trjNodes = document.querySelectorAll('#trajes-container > div');
    const trajes = Array.from(trjNodes).map(node => ({
        nome: node.querySelector('.trj-nome')?.value || '',
        classe: node.querySelector('.trj-classe')?.value || 'Comum ⭐',
        funcao: node.querySelector('.trj-funcao')?.value || ''
    }));

    // Coleta Equips
    const eqpNodes = document.querySelectorAll('#equips-container > div');
    const equips = Array.from(eqpNodes).map(node => ({
        nome: node.querySelector('.eqp-nome')?.value || '',
        classe: node.querySelector('.eqp-classe')?.value || 'Comum ⭐',
        funcao: node.querySelector('.eqp-funcao')?.value || ''
    }));

    const charData = {
        foto: document.getElementById('fc-foto-data')?.value || '',
        nome: document.getElementById('fc-nome').value,
        codinome: document.getElementById('fc-codinome').value,
        idade: document.getElementById('fc-idade').value,
        genero: document.getElementById('fc-genero').value,
        altura: document.getElementById('fc-altura').value,
        peso: document.getElementById('fc-peso').value,
        classe: document.getElementById('fc-classe').value,
        ranque: document.getElementById('fc-ranque').value,
        exp: parseInt(document.getElementById('fc-exp').value) || 0,
        gp: parseInt(document.getElementById('fc-gp').value) || 0,
        pr: parseInt(document.getElementById('fc-pr')?.value) || 0,
        categoriaPoder: document.getElementById('fc-categoria-poder').value,
        nomePoder: document.getElementById('fc-nome-poder').value,
        tipoPoder: document.getElementById('fc-tipo-poder')?.value || 'Emissão',
        descPoder: document.getElementById('fc-desc-poder').value,
        habilidades,
        trajes,
        equips,
        historia: document.getElementById('fc-historia').value,
        voz: document.getElementById('fc-voz') ? document.getElementById('fc-voz').value : (allChars[session.username][`char${activeCharSlot}`]?.voz || ''),
        conexoes: document.getElementById('fc-conexoes') ? document.getElementById('fc-conexoes').value : (allChars[session.username][`char${activeCharSlot}`]?.conexoes || ''),
        extras: document.getElementById('fc-extras') ? document.getElementById('fc-extras').value : (allChars[session.username][`char${activeCharSlot}`]?.extras || ''),
        traumas: document.getElementById('fc-traumas') ? document.getElementById('fc-traumas').value : (allChars[session.username][`char${activeCharSlot}`]?.traumas || ''),
        status: allChars[session.username][`char${activeCharSlot}`]?.status || 'rascunho'
    };

    allChars[session.username][`char${activeCharSlot}`] = charData;
    saveCharacters(allChars);
    alert('Ficha do personagem salva com sucesso!');
    renderPerfil();
}

function submitForApproval() {
    saveFicha(null);
    const session = getSession();
    const allChars = getCharacters();
    const charData = allChars[session.username]?.[`char${activeCharSlot}`];
    if (!charData || !charData.nome) return alert('Preencha a ficha antes de enviar.');

    // ══ VERIFICAÇÃO AUTOMÁTICA DE PODERES BANIDOS ══
    const banCheck = checkBannedPowers(charData);
    if (banCheck.blocked) {
        showBanBlockModal(banCheck);
        return; // Bloqueia totalmente o envio
    }

    // ══ VERIFICAÇÃO DE BALANCEAMENTO POR NÍVEL (DESATIVADA TEMPORARIAMENTE) ══
    /*
    const nivel = parseInt(charData.nivelPoder) || 1;
    const balanceResult = analyzePowerBalance(
        charData.nomePoder || '',
        charData.categoriaPoder || 'Meta-Poder',
        charData.tipoPoder || 'Emissão',
        charData.descPoder || '',
        nivel
    );
    if (balanceResult.status === 'overpowered') {
        const confirmar = confirm(
            `⚠️ ALERTA DE BALANCEAMENTO\n\n` +
            `${balanceResult.veredicto}\n\n` +
            `${balanceResult.analiseDetalhada}\n\n` +
            `Recarga sugerida: ${balanceResult.cooldownSugerido}\n` +
            `Custo sugerido: ${balanceResult.custoSugerido}\n\n` +
            `A ficha será enviada com status "Pendente" mas os Mestres farão nerf antes da aprovação.\n\nDeseja enviar mesmo assim?`
        );
        if (!confirmar) return;
        charData.balanceAlert = balanceResult.veredicto;
    }
    */

    charData.status = 'pendente';
    allChars[session.username][`char${activeCharSlot}`] = charData;
    saveCharacters(allChars);

    const approvals = getApprovals();
    approvals.push({ username: session.username, slot: activeCharSlot, charData });
    saveApprovals(approvals);

    alert('Ficha enviada para a Central de Aprovação dos Mestres Supremos!');
    renderPerfil();
}

function approveFicha(index) {
    const approvals = getApprovals();
    const app = approvals[index];
    if (!app) return;

    const allChars = getCharacters();
    if (allChars[app.username] && allChars[app.username][`char${app.slot}`]) {
        allChars[app.username][`char${app.slot}`].status = 'aprovado';
        saveCharacters(allChars);
    }

    approvals.splice(index, 1);
    saveApprovals(approvals);
    alert('Ficha APROVADA com sucesso!');
    renderPerfilSection();
}

function rejectFicha(index) {
    const approvals = getApprovals();
    const app = approvals[index];
    if (!app) return;

    const allChars = getCharacters();
    if (allChars[app.username] && allChars[app.username][`char${app.slot}`]) {
        allChars[app.username][`char${app.slot}`].status = 'recusado';
        saveCharacters(allChars);
    }

    approvals.splice(index, 1);
    saveApprovals(approvals);
    alert('Ficha RECUSADA.');
    renderPerfilSection();
}

function nerfFicha(index) {
    const feedback = prompt('Digite as observações de alteração/nerf para o jogador:');
    if (!feedback) return;

    const approvals = getApprovals();
    const app = approvals[index];
    if (!app) return;

    const allChars = getCharacters();
    if (allChars[app.username] && allChars[app.username][`char${app.slot}`]) {
        allChars[app.username][`char${app.slot}`].status = 'revisao';
        allChars[app.username][`char${app.slot}`].feedback = feedback;
        saveCharacters(allChars);
    }

    approvals.splice(index, 1);
    saveApprovals(approvals);
    alert('Ficha enviada de volta para revisão!');
    renderPerfilSection();
}

// Aciona a Matriz de Balanceamento Local de Poderes
function runPowerBalancer() {
    const nome = document.getElementById('fc-nome-poder')?.value || '';
    const categoria = document.getElementById('fc-categoria-poder')?.value || 'Meta-Poder';
    const tipo = document.getElementById('fc-tipo-poder')?.value || 'Emissão';
    const descricao = document.getElementById('fc-desc-poder')?.value || '';

    const result = analyzePowerBalance(nome, categoria, tipo, descricao, 1);
    showBalancerModal(result);
}

// ═══════════════════════════════════════════════════════════════
//          GERENCIAMENTO E CRIAÇÃO DE NPCS (MESTRES)
// ═══════════════════════════════════════════════════════════════

function getNpcs() {
    const data = localStorage.getItem('awakening_npcs');
    return data ? JSON.parse(data) : [];
}

function saveNpcs(npcs) {
    localStorage.setItem('awakening_npcs', JSON.stringify(npcs));
}

function renderCreateNpcSection(container) {
    const npcs = getNpcs();

    container.innerHTML = `
        <div class="ficha-card-scroll">
            <h3 class="neon-text" style="font-size: 1.2rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px;">
                🎭 GERENCIADOR DE NPCS DA CIDADE (MESTRE SUPREMO)
            </h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem; line-height: 1.6;">
                Crie e configure NPCs para o universo de Awakening RPG. 
                <strong style="color: var(--neon-red);">A Lista de Banimento NÃO se aplica a NPCs</strong>.
                A história é obrigatória e privada (visível somente para os Mestres). Os jogadores só verão os <strong>Boatos</strong> e os atributos caso o NPC esteja marcado como <strong>Visível</strong>.
            </p>

            <form id="npc-form" onsubmit="saveNpcForm(event)" style="background: rgba(0,0,0,0.6); padding: 1.5rem; border: 1px solid var(--support-crimson); border-radius: 6px; margin-bottom: 2rem;">
                <h4 style="color: #fff; font-family: 'Orbitron', sans-serif; font-size: 1rem; margin-bottom: 1.2rem; border-bottom: 1px solid var(--support-crimson); padding-bottom: 6px;">
                    ➕ NOVO NPC
                </h4>

                <!-- FOTO DO NPC COMPRIMIDA -->
                <div style="display: flex; align-items: center; gap: 1.2rem; margin-bottom: 1.2rem; padding: 1rem; background: #000; border: 2px solid var(--neon-red); border-left: 5px solid var(--neon-red); border-radius: 6px;">
                    <div style="position: relative; width: 75px; height: 75px; border-radius: 6px; border: 2px solid var(--neon-red); overflow: hidden; flex-shrink: 0; background: #000;">
                        <img id="npc-photo-preview" src="https://via.placeholder.com/150/111111/FF003C?text=NPC" alt="Foto do NPC" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div>
                        <strong style="color: #fff; font-size: 0.9rem; font-family: 'Orbitron', sans-serif; display: block; margin-bottom: 4px;">FOTO DO NPC</strong>
                        <span style="color: var(--text-muted); font-size: 0.75rem; display: block; margin-bottom: 8px;">A foto será comprimida e exibida nos registros públicos e secretos.</span>
                        <label class="res-btn" style="display: inline-block; padding: 5px 12px; cursor: pointer; background: #000; border: 1px solid var(--neon-red); color: #fff;">
                            📷 Selecionar Foto
                            <input type="file" accept="image/*" onchange="uploadNpcPhoto(event)" style="display:none;">
                        </label>
                        <input type="hidden" id="npc-foto-data" value="">
                    </div>
                </div>

                <!-- DADOS BÁSICOS -->
                <div class="ficha-grid-2">
                    <div class="ficha-field">
                        <label>NOME DO NPC *</label>
                        <input type="text" id="npc-nome" required placeholder="Ex: Mestre Kurogane">
                    </div>
                    <div class="ficha-field">
                        <label>CLASSE *</label>
                        <select id="npc-classe" required>
                            <option value="Herói">Herói</option>
                            <option value="Anti-Herói">Anti-Herói</option>
                            <option value="Vilão">Vilão</option>
                            <option value="Neutro / Entidade">Neutro / Entidade</option>
                        </select>
                    </div>
                    <div class="ficha-field">
                        <label>RANQUE DO NPC *</label>
                        <select id="npc-ranque" required>
                            ${RANK_DATA.map(r => `<option value="${r.pedra}">${r.emoji} ${r.pedra}</option>`).join('')}
                        </select>
                    </div>
                    <div class="ficha-field">
                        <label>VISIBILIDADE PARA PLAYERS *</label>
                        <select id="npc-visivel" required>
                            <option value="true">👁️ VISÍVEL (Aparece na aba Personagens/NPCs)</option>
                            <option value="false">🙈 OCULTO (Visível somente para Mestres)</option>
                        </select>
                    </div>
                </div>

                <!-- NÍVEIS DE ATRIBUTOS CUSTOMIZÁVEIS -->
                <h5 class="carmine-text" style="margin-top: 1.2rem; font-size: 0.9rem; border-bottom: 1px solid rgba(255,0,60,0.3); padding-bottom: 4px;">
                    📊 NÍVEIS DOS ATRIBUTOS (SEM LIMITES PARA MESTRE)
                </h5>
                <div class="ficha-grid-2" style="margin-top: 0.8rem;">
                    <div class="ficha-field">
                        <label>FORÇA (Nível)</label>
                        <input type="number" id="npc-forca" min="1" max="100" value="1">
                    </div>
                    <div class="ficha-field">
                        <label>RESISTÊNCIA (Nível)</label>
                        <input type="number" id="npc-resistencia" min="1" max="100" value="1">
                    </div>
                    <div class="ficha-field">
                        <label>VELOCIDADE (Nível)</label>
                        <input type="number" id="npc-velocidade" min="1" max="100" value="1">
                    </div>
                    <div class="ficha-field">
                        <label>AGILIDADE (Nível)</label>
                        <input type="number" id="npc-agilidade" min="1" max="100" value="1">
                    </div>
                    <div class="ficha-field" style="grid-column: span 2;">
                        <label>PODER / ESPECIALIDADE (Nível)</label>
                        <input type="number" id="npc-poder-level" min="1" max="100" value="1">
                    </div>
                </div>

                <!-- PODER E HABILIDADES -->
                <h5 class="carmine-text" style="margin-top: 1.2rem; font-size: 0.9rem; border-bottom: 1px solid rgba(255,0,60,0.3); padding-bottom: 4px;">
                    ⚡ PODER E HABILIDADES (SEM BANIMENTO)
                </h5>
                <div class="ficha-grid-2" style="margin-top: 0.8rem;">
                    <div class="ficha-field">
                        <label>NOME DO PODER / HABILIDADE PRINCIPAL</label>
                        <input type="text" id="npc-nome-poder" placeholder="Ex: Manipulação Dimensional Ilimitada">
                    </div>
                    <div class="ficha-field">
                        <label>DESCRIÇÃO DO PODER</label>
                        <input type="text" id="npc-desc-poder" placeholder="Sem restrições de banimento para NPCs...">
                    </div>
                </div>

                <!-- BOATOS (PÚBLICO) E HISTÓRIA (OBRIGATÓRIO / PRIVADO) -->
                <h5 class="carmine-text" style="margin-top: 1.2rem; font-size: 0.9rem; border-bottom: 1px solid rgba(255,0,60,0.3); padding-bottom: 4px;">
                    📜 HISTÓRIA PRIVADA E BOATOS PÚBLICOS
                </h5>
                <div class="ficha-field" style="margin-top: 0.8rem;">
                    <label style="color: var(--neon-red);">HISTÓRIA DO NPC (OBRIGATÓRIA - PRIVADA APENAS PARA MESTRES) *</label>
                    <textarea id="npc-historia" rows="4" required placeholder="Digite a história secreta do NPC. ESTA SEÇÃO NÃO SERÁ EXIBIDA AOS PLAYERS."></textarea>
                </div>
                <div class="ficha-field" style="margin-top: 0.8rem;">
                    <label>BOATOS E INFORMAÇÕES CONHECIDAS (EXIBIDO AOS PLAYERS)</label>
                    <textarea id="npc-boatos" rows="2" placeholder="O que os cidadãos e vilões comentam sobre este NPC nas ruas..."></textarea>
                </div>

                <button type="submit" class="auth-submit-btn master-btn" style="width: 100%; margin-top: 1.2rem;">
                    💾 SALVAR NPC
                </button>
            </form>

            <!-- LISTA DE NPCS CADASTRADOS -->
            <h4 style="color: #fff; font-family: 'Orbitron', sans-serif; font-size: 1.1rem; margin-bottom: 1rem;">
                📋 NPCS CADASTRADOS (${npcs.length})
            </h4>

            ${npcs.length === 0 ? `
                <div style="padding: 1.5rem; text-align: center; border: 1px dashed var(--support-crimson); color: var(--text-muted);">
                    Nenhum NPC criado até o momento.
                </div>
            ` : `
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    ${npcs.map((npc, idx) => `
                        <div style="background: #000; border: 1px solid ${npc.visivel ? 'var(--neon-red)' : '#444'}; border-radius: 6px; padding: 1.2rem; position: relative;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
                                <div style="display: flex; gap: 12px; align-items: center;">
                                    <div style="width: 60px; height: 60px; border-radius: 6px; border: 2px solid var(--neon-red); overflow: hidden; background: #111; flex-shrink: 0;">
                                        <img src="${npc.foto || 'https://via.placeholder.com/150/111111/FF003C?text=NPC'}" style="width:100%; height:100%; object-fit:cover;">
                                    </div>
                                    <div>
                                        <h4 style="color: #fff; font-size: 1.1rem; margin: 0 0 4px 0; font-family: 'Orbitron', sans-serif;">
                                            ${npc.nome} 
                                            <span style="font-size: 0.75rem; padding: 2px 8px; border-radius: 3px; background: ${npc.visivel ? 'rgba(0,255,100,0.1)' : 'rgba(255,0,0,0.1)'}; color: ${npc.visivel ? '#00ff66' : '#ff3333'}; border: 1px solid ${npc.visivel ? '#00ff66' : '#ff3333'};">
                                                ${npc.visivel ? '👁️ VISÍVEL' : '🙈 OCULTO'}
                                            </span>
                                        </h4>
                                        <span style="color: var(--text-muted); font-size: 0.85rem;">Classe: ${npc.classe} | Ranque: ${npc.ranque}</span>
                                    </div>
                                </div>
                                <div style="display: flex; gap: 6px;">
                                    <button type="button" class="res-btn" onclick="toggleNpcVisibility(${idx})" style="padding: 4px 8px;">
                                        ${npc.visivel ? '🙈 Ocultar' : '👁️ Tornar Visível'}
                                    </button>
                                    <button type="button" class="res-btn remove-btn" onclick="deleteNpc(${idx})" style="padding: 4px 8px;">
                                        🗑️ Excluir
                                    </button>
                                </div>
                            </div>

                            <div style="margin-top: 0.8rem; padding: 0.8rem; background: rgba(255,255,255,0.02); border-radius: 4px; font-size: 0.82rem; color: var(--text-muted);">
                                <div><strong>Atributos:</strong> Força Nv.${npc.forca || 1} | Resist. Nv.${npc.resistencia || 1} | Veloc. Nv.${npc.velocidade || 1} | Agil. Nv.${npc.agilidade || 1} | Poder Nv.${npc.poderLevel || 1}</div>
                                <div style="margin-top: 4px;"><strong>Poder:</strong> ${npc.nomePoder || 'N/A'} — <em>${npc.descPoder || 'Sem descrição'}</em></div>
                            </div>

                            <div style="margin-top: 0.8rem; font-size: 0.83rem; color: var(--text-main); background: rgba(255,0,60,0.05); border-left: 3px solid var(--neon-red); padding: 0.6rem 0.8rem;">
                                <strong style="color: var(--neon-red); display: block;">🔒 História (Privada):</strong>
                                ${npc.historia}
                            </div>

                            ${npc.boatos ? `
                                <div style="margin-top: 0.5rem; font-size: 0.83rem; color: var(--text-muted); background: rgba(255,255,255,0.03); border-left: 3px solid #ffaa00; padding: 0.6rem 0.8rem;">
                                    <strong style="color: #ffaa00; display: block;">💬 Boatos (Público):</strong>
                                    ${npc.boatos}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}

function uploadNpcPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_SIZE = 300;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_SIZE) {
                    height *= MAX_SIZE / width;
                    width = MAX_SIZE;
                }
            } else {
                if (height > MAX_SIZE) {
                    width *= MAX_SIZE / height;
                    height = MAX_SIZE;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
            document.getElementById('npc-photo-preview').src = compressedDataUrl;
            document.getElementById('npc-foto-data').value = compressedDataUrl;
        };
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
}

function saveNpcForm(e) {
    e.preventDefault();
    const historia = document.getElementById('npc-historia').value.trim();
    if (!historia) {
        alert('A história do NPC é obrigatória!');
        return;
    }

    const newNpc = {
        foto: document.getElementById('npc-foto-data').value || '',
        nome: document.getElementById('npc-nome').value,
        classe: document.getElementById('npc-classe').value,
        ranque: document.getElementById('npc-ranque').value,
        visivel: document.getElementById('npc-visivel').value === 'true',
        forca: parseInt(document.getElementById('npc-forca').value) || 1,
        resistencia: parseInt(document.getElementById('npc-resistencia').value) || 1,
        velocidade: parseInt(document.getElementById('npc-velocidade').value) || 1,
        agilidade: parseInt(document.getElementById('npc-agilidade').value) || 1,
        poderLevel: parseInt(document.getElementById('npc-poder-level').value) || 1,
        nomePoder: document.getElementById('npc-nome-poder').value,
        descPoder: document.getElementById('npc-desc-poder').value,
        historia: historia,
        boatos: document.getElementById('npc-boatos').value
    };

    const npcs = getNpcs();
    npcs.push(newNpc);
    saveNpcs(npcs);

    alert('NPC criado com sucesso!');
    renderPerfilSection();
}

function toggleNpcVisibility(idx) {
    const npcs = getNpcs();
    if (npcs[idx]) {
        npcs[idx].visivel = !npcs[idx].visivel;
        saveNpcs(npcs);
        renderPerfilSection();
    }
}

function deleteNpc(idx) {
    if (!confirm('Deseja realmente excluir este NPC?')) return;
    const npcs = getNpcs();
    npcs.splice(idx, 1);
    saveNpcs(npcs);
    renderPerfilSection();
}




