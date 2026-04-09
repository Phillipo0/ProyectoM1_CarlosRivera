# Colorfly Studio — Generador de Paletas de Colores

Aplicación web para generar paletas de colores aleatorias. Hecha con HTML, CSS y JavaScript puro.

---

## ¿Qué hace la app?

- Genera paletas de 6, 8 o 9 colores aleatorios
- Muestra los colores en formato HEX o HSL
- Al hacer clic en un color, copia el código al portapapeles
- Muestra una descripción de la paleta generada
- Guarda un historial de las últimas 5 paletas

---

## Estructura de archivos

```
colorfly-studio/
├── index.html    # Estructura de la página
├── styles.css    # Estilos visuales
├── main.js       # Lógica de la aplicación
└── README.md     # Este archivo
```

---

## Cómo ejecutar el proyecto

1. Descarga los archivos del proyecto
2. Asegúrate de que los tres archivos estén en la misma carpeta
3. Abre `index.html` en tu navegador

> Si el botón de copiar no funciona, abre el proyecto con la extensión **Live Server** de VS Code en lugar de abrir el archivo directamente.

---

## Cómo desplegar en GitHub Pages

1. Sube los archivos a un repositorio público en GitHub
2. Ve a **Settings → Pages**
3. En **Branch**, selecciona `main` y guarda
4. GitHub te dará una URL pública en unos segundos

---

## Decisiones técnicas

- **Sin frameworks ni librerías:** el proyecto usa solo HTML, CSS y JavaScript vanilla para practicar los fundamentos del desarrollo web.
- **Colores generados en HSL:** se generan primero en HSL porque permite controlar fácilmente que los colores sean visualmente agradables, limitando los rangos de saturación y luminosidad. Luego se convierten a HEX.
- **Funciones pequeñas:** cada función hace una sola cosa (generar, renderizar, copiar, mostrar toast) para que el código sea más fácil de leer y mantener.
- **Variables CSS:** los colores de la interfaz están definidos en `:root` para mantener consistencia y facilitar cambios futuros.

---

## Tecnologías usadas

- HTML5
- CSS3 (Flexbox, Grid, variables CSS)
- JavaScript (DOM, eventos, async/await)
- Google Fonts (Playfair Display, DM Sans, DM Mono)