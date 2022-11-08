import { Item } from '../../../model/Item';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ItemService } from '../../services/item-service.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss'],
})
export class ItensComponent implements OnInit {

    itemDialog!: boolean;

    itemList!: Item[];

    item: Item = {} as Item;

    selectedItem: any[] = [];

    submitted!: boolean;

    constructor(private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private service: ItemService) { }

    ngOnInit() {
      this.service.list()
          .subscribe(data => this.itemList = data);
    }

    newItem() {
        this.item = new Item();
        this.submitted = false;
        this.itemDialog = true;
    }

    deleteSelectedItemList() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected itens?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.itemList = this.itemList.filter(val => !this.selectedItem.includes(val));
                this.messageService.add({severity:'success', summary: 'Successful', detail: '  Deleted', life: 3000});
            }
        });
    }

    editItem(product: any) {
        this.item = {...product};
        this.itemDialog = true;
    }

    deleteItem(item: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + item.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.itemList = this.itemList.filter(val => val.id !== item.id);
                this.item = {} as Item;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Item Deleted', life: 3000});
            }
        });
    }

    hideDialog() {
        this.itemDialog = false;
        this.submitted = false;
    }

    saveItem() {
        this.submitted = true;

        console.log("Salvar item => " + this.item)
        console.log("this.item.possuiEstoque: " + this.item.possuiEstoque)

        if (this.item.descricao.trim()) {
            if (this.item.id) {
                this.itemList[this.findIndexById(this.item.id)] = this.item;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            }
            else {
                this.item.id = this.createId();
                this.item.imagem = 'product-placeholder.svg';
                this.itemList.push(this.item);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.itemList = [...this.itemList];
            this.itemDialog = false;
            this.item = {} as Item;
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i].id === id) {
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
