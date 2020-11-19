const express = require ('express');
const router = express.Router();
const Livro = require('../models/livro');

router.post('', (req, res, next) => {
  const livro = new Livro({
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
      console.log(`Inserção NOK: ${error}`);
      res.status(404).json({
        mensagem: 'Livro não foi inserido, tente novamente mais tarde'
      })
    })
});



router.get('', (req, res, next) => {
  Livro.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        mensagem: 'Tudo ok',
        livros: documents
      })
    })
    .catch((error) => {
      console.log('Busca falhou: ' + error)
      res.status(404).json({
        mensagem: 'Falhou',
        livros: []
      })
    })
})

router.get('/:id', (req, res, next) => {
  Livro.findById(req.params.id).then(cli => {
    if (cli)
      res.status(200).json(cli)
    else
      res.status(404).json({ mensagem: "Livro não encontrado!" })
  })
})

//DELETE /api/livros/5f91c274c2f25bff67d2f4da
router.delete('/:id', (req, res, next) => {
  Livro.deleteOne({ _id: req.params.id })
    .then((resultado) => {
      console.log(resultado);
      res.status(200).json({ mensagem: "Livro removido" });
    })
});

router.put('/:idLivro', (req, res, next) => {
  const livro = new Livro({
    _id: req.params.idLivro,
    titulo: req.body.titulo,
    autor: req.body.autor,
    numero: req.body.numero
  });
  Livro.updateOne(
    { _id: req.params.idLivro },
    livro
  ).then(resultado => {
    console.log("Atualizou: " + JSON.stringify(resultado))
    res.status(200).json({ mensagem: 'Atualização realizada com sucesso' })
  })
})

module.exports = router;
