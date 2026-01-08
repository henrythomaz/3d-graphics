let vertices = [];
let faces = [];

/**
 * Função Universal para criar formas redondas (Esferóides)
 * Corrigida para isolar os índices de cada parte
 */
function criarParteRedonda(radiusX, radiusY, radiusZ, posX, posY, posZ, latSegments = 16, lonSegments = 16) {
  const startOffset = vertices.length;

  // 1. Gera os vértices (usamos <= lonSegments para fechar a geometria sem buracos)
  for (let lat = 0; lat <= latSegments; lat++) {
    const theta = (lat / latSegments) * Math.PI;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let lon = 0; lon <= lonSegments; lon++) {
      const phi = (lon / lonSegments) * Math.PI * 2;
      
      vertices.push({
        x: posX + radiusX * Math.cos(phi) * sinTheta,
        y: posY + radiusY * cosTheta,
        z: posZ + radiusZ * Math.sin(phi) * sinTheta,
      });
    }
  }

  // 2. Gera as faces
  // O número de vértices por linha agora é lonSegments + 1
  const vPerLine = lonSegments + 1;

  for (let lat = 0; lat < latSegments; lat++) {
    for (let lon = 0; lon < lonSegments; lon++) {
      // Cálculo preciso dos índices locais somados ao startOffset
      const current = startOffset + (lat * vPerLine + lon);
      const nextRow = current + vPerLine;

      faces.push([
        current,
        current + 1,
        nextRow + 1,
        nextRow
      ]);
    }
  }
}

// --- MONTAGEM DA LHAMA FOFINHA ---

// 1. CORPO
criarParteRedonda(0.45, 0.35, 0.35, 0, 0, 0);

// 2. PESCOÇO
criarParteRedonda(0.12, 0.35, 0.12, -0.35, 0.35, 0);

// 3. CABEÇA
criarParteRedonda(0.2, 0.15, 0.15, -0.45, 0.7, 0);

// 4. ORELHAS
criarParteRedonda(0.03, 0.15, 0.03, -0.45, 0.85, 0.1);
criarParteRedonda(0.03, 0.15, 0.03, -0.45, 0.85, -0.1);

// 5. RABO
criarParteRedonda(0.12, 0.12, 0.12, 0.45, 0.1, 0);

// 6. PERNAS
function adicionarPerna(x, z) {
  criarParteRedonda(0.08, 0.15, 0.08, x, -0.3, z, 8, 8);
  criarParteRedonda(0.05, 0.25, 0.05, x, -0.5, z, 8, 8);
}

adicionarPerna(-0.25, 0.15);
adicionarPerna(-0.25, -0.15);
adicionarPerna(0.25, 0.15);
adicionarPerna(0.25, -0.15);

export const dados = [vertices, faces];
