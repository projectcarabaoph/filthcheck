
export const generateRandomPattern = () => {
  // Random colors
  const bgColor = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`;
  const patternColor = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.9)`;

  // Random pattern type
  const patterns = [
    // Stripes
    `<line x1="0" y1="0" x2="100" y2="100" stroke="${patternColor}" stroke-width="2" />`,
    // Dots
    `<circle cx="20" cy="20" r="5" fill="${patternColor}" /><circle cx="50" cy="50" r="5" fill="${patternColor}" />`,
    // Waves
    `<path d="M0,50 Q25,25 50,50 T100,50" stroke="${patternColor}" stroke-width="2" fill="none" />`,
    // Grid
    `<line x1="0" y1="0" x2="100" y2="0" stroke="${patternColor}" stroke-width="1" /><line x1="0" y1="50" x2="100" y2="50" stroke="${patternColor}" stroke-width="1" />`,
  ];

  // Randomly pick a pattern
  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

  // Create SVG
  const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect width="100%" height="100%" fill="${bgColor}" />
        ${randomPattern}
      </svg>
    `;

  // Convert to base64
  return `url("data:image/svg+xml;base64,${btoa(svg)}")`;
}