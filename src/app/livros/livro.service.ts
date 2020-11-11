import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, timestamp } from 'rxjs/operators';

@Injectable ({ providedIn: 'root' })

export class LivroService {
 private livros: Livro[] = [];
 private listaLivrosAtualizada = new Subject <Livro[]>();

 constructor (private httpClient: HttpClient){

}

getLivro (idLivro: string){
  return this.httpClient.get<{_id: string, titulo: string, autor: string, numero: string}>(
    `http://localhost:3000/api/livros/${idLivro}`
  )
  /*return {...this.livros.find(c => c.id === idLivro)};*/
  /*let cli = this.livros.find((c) => c.id === idLivro);
  return cli;*/
}

getLivros(): void{
  this.httpClient.get<{mensagem: string, livros: any}>('http://localhost:3000/api/livros').
  pipe(map((dados => {
    return dados.livros.map((livro) => {
      return {
        id: livro._id,
        titulo: livro.titulo,
        autor: livro.autor,
        numero: livro.numero
      }
    });
  }))).
  subscribe((livros) => {
    this.livros = livros;
    this.listaLivrosAtualizada.next([...this.livros]);//push
  })
  //return [...this.livros];
  }

//  adicionarLivro ( id: number, titulo: string, autor: string, numero: string): void {


  atualizarLivro (id: string, titulo: string, autor: string, numero: string){
    const livro: Livro = {id, titulo, autor, numero};
    this.httpClient.put(`http://localhost:3000/api/livros/${id}`, livro)
    .subscribe(res => {
      const copia = [...this.livros];
      const indice = copia.findIndex (cli => cli.id === livro.id);
      copia[indice] = livro;
      this.livros = copia;
      this.listaLivrosAtualizada.next([...this.livros]);
    });
  }

 adicionarLivro ( titulo: string, autor: string, numero: string ): void {
  const livro: Livro = {
    id: null,
    titulo: titulo,
    autor: autor,
    numero: numero
  };
  this.httpClient.post <{mensagem: string, id:string}> ('http://localhost:3000/api/livros', livro).subscribe((resposta) =>{
    console.log (resposta.mensagem);
    livro.id = resposta.id;
    this.livros.push(livro);
    this.listaLivrosAtualizada.next([...this.livros]);
  })
  //this.livros.push(livro);
  //this.listaLivrosAtualizada.next([...this.livros]);
  }


  removerLivro (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/livros/${id}`)
    .subscribe(() => {
      this.livros = this.livros.filter((cli) => {
        return cli.id !== id
      })
      this.listaLivrosAtualizada.next([...this.livros]);
    })
  }


  getListaLivrosAtualizada () {
    return this.listaLivrosAtualizada.asObservable();
  }
}
