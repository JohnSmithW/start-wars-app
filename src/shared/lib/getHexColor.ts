/**
 * Takes a string of colors and returns a hex color code.
 *
 * If the input contains multiple colors, the RGB values of the colors are
 * averaged to create a blended color. If no colors are found, the function
 * returns '#000000'.
 *
 * The following colors are supported:
 *
 * - blond: #FAF0BE
 * - fair: #F5CBA7
 * - blue: #0000FF
 * - blue-gray: #6699CC
 * - gold: #FFD700
 * - yellow: #FFFF00
 * - white: #FFFFFF
 * - red: #FF0000
 * - brown: #8B4513
 * - black: #000000
 * - light: #D3D3D3
 * - grey: #808080
 *
 * @param {string} color The string of colors to convert.
 * @returns {string} The hex color code.
 */
export function getHexColor(color: string): string {
  // Mapping of color names to their RGB values
  const colorMap: { [key: string]: string } = {
    blond: '#FAF0BE',
    fair: '#F5CBA7',
    blue: '#0000FF',
    'blue-gray': '#6699CC',
    gold: '#FFD700',
    yellow: '#FFFF00',
    white: '#FFFFFF',
    red: '#FF0000',
    brown: '#8B4513',
    black: '#000000',
    light: '#D3D3D3',
    grey: '#808080',
  };

  // Function to convert hex color to RGB
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    let r = 0,
      g = 0,
      b = 0;

    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return { r, g, b };
  }

  // Function to convert RGB to hex
  function rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
  }

  // If the input contains multiple colors, average their RGB values
  const colors = color.split(',').map((c) => c.trim().toLowerCase());
  let totalR = 0,
    totalG = 0,
    totalB = 0;
  let count = 0;

  colors.forEach((c) => {
    const hexColor = colorMap[c];
    if (hexColor) {
      const { r, g, b } = hexToRgb(hexColor);
      totalR += r;
      totalG += g;
      totalB += b;
      count++;
    }
  });

  // If multiple colors were found, return the blended color
  if (count > 0) {
    const avgR = Math.round(totalR / count);
    const avgG = Math.round(totalG / count);
    const avgB = Math.round(totalB / count);
    return rgbToHex(avgR, avgG, avgB);
  }

  return '#000000';
}
