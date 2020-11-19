const express = require ('express');
const app = express();

const bodyParser = require ('body-parser');
app.use (bodyParser.json());
const mongoose = require ('mongoose');
const livroRoutes = require ('./rotas/livros');

/*app.use ((req, res, next) => {
  console.log ("Chegou uma requisição...");
  next();
});*/

mongoose.connect('mongodb+srv://fatec-ipi:bossini@cluster0.6a1ur.mongodb.net/fatec-ipi-db?retryWrites=true&w=majority')
.then(() => console.log ("Conexão OK"))
.catch((e) => console.log ("Conexão falhou: " + e));



//CORS: Cross-Origin Resource Sharing
app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader ('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/livros', livroRoutes);

module.exports = app;
