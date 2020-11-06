const express = require ('express');
const app = express();

const bodyParser = require ('body-parser');
app.use (bodyParser.json());
const Livro = require ('./models/livro');
const mongoose = require ('mongoose');

/*app.use ((req, res, next) => {
  console.log ("Chegou uma requisição...");
  next();
});*/

mongoose.connect('mongodb+srv://fatec-ipi:bossini@cluster0.6a1ur.mongodb.net/fatec-ipi-db?retryWrites=true&w=majority')
.then(() => console.log ("Conexão OK"))
.catch((e) => console.log ("Conexão falhou: " + e));

const livros = [
  {
    id: '2',
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
  /*const livro = req.body;
  livros.push(livro);
  console.log (livro);*/
  const livro = new Livro ({
    titulo: req.body.titulo,
    autor: req.body.autor,
    numero: req.body.numero
  });
  livro.save()
  .then((livroInserido) => {
    console.log(`Inserção ok: ${livroInserido}`);
    res.status(201).json({
      mensagem: 'Livro Inserido',
      id: livroInserido._id
    });
  })
  .catch((error) => {
    console.log (`Inserção NOK: ${error}`);
    res.status(404).json({
      mensagem: 'Livro não foi inserido, tente novamente mais tarde'
    })
  })
});



app.get ('/api/livros', (req, res, next) =>{
  Livro.find()
  .then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: 'Tudo ok',
      livros: documents
    })
  })
  .catch ((error) => {
    console.log ('Busca falhou: ' + error)
    res.status(404).json({
      mensagem: 'Falhou',
      livros: []
    })
  })

  /*//res.send ("Hello From the Back End monitorado");
  res.status(200).json({
    mensagem: "Tudo ok",
    livros: livros
  });*/
})

//DELETE /api/livros/5f91c274c2f25bff67d2f4da
app.delete('/api/livros/:id', (req, res, next) => {
  Livro.deleteOne({_id: req.params.id})
  .then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Livro removido"});
  })
});

module.exports = app;
