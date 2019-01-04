import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Pessoa } from '../../models/pessoa';


@Injectable()

export class PessoaService {

  constructor(private http: HttpClient) { }


  obterPessoas(): Observable<Array<Pessoa>> {
    
    return this.http.get(environment.baseUrl + "/pessoa")
              .map(res => res as Array<Pessoa>);
  }

  obterPessoa(id): Observable<Pessoa> {
    return this.http.get(environment.baseUrl + "/pessoa/" + id)
              .map(res => res as Pessoa);
  }

  salvarPessoa(pessoa): Observable<Pessoa> {
    return this.http.post(environment.baseUrl + "/pessoa", pessoa)
              .map(res => res as Pessoa);
  }

  atualizarPessoa(pessoa): Observable<Pessoa> {
    return this.http.put(environment.baseUrl + "/pessoa", pessoa)
              .map(res => res as Pessoa);
  }

  errorHandler(error: any): void {
    console.log(error);
  }
  
}