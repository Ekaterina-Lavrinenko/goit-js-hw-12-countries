const BASE_URL = 'https://restcountries.eu';

function fetchCountries(countryName) {
    return fetch(`${BASE_URL}/rest/v2/name/${countryName}`)
        .then(response => response.json());
}

export default { fetchCountries };