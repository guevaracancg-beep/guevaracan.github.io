/**
 * DICCIONARIO DE TRADUCCIONES
 * Detecta el idioma del atributo <html lang="...">
 */
const traducciones = {
    es: {
        inhale: "Inhala",
        hold: "Mantén",
        exhale: "Exhala",
        ritmo: "Siguiendo ritmo: ",
        tecnicas: {
            caja: "Respiración en Caja",
            t478: "Técnica 4-7-8",
            relajante: "Relajación (4-6)"
        }
    },
    en: {
        inhale: "Breathe In",
        hold: "Hold",
        exhale: "Breathe Out",
        ritmo: "Following rhythm: ",
        tecnicas: {
            caja: "Box Breathing",
            t478: "4-7-8 Technique",
            relajante: "Relaxation (4-6)"
        }
    },
    pt: {
        inhale: "Inspire",
        hold: "Segure",
        exhale: "Expire",
        ritmo: "Seguindo o ritmo: ",
        tecnicas: {
            caja: "Respiração em Caixa",
            t478: "Técnica 4-7-8",
            relajante: "Relaxamento (4-6)"
        }
    },
    fr: {
        inhale: "Inspirez",
        hold: "Retenez",
        exhale: "Expirez",
        ritmo: "Rythme actuel : ",
        tecnicas: {
            caja: "Respiration Carrée",
            t478: "Technique 4-7-8",
            relajante: "Relaxation (4-6)"
        }
    }
};

// 1. Detectar idioma (por defecto español si no encuentra)
const lang = document.documentElement.lang || 'es';
const t = traducciones[lang] || traducciones.es;

// 2. Configuración de tiempos y nombres traducidos
const tecnicas = {
    caja: { inhale: 4000, hold: 4000, exhale: 4000, hold2: 4000, texto: t.tecnicas.caja },
    478: { inhale: 4000, hold: 7000, exhale: 8000, hold2: 0, texto: t.tecnicas.t478 },
    relajante: { inhale: 4000, hold: 0, exhale: 6000, hold2: 0, texto: t.tecnicas.relajante }
};

let tecnicaActual = tecnicas.caja;
let timer;

/**
 * CAMBIAR TÉCNICA
 */
function cambiarTecnica(tipo) {
    tecnicaActual = tecnicas[tipo];
    document.getElementById('instruccion').innerText = t.ritmo + tecnicaActual.texto;
    
    document.querySelectorAll('.btn-tecnica').forEach(btn => btn.classList.remove('active'));
    
    // Manejo de evento para evitar errores si se llama manualmente
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    clearTimeout(timer);
    iniciarCiclo();
}

/**
 * CICLO DE ANIMACIÓN
 */
function iniciarCiclo() {
    const visualGroup = document.getElementById('water-visual');
    const textoGuia = document.getElementById('texto-guia');

    // FASE 1: INHALAR
    textoGuia.innerText = t.inhale;
    visualGroup.style.transform = "scale(1.30)"; 
    visualGroup.style.transition = `transform ${tecnicaActual.inhale}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    timer = setTimeout(() => {
        if (tecnicaActual.hold > 0) {
            // FASE 2: MANTENER
            textoGuia.innerText = t.hold;
            timer = setTimeout(faseExhalar, tecnicaActual.hold);
        } else {
            faseExhalar();
        }
    }, tecnicaActual.inhale);

    function faseExhalar() {
        // FASE 3: EXHALAR
        textoGuia.innerText = t.exhale;
        visualGroup.style.transform = "scale(1)"; 
        visualGroup.style.transition = `transform ${tecnicaActual.exhale}ms cubic-bezier(0.4, 0, 0.2, 1)`;

        timer = setTimeout(() => {
            if (tecnicaActual.hold2 > 0) {
                // FASE 4: MANTENER (Solo técnica de Caja)
                textoGuia.innerText = t.hold;
                timer = setTimeout(iniciarCiclo, tecnicaActual.hold2);
            } else {
                iniciarCiclo();
            }
        }, tecnicaActual.exhale);
    }
}

// Iniciar automáticamente al cargar
iniciarCiclo();
