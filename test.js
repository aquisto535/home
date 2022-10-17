const root_url2 = `https://www.fishwatch.gov/api/species`;
const form = document.querySelector("form");
const main = document.querySelector("main");

let todos_keys = [];

fetch(root_url2)
  .then((Response) => Response.json())
  .then((result) => {
    console.log(result);
    makeCards(result);
  });

function makeCards(result) {
  for (let index = 0; index < 12; index++) {
    const element = result[index + 40];

    const area = document.createElement("div");

    area.className = "fish_info";

    const image = document.createElement("img");

    image.src = element["Species Illustration Photo"].src;

    area.innerHTML = ` <div class="w3-container w3-margin-bottom">
      <img src="${image.src}" alt="Norway" style="width:100%; margin-top:40px" class="w3-hover-opacity">
      <div class="w3-container w3-white">
        <p style="margin: 18px 0px;"><b>${element["Species Name"]}</b></p>
        <p>${element.Bycatch}</p>
      </div>

    </div>`;

    main.appendChild(area);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const search = document.querySelector("input");

  const fish_name = search.value;

  if (fish_name) {
    getfish(fish_name);

    search.value = "";
  }
});

async function getfish(name) {
  const search_url = `https://www.fishwatch.gov/api/species/${name}`;

  fetch(search_url)
    .then((Response) => Response.json())
    .then((result) => {
      const area = document.createElement("div");

      area.className = "fish_info";

      const image = document.createElement("img");

      image.src = result[0]["Species Illustration Photo"].src;

      area.innerHTML = ` <div class="w3-container w3-margin-bottom">
      <img src="${image.src}" alt="Norway" style="width:100%; margin-top:40px" class="w3-hover-opacity">
      <div class="w3-container w3-white">
        <p style="margin: 18px 0px;"><b>${result[0]["Species Name"]}</b></p>
        <p>${result[0].Bycatch}</p>
      </div>
      <div class="main-icon-like-text-write_comment">
  <form method = 'get' id= 'todo_form';><input type="text"; }></form>  
  
</div> 
<ul id="todolist"></ul>
    </div>`;

      main.innerHTML = area.innerHTML;

      const todo_form = document.getElementById("todo_form"); // 생성되는 코드 뒤에 대상을 지칭할 것!!

      const todolist = document.getElementById("todolist");

      const todo_input = document.querySelector("#todo_form input");

      paintToDo(todo_form, todo_input, todolist);
    });
}

function paintToDo(todo_form, todo_input) {
  todo_form.addEventListener("submit", (e) => {
    e.preventDefault();

    const todolist = document.getElementById("todolist");
    const todo_li = document.createElement("li");
    todo_li.innerText = todo_input.value;
    todo_li.id = Date.now();
    todo_input.value = "";
    const button = document.createElement("button");
    button.innerText = "❌";
    todo_li.appendChild(button);
    todolist.appendChild(todo_li);

    const TodoObj = {
      text: todo_li.innerText,
      id: todo_li.id,
    };

    console.log(todos_keys);
    todos_keys.push(TodoObj); // appendchild는 html요소에서만 쓴다. 배열에 대상을 넣을 때는 push를 쓴다!!! 파이썬과 헷갈리지 말것!
    localStorage.setItem("todos_keys", JSON.stringify(todos_keys));
    button.addEventListener("click", deleteToDo);
  });
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  console.log(li.id);
  todos_keys = todos_keys.filter((todos_key) => todos_key.id !== li.id); // 기존과 다르게 parsed된 배열이 아니기 때문에 parseint를 쓰지 않아도 됨.

  li.remove();
  localStorage.setItem("todos_keys", JSON.stringify(todos_keys));
}
