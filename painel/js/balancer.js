// ═══════════════════════════════════════════════════════════════
//      MATRIZ DE BALANCEAMENTO LOCAL — AWAKENING RPG (IA v2)
//      Inclui: verificação de banimento + lógica por nível
// ═══════════════════════════════════════════════════════════════

// ─── Palavras-chave de risco ALTO (Overpowered) ───
const BALANCER_KEYWORDS = {
    highRisk: [
        { word: 'morte instantânea',        points: 45, risk: 'Extremo' },
        { word: 'instakill',                points: 45, risk: 'Extremo' },
        { word: 'matar instantaneamente',   points: 45, risk: 'Extremo' },
        { word: 'imortalidade',             points: 50, risk: 'Extremo' },
        { word: 'invulnerabilidade',        points: 40, risk: 'Extremo' },
        { word: 'onipotência',              points: 99, risk: 'Banido'  },
        { word: 'onisciência',              points: 99, risk: 'Banido'  },
        { word: 'onipresença',              points: 99, risk: 'Banido'  },
        { word: 'controle mental',          points: 35, risk: 'Alto'   },
        { word: 'controle total da mente',  points: 60, risk: 'Extremo' },
        { word: 'paralisia permanente',     points: 35, risk: 'Alto'   },
        { word: 'destruir cidade',          points: 40, risk: 'Extremo' },
        { word: 'destruição universal',     points: 99, risk: 'Banido'  },
        { word: 'apagar existência',        points: 99, risk: 'Banido'  },
        { word: 'reescrever realidade',     points: 99, risk: 'Banido'  },
        { word: 'manipulação absoluta',     points: 99, risk: 'Banido'  },
        { word: 'sem limites',              points: 50, risk: 'Extremo' },
        { word: 'poder ilimitado',          points: 99, risk: 'Banido'  },
        { word: 'copiar qualquer poder',    points: 55, risk: 'Extremo' },
        { word: 'nulificar todos',          points: 55, risk: 'Extremo' },
        { word: 'viagem no tempo',          points: 50, risk: 'Extremo' },
        { word: 'ressurreição ilimitada',   points: 60, risk: 'Extremo' },
        { word: 'buraco negro',             points: 45, risk: 'Extremo' },
        { word: 'deletar',                  points: 35, risk: 'Alto'   },
        { word: 'apagamento',               points: 40, risk: 'Alto'   }
    ],
    moderateRisk: [
        { word: 'cura',           points: 15, recarga: '2 Turnos'          },
        { word: 'regeneração',    points: 20, recarga: '3 Turnos'          },
        { word: 'teleporte',      points: 20, recarga: '2 Turnos'          },
        { word: 'invisibilidade', points: 18, recarga: '2 Turnos'          },
        { word: 'escudo',         points: 12, recarga: '1 Turno'           },
        { word: 'barreira',       points: 14, recarga: '1 a 2 Turnos'      },
        { word: 'paralisar',      points: 22, recarga: '3 Turnos'          },
        { word: 'stun',           points: 15, recarga: '2 Turnos'          },
        { word: 'atordoar',       points: 15, recarga: '2 Turnos'          },
        { word: 'explosão',       points: 18, recarga: '2 Turnos'          },
        { word: 'voo',            points: 12, recarga: 'Passivo / 1 Turno' },
        { word: 'duplicação',     points: 25, recarga: '3 Turnos'          },
        { word: 'clonar',         points: 28, recarga: '3 a 4 Turnos'      },
        { word: 'absorver',       points: 22, recarga: '2 Turnos'          },
        { word: 'drenar',         points: 22, recarga: '2 Turnos'          },
        { word: 'manipular',      points: 20, recarga: '2 Turnos'          },
        { word: 'controlar',      points: 25, recarga: '3 Turnos'          }
    ]
};

// ─── Limite de poder por nível de atributo ───────────────────────
// Nv 1 = max 35pts | Nv 3 = max 65pts | Nv 6 = max 110pts | Nv 10 = max 170pts
function maxScoreForLevel(nivel) {
    return 20 + (nivel * 15);
}

