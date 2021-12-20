import Sortable from 'sortablejs';
var el = document.getElementById('items');
var sortable = Sortable.create(el, {
    handle: '.handle'
});
/*
document.getElementsByClassName("add")[0].addEventListener("click", function() {
    let datos = document.getElementById("origen").value.split(",");
    let htmlStr = ``;
    for (let index = 0; index < datos.length; index++) {
        const element = datos[index];

        htmlStr += ` <li class="draggable" draggable="true">${element}</li>`

    }
    document.getElementById("items").innerHTML = htmlStr;
})*/

document.getElementById('add').addEventListener('click', addListItem);

/*document.querySelector('header input').addEventListener('keypress', event => {
    if (event.key === 'Enter') addListItem();
});*/

function addListItem() {

    let datos = document.getElementById("item").value.split(",");
    let htmlStr = ``;
    for (let index = 0; index < datos.length; index++) {
        const element = datos[index];



        let text = element // document.getElementById('item').value;
        document.getElementById('item').value = '';

        if (text) {
            let toDoList = document.getElementsByClassName('todo')[0]

            let list_item = document.createElement('li');


            let para = document.createElement('p')
            para.textContent = text;
            list_item.appendChild(para);
            let buttons = document.createElement('div');
            buttons.classList.add('buttons');

            let edit_button = createButton('edit');
            edit_button.addEventListener('click', editItem)
            buttons.appendChild(edit_button);

            let delete_button = createButton('delete');
            delete_button.addEventListener('click', deleteItem)
            buttons.appendChild(delete_button);

            let check_button = createButton('check');
            check_button.addEventListener('click', toggleItem)
            buttons.appendChild(check_button);

            list_item.appendChild(buttons);

            let hand = document.createElement('i');
            hand.textContent = "radio_button_unchecked";
            hand.classList.add("material-icons", "handle");
            list_item.appendChild(hand);


            toDoList.insertBefore(list_item, toDoList.firstElementChild);

            list_item.addEventListener('mouseover', () => {
                edit_button.firstElementChild.style.display = 'unset'
            })

            list_item.addEventListener('mouseout', () => {
                edit_button.firstElementChild.style.display = 'none'
            })

            list_item.addEventListener('dblclick', event => {
                if (event.target.nodeName === 'P')
                    edit_button.click();
            });
        }
    }
}

function createButton(type) {
    let button = document.createElement('button');
    let icon = document.createElement('i');
    icon.textContent = type;
    icon.classList.add('material-icons');
    icon.setAttribute('title', type);
    button.appendChild(icon);
    return button;
}

function deleteItem() {
    let list_item = this.parentNode.parentNode;
    list_item.remove();
}

function toggleItem() {
    let buttons_wrap = this.parentNode;
    let list_item = this.parentNode.parentNode;
    let completed_list = document.querySelector('ul.completed');
    let incompleted_list = document.querySelector('ul.incompleted');
    let edit_button = buttons_wrap.firstElementChild;

    if (!Array.from(list_item.classList).includes('completed')) {
        buttons_wrap.classList.add('completed');
        edit_button.style.display = 'none';

        list_item.classList.add('completed');
        completed_list.insertBefore(list_item, completed_list.firstElementChild);
    } else {
        buttons_wrap.classList.remove('completed');
        edit_button.style.display = 'unset';

        list_item.classList.remove('completed');
        incompleted_list.insertBefore(list_item, incompleted_list.firstElementChild);
    }
}

function editItem() {
    let edit_button = this;
    edit_button.removeEventListener('click', editItem)

    let list_item = edit_button.parentNode.parentNode;
    let para = list_item.firstElementChild
    let text = para.textContent;
    para.textContent = '';

    let input_field = document.createElement('input');
    input_field.setAttribute('type', 'text');
    input_field.value = text;

    list_item.insertBefore(input_field, list_item.firstElementChild);
    input_field.focus();

    input_field.addEventListener('keypress', textChange);
    edit_button.addEventListener('click', textChange)
    input_field.addEventListener('blur', textChange);

    function textChange(event) {
        if (event.key === 'Enter' || event.type === 'blur' || event.type === 'click') {
            let newText = input_field.value;
            input_field.remove();
            para.textContent = newText;
            edit_button.removeEventListener('click', textChange)
            let reset = setTimeout(() => {
                edit_button.addEventListener('click', editItem)
            }, 500)
        }
    }
}

//document.querySelector('header input').value = 'Hello World!';
//document.querySelector('header button').click();