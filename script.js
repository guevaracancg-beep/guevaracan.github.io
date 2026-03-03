const tecnicas = {
    caja: { inhale: 4000, hold: 4000, exhale: 4000, hold2: 4000, texto: "Respiración en Caja" },
    478: { inhale: 4000, hold: 7000, exhale: 8000, hold2: 0, texto: "Técnica 4-7-8" },
    relajante: { inhale: 4000, hold: 0, exhale: 6000, hold2: 0, texto: "Relajación (4-6)" }
};

let tecnicaActual = tecnicas.caja;
let timer;

function cambiarTecnica(tipo) {
    tecnicaActual = tecnicas[tipo];
    document.getElementById('instruccion').innerText = "Siguiendo ritmo: " + tecnicaActual.texto;
    
    document.querySelectorAll('.btn-tecnica').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    clearTimeout(timer);
    iniciarCiclo();
}

function iniciarCiclo() {
    const visualGroup = document.getElementById('water-visual');
    const textoGuia = document.getElementById('texto-guia');

    // FASE 1: INHALAR - Expansión más pronunciada (1.45)
    textoGuia.innerText = "INHALA";
    visualGroup.style.transform = "scale(1.45)"; 
    visualGroup.style.transition = `transform ${tecnicaActual.inhale}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    timer = setTimeout(() => {
        if (tecnicaActual.hold > 0) {
            textoGuia.innerText = "MANTÉN";
            timer = setTimeout(faseExhalar, tecnicaActual.hold);
        } else {
            faseExhalar();
        }
    }, tecnicaActual.inhale);

    function faseExhalar() {
        // FASE 3: EXHALAR - Contracción total
        textoGuia.innerText = "EXHALA";
        visualGroup.style.transform = "scale(1)"; 
        visualGroup.style.transition = `transform ${tecnicaActual.exhale}ms cubic-bezier(0.4, 0, 0.2, 1)`;

        timer = setTimeout(() => {
            if (tecnicaActual.hold2 > 0) {
                textoGuia.innerText = "MANTÉN";
                timer = setTimeout(iniciarCiclo, tecnicaActual.hold2);
            } else {
                iniciarCiclo();
            }
        }, tecnicaActual.exhale);
    }
}

iniciarCiclo();