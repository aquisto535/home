const main = document.querySelector("main");
const search_form = document.getElementsByClassName("search");

let todos_keys = [];

const Proverbs = [
  "못된 개는 들에 나가 짖는다",
  "배은망덕한 사람보다 은혜를 아는 개가 낫다",
  "개가 똥을 마다한다",
  "꼬리 먼저 친 개가 밥은 나중 먹는다",
  "개 눈에는 똥만 보인다",
  "개도 나갈 구멍을 보고 쫓는다",
  "개 싸움에 물 끼얹는다",
  "개 팔자가 상팔자",
  "삼 년 먹여 기른 개가 주인 발등을 문다",
  "개가 웃을 일이다",
  "개도 손 들 날이 있다",
  "개똥밭에 굴러도 이승이 좋다",
  "시어미 미워서 개 옆구리 찬다",
  "식전 개가 똥을 참지",
  "댑싸리 밑의 개 팔자",
  "술 먹은 개",
  "풍년 개 팔자",
  "훈장 똥은 개도 안 먹는다",
  "도둑을 맞으려면 개도 안 짖는다",
  "운수가 사나우면 짖던 개도 안 짖는다",
  "너하고 말하느니 개하고 말하겠다",
];

const url = `https://dog.ceo/api/breed/hound/images/random/12`;

fetch(url)
  .then((Response) => Response.json())
  .then((data) => {
    addCard(data);
  });

function addCard(data) {
  const picture = data.message;

  picture.forEach((element) => {
    console.log(element);

    const pictureEl = document.createElement("div");

    pictureEl.classList.add("card");
    pictureEl.classList.add("w3-hover-opacity");

    pictureEl.innerHTML = `
        <img src= "${element}"/>
        <span>${Proverbs[Math.floor(Math.random() * Proverbs.length)]}</span>
        <div class="main-icon-like-text-write_comment"; id='card';>
      `;

    main.appendChild(pictureEl);
  });
  // 함수 안에서 생성되는 대상을 외부에서 가져오려고 하지 말 것!!  // 검색 대상에게만 적용.
}

search_form[0].addEventListener("submit", (e) => {
  e.preventDefault();

  const search = document.getElementById("search_input");

  const Dog_name = search.value;

  if (Dog_name) {
    getDog(Dog_name);

    search.value = "";
  }
});

function getDog(name) {
  const search_url = `https://dog.ceo/api/breed/${name}/images/random`;

  fetch(search_url)
    .then((Response) => Response.json())
    .then((result) => {
      console.log(result);
      const element = result.message;

      const pictureEl = document.createElement("div");

      pictureEl.classList.add("card");
      pictureEl.classList.add("w3-hover-opacity");

      pictureEl.innerHTML = `
        <div class = "w3-container w3-margin-bottom">
        <div class ="contents">
        <img src= "${element}"/>
        <span>${Proverbs[Math.floor(Math.random() * Proverbs.length)]}</span>
        </div>
        
        <div class="main-icon-like-text-write_comment">
        <form method = 'get' id= 'todo_form';><input type="text"; }></form> 
        
        </div>
        <ul id="todolist"></ul> 
        </div>
         
        
      `;

      main.innerHTML = pictureEl.innerHTML;

      const todo_form = document.getElementById("todo_form"); // 생성되는 코드 뒤에 대상을 지칭할 것!!

      const todo_input = document.querySelector("#todo_form input");

      paintToDo(todo_form, todo_input);
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
  todos_keys = todos_keys.filter((todos_key) => todos_key.id !== li.id);

  li.remove();
  localStorage.setItem("todos_keys", JSON.stringify(todos_keys));
}
