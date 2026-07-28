// Inicializa os ícones do Lucide
lucide.createIcons();

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
                    <span class="emoji-icon">🟥</span> Delly
                </button>
                <button class="bairro-btn amberling" onclick="openBairroModal('amberling')">
                    <span class="emoji-icon">🟨</span> Amberling
                </button>
                <button class="bairro-btn sammill" onclick="openBairroModal('sammill')">
                    <span class="emoji-icon">🟦</span> Sammill
                </button>
                <button class="bairro-btn dawn-hill" onclick="openBairroModal('dawn-hill')">
                    <span class="emoji-icon">🟩</span> Dawn Hill
                </button>
                <button class="bairro-btn central-sunset" onclick="openBairroModal('central-sunset')">
                    <span class="emoji-icon">🟧</span> Central Sunset
                </button>
                <button class="bairro-btn vienner" onclick="openBairroModal('vienner')">
                    <span class="emoji-icon">🟪</span> Vienner
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
                    <div style="padding: 0.8rem 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 3px solid var(--neon-red); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                        <span>📜 <strong>MISSÕES AUTO NARRADAS</strong></span>
                        <span class="carmine-text" style="font-weight: bold; font-family: monospace;">[ 15 à 30 GP ]</span>
                    </div>
                    <div style="padding: 0.8rem 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 3px solid var(--neon-red); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                        <span>🎯 <strong>MISSÕES NARRADAS ( SECUNDÁRIAS )</strong></span>
                        <span class="carmine-text" style="font-weight: bold; font-family: monospace;">[ 40 à 80 GP ]</span>
                    </div>
                    <div style="padding: 0.8rem 1.2rem; background: var(--bg-primary); border: 1px solid var(--support-crimson); border-left: 3px solid var(--neon-red); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                        <span>🔥 <strong>MISSÕES DE EVENTO ( PRINCIPAIS )</strong></span>
                        <span class="carmine-text" style="font-weight: bold; font-family: monospace;">[ 90 – 200 GP ]</span>
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
                    <p>• <strong>Sem Reembolso:</strong> Não há reembolso de GP ao descartar, vender ou doar. Doar abre o slot apenas se o recebedor tiver slot disponível.</p>
                </div>

                <!-- COMANDOS DA FICHA -->
                <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-primary); border: 1px solid var(--neon-red); border-left: 4px solid var(--neon-red); border-radius: 4px;">
                    <p style="font-family: monospace; font-size: 0.9em; margin: 0;">
                        <span style="color: var(--text-muted);">❗ • PARA RECEBER A FICHA DE CRIAÇÃO DE TRAJE OU EQUIPAMENTOS USE OS COMANDOS ABAIXO:</span><br>
                        <strong style="color: var(--text-main); font-size: 1.1em; display: inline-block; margin-top: 8px;">//ficha-traje</strong> &nbsp;|&nbsp; 
                        <strong style="color: var(--text-main); font-size: 1.1em; display: inline-block; margin-top: 8px;">//ficha-equip</strong>
                    </p>
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

// Alterna sub-abas (Atributos e Evolução / Equipamentos e Trajes)
function switchSubTab(subTabId) {
    const atributosSec = document.getElementById('subtab-atributos');
    const equipamentosSec = document.getElementById('subtab-equipamentos');
    const btnAtributos = document.getElementById('tab-btn-atributos');
    const btnEquipamentos = document.getElementById('tab-btn-equipamentos');

    if (!atributosSec || !equipamentosSec) return;

    if (subTabId === 'atributos') {
        atributosSec.style.display = 'block';
        equipamentosSec.style.display = 'none';
        btnAtributos.classList.add('active');
        btnEquipamentos.classList.remove('active');
    } else if (subTabId === 'equipamentos') {
        atributosSec.style.display = 'none';
        equipamentosSec.style.display = 'block';
        btnAtributos.classList.remove('active');
        btnEquipamentos.classList.add('active');
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

// Mestres Supremos (acesso automático como Admin Principal ao se registrar)
const SUPREME_MASTERS = ['DanteSTR', 'ghusAWK'];

// Senha mestre padrão (pode ser alterada)
const MASTER_DEFAULT_PASSWORD = 'AwakeningMaster2025';

// Chaves no localStorage
const KEY_USERS    = 'awrpg_users';
const KEY_SESSION  = 'awrpg_session';

// Retorna lista de usuários do localStorage
function getUsers() {
    try { return JSON.parse(localStorage.getItem(KEY_USERS)) || []; }
    catch { return []; }
}

// Salva lista de usuários
function saveUsers(users) {
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
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

    const users = getUsers();
    const exists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists) {
        return showAuthError(errorId, 'Esse nome de jogador já está em uso.');
    }

    // Determina role: Mestres Supremos têm prioridade
    const role = SUPREME_MASTERS.includes(username) ? 'supreme' : 'player';

    const newUser = {
        username,
        age: parseInt(age),
        availability,
        password: btoa(password), // armazenamento simples (base64)
        role
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
    const user  = users.find(u => u.username === username);

    if (user && (user.role === 'supreme' || user.role === 'master')) {
        if (user.password !== btoa(password)) {
            return showAuthError(errorId, 'Senha incorreta.');
        }
        return enterApp({ username: user.username, role: user.role });
    }

    // Acesso via senha padrão de mestre (para admins não registrados ainda)
    if (password === MASTER_DEFAULT_PASSWORD) {
        const isSup = SUPREME_MASTERS.includes(username);
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
                            <option value="Hermafrodita" ${currentChar.genero === 'Hermafrodita' ? 'selected' : ''}>Hermafrodita</option>
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
                        <input type="text" id="fc-ranque" value="${currentChar.ranque || 'Iniciante'}" readonly style="background: rgba(255,255,255,0.02);">
                    </div>
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
                    <button type="button" class="view-levels-btn" onclick="runPowerBalancer()" style="margin-top: 0.5rem; align-self: flex-start;">
                        ⚡ BALANCEAR PODER / ESPECIALIDADE (IA LOCAL)
                    </button>
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
        ranque: 'Iniciante',
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
    if (classe === 'Herói') ranqueInput.value = 'Ranque C (Iniciante)';
    else if (classe === 'Anti-Herói') ranqueInput.value = 'Vigilante Independente';
    else if (classe === 'Vilão') ranqueInput.value = 'Ameaça Nível I';
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
        categoriaPoder: document.getElementById('fc-categoria-poder').value,
        nomePoder: document.getElementById('fc-nome-poder').value,
        tipoPoder: document.getElementById('fc-tipo-poder')?.value || 'Emissão',
        descPoder: document.getElementById('fc-desc-poder').value,
        habilidades,
        trajes,
        equips,
        historia: document.getElementById('fc-historia').value,
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



