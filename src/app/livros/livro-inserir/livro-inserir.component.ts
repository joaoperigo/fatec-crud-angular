import { Component, EventEmitter, Output } from '@angular/core';
// import { Livro } from '../livro.model';
import { NgForm } from '@angular/forms';

import { LivroService } from '../livro.service';

@Component({
selector: 'app-livro-inserir',
templateUrl: './livro-inserir.component.html',
styleUrls: ['./livro-inserir.component.css'],
})

export class LivroInserirComponent {
  constructor(public livroService: LivroService) {};

  // @Output() livroAdicionado = new EventEmitter();

  //   id: number;
  //   titulo: string;
  //   autor: string;
  //   numero: string;
    incrementa = 0;

  onAdicionarLivro(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.incrementa= this.incrementa + 1;

    this.livroService.adicionarLivro(
      this.incrementa,
      form.value.titulo,
      form.value.autor,
      form.value.numero
    )
    form.resetForm()
    // const livro: Livro = {
    //   id: this.incrementa,
    //   titulo: form.value.titulo,
    //   autor: form.value.autor,
    //   numero: form.value.numero,
    // };
    // this.livroAdicionado.emit(livro);
  }
}
