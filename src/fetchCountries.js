export function fetchCountries(event) {
    const countryName = event.target.value.trim();
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`);
}