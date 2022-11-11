import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IReceita } from '../models/IReceita';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'api/receitas';

  public list(){
      return this.httpClient.get<IReceita[]>(this.API);
  }

  public save(receita: IReceita){
    console.log('===[receita.service.ts].save===');
    if (! receita.id){
        console.log('-- inserir...');
        return this.httpClient.post<IReceita>(this.API, receita);
    } else {
      console.log('-- alterar...');
      console.log(receita);
      return this.httpClient.put<IReceita>(`${this.API}/${receita.id}`, receita);
    }
  }

  public delete(id: string){
      return this.httpClient.delete<IReceita>(`${this.API}/${id}`).pipe(first());
  }

}
