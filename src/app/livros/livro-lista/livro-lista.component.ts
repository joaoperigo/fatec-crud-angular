import { Component, Input, OnInit } from '@angular/core';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  // livros = [
  //   {
  //   titulo: 'José',
  //   autor: '11223344',
  //   numero: 'jose@numero.com',
  //   },
  //   {
  //   titulo: 'Maria',
  //   autor: '22334455',
  //   numero: 'maria@numero.com',
  //   },
  // ];

  @Input() livros: Livro[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
