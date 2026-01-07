const vertices = [
  { x:  0,   y:  0.6, z:  0 },
  { x:  0,   y: -0.6, z:  0 },
  { x:  0.6, y:  0,   z:  0 },
  { x: -0.6, y:  0,   z:  0 },
  { x:  0,   y:  0,   z:  0.6 },
  { x:  0,   y:  0,   z: -0.6 },
];

const faces = [
  [0,2,4],
  [0,4,3],
  [0,3,5],
  [0,5,2],
  [1,4,2],
  [1,3,4],
  [1,5,3],
  [1,2,5],
];

export const dados = [vertices, faces];
