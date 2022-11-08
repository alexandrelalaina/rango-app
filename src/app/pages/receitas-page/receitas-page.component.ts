import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Receita } from 'src/model/Receita';

@Component({
  selector: 'app-receitas-page',
  templateUrl: './receitas-page.component.html',
  styleUrls: ['./receitas-page.component.scss']
})
export class ReceitasPageComponent implements OnInit {

  selectedItem: any[] = [];
  receitaList: any[] = [];
  registroDialog!: boolean;
  submitted!: boolean;
  receita: Receita = {} as Receita;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.receitaList = this.preencherReceitaList();
  }

  preencherReceitaList(): Receita[]{
    let receita1 = new Receita();
    receita1.id = "1";
    receita1.descricao = "Calabresa Acebolada";
    receita1.possuiEstoque = 2;
    receita1.obs = "não colocar sal";

    let receita2 = new Receita();
    receita2.id = "2";
    receita2.descricao = "Carne moída com legumes";
    receita2.possuiEstoque = 3;
    receita2.obs = "patinho";

    return [receita1, receita2];
  }

  newItem() {
    this.receita = new Receita();
    this.submitted = false;
    this.registroDialog = true;
  }


  deleteSelectedItemList() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected receitas?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.receitaList = this.receitaList.filter(val => !this.selectedItem.includes(val));
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Receita excluída', life: 3000});
        }
    });
  }

  editItem(receita: Receita){
    this.receita = {...receita};
    this.registroDialog = true;
  }

  deleteItem(receita: Receita){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + receita.descricao + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.receitaList = this.receitaList.filter(val => val.id !== receita.id);
          this.receita = {} as Receita;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Receita excluída', life: 3000});
      }
  });
}

  hideDialog() {
    this.registroDialog = false;
    this.submitted = false;
  }

  saveItem() {
    this.submitted = true;

    console.log("Salvar item => " + this.receita)
    console.log("this.receita.possuiEstoque: " + this.receita.possuiEstoque)

    if (this.receita.descricao.trim()) {
        if (this.receita.id) {
            this.receitaList[this.findIndexById(this.receita.id)] = this.receita;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Receita Updated', life: 3000});
        }
        else {
            this.receita.id = this.createId();
            this.receita.image = 'product-placeholder.svg';
            this.receitaList.push(this.receita);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Receita Created', life: 3000});
        }

        this.receitaList = [...this.receitaList];
        this.registroDialog = false;
        this.receita = {} as Receita;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.receitaList.length; i++) {
        if (this.receitaList[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
