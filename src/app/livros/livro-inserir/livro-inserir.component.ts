import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Livro } from '../livro.model';

import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})
export class LivroInserirComponent implements OnInit{

  private modo: string = "criar";
  private idLivro: string;
  public livro: Livro;
  public estaCarregando: boolean = false;
  form: FormGroup;

  ngOnInit (){
    this.form = new FormGroup({
        titulo: new FormControl (null, {validators: [Validators.required, Validators.min(3)]}),
        autor: new FormControl (null, {validators: [Validators.required]}),
        numero: new FormControl (null, {validators: [Validators.required ]})
      }
    )
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idLivro')){
        this.modo = "editar";
        this.idLivro = paramMap.get('idLivro');
        this.estaCarregando = true;
        this.livroService.getLivro(this.idLivro).subscribe(dadosCli => {
          this.estaCarregando = false;
          this.livro = {
            id: dadosCli._id,
            titulo: dadosCli.titulo,
            autor: dadosCli.autor,
            numero: dadosCli.numero
          }
          this.form.setValue({
            titulo: this.livro.titulo,
            autor: this.livro.autor,
            numero: this.livro.numero
          })
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



  onSalvarLivro (){
    if (this.form.invalid)
      return;

    this.estaCarregando = true;
    if (this.modo === "criar"){
      this.livroService.adicionarLivro(
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.numero
      )
    }
    else{
      this.livroService.atualizarLivro(
        this.idLivro,
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.numero
      )
    }


    this.form.reset();

  }
}
