import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../services/pessoa/pessoa.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  idPessoa: number;

  constructor(private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe( params => {
      if(params.id){
        this.pessoaService
          .obterPessoa(params.id)
          .subscribe(pessoa => this.pessoa = pessoa);
      }
      else{
        this.pessoa = new Pessoa();
      }
    });    
  }

  salvarPessoa() : void {

    if( this.pessoa.id ) {
      this.pessoaService.atualizarPessoa(this.pessoa)
          .subscribe(pessoa => {
            this.pessoa = pessoa
            this.router.navigateByUrl('/admin/pessoa');      
          });
          
    } else{
      this.pessoa.id = null;
      this.pessoaService.salvarPessoa(this.pessoa)
          .subscribe(pessoa => {
            this.pessoa = pessoa
            this.router.navigateByUrl('/admin/pessoa');      
          });
    }
      
  }

  voltar() : void {
    this.router.navigateByUrl('/admin/pessoa');
  }

}
