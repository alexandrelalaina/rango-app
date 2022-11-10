import { Item } from '../../models/IItem';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ItemService } from '../../services/item-service.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss'],
})
export class ItensComponent implements OnInit {

    itemList!: Item[];
    item: Item = {} as Item;
    selectedItem: Item[] = [];

    itemDialog!: boolean;
    submitted!: boolean;

    private readonly PROMPT_SINGULAR: string = 'Item';
    readonly PROMPT_PLURAL: string = 'Itens';


    constructor(private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private service: ItemService) { }

    ngOnInit() {
        console.log('===[itens.component.ts].ngOnInit===');
        this.refresh();
    }

    newItem() {
        console.log('===[itens.component.ts].newItem===');
        this.item = {} as Item;
        this.submitted = false;
        this.itemDialog = true;
    }

    deleteSelectedItemList() {
        console.log('===[itens.component.ts].deleteSelectedItemList===');
        this.confirmationService.confirm({
            message: 'Deseja deletar esses ' + this.PROMPT_PLURAL + ' selecionados?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.itemList = this.itemList.filter(val => !this.selectedItem.includes(val));
                this.messageService.add({severity:'success', summary: 'Successful', detail: '  Deleted', life: 3000});
            }
        });
    }

    editItem(item: Item) {
        console.log('===[itens.component.ts].editItem===');
        this.item = item;
        this.itemDialog = true;
    }

    deleteItem(item: Item) {
        console.log('===[itens.component.ts].deleteItem===');
        this.confirmationService.confirm({
            message: 'Deseja deletar esse ' + this.PROMPT_SINGULAR + '?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delete(item.id)
                    .subscribe(data => this.refresh());
                //this.itemList = this.itemList.filter(val => val.id !== item.id);
                this.item = {} as Item;
                this.messageService.add({severity:'success', summary: 'Successful', detail: this.PROMPT_SINGULAR + ' Deletado', life: 3000});
            }
        });
    }

    hideDialog() {
        this.itemDialog = false;
        this.submitted = false;
    }

    saveItem() {
        console.log('===[itens.component.ts].saveItem===');
        this.submitted = true;

        console.log("Salvar item => " + this.item);

        if (this.item.descricao.trim()) {
            if (this.item.id) {
                this.service.save(this.item).subscribe(data => this.refresh());
                //this.itemList[this.findIndexById(this.item.id)] = this.item;
                //this.service.save(this.item).subscribe(data => this.refresh());
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            }
            else {
                //TODO - implementando service para fazer o post
                this.service.save(this.item).subscribe(data => this.refresh());
                //this.itemList.push(this.item);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.itemDialog = false;
            this.item = {} as Item;
        }
    }

    private findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    private refresh(){
      console.log('===[itens.component.ts].refresh===');
      this.service.list().subscribe(data => this.itemList = data);
    }

}
