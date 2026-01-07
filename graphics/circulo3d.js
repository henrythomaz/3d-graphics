const vertices = [];
const faces = [];
const segments = 16;
const r = 0.5;

for (let i = 0; i < segments; i++) {
  const angle = (i / segments) * Math.PI * 2;
  vertices.push({
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r,
    z: 0,
  });
}

faces.push([...Array(segments).keys()]);

export const dados = [vertices, faces];
