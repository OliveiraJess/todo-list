const criarItem = () => {
    const item = document.createElement("label");
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox">
    <div>Teste de item 1</div>
    <input type="button" value="X">
    `
    document.getElementById('todoList').appendChild(item);
}