// Inicializa os ícones do Lucide
lucide.createIcons();

// Dados das páginas simulando um roteamento
const pages = {
    mapa: {
        title: "Mapa de Unicity",
        content: `
            <p style="color: var(--text-muted); margin-bottom: 1.2rem;">
                <em>A metrópole de Unicity é dividida entre Alta Unicity (Noroeste e Sudoeste) e Baixa Unicity (Nordeste, Sudeste e Arquipélago). Clique nas áreas coloridas do mapa ou utilize os botões dos bairros abaixo para explorar os pontos de interesse, lore e nível de segurança de cada distrito.</em>
            </p>

            <div class="map-container-wrapper">
                <div class="map-image-wrapper">
                    <img src="assets/AwakeningRPGMap.png" alt="Mapa de Unicity" id="unicity-map-img">
                    
                    <svg class="map-svg-overlay" viewBox="0 0 1000 750" preserveAspectRatio="none">
                        <!-- Delly (Vermelho - Topo Esquerdo) -->
                        <polygon points="50,40 450,40 450,450 50,450" class="map-region" onclick="openBairroModal('delly')" title="Delly (Distrito do Poder)"></polygon>
                        
                        <!-- Amberling (Amarelo - Centro Esquerdo) -->
                        <polygon points="450,40 600,40 600,450 450,450" class="map-region" onclick="openBairroModal('amberling')" title="Amberling (Centro Intelectual)"></polygon>
                        
                        <!-- Sammill (Azul - Baixo Esquerdo) -->
                        <polygon points="50,450 450,450 450,700 50,700" class="map-region" onclick="openBairroModal('sammill')" title="Sammill (Onde Tradição Encontra Modernidade)"></polygon>
                        
                        <!-- Dawn Hill (Verde - Topo Direito) -->
                        <polygon points="600,40 980,40 980,280 600,280" class="map-region" onclick="openBairroModal('dawn-hill')" title="Dawn Hill (O Bairro Verde)"></polygon>
                        
                        <!-- Central Sunset (Laranja - Centro-Baixo Direito) -->
                        <polygon points="600,280 980,280 980,550 600,550" class="map-region" onclick="openBairroModal('central-sunset')" title="Central Sunset (Coração Pulsante)"></polygon>
                        
                        <!-- Vienner (Roxo - Arquipélago Sul Direito) -->
                        <polygon points="500,550 980,550 980,720 500,720" class="map-region" onclick="openBairroModal('vienner')" title="Vienner (A Cidade Que Nunca Dorme)"></polygon>
                    </svg>
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
                        <div style="padding: 0.8rem; background: rgba(139,0,0,0.2); border-left: 3px solid var(--neon-red); flex: 1; min-width: 200px;">
                            <strong>COMUM ➔ AVANÇADO</strong><br>
                            <span class="carmine-text" style="font-family: monospace; font-weight: bold;">Custa 400 GP</span>
                        </div>
                        <div style="padding: 0.8rem; background: rgba(139,0,0,0.2); border-left: 3px solid var(--neon-red); flex: 1; min-width: 200px;">
                            <strong>AVANÇADO ➔ SUPER</strong><br>
                            <span class="carmine-text" style="font-family: monospace; font-weight: bold;">Custa 1250 GP</span>
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
             me Porto Antigo',
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
