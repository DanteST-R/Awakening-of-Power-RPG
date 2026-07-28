// ═══════════════════════════════════════════════════════════════
//          MATRIZ DE BALANCEAMENTO LOCAL (IA HEURÍSTICA)
// ═══════════════════════════════════════════════════════════════

const BALANCER_KEYWORDS = {
    highRisk: [
        { word: 'morte instantânea', points: 40, risk: 'Extremo' },
        { word: 'instakill', points: 40, risk: 'Extremo' },
        { word: 'controle mental', points: 30, risk: 'Alto' },
        { word: 'paralisia permanente', points: 30, risk: 'Alto' },
        { word: 'invulnerabilidade', points: 35, risk: 'Alto' },
        { word: 'imortalidade', points: 45, risk: 'Extremo' },
        { word: 'destruir cidade', points: 35, risk: 'Alto' },
        { word: 'deletar', points: 30, risk: 'Alto' }
    ],
    moderateRisk: [
        { word: 'cura', points: 15, recarga: '2 Turnos' },
        { word: 'regeneração', points: 20, recarga: '3 Turnos' },
        { word: 'teleporte', points: 20, recarga: '2 Turnos' },
        { word: 'invisibilidade', points: 15, recarga: '2 Turnos' },
        { word: 'escudo', points: 10, recarga: '1 Turno' },
        { word: 'paralisar', points: 20, recarga: '3 Turnos' },
        { word: 'stunt', points: 15, recarga: '2 Turnos' },
        { word: 'atordoar', points: 15, recarga: '2 Turnos' },
        { word: 'explosão', points: 15, recarga: '2 Turnos' },
        { word: 'voo', points: 10, recarga: 'Passivo / 1 Turno' }
    ]
};

/**
 * Analisa a descrição do Meta-Poder ou Especialidade e retorna parecer técnico de balanceamento.
 */
function analyzePowerBalance(nome, categoria, tipo, descricao, nivelAtributo = 1) {
    if (!descricao || descricao.trim().length < 10) {
        return {
            status: 'indeterminado',
            score: 0,
            veredicto: 'Descrição muito curta para análise técnica.',
            recomendacao: 'Descreva detalhadamente o efeito, alcance e limitação do poder.',
            cooldownSugerido: 'N/A',
            custoSugerido: 'N/A'
        };
    }

    const textLower = (nome + " " + descricao).toLowerCase();
    let powerScore = 15; // Pontuação base
    let detectedRisks = [];
    let detectedEffects = [];

    // Verificação de riscos altos (Overpower)
    BALANCER_KEYWORDS.highRisk.forEach(item => {
        if (textLower.includes(item.word)) {
            powerScore += item.points;
            detectedRisks.push(`Termo de alto impacto: "${item.word}"`);
        }
    });

    // Verificação de efeitos moderados
    BALANCER_KEYWORDS.moderateRisk.forEach(item => {
        if (textLower.includes(item.word)) {
            powerScore += item.points;
            detectedEffects.push(`Efeito: "${item.word}"`);
        }
    });

    // Ajuste baseado no nível do personagem
    const maxScoreAllowed = 20 + (nivelAtributo * 15); // Nv 1 = max 35; Nv 6 = max 110

    let status = 'balanceado';
    let veredicto = 'PERFEITAMENTE BALANCEADO';
    let corStatus = '#00aa44'; // Verde

    if (powerScore > maxScoreAllowed + 25) {
        status = 'overpowered';
        veredicto = '⚠️ OVERPOWERED (NECESSITA NERF OU MAIOR RECARGA)';
        corStatus = '#ff003c'; // Vermelho Neon
    } else if (powerScore > maxScoreAllowed) {
        status = 'moderado';
        veredicto = '⚡ LEVEMENTE FORTE (AJUSTAR COOLDOWN)';
        corStatus = '#ffaa00'; // Amarelo/Laranja
    } else if (powerScore < 15) {
        status = 'fraco';
        veredicto = '🛡️ PODER MUITO SIMPLES (PODE ADICIONAR EFEITOS)';
        corStatus = '#0088ff'; // Azul
    }

    // Cálculo de Cooldown e Custo Sugeridos
    let cooldownSugerido = '1 Turno';
    let custoSugerido = 'Baixo consumo de energia';

    if (powerScore >= 60) {
        cooldownSugerido = '4 Turnos ou 1x por Combate';
        custoSugerido = 'Fadiga extrema / Consome 40% de stamina ou recurso';
    } else if (powerScore >= 40) {
        cooldownSugerido = '2 a 3 Turnos';
        custoSugerido = 'Exige concentração contínua / Custo moderado';
    } else if (powerScore >= 25) {
        cooldownSugerido = '1 a 2 Turnos';
        custoSugerido = 'Custo normal de ação';
    }

    return {
        status,
        score: Math.min(powerScore, 100),
        maxScoreAllowed,
        veredicto,
        corStatus,
        detectedRisks,
        detectedEffects,
        cooldownSugerido,
        custoSugerido,
        analiseDetalhada: `Poder de categoria "${categoria}" (${tipo || 'Geral'}) avaliado para Nível ${nivelAtributo}. Pontuação de impacto: ${powerScore}/100.`
    };
}

// Injeta o modal de resultado de balanceamento na tela
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

            <div style="background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 4px; border: 1px solid ${result.corStatus}; margin-bottom: 1rem;">
                <h4 style="color: ${result.corStatus}; margin: 0 0 0.5rem 0; font-size: 1.1rem;">
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
                <div style="margin-bottom: 1rem; padding: 0.8rem; background: rgba(255,0,60,0.1); border: 1px solid var(--neon-red);">
                    <strong style="color: var(--neon-red); font-size: 0.85em;">ALERTAS DE IMPACTO DETECTADOS:</strong>
                    <ul style="margin: 0.5rem 0 0 1.2rem; color: var(--text-muted); font-size: 0.85em;">
                        ${result.detectedRisks.map(r => `<li>${r}</li>`).join('')}
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
