import { ItemModalComponent } from './../modals/item-modal/item-modal.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss'],
})
export class ItensComponent implements OnInit {
  constructor() {}

  itens = [
    { id: 1, descricao: 'Calabresa', possuiEstoque: 1 },
    { id: 2, descricao: 'Frango', possuiEstoque: 1 },
    { id: 3, descricao: 'Queijo', possuiEstoque: 1 },
  ];

  displayedColumns: string[] = [ 'id', 'descricao', 'possuiEstoque' ];

  ngOnInit() {}

  cadastrarItem() {
  }
}
