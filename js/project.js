const countryDiv = document.getElementById("country");
const loader = document.getElementById("loader");

// MOCK DB FETCH (replace with real API / DB call)
async function getContriesData(countryName) {
  // Example: return your DB object directly
  const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
  const data = await response.json();
  return data[0]; // single object
}

async function fetchCountry() {
  const input = document.getElementById("countryInput").value.trim();
  if (!input) return alert("Please enter a country name");

  loader.classList.remove("hidden");
  countryDiv.innerHTML = "";

  try {
    const country = await getContriesData(input);
    renderCountry(country);
  } catch (err) {
    countryDiv.innerHTML = "<p style='color:red'>Country not found</p>";
  } finally {
    loader.classList.add("hidden");
  }
}

/* HELPERS */
const getLanguages = (obj = {}) => Object.values(obj).join(", ");
const getCurrencies = (obj = {}) =>
  Object.values(obj).map(c => `${c.name} (${c.symbol})`).join(", ");
const getNativeNames = (obj = {}) =>
  Object.values(obj).map(n => n.common).join(", ");

/* RENDER */
function renderCountry(c) {
  const card = document.createElement("div");
  card.className = "country-card";

  card.innerHTML = `
    <img src="${c.flags.png}" alt="${c.flags.alt}">
    <h2>${c.name.common}</h2>
    <p class="official">${c.name.official}</p>

    <div class="country-info">
      <p><strong>Capital:</strong> ${c.capital?.[0]}</p>
      <p><strong>Region:</strong> ${c.region}</p>
      <p><strong>Subregion:</strong> ${c.subregion}</p>
      <p><strong>Population:</strong> ${c.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> ${getLanguages(c.languages)}</p>
      <p><strong>Currency:</strong> ${getCurrencies(c.currencies)}</p>
      <p><strong>Native Names:</strong> ${getNativeNames(c.name.nativeName)}</p>
    </div>

    <div class="country-links">
      <a href="${c.maps.googleMaps}" target="_blank">📍 Google Maps</a>
      <a href="${c.maps.openStreetMaps}" target="_blank">🗺 OpenStreetMap</a>
    </div>
  `;

  countryDiv.appendChild(card);
}
