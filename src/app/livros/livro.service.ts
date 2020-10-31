import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';

@Injectable ({ providedIn: 'root' })

export class LivroService {
 private livros: Livro[] = [];
 private listaLivrosAtualizada = new Subject <Livro[]>();

 getLivros(): Livro[] {
  return [...this.livros];
 }

 adicionarLivro(id: number, titulo: string, autor: string, numero: string) {
  const livro: Livro = {
  id: id,
  titulo: titulo,
  autor: autor,
  numero: numero,
  };
  this.livros.push(livro);
  this.listaLivrosAtualizada.next([...this.livros]);
  }
  getListaLivrosAtualizada () {
    return this.listaLivrosAtualizada.asObservable();
  }
}
