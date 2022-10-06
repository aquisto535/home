const root_url = `https://zoo-animal-api.herokuapp.com/animals/rand/10`;
const root_url2 = `https://www.fishwatch.gov/api/species`;
const form = document.querySelector("form");
const main = document.querySelector("main");

fetch(root_url2)
  .then((Response) => Response.json())
  .then((result) => {
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
      console.log(result);

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
    </div>`;

      main.innerHTML = area.innerHTML;
    });
}
