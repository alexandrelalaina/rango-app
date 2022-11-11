import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IReceita } from 'src/app/models/IReceita';
import { ReceitaService } from '../../services/receita.service';
import { IItem } from '../../models/IItem';
import { ItemService } from '../../services/item-service.service';
import { ReceitaItemService } from '../../services/receita-item.service';
import { IReceitaItem } from '../../models/IReceitaItem';

@Component({
  selector: 'app-receitas-page',
  templateUrl: './receitas-page.component.html',
  styleUrls: ['./receitas-page.component.scss']
})
export class ReceitasPageComponent implements OnInit {

  selectedItem: any[] = [];
  receitaList: IReceita[] = [];
  registroDialog!: boolean;
  submitted!: boolean;
  receita: IReceita = {} as IReceita;

  dropdownItemLista: IItem[] = [];
  dropdownItemSelecionado!: IItem;

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private service: ReceitaService,
              private serviceItem: ItemService,
              private serviceReceitaItem: ReceitaItemService) { }

  ngOnInit(): void {

    this.service.list()
        .subscribe(data => this.receitaList = data);

    console.log('retornou receitas?');
    console.log(this.receitaList.forEach(data => console.log('descricao: ' + data.descricao.toString)));
    console.log(this.receitaList);

  }

  newItem() {
    this.receita = {} as IReceita;
    this.preencherDropdownItemLista();
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

  editItem(receita: IReceita){
    this.receita = receita;
    this.preencherDropdownItemLista();
    this.registroDialog = true;
  }

  deleteItem(receita: IReceita){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + receita.descricao + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.service.delete(receita.id)
              .subscribe(data => this.refresh());
          this.receita = {} as IReceita;
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

    if (this.receita.descricao.trim()) {
        if (this.receita.id) {
            this.service.save(this.receita).subscribe(data => this.refresh());
            //this.receitaList[this.findIndexById(this.receita.id)] = this.receita;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Receita Updated', life: 3000});
        }
        else {
            this.service.save(this.receita).subscribe(data => this.refresh());
            //this.receitaList.push(this.receita);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Receita Created', life: 3000});
        }

        this.registroDialog = false;
        this.receita = {} as IReceita;
    }
  }

  public receitaItemAdd(item: IItem){
      console.log('teste - item selecionado => ' + item.descricao);

      let receitaItem = {
          "receitaId": this.receita.id,
          "itemId": this.dropdownItemSelecionado.id
      }

      this.serviceReceitaItem.save(receitaItem)
          .subscribe(data => {
              this.dropdownItemSelecionado = {} as IItem;
              this.dropdownItemLista = this.dropdownItemLista.filter(val => val.id !== receitaItem.itemId);
          });
  }

  private preencherDropdownItemLista(){
    this.serviceItem.list().subscribe(data => this.dropdownItemLista = data);
    console.log(this.dropdownItemLista);
  }

  private refresh(): void{
      this.service.list().subscribe(data => this.receitaList = data);
  }

}
