import { Item } from './../../model/Item';
import { ItemModalComponent } from './../modals/item-modal/item-modal.component';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

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

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.itemList = this.preencherLista();
        console.log(this.itemList)
    }

    preencherLista(): Item[]{
      let item = new Item();
      item.id = "1";
      item.descricao = "Calabresa";
      item.image = "https://www.bing.com/images/search?view=detailV2&ccid=ys52D7u6&id=23E4DA841B1AE1EE36BF4F148A3AF256DFB8ACEF&thid=OIP.ys52D7u6Egp5yvC_RPZv5wHaD4&mediaurl=https%3a%2f%2fp2.trrsf.com%2fimage%2ffget%2fcf%2f1200%2f628%2fmiddle%2fimages.terra.com%2f2020%2f12%2f01%2freceitas-com-calabresa.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.cace760fbbba120a79caf0bf44f66fe7%3frik%3d76y431byOooUTw%26pid%3dImgRaw%26r%3d0&exph=628&expw=1200&q=calabresa&simid=608005522214769272&FORM=IRPRST&ck=D91CA5351A65BDA2C392C456B35CD605&selectedIndex=2";
      item.possuiEstoque = 5;
      item.quantidade = 500;
      item.valor = 12.5;
      item.obs = "Calabresa defumada"

      let item2 = new Item();
      item2.id = "2";
      item2.descricao = "Cebola";
      item2.image = "https://www.bing.com/images/search?view=detailV2&ccid=ys52D7u6&id=23E4DA841B1AE1EE36BF4F148A3AF256DFB8ACEF&thid=OIP.ys52D7u6Egp5yvC_RPZv5wHaD4&mediaurl=https%3a%2f%2fp2.trrsf.com%2fimage%2ffget%2fcf%2f1200%2f628%2fmiddle%2fimages.terra.com%2f2020%2f12%2f01%2freceitas-com-calabresa.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.cace760fbbba120a79caf0bf44f66fe7%3frik%3d76y431byOooUTw%26pid%3dImgRaw%26r%3d0&exph=628&expw=1200&q=calabresa&simid=608005522214769272&FORM=IRPRST&ck=D91CA5351A65BDA2C392C456B35CD605&selectedIndex=2";
      item2.possuiEstoque = 2;
      item2.quantidade = 200;
      item2.valor = 1.5;
      item2.obs = "Cebola normal"

      return [item, item2];
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
                this.item.image = 'product-placeholder.svg';
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
