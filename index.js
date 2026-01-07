const body = document.body;
const title = document.querySelector("h1")
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d")

console.log(body);
console.log(title);
console.log(canvas);
console.log(ctx);


canvas.width = 800;
canvas.height = 800;

body.style.backgroundColor = "gray"
body.style.color = "white";
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.alignItems = "center";
body.style.justifyContent = "center";
body.style.gap = "15px";
body.style.margin = "15px"

title.style.fontSize = "30px"

canvas.style.width = "500px"
canvas.style.height = "500px"

const BACKGROUND = "black";
const COLOR = "green";

// Desenha a tela em branco
function clear() {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function line(p1, p2) {
  ctx.strokeStyle = COLOR;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(p1.x ,p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

// Desenha um ponto
function point({ x, y }) {
  const size = 20;

  ctx.fillStyle = COLOR;
  ctx.fillRect(x - size/2, y - size/2, size, size);
}

// Converte o sistema do canvas para o cartesiano
function screen(p) {
  let x = (p.x + 1) /2 * canvas.width;
  let y = ( 1 - (p.y + 1) /2) * canvas.height;
  
  return {x, y};
}

// Fórmula de gráficos 3d
function project({ x, y, z }) {
  let dx = x/z;
  let dy = y/z;

  return { x: dx, y: dy }
}

const FPS = 60;


function translate_z({ x, y, z }, dz) {
  return { x, y, z: z + dz }
}

// Gira no eixo y
function rotate_xz({ x, y, z }, angle) {
  //  (\(x^{\prime }=x\cos \theta -y\sin \theta \), \(y^{\prime }=x\sin \theta +y\cos \theta \))
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  
  return {
    x: x * cos - z * sin,
    y,
    z: x * sin + z * cos,
  }
}

let vertices = [
  { x: 0.5, y: 0.5, z: 0.5},
  { x: -0.5, y: 0.5, z: 0.5},
  { x: -0.5, y: -0.5, z: 0.5},
  { x: 0.5, y: -0.5, z: 0.5},
  
  { x: 0.5, y: 0.5, z: -0.5},
  { x: -0.5, y: 0.5, z: -0.5},
  { x: -0.5, y: -0.5, z: -0.5},
  { x: 0.5, y: -0.5, z: -0.5},
];

let faces = [
  [0,1,2,3],
  [4,5,6,7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
  // [0, 1],
  // [0, 2],
  // [0, 3],
  // [0, 4],
  // [0, 5],
  // [0, 6],
  // [0, 7],
  // [1, 2],
  // [1, 3],
  // [1, 4],
  // [1, 5],
  // [1, 6],
  // [1, 7],
  // [2, 3],
  // [2, 4],
  // [2, 5],
  // [2, 6],
  // [2, 7],
  // [3, 4],
  // [3, 5],
  // [3, 6],
  // [3, 7],
  // [4, 5],
  // [4, 6],
  // [4, 7],
  // [6, 7],
]

// Deslocamento de z
let dz = 2;
let angle = 0;

// Executa os frames
function frame() {
  const dt = 1/FPS;
  // dz += 1*dt;
  angle += Math.PI * dt;

  clear();
  // for(const vertice of vertices) {
  //   point(screen(project(translate_z(rotate_xz(vertice, angle), dz))));
  // }
  for(const face of faces) {
    for(let i = 0; i < face.length; ++i) {
      const a = vertices[face[i]];
      const b = vertices[face[(i + 1)%face.length]];
      const p1 = screen(project(translate_z(rotate_xz(a, angle), dz)));
      const p2 = screen(project(translate_z(rotate_xz(b, angle), dz)));

      line(p1, p2);
    }
  }

  setTimeout(frame, 1000/FPS);
}

// Orquestra tudo
function main() {
  // Chama o orquestrador em loop
  setTimeout(frame, 1000/FPS);
}

main();

