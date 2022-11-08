import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Receita } from '../../model/Receita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'api/receitas';

  list(){
      return this.httpClient.get<Receita[]>(this.API);
  }

}
