import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Receita } from 'src/model/Receita';
import { ReceitaService } from '../../services/receita.service';

@Component({
  selector: 'app-receitas-page',
  templateUrl: './receitas-page.component.html',
  styleUrls: ['./receitas-page.component.scss']
})
export class ReceitasPageComponent implements OnInit {

  selectedItem: any[] = [];
  receitaList: Receita[] = [];
  registroDialog!: boolean;
  submitted!: boolean;
  receita: Receita = {} as Receita;

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private service: ReceitaService) { }

  ngOnInit(): void {

    this.service.list()
        .subscribe(data => this.receitaList = data);

    console.log('retornou receitas?');
    console.log(this.receitaList.forEach(data => console.log('descricao: ' + data.descricao.toString)));
    console.log(this.receitaList);

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
    this.receita = receita;
    this.registroDialog = true;
  }

  deleteItem(receita: Receita){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + receita.descricao + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.service.delete(receita.id)
              .subscribe(data => this.refresh());
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
        this.receita = {} as Receita;
    }
  }

  private refresh(): void{
      this.service.list().subscribe(data => this.receitaList = data);
  }

}
