let vertices = [];
let faces = [];

/**
 * Cria um Buraco Negro com a Sombra de Schwarzschild e Lente Gravitacional
 */
function criarBuracoNegroSchw(raioSombra = 0.5) {
  const startOffset = vertices.length;

  // 1. SOMBRA DE SCHWARZSCHILD (Icosfera densa)
  // Base do Icosaedro para geometria geodésica uniforme
  const t = (1 + Math.sqrt(5)) / 2;
  const vBase = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
  ];

  vBase.forEach(v => {
    let m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
    vertices.push({ 
      x: (v[0]/m) * raioSombra, 
      y: (v[1]/m) * raioSombra, 
      z: (v[2]/m) * raioSombra 
    });
  });

  const fBase = [
    [0,11,5], [0,5,1], [0,1,7], [0,7,10], [0,10,11],
    [1,5,9], [5,11,4], [11,10,2], [10,7,6], [7,1,8],
    [3,9,4], [3,4,2], [3,2,6], [3,6,8], [3,8,9],
    [4,9,5], [2,4,11], [6,2,10], [8,6,7], [9,8,1]
  ];
  fBase.forEach(f => faces.push(f.map(i => startOffset + i)));

  // 2. DISCO DE ACREÇÃO COM DEFORMAÇÃO RELATIVÍSTICA
  // O disco não é plano; ele é curvado pela gravidade (Lente Gravitacional)
  const numAneis = 14;
  const pontosPorAnel = 48;

  for (let j = 0; j < numAneis; j++) {
    const ringOffset = vertices.length;
    // O disco começa no raio de Schwarzschild estável (aprox 2.6x o raio)
    const r = raioSombra * (2.2 + j * 0.35); 

    for (let i = 0; i <= pontosPorAnel; i++) {
      const theta = (i / pontosPorAnel) * Math.PI * 2;
      
      // Coordenadas base do plano
      let vx = r * Math.cos(theta);
      let vz = r * Math.sin(theta);
      
      /**
       * LÓGICA DA SOMBRA: 
       * Projetamos o arco que vemos "atrás" do buraco negro para cima e para baixo.
       * Isso cria o anel que circunda a sombra verticalmente.
       */
      const fatorLente = Math.pow(raioSombra / r, 2) * 1.5;
      const vy = Math.sin(theta) * r * fatorLente;

      vertices.push({ x: vx, y: vy, z: vz });

      // Gerar as faces da malha do disco
      if (j > 0 && i < pontosPorAnel) {
        const p1 = ringOffset + i;
        const p2 = ringOffset + i + 1;
        const p3 = (ringOffset - (pontosPorAnel + 1)) + i + 1;
        const p4 = (ringOffset - (pontosPorAnel + 1)) + i;
        faces.push([p1, p2, p3, p4]);
      }
    }
  }
}

// Raio de 0.45 para caber bem na tela com dz=2
criarBuracoNegroSchw(0.45);

export const dados = [vertices, faces];
