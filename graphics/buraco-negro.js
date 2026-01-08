let vertices = [];
let faces = [];

/**
 * Cria uma Esfera Geodésica (Icosfera) para o centro
 * e um Disco de Acreção Geométrico
 */
function criarBuracoNegroGeodesico(radius, subdivisoes) {
  const t = (1 + Math.sqrt(5)) / 2;

  // 1. Vértices base de um Icosaedro
  const vBase = [
    {x:-1, y: t, z:0}, {x: 1, y: t, z:0}, {x:-1, y:-t, z:0}, {x: 1, y:-t, z:0},
    {x: 0, y:-1, z: t}, {x: 0, y: 1, z: t}, {x: 0, y:-1, z:-t}, {x: 0, y: 1, z:-t},
    {x: t, y: 0, z:-1}, {x: t, y: 0, z: 1}, {x:-t, y: 0, z:-1}, {x:-t, y: 0, z: 1}
  ];

  // Normaliza e escala os vértices para o raio desejado
  vBase.forEach(v => {
    let m = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
    vertices.push({ x: (v.x/m)*radius, y: (v.y/m)*radius, z: (v.z/m)*radius });
  });

  // Faces base do Icosaedro (20 triângulos)
  faces = [
    [0,11,5], [0,5,1], [0,1,7], [0,7,10], [0,10,11],
    [1,5,9], [5,11,4], [11,10,2], [10,7,6], [7,1,8],
    [3,9,4], [3,4,2], [3,2,6], [3,6,8], [3,8,9],
    [4,9,5], [2,4,11], [6,2,10], [8,6,7], [9,8,1]
  ];

  // 2. DISCO DE ACREÇÃO GEODÉSICO (Espiral de Fibonacci)
  // Em vez de anéis simples, usamos uma distribuição esférica achatada
  const pontosDisco = 150;
  const phi = Math.PI * (3 - Math.sqrt(5)); // Ângulo de ouro

  for (let i = 0; i < pontosDisco; i++) {
    const r = 0.6 + Math.sqrt(i / pontosDisco) * 1.5; // Raio cresce em raiz para densidade uniforme
    const theta = i * phi;

    const vx = Math.cos(theta) * r;
    const vz = Math.sin(theta) * r;
    // Efeito de lente gravitacional: o disco "sobe" conforme chega perto do centro
    const vy = (1 / (r * 2)) * Math.sin(r * 5); 

    vertices.push({ x: vx, y: vy, z: vz });
    
    // Conecta os pontos do disco em uma teia (estilo geodésico)
    if (i > 5) {
      const idx = (vertices.length - 1);
      faces.push([idx, idx - 1, idx - 3]); // Cria triângulos na espiral
    }
  }
}

// Executa a criação
criarBuracoNegroGeodesico(0.5, 1);

export const dados = [vertices, faces];
