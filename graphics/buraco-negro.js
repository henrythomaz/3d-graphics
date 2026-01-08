let vertices = [];
let faces = [];

/**
 * Cria um Buraco Negro Geodésico Realista (Estilo Interestelar)
 * @param {number} radius - Raio do Horizonte de Eventos
 */
function criarBuracoNegroGeodesico(radius) {
  const startOffset = vertices.length;
  
  // 1. LÓGICA GEODÉSICA: Icosaedro Base (Esfera Perfeita)
  const t = (1 + Math.sqrt(5)) / 2;
  const vTemp = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
  ];

  // Adiciona vértices normalizados para formar a esfera
  vTemp.forEach(v => {
    let m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
    vertices.push({ x: (v[0]/m)*radius, y: (v[1]/m)*radius, z: (v[2]/m)*radius });
  });

  // Faces do Icosaedro (Triângulos Geodésicos)
  const fTemp = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
  ];
  fTemp.forEach(f => faces.push(f.map(i => startOffset + i)));

  // 2. DISCO DE ACREÇÃO COM LENTE GRAVITACIONAL
  // Em vez de um disco plano (disco voador), criamos uma malha deformada
  const numAneis = 10;
  const pontosPorAnel = 32;

  for (let j = 0; j < numAneis; j++) {
    const ringOffset = vertices.length;
    const r = radius * (1.8 + j * 0.3); // O disco começa longe do horizonte (3R_s)

    for (let i = 0; i < pontosPorAnel; i++) {
      const angle = (i / pontosPorAnel) * Math.PI * 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // LÓGICA DE DISTORÇÃO: O disco "dobra" para cima/baixo na frente e atrás
      // Isso simula a visualização da parte traseira do disco acima do buraco negro
      const deformacao = (Math.pow(radius / r, 2)) * 0.8;
      const vy = (i < pontosPorAnel / 2) ? -deformacao : deformacao;

      vertices.push({
        x: r * cosA,
        y: vy * Math.sin(angle), // Deforma o disco em um arco gravitacional
        z: r * sinA
      });

      if (j > 0 && i < pontosPorAnel - 1) {
        const p1 = ringOffset + i;
        const p2 = ringOffset + i + 1;
        const p3 = (ringOffset - pontosPorAnel) + i + 1;
        const p4 = (ringOffset - pontosPorAnel) + i;
        faces.push([p1, p2, p3, p4]);
      }
    }
  }
}

// Executa a criação com raio 0.5
criarBuracoNegroGeodesico(0.5);

export const dados = [vertices, faces];
