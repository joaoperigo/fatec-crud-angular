import { Component, EventEmitter, Output } from '@angular/core';
import { Livro } from '../livro.model';

@Component({
selector: 'app-livro-inserir',
templateUrl: './livro-inserir.component.html',
styleUrls: ['./livro-inserir.component.css'],
})

export class LivroInserirComponent {
  @Output() livroAdicionado = new EventEmitter();
  id: number;
  titulo: string;
  autor: string;
  numero: string;
  incrementa = 0;
  onAdicionarLivro() {
      this.incrementa= this.incrementa + 1;
      const livro: Livro = {
      id: this.incrementa,
      titulo: this.titulo,
      autor: this.autor,
      numero: this.numero,
      };
      this.livroAdicionado.emit(livro);
  }
}