// ─── Termos fuzzy da lista de banimento (para detecção textual) ──
const BAN_FUZZY_TERMS = [
    'buraco negro', 'buracos negros',
    'onipotência', 'onipotente',
    'onisciência', 'onisciente',
    'onipresença', 'onipresente',
    'omni-poder', 'omnipoder',
    'manipulação absoluta da realidade', 'manipular realidade',
    'reescrever existência', 'reescrita da existência',
    'apagar existência', 'apagamento da existência',
    'aniquilação total', 'aniquilar tudo',
    'causalidade absoluta',
    'controle do destino', 'manipulação do destino',
    'controle absoluto da morte',
    'ressurreição ilimitada', 'ressuscitar infinitamente',
    'imortalidade absoluta', 'absolutamente imortal',
    'invulnerabilidade absoluta', 'absolutamente invulnerável',
    'poder ilimitado', 'sem limites de poder',
    'copiar qualquer poder', 'cópia absoluta',
    'nulificar qualquer poder', 'nulificação absoluta',
    'viagem no tempo', 'viajar no tempo', 'alterar o passado',
    'controle total da mente', 'dominar qualquer mente',
    'apagar memórias permanentemente',
    'recriar universo', 'recriação universal',
    'destruição universal', 'destruir universo',
    'manipulação dimensional absoluta',
    'poder de deus', 'poder divino', 'nivelado a deus',
    'controlar outros personagens', 'controle absoluto de personagens',
    'criar doenças', 'manipulação de doenças'
];

/**
 * Verifica se a ficha contém poderes banidos.
 * @param {Object} charData — dados da ficha do personagem
 * @returns {{ blocked: boolean, matches: string[], field: string }}
 */
function checkBannedPowers(charData) {
    const textToCheck = [
        charData.nomePoder   || '',
        charData.descPoder   || '',
        charData.habilidades || '',
        charData.historia    || ''
    ].join(' ').toLowerCase();

    const matches = [];

    // Verifica lista oficial de banimento
    if (typeof BANNED_POWERS !== 'undefined') {
        BANNED_POWERS.forEach(banned => {
            const term = banned.toLowerCase();
            if (textToCheck.includes(term)) {
                matches.push(banned);
            }
        });
    }

    // Verifica termos fuzzy adicionais
    BAN_FUZZY_TERMS.forEach(term => {
        if (textToCheck.includes(term.toLowerCase()) && !matches.includes(term)) {
            matches.push(term);
        }
    });

    return {
        blocked: matches.length > 0,
        matches
    };
}

/**
 * Exibe modal de bloqueio quando um poder banido é detectado.
 */
