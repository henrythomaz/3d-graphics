import { dadosColetados, listarArquivosGraficosGitHub } from "./graphics.js";

const body = document.body;
const title = document.querySelector("h1");
const controls = document.getElementById("controls");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

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
  
const FPS = 60;
  
let vertices = [];
let faces = [];
let dz = 2;
let angle = 0;

function criarBotoesGraficos() {
  controls.innerHTML = "";

  Object.keys(dadosColetados).forEach(nome => {
    const btn = document.createElement("button");
    btn.textContent = nome;
    
    btn.onclick = () => {
      vertices = dadosColetados[nome][0];
      faces = dadosColetados[nome][1];
    };

    controls.appendChild(btn);
  });
}

window.addEventListener("dadosCarregados", () => {
  console.log("Modelos disponiveis: ", Object.keys(dadosColetados));

  criarBotoesGraficos();
  // Teste 
  const primeiroModelo = Object.keys(dadosColetados)[1];
  if(primeiroModelo) {
    vertices = dadosColetados[primeiroModelo][0];
    faces = dadosColetados[primeiroModelo][1];
  }
})

// Um pequeno tempero css
controls.style.display = "flex";
controls.style.gap = "10px";

controls.querySelectorAll("button").forEach(btn => {
  btn.style.padding = "8px 12px";
  btn.style.cursor = "pointer";
});

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

// Executa os frames
function frame() {
  const dt = 1/FPS;
  // dz += 1*dt;
  angle += Math.PI * dt;

  clear();
  // for(const vertice of vertices) {
  //   point(screen(project(translate_z(rotate_xz(vertice, angle), dz))));
  // }

  if (vertices.length > 0) {
    for(const face of faces) {
      for(let i = 0; i < face.length; ++i) {
        const a = vertices[face[i]];
        const b = vertices[face[(i + 1) % face.length]];
        if (!a || !b) continue; // Proteção contra índices inválidos

        const p1 = screen(project(translate_z(rotate_xz(a, angle), dz)));
        const p2 = screen(project(translate_z(rotate_xz(b, angle), dz)));
        line(p1, p2);
      }
    }
  }

  setTimeout(frame, 1000/FPS);
}

// Orquestra tudo
function main() {
  listarArquivosGraficosGitHub();
  // Chama o orquestrador em loop
  setTimeout(frame, 1000/FPS);
}

main();
