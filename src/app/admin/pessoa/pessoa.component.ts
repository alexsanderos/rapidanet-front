import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { PessoaService } from '../services/pessoa/pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  pessoas: Array<Pessoa>; 

  constructor(protected pessoaService: PessoaService,
    private router: Router) { }

  ngOnInit() {
    this.obterPessoas();
  }

  obterPessoas() : void {
    this.pessoaService.obterPessoas()
    .subscribe(pessoas => this.pessoas = pessoas);
  }

  formCadastro() : void {
    this.router.navigateByUrl('/admin/pessoa-form');
  }

}
