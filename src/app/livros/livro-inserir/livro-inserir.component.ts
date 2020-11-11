import { Component, OnInit } from '@angular/core'
// import { Livro } from '../livro.model';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Livro } from '../livro.model';

import { LivroService } from '../livro.service';

@Component({
selector: 'app-livro-inserir',
templateUrl: './livro-inserir.component.html',
styleUrls: ['./livro-inserir.component.css'],
})

export class LivroInserirComponent implements OnInit{

  private modo: string = "criar";
  private idLivro: string;
  public livro: Livro;


  ngOnInit (){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idLivro')){
        this.modo = "editar";
        this.idLivro = paramMap.get('idLivro');
        this.livroService.getLivro(this.idLivro).subscribe(dadosCli => {
          this.livro = {
            id: dadosCli._id,
            titulo: dadosCli.titulo,
            autor: dadosCli.autor,
            numero: dadosCli.numero
          }
        });
      }
      else{
        this.modo = "criar";
        this.idLivro = null;
      }
    })
  }

  constructor (
    private livroService: LivroService,
    private route: ActivatedRoute
  ){
  }


  onSalvarLivro (form: NgForm){
    if (form.invalid)
      return;

    if (this.modo === "criar"){
      this.livroService.adicionarLivro(
        form.value.titulo,
        form.value.autor,
        form.value.numero
      )
    }
    else{
      this.livroService.atualizarLivro(
        this.idLivro,
        form.value.titulo,
        form.value.autor,
        form.value.numero
      )
    }

    form.resetForm();

  }
}
