/*
* Função AJAX base do tipo assíncrona.
* type é o tipo de objeto que você quer recuperar.
* value é o valor do parâmetro para filtrar os resultados dos tipos 2, 3 e 4.
* [Importante!] Você não pode, em nenhuma hipótese, alterar a função xhttpAssincrono.
*/
function xhttpAssincrono(callBackFunction, type, value) {
    var xhttp = new XMLHttpRequest();;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Chama a função em callback e passa a resposta da requisição
            callBackFunction(this.responseText);
        }
    };
    // Path para a requisição AJAX.
    var url = "http://jsonplaceholder.typicode.com/";
    switch (type) {
        case 1:
            url += "users"
            break;
        case 2:
            url += "posts?userId=" + value;
            break;
        case 3:
            url += "todos?userId=" + value;
            break;
        case 4:
            url += "comments?postId=" + value;
            break;
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function getUsers() {
    xhttpAssincrono(users, 1);
}

function users(response) {
    let users = document.getElementById("names");
    let select_users = document.createElement("option");

    select_users.innerHTML = "Selecione um usuário";
    select_users.setAttribute("value", 0);
    select_users.setAttribute("disabled", "true");
    select_users.setAttribute("selected", "true");

    users.appendChild(select_users);

    let data = JSON.parse(response);
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("option");
        li.innerHTML = data[i].name;
        li.value = data[i].id;

        users.appendChild(li);
    }
}

function request() {
    let user_value = document.getElementById("names").value;
    let posts = document.getElementById("us-posts").checked;
    let todos = document.getElementById("us-todos").checked;
    
    if (posts == true && user_value != 0) {
        getPosts(user_value);
    }
    else if (todos == true && user_value != 0) {
        getTodos(user_value);
    }
}

function getPosts(user_value) {
    document.getElementById("todos-filter").style = "display: none";
    xhttpAssincrono(posts, 2, user_value);
}

function posts(response) {
    let h1 = document.getElementById("view-title");
    h1.innerHTML = "Posts do usuário";
    
    let list = document.getElementById("view-list");
    list.innerHTML = "";
    
    let data = JSON.parse(response);
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = data[i].title;

        list.appendChild(li);
    }
}

function getTodos(user_value) {
    document.getElementById("todos-filter").style = "";
    xhttpAssincrono(todos, 3, user_value);
}

function todos(response) {
    let h1 = document.getElementById("view-title");
    h1.innerHTML = "Tarefas do usuário";

    let list = document.getElementById("view-list");
    list.innerHTML = "";

    let all = document.getElementById("us-todos-all").checked;
    let filter_true = document.getElementById("us-todos-finished").checked;
    let filter_false = document.getElementById("us-todos-not_finished").checked;
    
    var data = JSON.parse(response);
    for (let i = 0; i < data.length; i++) {
        if (all) {
            let li = document.createElement("li");

            li.innerHTML = "Concluída: ";
            li.innerHTML += data[i].completed;
            li.innerHTML += " - ";
            li.innerHTML += data[i].title;
            
            list.appendChild(li);
        }
        else if (filter_true && data[i].completed == true) {
            let li = document.createElement("li");

            li.innerHTML = "Concluída: ";
            li.innerHTML += data[i].completed;
            li.innerHTML += " - ";
            li.innerHTML += data[i].title;
            
            list.appendChild(li);
        }
        else if (filter_false && data[i].completed == false) {
            let li = document.createElement("li");

            li.innerHTML = "Concluída: ";
            li.innerHTML += data[i].completed;
            li.innerHTML += " - ";
            li.innerHTML += data[i].title;
            
            list.appendChild(li);
        }
    }
}