'use strict'

//banco de dados statico
// let banco = [
//     { "tarefa": "estudar html", "status": "checked" },
//     { "tarefa": "estudar css", "status": "" },
//     { "tarefa": "estudar javascript", "status": "" }
// ];


//pega do banco local storage a informação se possui alguma tarefa ou não
const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];

//atualiza o banco local storage
const setBanco = () => localStorage.setItem("todoList", JSON.stringify(banco))

//usando o local storage como banco
const banco = getBanco();

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
    // const banco = getBanco();
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
        setBanco(banco)
        atualizarTela();
        //limpar texto do input
        evento.target.value = "";
    }

}

//remover item no banco
const removerItem = (indice) => {
    //recorta/modifica o array
    banco.splice(indice, 1);
    atualizarTela();
}

//atualizar status do item no banco
const atualizarItem = (indice) => {
    banco[indice].status = banco[indice].status === "" ? "checked" : "";
    atualizarTela();
}

//verificar click no item e remover
const clickItem = (evento) => {
    const elemento = evento.target
    const indice = elemento.dataset.indice
    if (elemento.type === "button") {
        removerItem(indice);
    } else if (elemento.type === "checkbox") {
        atualizarItem(indice);
    }
}


//acrescentar tarefa no banco
document.getElementById("newItem").addEventListener('keypress', inserirItem)
//pegar click no item
document.getElementById("todoList").addEventListener('click', clickItem)

atualizarTela();