// ============================================================
//  Colorfly Studio — main.js
// ============================================================

// ── Referencias al DOM ───────────────────────────────────────
const generateBtn       = document.getElementById("generate-btn");
const paletteSizeSelect = document.getElementById("palette-size");
const colorFormatSelect = document.getElementById("color-format");
const paletteContainer  = document.getElementById("palette-container");
const descriptionEl     = document.getElementById("palette-description");
const moodTagsEl        = document.getElementById("palette-mood");
const historyContainer  = document.getElementById("history-container");
const toastEl           = document.getElementById("toast");

// Paleta actual (guardada para poder cambiar el formato sin regenerar)
let currentPalette = [];
let toastTimer     = null;

// ── Generación de colores ────────────────────────────────────

// Genera un número entero aleatorio entre min y max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Crea un color con sus versiones HEX y HSL
function createColor() {
  const h = randomInt(0, 359);
  const s = randomInt(40, 90);
  const l = randomInt(30, 70);

  const hex = hslToHex(h, s, l);
  const hsl = "hsl(" + h + ", " + s + "%, " + l + "%)";

  return { hex, hsl, h, s, l };
}

// Genera un array con N colores
function generatePalette(count) {
  const palette = [];
  for (let i = 0; i < count; i++) {
    palette.push(createColor());
  }
  return palette;
}

// Convierte HSL a HEX (necesario para el fondo del swatch)
function hslToHex(h, s, l) {
  const sNorm = s / 100;
  const lNorm = l / 100;

  function getChannel(n) {
    const k = (n + h / 30) % 12;
    const a = sNorm * Math.min(lNorm, 1 - lNorm);
    const value = lNorm - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * value).toString(16).padStart(2, "0").toUpperCase();
  }

  return "#" + getChannel(0) + getChannel(8) + getChannel(4);
}

// ── Descripción de la paleta ─────────────────────────────────

// Devuelve una descripción y etiquetas según el tono promedio
function describePalette(palette) {
  // Calculamos el promedio del tono (hue)
  let totalHue = 0;
  for (let i = 0; i < palette.length; i++) {
    totalHue += palette[i].h;
  }
  const avgHue = totalHue / palette.length;

  // Tabla de rangos de tono → descripción
  const tonos = [
    { min: 0,   max: 20,  text: "Esta paleta transmite energía y pasión. Perfecta para marcas audaces que quieren capturar la atención de inmediato.",          tags: ["Energía", "Pasión", "Impacto"] },
    { min: 20,  max: 45,  text: "Tonos cálidos y acogedores que evocan creatividad y entusiasmo. Ideal para proyectos artesanales o marcas con carácter humano.", tags: ["Creatividad", "Calidez", "Artesanal"] },
    { min: 45,  max: 70,  text: "Esta paleta irradia alegría, optimismo y vitalidad. Excelente para proyectos infantiles, bienestar o marcas que buscan transmitir felicidad.", tags: ["Alegría", "Optimismo", "Vitalidad"] },
    { min: 70,  max: 150, text: "Colores que conectan con la naturaleza y la sostenibilidad. Muy eficaces para marcas eco-friendly, salud o proyectos ambientales.", tags: ["Naturaleza", "Equilibrio", "Frescura"] },
    { min: 150, max: 200, text: "Paleta refrescante y moderna que comunica confianza y claridad. Ideal para startups tecnológicas o marcas que quieren parecer innovadoras.", tags: ["Frescura", "Confianza", "Innovación"] },
    { min: 200, max: 260, text: "Azules que proyectan profesionalismo y serenidad. Excelente para empresas de finanzas, salud corporativa o plataformas educativas.", tags: ["Confianza", "Serenidad", "Profesionalismo"] },
    { min: 260, max: 300, text: "Colores asociados con sofisticación y creatividad elevada. Perfectos para marcas de lujo, estudios de diseño o proyectos únicos.", tags: ["Sofisticación", "Lujo", "Creatividad"] },
    { min: 300, max: 340, text: "Paleta moderna y atrevida. Funciona muy bien en marcas de moda, entretenimiento o proyectos dirigidos a audiencias jóvenes.", tags: ["Modernidad", "Tendencia", "Atrevido"] },
    { min: 340, max: 360, text: "Una mezcla romántica y cálida. Ideal para marcas de cuidado personal, bienestar o proyectos con un toque íntimo.", tags: ["Romance", "Calidez", "Cuidado"] },
  ];

  // Buscamos el rango que coincide con el promedio
  let resultado = tonos[0];
  for (let i = 0; i < tonos.length; i++) {
    if (avgHue >= tonos[i].min && avgHue < tonos[i].max) {
      resultado = tonos[i];
      break;
    }
  }

  return resultado;
}

// ── Render de la paleta ──────────────────────────────────────

