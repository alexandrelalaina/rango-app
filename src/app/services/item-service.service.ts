import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Item } from 'src/model/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

    constructor(private httpClient: HttpClient) {}

    private readonly API = 'api/itens';

    public list(){
        return this.httpClient.get<Item[]>(this.API);
    }

    // save - vale para POST e PUT
    public save(item: Item) {
      console.log('===[item-service.service.ts].save===');

      if (! item.id){
          console.log('executando POST - item? ' + item);
          return this.httpClient.post<Item>(this.API, item);
      } else {
          console.log('executando PUT - item? ' + item);
          return this.httpClient.put<Item>(`${this.API}/${item.id}`, item);
      }
    }

    public delete(id: string){
        console.log('===[item-service.service.ts].delete===');
        return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
    }

    //TODO fazer private create

}
