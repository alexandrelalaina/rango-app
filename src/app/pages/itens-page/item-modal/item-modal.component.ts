import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit {

  constructor() {  }

  ngOnInit(): void {
  }

  salvarItem(){
    console.log("salvar o item");
  }

  cancelarItem(){
    console.log("cancelar o item");
  }

}
