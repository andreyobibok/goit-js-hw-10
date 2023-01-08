import Notiflix from "notiflix";

export function fetchCountries(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status === 404) {
                    Notiflix.Notify.failure('Oops, there is no country with that name!')
                }
                throw new Error(resp.status);
            }
            return resp.json();
        })
}