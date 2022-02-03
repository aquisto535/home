document.querySelector('form').addEventListener('submit', addToDo);
    
document.getElementById('clear').addEventListener('click', clearTodoList);
    
    
document.querySelector('ul').addEventListener('click', deleteOrCheck);

const TODOS_KEY = "todos"

const toDoValue = document.querySelector('input');
    
let toDos = []

function saveToDos(){
    localStorage.setItem("TODOS_KEY",JSON.stringify(toDos))
}
    


function deleteOrCheck(e){
    if(e.target.className == 'delete')  
    
        deleteToDo(e); // X 버튼을 누르면 목록에서 항목 삭제
    
    
   
    
}

function deleteToDo(e){ // X 버튼을 누르면 목록에서 항목 삭제
    const li = e.target.parentElement;

    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));


    li.remove();

    saveToDos();
}

function clearTodoList(e){ //목록 전체 삭제하는 경우
    let ul = document.querySelector('ul').innerHTML = '';
    
}

function addToDo(e){ //새로운 할 일 추가하는 경우
    e.preventDefault();
   
    const newTodo = toDoValue.value
      

    toDoValue.value = ''; //입력창 비워주기
        
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
        };

        toDos.push(newTodoObj)
        addTask(newTodoObj);
        
    
        saveToDos()
    
    
}

function addTask(newTodo){
    
    const ul = document.querySelector('ul');
    
    const li = document.createElement('li');
    li.id = newTodo.id;

    const span = document.createElement("span")
    span.innerText = newTodo.text

    const button = document.createElement("button")
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    
    
    li.appendChild(span);
    li.appendChild(button)
    ul.appendChild(li);
     
}


const savedtodos = localStorage.getItem(TODOS_KEY)

if (savedtodos !== null){
    const parseToDos = JSON.parse(savedtodos)
    toDos = parseToDos
    parseToDos.forEach(addTask);
}

