import { dadosColetados, listarArquivosGraficosGitHub } from "./graphics.js";

const body = document.body;
const title = document.querySelector("h1");
const controls = document.getElementById("controls");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

// --- CONFIGURAÇÃO DE LAYOUT RESPONSIVO ---
body.style.margin = "0";
body.style.padding = "10px";
body.style.boxSizing = "border-box";
body.style.backgroundColor = "gray";
body.style.color = "white";
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.alignItems = "center";
body.style.minHeight = "100vh";
body.style.fontFamily = "sans-serif";

title.style.fontSize = "clamp(1.2rem, 5vw, 2rem)";
title.style.textAlign = "center";
title.style.margin = "10px 0";

canvas.width = 800; // Resolução interna
canvas.height = 800;
canvas.style.width = "90vw"; // Tamanho na tela
canvas.style.height = "90vw";
canvas.style.maxWidth = "500px";
canvas.style.maxHeight = "500px";
canvas.style.backgroundColor = "black";
canvas.style.borderRadius = "8px";
canvas.style.touchAction = "none"; // Impede scroll ao girar o objeto

const BACKGROUND = "black";
const COLOR = "green";
const FPS = 60;
const dt = 1/FPS;

let vertices = [];
let faces = [];
let dz = 2;
let rotX = 0;
let rotY = 0;
let dragging = false;
let lastX = 0;
let lastY = 0;

// --- LÓGICA DE INTERAÇÃO (MOUSE + TOUCH) ---
function getPointerPos(e) {
  if (e.touches && e.touches.length > 0) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  return { x: e.clientX, y: e.clientY };
}

const startInteraction = (e) => {
  dragging = true;
  const pos = getPointerPos(e);
  lastX = pos.x;
  lastY = pos.y;
};

const endInteraction = () => { dragging = false; };

const moveInteraction = (e) => {
  if (!dragging) return;
  const pos = getPointerPos(e);
  const dx = pos.x - lastX;
  const dy = pos.y - lastY;

  rotY += dx * 0.01; // Sensibilidade ajustada
  rotX -= dy * 0.01;

  lastX = pos.x;
  lastY = pos.y;
  if(e.cancelable) e.preventDefault();
};

canvas.addEventListener("mousedown", startInteraction);
window.addEventListener("mouseup", endInteraction);
window.addEventListener("mousemove", moveInteraction);
canvas.addEventListener("touchstart", startInteraction, { passive: false });
window.addEventListener("touchend", endInteraction);
window.addEventListener("touchmove", moveInteraction, { passive: false });

// --- INTERFACE DE USUÁRIO ---
function criarBotoesGraficos() {
  controls.innerHTML = "";
  controls.style.display = "flex";
  controls.style.gap = "10px";
  controls.style.marginTop = "15px";
  controls.style.justifyContent = "center";
  controls.style.width = "100%";

  const btnLhama = document.createElement("button");
  btnLhama.textContent = "🦙 Lhama";
  btnLhama.onclick = () => {
    vertices = dadosColetados["lhama"][0];
    faces = dadosColetados["lhama"][1];
  };
  controls.appendChild(btnLhama);

  const menuContainer = document.createElement("div");
  menuContainer.style.position = "relative";

  const btnFormas = document.createElement("button");
  btnFormas.textContent = "📦 Formas ▼";
  
  const dropdown = document.createElement("div");
  dropdown.className = "dropdown-content";
  dropdown.style.display = "none";
  dropdown.style.position = "absolute";
  dropdown.style.bottom = "100%"; // Abre para cima para não sumir no celular
  dropdown.style.left = "50%";
  dropdown.style.transform = "translateX(-50%)";
  dropdown.style.backgroundColor = "#333";
  dropdown.style.border = "1px solid white";
  dropdown.style.zIndex = "100";
  dropdown.style.flexDirection = "column";
  dropdown.style.minWidth = "140px";
  dropdown.style.maxHeight = "200px";
  dropdown.style.overflowY = "auto";

  Object.keys(dadosColetados).forEach(nome => {
    if (nome === "lhama") return;
    const btn = document.createElement("button");
    btn.textContent = nome;
    btn.style.width = "100%";
    btn.style.backgroundColor = "transparent";
    btn.style.border = "none";
    btn.style.padding = "12px";
    btn.onclick = () => {
      vertices = dadosColetados[nome][0];
      faces = dadosColetados[nome][1];
      dropdown.style.display = "none";
    };
    dropdown.appendChild(btn);
  });

  btnFormas.onclick = (e) => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === "none" ? "flex" : "none";
  };

  window.addEventListener("click", () => { dropdown.style.display = "none"; });

  menuContainer.appendChild(btnFormas);
  menuContainer.appendChild(dropdown);
  controls.appendChild(menuContainer);
}

// Estilos CSS Adicionais
const style = document.createElement('style');
style.innerHTML = `
  #controls button {
    padding: 12px 20px;
    cursor: pointer;
    background-color: #444;
    color: white;
    border: 1px solid #777;
    border-radius: 8px;
    font-size: 16px;
    touch-action: manipulation;
  }
  .dropdown-content button:hover { background-color: green !important; }
`;
document.head.appendChild(style);

// --- MOTOR GRÁFICO ---
function clear() {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function line(p1, p2) {
  ctx.strokeStyle = COLOR;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function screen(p) {
  let x = (p.x + 1) / 2 * canvas.width;
  let y = (1 - (p.y + 1) / 2) * canvas.height;
  return { x, y };
}

function project({ x, y, z }) {
  return { x: x / z, y: y / z };
}

function rotate_yz({ x, y, z }, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x, y: y * cos - z * sin, z: y * sin + z * cos };
}

function rotate_xz({ x, y, z }, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: x * cos - z * sin, y, z: x * sin + z * cos };
}

function frame() {
  clear();
  if (vertices.length > 0) {
    for (const face of faces) {
      for (let i = 0; i < face.length; ++i) {
        const a = vertices[face[i]];
        const b = vertices[face[(i + 1) % face.length]];
        if (!a || !b) continue;

        const va = rotate_xz(rotate_yz(a, rotX), rotY);
        const vb = rotate_xz(rotate_yz(b, rotX), rotY);

        const p1 = screen(project({ x: va.x, y: va.y, z: va.z + dz }));
        const p2 = screen(project({ x: vb.x, y: vb.y, z: vb.z + dz }));
        line(p1, p2);
      }
    }
  }
  requestAnimationFrame(frame);
}

window.addEventListener("dadosCarregados", () => {
  criarBotoesGraficos();
  if (dadosColetados["lhama"]) {
    vertices = dadosColetados["lhama"][0];
    faces = dadosColetados["lhama"][1];
  }
});

function main() {
  listarArquivosGraficosGitHub();
  requestAnimationFrame(frame);
}

main();
