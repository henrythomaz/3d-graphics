let vertices = [];
let faces = [];

/**
 * Cria um Buraco Negro com Lente Gravitacional (Estilo Interestelar)
 */
function criarBuracoNegroRealista(raioSingularidade = 0.5) {
  const startOffset = vertices.length;

  // 1. HORIZONTE DE EVENTOS (Esfera Geodésica/Icosfera)
  // Usamos uma malha de triângulos uniforme para o centro negro
  const t = (1 + Math.sqrt(5)) / 2;
  const vIco = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
  ];

  vIco.forEach(v => {
    let m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
    vertices.push({ 
      x: (v[0]/m) * raioSingularidade, 
      y: (v[1]/m) * raioSingularidade, 
      z: (v[2]/m) * raioSingularidade 
    });
  });

  const facesIco = [
    [0,11,5], [0,5,1], [0,1,7], [0,7,10], [0,10,11], [1,5,9], [5,11,4], [11,10,2], [10,7,6], [7,1,8],
    [3,9,4], [3,4,2], [3,2,6], [3,6,8], [3,8,9], [4,9,5], [2,4,11], [6,2,10], [8,6,7], [9,8,1]
  ];
  facesIco.forEach(f => faces.push(f.map(i => startOffset + i)));

  // 2. DISCO DE ACREÇÃO DEFORMADO (Lógica de Lente Gravitacional)
  const numAneis = 12;
  const pontosPorAnel = 40;

  for (let j = 0; j < numAneis; j++) {
    const ringOffset = vertices.length;
    const r = raioSingularidade * (2.0 + j * 0.4); // Distância radial

    for (let i = 0; i <= pontosPorAnel; i++) {
      const theta = (i / pontosPorAnel) * Math.PI * 2;
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);

      // MATEMÁTICA DA LENTE: A luz de trás é puxada para cima do buraco negro
      // Usamos a função seno para criar o arco superior e inferior simultaneamente
      // Isso cria o efeito de "anel duplo" que envolve a esfera
      const curvatura = Math.pow(raioSingularidade / r, 1.5) * 1.2;
      const y = Math.sin(theta) * r * curvatura;

      vertices.push({ x, y, z });

      // Conecta as faces do disco
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

criarBuracoNegroRealista(0.45);
export const dados = [vertices, faces];
