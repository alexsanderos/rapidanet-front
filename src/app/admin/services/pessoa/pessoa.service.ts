import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

import { Pessoa } from '../../models/pessoa';


@Injectable()

export class PessoaService {

  constructor(private http: HttpClient) { }


  obterPessoas(): Observable<Array<Pessoa>> {
    return this.http.get("http://localhost:8081/api/pessoa")
              .map(res => res as Array<Pessoa>);
  }

  //obterPessoa(id): Observable<Pessoa> {
  //  return of (this.pessoas.find(x => x.id == id));
  //}
}