'use strict'

//banco de dados
let banco = [
    { "tarefa": "estudar js", "status": "" },
    { "tarefa": "netflix", "status": "checked" },
    { "tarefa": "react", "status": "" }
]

//criar item 
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement("label");
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>
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
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}


//inserir item no banco e atualizar a tela
const inserirItem = (evento) => {
    //verifica a tecla 
    const tecla = evento.key;
    //pega oq foi digitado no input
    const texto = evento.target.value;

    if (tecla === "Enter") {
        banco.push({ "tarefa": texto, "status": "" })
        atualizarTela();
        //limpar texto do input
        evento.target.value = "";
    }

}

//remover item
const removerItem = (indice) => {
    //recorta/modifica o array
    banco.splice(indice, 1);
    atualizarTela();
}

//verificar click no item e remover
const clickItem = (evento) => {
    const elemento = evento.target

    if (elemento.type === "button") {
        const indice = elemento.dataset.indice
        removerItem(indice);
    }
}


//acrescentar tarefa no banco
document.getElementById("newItem").addEventListener('keypress', inserirItem)
//pegar click no item
document.getElementById("todoList").addEventListener('click', clickItem)

atualizarTela();