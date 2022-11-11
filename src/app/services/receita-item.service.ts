import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IReceita } from '../models/IReceita';
import { IReceitaItem } from '../models/IReceitaItem';

@Injectable({
  providedIn: 'root'
})
export class ReceitaItemService {

  	constructor(private httpClient: HttpClient) { }

    private readonly API = 'api/receitas-itens';

	  public save(receitaItem: IReceitaItem){
		  return this.httpClient.post<IReceitaItem>(this.API, receitaItem);
	  }

}
