  const vertices = [
    // === Capacete externo (círculo aproximado) ===
    { x:  0.0,  y:  1.0,  z: 0 },
    { x:  0.7,  y:  0.7,  z: 0 },
    { x:  1.0,  y:  0.0,  z: 0 },
    { x:  0.7,  y: -0.7,  z: 0 },
    { x:  0.0,  y: -1.0,  z: 0 },
    { x: -0.7,  y: -0.7,  z: 0 },
    { x: -1.0,  y:  0.0,  z: 0 },
    { x: -0.7,  y:  0.7,  z: 0 },

    // === Cabeça ===
    { x: -0.4, y:  0.3, z: 0 },
    { x:  0.4, y:  0.3, z: 0 },
    { x:  0.6, y: -0.1, z: 0 },
    { x:  0.4, y: -0.4, z: 0 },
    { x: -0.4, y: -0.4, z: 0 },
    { x: -0.6, y: -0.1, z: 0 },

    // === Olhos ===
    { x: -0.15, y: 0.05, z: 0 },
    { x:  0.15, y: 0.05, z: 0 },

    // === Corpo inferior ===
    { x: -0.6, y: -0.6, z: 0 },
    { x:  0.6, y: -0.6, z: 0 },
    { x:  0.8, y: -0.8, z: 0 },
    { x: -0.8, y: -0.8, z: 0 },
  ];

  const faces = [
    // Capacete
    [0,1,2,3,4,5,6,7],

    // Cabeça
    [8,9,10,11,12,13],

    // Olhos (quadrados simples)
    [14],
    [15],

    // Corpo
    [16,17,18,19],
  ];

export const dados = [vertices, faces];
