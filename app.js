async function getCountries() {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  const data = await response.json();
  let output = "";
  data.forEach((country) => {
    output += `<div class="country">
		<div class="img--container">
			<img class="country--img" src=${country.flag} alt="Flag">
		</div>
		<div class="country--text">
			<h2>${country.name}</h2>
			<p>Capital: ${country.capital}</p>
			<p>Region: ${country.region}</p>
			<p>Languages: ${country.languages.map((language) => language.name)}</p>
			<p>Subregion: ${country.subregion}</p>
			<p>Region: ${country.region}</p>
			<p>Population: ${country.population}</p>
		</div>
	</div>`;
  });
  document.querySelector(".output").innerHTML = output;
  return data;
}

getCountries()
  .then((countries) => console.log(countries))
  .catch((err) => console.log(err));
