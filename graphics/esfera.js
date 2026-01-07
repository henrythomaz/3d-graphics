const vertices = [];
const faces = [];

const radius = 0.5;
const latSegments = 12; // quanto maior, mais lisa
const lonSegments = 24;

// Gera os vértices
for (let lat = 0; lat <= latSegments; lat++) {
  const theta = (lat / latSegments) * Math.PI; // 0 → π
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  for (let lon = 0; lon < lonSegments; lon++) {
    const phi = (lon / lonSegments) * Math.PI * 2; // 0 → 2π
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);

    vertices.push({
      x: radius * cosPhi * sinTheta,
      y: radius * cosTheta,
      z: radius * sinPhi * sinTheta,
    });
  }
}

// Gera as faces (quads)
for (let lat = 0; lat < latSegments; lat++) {
  for (let lon = 0; lon < lonSegments; lon++) {
    const current = lat * lonSegments + lon;
    const next = current + lonSegments;
    const nextLon = (lon + 1) % lonSegments;

    faces.push([
      current,
      lat * lonSegments + nextLon,
      next + nextLon,
      next,
    ]);
  }
}

export const dados = [vertices, faces];
