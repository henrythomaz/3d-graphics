let vertices = [];
let faces = [];

/**
 * Função auxiliar para criar prismas/cilindros (Corpo e Antena)
 */
function adicionarPrisma(raioX, raioY, altura, posX, posY, posZ, lados = 8) {
  const start = vertices.length;
  
  for (let j = 0; j <= 1; j++) {
    const y = posY + (j === 0 ? -altura / 2 : altura / 2);
    for (let i = 0; i < lados; i++) {
      const a = (i / lados) * Math.PI * 2;
      vertices.push({ 
        x: posX + Math.cos(a) * raioX, 
        y: y, 
        z: posZ + Math.sin(a) * raioY 
      });
    }
  }

  // Faces laterais
  for (let i = 0; i < lados; i++) {
    const n = (i + 1) % lados;
    faces.push([start + i, start + n, start + lados + n, start + lados + i]);
  }
}

/**
 * Função para criar os Painéis Solares (Retângulos finos)
 */
function adicionarPainel(largura, altura, profundidade, posX, posY, posZ) {
  const start = vertices.length;
  const h = altura / 2;
  const w = largura / 2;
  const d = profundidade / 2;

  // 8 vértices de um paralelepípedo
  const pts = [
    {x: -w, y: -h, z: -d}, {x: w, y: -h, z: -d}, {x: w, y: h, z: -d}, {x: -w, y: h, z: -d},
    {x: -w, y: -h, z: d}, {x: w, y: -h, z: d}, {x: w, y: h, z: d}, {x: -w, y: h, z: d}
  ];

  pts.forEach(p => vertices.push({ x: p.x + posX, y: p.y + posY, z: p.z + posZ }));

  // Faces do cubo/painel
  const f = [[0,1,2,3], [4,5,6,7], [0,1,5,4], [2,3,7,6], [0,3,7,4], [1,2,6,5]];
  f.forEach(face => faces.push(face.map(i => start + i)));
}

// --- MONTAGEM DO SATÉLITE ---

// 1. CORPO CENTRAL (Octógono alongado)
adicionarPrisma(0.15, 0.15, 0.5, 0, 0, 0, 8);

// 2. PAINÉIS SOLARES (Asas laterais)
// Painel Esquerdo
adicionarPainel(0.6, 0.02, 0.3, -0.45, 0, 0);
// Painel Direito
adicionarPainel(0.6, 0.02, 0.3, 0.45, 0, 0);

// 3. ANTENA PARABÓLICA (Na frente)
// Haste da antena
adicionarPrisma(0.02, 0.02, 0.2, 0, 0.35, 0, 4);
// Prato da antena (Cilindro curto e largo)
adicionarPrisma(0.2, 0.2, 0.05, 0, 0.45, 0, 12);

// 4. LENTE/INSTRUMENTO (Na base)
adicionarPrisma(0.1, 0.1, 0.1, 0, -0.3, 0, 6);

export const dados = [vertices, faces];
