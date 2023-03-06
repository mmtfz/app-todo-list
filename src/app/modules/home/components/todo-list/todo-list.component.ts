import { Component, DoCheck, OnInit } from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');//convertendo para obj novamente

  constructor(){ }

  //aqui estou convertendo o first.checked em numero para numero para ele validar e calcular quem está checkado na ordem.
  ngDoCheck(){
    this.setLocalStorage();

  }

  //recuperar valor emitItemTaskList do componente input add itens
  public setEmitTaskList(event: string){

    this.taskList.push({ task: event, checked: false });
  }

  //delete um item
  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1) // splice é o metodo de remover
  }

  //deletando tudo
  public deleteAllTaskList(){
    const confirm = window.confirm("Você realmente deseja deletar tudo?")
    if(confirm){
      this.taskList = []; //para deletar tudo é só zerar o array
    }
  }

  public validationInput(event: string, index: number){
    if(event.length){
      const confirm = window.confirm("A task está vazia, deseja deletar?");
      if (confirm){
        this.deleteItemTaskList(index);
      }
    }
  } //verificar se o evento que esta vindo é vazio ou não

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort( (first, last) => Number(first.checked) - Number(last.checked));//para ordernar a lista, assim que checkar ir para o final da lista.
      //usar o localStorage do brownse
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }

}
