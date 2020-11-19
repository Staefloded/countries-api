const countryContainer = document.querySelector(".output");
const spinner = document.querySelector("#spinner");
const search = document.querySelector("input");
const container = document.querySelector(".container");

let data;
let searchRegion = "";

// Fetch
const myFetch = (() => {
  return {
    getData: async () => {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      data = await response.json();
    },
  };
})();

// Page Rendering
const ui = (() => {
  return {
    renderUI: async () => {
      try {
        spinner.removeAttribute("hidden");
        await myFetch.getData();
        let output = "";
        data
          .filter((country) => country.region.toLowerCase().includes(searchRegion.toLowerCase()))
          .forEach((country) => {
            const { flag, name, capital, region, languages, subregion, population } = country;
            output += `<div class="country">
              <div class="img--container">
                <img class="country--img" src=${flag} alt="Flag">
              </div>
              <div class="country--text">
                <h2 class="country--name">${name}</h2>
                
                <p><span class="title">Capital:</span> ${
                  capital
                    ? `<span class="small">${capital}</span>`
                    : "<span class='error'>Not Available</span>"
                }</p>

                  <p><span class="title">Region:</span> ${
                    region
                      ? `<span class="small">${region}</span>`
                      : "<span class='error'>Not Available</span>"
                  }</p>
                
                <p><span class="title">Languages:</span> ${
                  languages
                    ? `<span class="small">${languages.map((language) => language.name)}</span>`
                    : "<span class='error'>Not Available</span>"
                }</p>

                  <p><span class="title">Subregion:</span> ${
                    subregion
                      ? `<span class="small">${subregion}</span>`
                      : "<span class='error'>Not Available</span>"
                  }</p>
                
                <p><span class="title">Population:</span> ${numberWithCommas(population)}</p>
              </div>
            </div>`;
          });
        countryContainer.innerHTML = output;
        spinner.setAttribute("hidden", "");
      } catch (error) {
        const div = document.createElement("div");
        div.className = "country--error";
        const para = document.createElement("p");
        para.innerHTML = `<i class="fas fa-exclamation-circle"></i>  An Error Occured While Fetching Data from Server`;
        div.appendChild(para);
        container.appendChild(div);
        spinner.setAttribute("hidden", "");
      }
    },
  };
})();

ui.renderUI();

// Separate Population with Comma
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

search.addEventListener("input", (e) => {
  searchRegion = e.target.value;

  ui.renderUI();
});