function showBanBlockModal(banCheck) {
    let existing = document.getElementById('ban-block-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'ban-block-modal';
    modal.className = 'level-modal-overlay active';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    modal.innerHTML = `
        <div class="level-modal-card" style="max-width:560px; border-color: var(--neon-red);" onclick="event.stopPropagation()">
            <div class="level-modal-header">
                <h3 style="color: var(--neon-red); display:flex; align-items:center; gap:10px; font-size:1.1rem;">
                    ⛔ FICHA BLOQUEADA — PODER PROIBIDO
                </h3>
                <button class="level-modal-close" onclick="document.getElementById('ban-block-modal').remove()">&times;</button>
            </div>

            <div style="background:#000; border: 1px solid var(--neon-red); border-radius:4px; padding:1rem 1.2rem; margin-bottom:1rem;">
                <p style="color:#fff; font-size:0.9rem; line-height:1.7; margin-bottom:0.8rem;">
                    A análise automática detectou <strong style="color:var(--neon-red);">${banCheck.matches.length} termo(s) proibido(s)</strong>
                    na sua ficha. A submissão foi <strong>bloqueada automaticamente</strong>.
                </p>
                <p style="color: var(--text-muted); font-size:0.82rem;">Termos detectados:</p>
                <ul style="margin: 0.5rem 0 0 1.2rem; padding:0; color:var(--neon-red); font-size:0.85rem; line-height:2;">
                    ${banCheck.matches.map(m => `<li style="font-weight:bold;">⛔ ${m}</li>`).join('')}
                </ul>
            </div>

            <div style="background: rgba(255,0,60,0.05); border:1px solid rgba(255,0,60,0.3); border-radius:4px; padding:0.9rem 1rem; font-size:0.82rem; color:var(--text-muted); line-height:1.7; margin-bottom:1rem;">
                ❗ <em>Remova ou reformule o poder para que ele não contenha os termos acima. Poderes que
                simulem efeitos proibidos por outros meios também serão recusados pelos Mestres.
                Consulte a aba <strong style="color:#fff;">Poderes Usados</strong> para ver a lista completa.</em>
            </div>

            <button type="button" class="auth-submit-btn" style="width:100%;" onclick="document.getElementById('ban-block-modal').remove()">
                ENTENDIDO — CORRIGIR FICHA
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}

/**
 * Analisa a descrição do Meta-Poder ou Especialidade e retorna parecer técnico de balanceamento.
 * Agora considera o nível do personagem de forma rigorosa.
 */
function analyzePowerBalance(nome, categoria, tipo, descricao, nivelAtributo = 1) {
    if (!descricao || descricao.trim().length < 10) {
        return {
            status: 'indeterminado',
            score: 0,
            veredicto: 'Descrição muito curta para análise técnica.',
            recomendacao: 'Descreva detalhadamente o efeito, alcance e limitação do poder.',
            cooldownSugerido: 'N/A',
            custoSugerido: 'N/A',
            detectedRisks: [],
            detectedEffects: [],
            analiseDetalhada: 'Texto insuficiente para avaliação.',
            corStatus: '#666'
        };
    }

    const textLower = (nome + ' ' + descricao).toLowerCase();
    let powerScore = 15; // Pontuação base
    let detectedRisks = [];
    let detectedEffects = [];

    // Verificação de riscos altos
    BALANCER_KEYWORDS.highRisk.forEach(item => {
        if (textLower.includes(item.word)) {
            powerScore += item.points;
            detectedRisks.push(`Termo de alto impacto [${item.risk}]: "${item.word}"`);
        }
    });

    // Verificação de efeitos moderados
    BALANCER_KEYWORDS.moderateRisk.forEach(item => {
        if (textLower.includes(item.word)) {
            powerScore += item.points;
            detectedEffects.push(`Efeito moderado: "${item.word}" → recarga sugerida: ${item.recarga}`);
        }
    });

    // Limite por nível de personagem
    const maxAllowed = maxScoreForLevel(nivelAtributo);

    let status    = 'balanceado';
    let veredicto = '✅ PERFEITAMENTE BALANCEADO';
    let corStatus = '#00aa44';

    if (powerScore >= 90) {
        // Score de banimento — inclui termos da lista proibida
        status    = 'banido';
        veredicto = '⛔ PODER COM CARACTERÍSTICAS BANIDAS (RECUSA AUTOMÁTICA)';
        corStatus = '#ff003c';
    } else if (powerScore > maxAllowed + 25) {
        status    = 'overpowered';
        veredicto = '⚠️ OVERPOWERED — NECESSITA NERF OU MAIOR RECARGA';
        corStatus = '#ff003c';
    } else if (powerScore > maxAllowed) {
        status    = 'moderado';
        veredicto = '⚡ LEVEMENTE FORTE — AJUSTAR COOLDOWN';
        corStatus = '#ffaa00';
    } else if (powerScore < 15) {
        status    = 'fraco';
        veredicto = '🛡️ PODER MUITO SIMPLES — PODE ADICIONAR EFEITOS';
        corStatus = '#0088ff';
    }

    // Cooldown e custo baseados em score E nível
    let cooldownSugerido = '1 Turno';
    let custoSugerido    = 'Baixo consumo de energia';

    const adjustedScore = powerScore / Math.max(nivelAtributo * 0.5, 1);

    if (adjustedScore >= 60) {
        cooldownSugerido = '4 Turnos ou 1x por Combate';
        custoSugerido    = 'Fadiga extrema / Consome 40% de stamina ou recurso';
    } else if (adjustedScore >= 40) {
        cooldownSugerido = '2 a 3 Turnos';
        custoSugerido    = 'Exige concentração contínua / Custo moderado';
    } else if (adjustedScore >= 25) {
        cooldownSugerido = '1 a 2 Turnos';
        custoSugerido    = 'Custo normal de ação';
    }

    return {
        status,
        score: Math.min(powerScore, 100),
        maxScoreAllowed: maxAllowed,
        veredicto,
        corStatus,
        detectedRisks,
        detectedEffects,
        cooldownSugerido,
        custoSugerido,
        analiseDetalhada: `Poder de categoria "${categoria}" (${tipo || 'Geral'}) avaliado para Nível ${nivelAtributo}. Pontuação de impacto: ${Math.min(powerScore,100)}/100 (máx permitido para este nível: ${maxAllowed}).`
    };
}

// ─── Modal de resultado de balanceamento ────────────────────────
function showBalancerModal(result) {
    let existingModal = document.getElementById('balancer-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'balancer-modal';
    modal.className = 'level-modal-overlay active';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    modal.innerHTML = `
        <div class="level-modal-card" style="max-width: 600px;" onclick="event.stopPropagation()">
            <div class="level-modal-header">
                <h3 style="color: var(--neon-red); display: flex; align-items: center; gap: 8px;">
                    🤖 MATRIZ DE BALANCEAMENTO LOCAL
                </h3>
                <button class="level-modal-close" onclick="document.getElementById('balancer-modal').remove()">&times;</button>
            </div>

            <div style="background: rgba(0,0,0,0.7); padding: 1rem; border-radius: 4px; border: 1px solid ${result.corStatus}; margin-bottom: 1rem;">
                <h4 style="color: ${result.corStatus}; margin: 0 0 0.5rem 0; font-size: 1.05rem;">
                    ${result.veredicto}
                </h4>
                <p style="color: var(--text-muted); font-size: 0.85em; margin: 0;">
                    ${result.analiseDetalhada}
                </p>
            </div>

            <div class="ficha-grid-2" style="margin-bottom: 1rem;">
                <div style="background: rgba(255,255,255,0.03); padding: 0.8rem; border-left: 3px solid var(--neon-red);">
                    <strong style="color: var(--neon-red); font-size: 0.8em;">RECARGA SUGERIDA:</strong>
                    <div style="color: #fff; font-weight: bold; margin-top: 4px;">${result.cooldownSugerido}</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); padding: 0.8rem; border-left: 3px solid var(--neon-red);">
                    <strong style="color: var(--neon-red); font-size: 0.8em;">CUSTO DE USO SUGERIDO:</strong>
                    <div style="color: #fff; font-weight: bold; margin-top: 4px;">${result.custoSugerido}</div>
                </div>
            </div>

            ${result.detectedRisks.length > 0 ? `
                <div style="margin-bottom: 1rem; padding: 0.8rem; background: rgba(255,0,60,0.08); border: 1px solid var(--neon-red); border-radius:4px;">
                    <strong style="color: var(--neon-red); font-size: 0.85em;">ALERTAS DE IMPACTO DETECTADOS:</strong>
                    <ul style="margin: 0.5rem 0 0 1.2rem; color: var(--text-muted); font-size: 0.85em;">
                        ${result.detectedRisks.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            ${result.detectedEffects.length > 0 ? `
                <div style="margin-bottom: 1rem; padding: 0.8rem; background: rgba(255,170,0,0.06); border: 1px solid rgba(255,170,0,0.3); border-radius:4px;">
                    <strong style="color: #ffaa00; font-size: 0.85em;">EFEITOS MODERADOS DETECTADOS:</strong>
                    <ul style="margin: 0.5rem 0 0 1.2rem; color: var(--text-muted); font-size: 0.82em;">
                        ${result.detectedEffects.map(e => `<li>${e}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <button type="button" class="auth-submit-btn" style="width: 100%; margin-top: 0.5rem;" onclick="document.getElementById('balancer-modal').remove()">
                ENTENDIDO / APLICAR BALANCEAMENTO
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}
