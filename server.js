// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const {bruxos, varinhas, pocoes} = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});


// Aqui vão todas suas Rotas
// Query Parameters no Node.js - API de Hogwarts
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});


//Adicionar o bruxo na minha lista 
app.post("/bruxos", (req, res) => {
  const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo} = req.body;

  if (!nome || !casa) {
      return res.status(400).json({
        success: false,
        message: "Nome e casa não são obrigatorios para um bruxo!"
      });
  }

  const novoBruxo ={
    id : bruxos.length + 1,
    nome,
    casa: casa,
    ano: parseInt(ano),
    varinha: varinha,
    mascote,
    patrono,
    especialidade: especialidade || "Ainda não atribuido",
    vivo: vivo
  }

  bruxos.push(novoBruxo);

  res.status(201).json({
    success: true,
    message: "Novo bruxo adicionado a Hogwarts!",
    data: novoBruxo,
  });
})


// Modificar a rota varinhas 
app.get ('/varinhas', (req, res) => {
  const { material, nucleo } = req.query;
  let resultadoVarinhas = varinhas;


  if (material) {
    resultadoVarinhas = resultadoVarinhas.filter(v => v.material.toLowerCase() === material.toLowerCase());
  }

  if (nucleo) {
    resultadoVarinhas = resultadoVarinhas.filter(v => v.nucleo == nucleo);
  }

  res.status(200).json({
    total: resultadoVarinhas.length,
    data: resultadoVarinhas
  });
}) 

//Adicionar nova varinha na minha lista 
app.post("/varinhas", (req, res) => {
  const { material, nucleo, comprimento} = req.body;

  if (!materia || !nucleo || !comprimento) {
      return res.status(400).json({
        success: false,
        message: "Material, nucleo E comprimento são obrigatorios!"
      });
  }

  const novaVarinha ={
    id : varinhas.length + 1,
    material: material,
    nucleo: nucleo,
    comprimento: comprimento
  }

  varinhas.push(novaVarinha);

  res.status(201).json({
    success: true,
    message: "Nova varinha adicionada!",
    data: novaVarinha,
  });
})


// Modificar a rota poçôes
app.get ('/pocoes', (req, res) => {
  const { nome, efeito } = req.query;
  let resultadoPocoes = pocoes;

  if (nome) {
    resultadoPocoes = resultadoPocoes.filter(p => p.nome.toLowerCase() === nome.toLowerCase());
  }

  if (efeito) {
    resultadoPocoes = resultadoPocoes.filter(p => p.efeito === efeito);
  }

  res.status(200).json({
    total: resultadoPocoes.length,
    data: resultadoPocoes
  });
})


// Modificar a rota animais

app.get ('/animais', (req, res) => {
  const { tipo, nome } = req.query;
  let resultadoAnimais = animais;

  if (tipo) {
    resultadoPocoes = resultadoPocoes.filter(p => p.nome.toLowerCase() === nome.toLowerCase());
  }

  if (efeito) {
    resultadoPocoes = resultadoPocoes.filter(p => p.efeito === efeito);
  }

  res.status(200).json({
    total: resultadoPocoes.length,
    data: resultadoPocoes
  });
})
// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});