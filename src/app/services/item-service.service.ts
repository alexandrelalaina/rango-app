import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/model/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

    constructor(private httpClient: HttpClient) {}

    private readonly API = 'http://localhost:8080/itens';

    private itemList: Item[] = [];

    list(){
        return this.httpClient.get<Item[]>(this.API);
    }


}
