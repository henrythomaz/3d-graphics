// Não funciona no github Pages

// import fs from "fs";

// const caminhoPasta = __dirname + "/graphics";

// try {
//   const graficos = fs.readdirSync(caminhoPasta);

//   console.log("Arquivos encontrados: ");
//   graficos.forEach((nomeGrafico) => {
//     console.log(nomeGrafico);
//   })
// } catch(err) {
//   console.log("Erro ao ler os gráficos", err);
// }

// Funciona no Github Pages

const USER = "henrythomaz";
const REPO = "3d-graphics";
const FOLDER = "graphics";

async function listarArquivosGraficosGitHub() {
  const url = `https://api.github.com/repos/${USER}/${REPO}/contents/${FOLDER}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Arquivos de graficos no GitHub");
    data.forEach((file) => {
      if(file.type == "file") {
        console.log(file.name);
      }
    })
    
  } catch (err) {
    console.log("Erro ao acessar a API do GitHb. :(", err);
  }
}

async function carregarDadosGrafico(arquivo) {
  try {
    const modulo = await import(`./graphics/${arquivo}`);
    const meusDados = modulo.dados;

    console.log("Vetor de vértices: ", meusDados.vertices);
    return meusDados;
  } catch(err) {
    console.log("Erro ao importar o módulo: ", err);
  }
}

listarArquivosGraficosGitHub();
carregarDadosGrafico();
