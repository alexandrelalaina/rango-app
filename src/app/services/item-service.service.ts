import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/model/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

    constructor(private httpClient: HttpClient) {}

    private readonly API = 'api/itens';

    list(){
        return this.httpClient.get<Item[]>(this.API);
    }

    // save - vale para POST e PUT
    save(item: Item) {
      console.log('===[item-service.service.ts].SAVE===');

      if (item.id){
          throw new Error('Implementar o PUT - id = ' + item.id);
      }

      console.log('executando POST - item? ' + item);

      return this.httpClient.post<Item>(this.API, item);
    }

}
