export default function createDynamicSVG(strokeColor, width, height, offset) {
    let lines = "";
    for (let y = offset; y < height; y += offset) {
      lines += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${strokeColor}" stroke-width="2"/>`;
    }
    for (let x = offset; x < width; x += offset) {
      lines += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${strokeColor}" stroke-width="2"/>`;
    }
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        ${lines}
      </svg>
    `;
  }
  