function renderPalette(palette, format) {
  paletteContainer.innerHTML = "";

  for (let i = 0; i < palette.length; i++) {
    const color = palette[i];
    const codigo      = format === "hsl" ? color.hsl : color.hex;
    const codigoAlt   = format === "hsl" ? color.hex : color.hsl;

    // Creamos el swatch
    const article = document.createElement("article");
    article.className = "swatch";
    article.setAttribute("role", "listitem");
    article.setAttribute("tabindex", "0");
    article.setAttribute("aria-label", "Color " + codigo + ". Haz clic para copiar.");
    article.style.animationDelay = (i * 0.06) + "s";
    article.dataset.code = codigo;

    article.innerHTML =
      '<div class="swatch-color" style="background-color: ' + color.hex + ';" aria-hidden="true"></div>' +
      '<div class="swatch-info">' +
        '<span class="swatch-code">' + codigo + '</span>' +
        '<span class="swatch-alt-code">' + codigoAlt + '</span>' +
      '</div>' +
      '<span class="copy-indicator" aria-hidden="true">⎘</span>';

    // Clic y teclado para copiar
    article.addEventListener("click", function () {
      copiarColor(article.dataset.code, article);
    });

    article.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        copiarColor(article.dataset.code, article);
      }
    });

    paletteContainer.appendChild(article);
  }
}

// ── Descripción en el panel lateral ─────────────────────────

function mostrarDescripcion(palette) {
  const resultado = describePalette(palette);

  descriptionEl.innerHTML = "";
  moodTagsEl.innerHTML    = "";

  const parrafo = document.createElement("p");
  parrafo.textContent = resultado.text;
  descriptionEl.appendChild(parrafo);

  for (let i = 0; i < resultado.tags.length; i++) {
    const tag = document.createElement("span");
    tag.className   = "mood-tag";
    tag.textContent = resultado.tags[i];
    moodTagsEl.appendChild(tag);
  }
}

// ── Historial ────────────────────────────────────────────────

function agregarAlHistorial(palette, descripcion) {
  // Borramos el mensaje de "vacío" si existe
  const mensajeVacio = historyContainer.querySelector(".history-empty");
  if (mensajeVacio) {
    mensajeVacio.remove();
  }

  // Construimos los mini-swatches
  let swatchesHtml = "";
  const coloresAMostrar = Math.min(palette.length, 7);
  for (let i = 0; i < coloresAMostrar; i++) {
    swatchesHtml += '<span class="history-swatch" style="background:' + palette[i].hex + ';" aria-hidden="true"></span>';
  }

  // Hora actual
  const ahora   = new Date();
  const hora    = ahora.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
  const resumen = descripcion.substring(0, 70) + "…";

  const item = document.createElement("div");
  item.className = "history-item";
  item.innerHTML =
    '<div class="history-swatches" aria-hidden="true">' + swatchesHtml + '</div>' +
    '<div class="history-meta">' +
      '<p class="history-desc">' + resumen + '</p>' +
      '<p class="history-time">' + hora + '</p>' +
    '</div>';

  historyContainer.prepend(item);

  // Máximo 5 entradas en el historial
  const todasLasEntradas = historyContainer.querySelectorAll(".history-item");
  if (todasLasEntradas.length > 5) {
    todasLasEntradas[todasLasEntradas.length - 1].remove();
  }
}

// ── Toast (microfeedback) ────────────────────────────────────

function mostrarToast(mensaje) {
  toastEl.textContent = mensaje;
  toastEl.classList.add("visible");

  if (toastTimer) clearTimeout(toastTimer);

  toastTimer = setTimeout(function () {
    toastEl.classList.remove("visible");
  }, 2200);
}

// ── Copiar al portapapeles ───────────────────────────────────

async function copiarColor(texto, swatchEl) {
  try {
    await navigator.clipboard.writeText(texto);

    swatchEl.classList.add("copied");
    const indicador = swatchEl.querySelector(".copy-indicator");
    if (indicador) indicador.textContent = "✓";

    mostrarToast("✓ Copiado: " + texto);

    setTimeout(function () {
      swatchEl.classList.remove("copied");
      if (indicador) indicador.textContent = "⎘";
    }, 1800);

  } catch (error) {
    mostrarToast("No se pudo copiar. Intenta de nuevo.");
  }
}

// ── Función principal: generar paleta ────────────────────────

function generarPaleta() {
  const cantidad = parseInt(paletteSizeSelect.value);
  const formato  = colorFormatSelect.value;

  // Guardamos la paleta en la variable global
  currentPalette = generatePalette(cantidad);

  // Mostramos los swatches
  renderPalette(currentPalette, formato);

  // Mostramos la descripción
  mostrarDescripcion(currentPalette);

  // Guardamos en el historial
  const resultado = describePalette(currentPalette);
  agregarAlHistorial(currentPalette, resultado.text);

  // Feedback al usuario
  mostrarToast("✦ Paleta de " + cantidad + " colores generada");
}

// ── Eventos ──────────────────────────────────────────────────

// Botón principal
generateBtn.addEventListener("click", generarPaleta);

// Cambiar el formato sin regenerar
colorFormatSelect.addEventListener("change", function () {
  if (currentPalette.length > 0) {
    renderPalette(currentPalette, colorFormatSelect.value);
    mostrarToast("Formato cambiado a " + colorFormatSelect.value.toUpperCase());
  }
});
