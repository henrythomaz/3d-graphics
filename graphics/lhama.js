// =================
// BASE
// =================
const vertices = [];
const faces = [];

// =================
// CAPACETE (círculo)
// =================
const segments = 16;
const r = 0.8;

const helmetStart = vertices.length;

for (let i = 0; i < segments; i++) {
  const angle = (i / segments) * Math.PI * 2;
  vertices.push({
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r,
    z: 0.3,
  });
}

faces.push(
  Array.from({ length: segments }, (_, i) => helmetStart + i)
);

// =================
// CABEÇA (dentro)
// =================
const headStart = vertices.length;

vertices.push(
  { x:  0.0,  y:  0.6, z: 0 },
  { x:  0.55, y:  0.3, z: 0 },
  { x:  0.6,  y: -0.1, z: 0 },
  { x:  0.4,  y: -0.45, z: 0 },
  { x:  0.0,  y: -0.55, z: 0 },
  { x: -0.4,  y: -0.45, z: 0 },
  { x: -0.6,  y: -0.1, z: 0 },
  { x: -0.55, y:  0.3, z: 0 },
);

faces.push(
  Array.from({ length: 8 }, (_, i) => headStart + i)
);

// =================
// ORELHAS
// =================
const earL = vertices.length;
vertices.push(
  { x: -0.25, y: 0.7, z: -0.05 },
  { x: -0.22, y: 0.95, z: -0.05 },
  { x: -0.18, y: 0.7, z: -0.05 },
);
faces.push([earL, earL + 1, earL + 2]);

const earR = vertices.length;
vertices.push(
  { x:  0.18, y: 0.7, z: -0.05 },
  { x:  0.22, y: 0.95, z: -0.05 },
  { x:  0.25, y: 0.7, z: -0.05 },
);
faces.push([earR, earR + 1, earR + 2]);

// =================
// OLHOS
// =================
const eyeL = vertices.length;
vertices.push(
  { x: -0.22, y: 0.15, z: -0.05 },
  { x: -0.12, y: 0.15, z: -0.05 },
  { x: -0.12, y: 0.05, z: -0.05 },
  { x: -0.22, y: 0.05, z: -0.05 },
);
faces.push([eyeL, eyeL + 1, eyeL + 2, eyeL + 3]);

const eyeR = vertices.length;
vertices.push(
  { x:  0.12, y: 0.15, z: -0.05 },
  { x:  0.22, y: 0.15, z: -0.05 },
  { x:  0.22, y: 0.05, z: -0.05 },
  { x:  0.12, y: 0.05, z: -0.05 },
);
faces.push([eyeR, eyeR + 1, eyeR + 2, eyeR + 3]);

// =================
// FOCINHO
// =================
const snout = vertices.length;
vertices.push(
  { x:  0.0,  y: -0.05, z: 0 },
  { x:  0.22, y: -0.12, z: 0 },
  { x:  0.0,  y: -0.22, z: 0 },
  { x: -0.22, y: -0.12, z: 0 },
);
faces.push([snout, snout + 1, snout + 2, snout + 3]);

// =================
// NARIZ
// =================
const nose = vertices.length;
vertices.push(
  { x: -0.03, y: -0.13, z: 0 },
  { x:  0.03, y: -0.13, z: 0 },
  { x:  0.03, y: -0.17, z: 0 },
  { x: -0.03, y: -0.17, z: 0 },
);
faces.push([nose, nose + 1, nose + 2, nose + 3]);

// =================
// BOCA
// =================
const mouth = vertices.length;
vertices.push(
  { x:  0.0, y: -0.17, z: 0 },
  { x:  0.0, y: -0.27, z: 0 },
);
faces.push([mouth, mouth + 1]);

// =================
// EXPORT
// =================
export const dados = [vertices, faces];
