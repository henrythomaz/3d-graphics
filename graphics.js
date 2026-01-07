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
export const dadosColetados = {};

export async function listarArquivosGraficosGitHub() {
  const url = `https://api.github.com/repos/${USER}/${REPO}/contents/${FOLDER}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Arquivos de graficos no GitHub");
    
    for(const file of data) {
      if(file.type == "file" && file.name.endsWith(".js")) {
        await carregarDadosGrafico(file.name);
      }
    }
     window.dispatchEvent(new CustomEvent("dadosCarregados"));
  } catch (err) {
    console.log("Erro ao acessar a API do GitHb. :(", err);
  }
}

async function carregarDadosGrafico(nomeArquivo) {
  try {
    const caminho = `./${FOLDER}/${nomeArquivo}`;

    const modulo = await import(caminho);
    const meusDados = modulo.dados;
    const nomeDaChave = nomeArquivo.replace(".js", "");

    dadosColetados[nomeDaChave] = meusDados;
    console.log("Dados coletados: ", dadosColetados);
    return meusDados;
  } catch(err) {
    console.log(`Erro ao importar o módulo: ${nomeArquivo}`, err);
  }
}
