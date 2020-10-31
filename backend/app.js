const express = require ('express');
const app = express();

const bodyParser = require ('body-parser');
app.use (bodyParser.json());

/*app.use ((req, res, next) => {
  console.log ("Chegou uma requisição...");
  next();
});*/

const livros = [
  {
    id: '1',
    titulo: 'MIMINI',
    autor: 'Milton',
    numero: '12341234'
  },
  {
    id: '2',
    titulo: 'Cachorrinho',
    autor: 'Catia',
    numero: '12341234'
  }
]

//CORS: Cross-Origin Resource Sharing
app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader ('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/livros', (req, res, next) => {
  const livro = req.body;
  livros.push(livro);
  console.log (livro);
  res.status(201).json({
    mensagem: 'Livro Inserido'
  });
});



app.use ('/api/livros', (req, res, next) =>{
  //res.send ("Hello From the Back End monitorado");
  res.status(200).json({
    mensagem: "Tudo ok",
    livros: livros
  });
})



module.exports = app;
