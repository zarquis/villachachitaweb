/* ==========================================================================
   LÓGICA UNIFICADA Y REPARADA (MERCADO Y TIRILLA) - VILLA CHACHITA
   ========================================================================== */

// Formateador estándar para moneda colombiana (COP)
const fmtCOP = (v) => new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
    minimumFractionDigits: 0 
}).format(v);

// VARIABLES GLOBALES DE MERCADO (Valores de referencia estables)
let dolarTRM = 3796.78; 
let cargaCafeFNC = 2223000; 

// 1. CARGA AUTOMÁTICA DE DATOS DESDE APIS REALES
async function cargarDatosMercado() {
    try {
        const resTRM = await fetch("https://dolarapi.com");
        if(resTRM.ok) {
            const dataTRM = await resTRM.json();
            dolarTRM = dataTRM.valor;
        }
    } catch (e) {
        console.warn("Villa Chachita: Usando TRM de respaldo.");
    }

    // Ejecutar llamados de renderizado
    actualizarTirillaFinanciera();
    actualizarComponentesInternos();
}

// 2. INYECCIÓN DINÁMICA DE LA TIRILLA INFERIOR (LOOP INFINITO CON NUEVOS NOMBRES)
function actualizarTirillaFinanciera() {
    let factorMercado = Math.max(0, Math.floor((cargaCafeFNC - 1800000) / 100000) * 500);
    
    // Calibración matemática exacta para dar $27.000 y $39.000 comerciales respectivamente
    let precioCotidiano = 25000 + factorMercado;   
    let precioEspecialidad = 37000 + factorMercado; 

    const contenidoIndicadores = `
        <div class="chachita-ticker-item">
            <span class="ticker-title">☕ Carga de Café (FNC):</span>
            <span class="ticker-value">${fmtCOP(cargaCafeFNC)}</span>
            <span class="ticker-status">● Ref. Risaralda</span>
        </div>
        <div class="chachita-ticker-item">
            <span class="ticker-title">💵 Dólar TRM:</span>
            <span class="ticker-value">${fmtCOP(dolarTRM)} COP</span>
            <span class="ticker-status">▲ Mercado</span>
        </div>
        <div class="chachita-ticker-item">
            <span class="ticker-title">🍂 Chachita Cotidiano (500g):</span>
            <span class="ticker-value">${fmtCOP(precioCotidiano)}</span>
            <span class="ticker-status">✓ En Origen</span>
        </div>
        <div class="chachita-ticker-item">
            <span class="ticker-title">👑 De Especialidad (500g):</span>
            <span class="ticker-value">${fmtCOP(precioEspecialidad)}</span>
            <span class="ticker-status">⭐ Recomendado</span>
        </div>
    `;

    const trackElement = document.getElementById("chachita-ticker-data");
    if (trackElement) {
        trackElement.innerHTML = contenidoIndicadores + contenidoIndicadores;
    }
}

// 3. ACTUALIZACIÓN DE PRECIOS EN LAS TARJETAS Y COMPONENTES SUELTOS
function actualizarComponentesInternos() {
    const precioKg = Math.round(cargaCafeFNC / 125);
    const variacionAleatoria = (Math.random() * 2 - 1).toFixed(2);

    const elCarga = document.getElementById("carga");
    const elPrecio = document.getElementById("precio");
    const elDolar = document.getElementById("dolar");
    const elVariacion = document.getElementById("variacion");

    if (elCarga) elCarga.textContent = fmtCOP(cargaCafeFNC);
    if (elPrecio) elPrecio.textContent = fmtCOP(precioKg) + " / Kg";
    if (elDolar) elDolar.textContent = fmtCOP(dolarTRM);
    
    if (elVariacion) {
        elVariacion.textContent = variacionAleatoria + "%";
        elVariacion.className = variacionAleatoria >= 0 ? "up" : "down";
    }

    // Sincronización exacta con las nuevas IDs de tu catálogo de productos
    let factorMercado = Math.max(0, Math.floor((cargaCafeFNC - 1800000) / 100000) * 500);
    const elWebCotidiano = document.getElementById("web-precio-cotidiano");
    const elWebEspecialidad = document.getElementById("web-precio-especialidad");

    if (elWebCotidiano) elWebCotidiano.textContent = fmtCOP(25000 + factorMercado) + " COP";
    if (elWebEspecialidad) elWebEspecialidad.textContent = fmtCOP(37000 + factorMercado) + " COP";
}

// 4. CONTROLADOR NATIVO DEL SLIDER AUTOMÁTICO (CORREGIDO Y AJUSTADO)
let slideIndex = 0;
function cambiarSlide() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return; 

    slides.forEach(s => s.classList.remove("active"));
    slideIndex++;
    if (slideIndex >= slides.length) slideIndex = 0;

    slides[slideIndex].classList.add("active");
}

// 5. INICIALIZADOR GLOBAL AL CARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", function() {
    cargarDatosMercado();
    
    setInterval(cargarDatosMercado, 60000); // Refresca APIs cada minuto
    setInterval(cambiarSlide, 3000);         // Gira el slider cada 3 segundos
});
