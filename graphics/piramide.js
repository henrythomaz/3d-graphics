const vertices = [
  { x:  0,   y:  0.6, z:  0 },
  { x: -0.5, y: -0.5, z:  0.5 },
  { x:  0.5, y: -0.5, z:  0.5 },
  { x:  0.5, y: -0.5, z: -0.5 },
  { x: -0.5, y: -0.5, z: -0.5 },
];

const faces = [
  [0,1,2],
  [0,2,3],
  [0,3,4],
  [0,4,1],
  [1,2,3,4],
];

export const dados = [vertices, faces];
