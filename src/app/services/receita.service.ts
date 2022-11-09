import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Receita } from '../../model/Receita';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'api/receitas';

  public list(){
      return this.httpClient.get<Receita[]>(this.API);
  }

  public save(receita: Receita){
    console.log('===[receita.service.ts].save===');
    if (! receita.id){
        console.log('-- inserir...');
        return this.httpClient.post<Receita>(this.API, receita);
    } else {
      console.log('-- alterar...');
      console.log(receita);
      return this.httpClient.put<Receita>(`${this.API}/${receita.id}`, receita);
    }
  }

  public delete(id: string){
      return this.httpClient.delete<Receita>(`${this.API}/${id}`).pipe(first());
  }

}
