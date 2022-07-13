'use strict'

//banco de dados
let banco = [
    { "tarefa": "estudar js", "status": "" },
    { "tarefa": "netflix", "status": "checked" },
    { "tarefa": "react", "status": "checked" }
]

//criar item 
const criarItem = (tarefa, status) => {
    const item = document.createElement("label");
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox" ${status}>
    <div>${tarefa}</div>
    <input type="button" value="X">
    `
    document.getElementById('todoList').appendChild(item);
}

//limpar tarefas
const limparTarefas = () => {
    const todoList = document.getElementById('todoList');

    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

//atualizar tela conforme o banco de dados 
const atualizarTela = () => {
    limparTarefas();
    banco.forEach(item => criarItem(item.tarefa, item.status));
}

atualizarTela();