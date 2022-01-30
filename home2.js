document.querySelector('form').addEventListener('submit', addToDo);
    
document.getElementById('clear').addEventListener('click', clearTodoList);
    
    
document.querySelector('ul').addEventListener('click', deleteOrCheck);

const TODOS_KEY = "todos"
    
let toDos = []

function saveToDos(){
    localStorage.setItem("TODOS_KEY",JSON.stringify(toDos))
}
    


function deleteOrCheck(e){
    if(e.target.className == 'delete')  
    
        deleteToDo(e); // X 버튼을 누르면 목록에서 항목 삭제
    
    
    else {
    
        checkToDo(e); // 체크박스를 클릭한 경우 글씨 색을 연하게 바꿔준다.
    
    
    }
    
}

function deleteToDo(e){ // X 버튼을 누르면 목록에서 항목 삭제
    let remove = e.target.parentNode;
    
    let parentNode = remove.parentNode;
    
    parentNode.removeChild(remove);
    
}
 
function checkToDo(e){  // 체크박스를 클릭한 경우 글씨 색을 연하게 바꿔준다.
    const todo = e.target.nextSibling;
    
    if(e.target.checked){
    
        todo.style.color = "#dddddd";
    
    
    }else {
    
        todo.style.color = "#080808";
    
    
    }
    
}

function clearTodoList(e){ //목록 전체 삭제하는 경우
    let ul = document.querySelector('ul').innerHTML = '';
    
}

function addToDo(e){ //새로운 할 일 추가하는 경우
    e.preventDefault();
    const toDoValue = document.querySelector('input');
    
    if(toDoValue.value !== '')
        addTask(toDoValue.value);
        const newTodo = toDoValue.value

        toDoValue.value = ''; //입력창 비워주기
        
        const newTodoObj = {
            text: newTodo,
            id: Date.now(),
          };
          toDos.push(newTodoObj)
        
    
        saveToDos()
    
    
}

function addTask(value){
    const input = document.querySelector('input')
    const ul = document.querySelector('ul');
    
    const li = document.createElement('li');


    const span = document.createElement("span")
    span.innerText = input.value

    const button = document.createElement("button")
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    
    ul.appendChild(li);
    li.appendChild(span);
    li.appendChild(button)
     
}


const savedtodos = localStorage.getItem(TODOS_KEY)

if (savedtodos !== null){
    const parseToDos = JSON.parse(savedtodos)
    toDos = parseToDos
    parseToDos.forEach(addTask);
}

