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

vertices = [
  { x: 0, y: 0.8, z: 0.5},
  { x: 0, y: 0.8, z: 0.5},
  { x: 0.8, y: 0, z: 0.5},
  { x: 0, y: -0.8, z: 0.5},
  { x: -0.8, y: 0, z: 0.5},
  
];
// const faces = [
//   [0,1,2,3],
//   [4,5,6,7],
//   [0, 4],
//   [1, 5],
//   [2, 6],
//   [3, 7],
// ];
faces = [];

export const dados = [
  vertices,
  faces
];
