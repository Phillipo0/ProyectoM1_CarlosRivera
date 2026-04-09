## Prompt 1:
Crea un footer para Colorfly Studio, que contenga un ♥

<footer class="site-footer">
      <p>
        Hecho con <span aria-label="amor">♥</span> por
        <strong>Colorfly Studio</strong> &mdash; Todos los colores son aleatorios
      </p>
</footer>

## Prompt 2:
Crea la parte del historial de los colores usados para la página de Colorfly Studio y que, dame el html y el css

.history-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}
 
.history-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}
 
.history-empty {
  font-size: 0.85rem;
  color: var(--color-text-hint);
}
 
.history-item {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
 
.history-swatches {
  display: flex;
  gap: 4px;
}
 
.history-swatch {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}
 
.history-meta {
  flex: 1;
  min-width: 0;
}
 
.history-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
 
.history-time {
  font-size: 0.7rem;
  color: var(--color-text-hint);
  font-family: var(--font-mono);
}

## Prompt 3:
Necesito que me des como una pequeña descripción de los colores que se están mostrando en la pantalla

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
