const root_url = `https://zoo-animal-api.herokuapp.com/animals/rand/10`;
const root_url2 = `https://www.fishwatch.gov/api/species`;
const root_url3 = `http://shibe.online/api/shibes?count=20&urls=true&httpsUrls=true`;

fetch(root_url2)
  .then((Response) => Response.json())
  .then((result) => {
    console.log(result);

    const main = document.querySelector("main");

    for (let index = 0; index < 20; index++) {
      const element = result[index];

      const image = document.createElement("img");

      image.src = element["Species Illustration Photo"].src;

      main.appendChild(image);
    }
  });
