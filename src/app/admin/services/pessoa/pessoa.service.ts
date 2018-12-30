import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pessoa } from '../../models/pessoa';

@Injectable()

export class PessoaService {

  pessoas : Array<Pessoa> = [{
    id: 1,
    cpfcnpj: '97.028.640/0001-41',
    nome: 'Transportadora Plimor Ltda',
    responsavel: 'Carlos',
    email: 'carlos@gmail.com',
    telefone: '519999999925',
    nomeContato: 'Carlos Alberto',
    tipoContato: '',
    status: true,
    tipo: 'PJ',
    dataAlteracao: new Date
  }, {
    id: 2,
    cpfcnpj: '.666.666/0001-66',
    nome: 'Michel José Ltda',
    responsavel: 'José Alberto',
    email: 'jose@gmail.com',
    telefone: '519999999925',
    nomeContato: 'José Alberto',
    tipoContato: '',
    status: true,
    tipo: 'PJ',
    dataAlteracao: new Date()
  },
  {
    id: 3,
    cpfcnpj: '233.666.666/0001-66',
    nome: 'José Luis Ltda',
    responsavel: 'Luis Alberto',
    email: 'luis@gmail.com',
    telefone: '519999999925',
    nomeContato: 'Luis Alberto',
    tipoContato: '',
    status: true,
    tipo: 'PJ',
    dataAlteracao: new Date()
  }];

  constructor() { }

  obterPessoas(): Observable<Array<Pessoa>> {
    return of (this.pessoas);
  }

  obterPessoa(id): Observable<Pessoa> {
    return of (this.pessoas.find(x => x.id == id));
  }
}