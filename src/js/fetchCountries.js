import '../css/common.css';
import countryCartTpl from '../templates/country-card.hbs';

const refs = {
    cardContainer: document.querySelector('.js-card-container')
}

fetchCountry();

function fetchCountry() {
    fetch('https://restcountries.eu/rest/v2/name/united kingdom')
    .then(response => {
        return response.json();
    })
    .then(renderCountryCart)
    .catch(error => {
        console.log(error);
    });

}

function renderCountryCart(country) {
        const markup = countryCartTpl(country);
        refs.cardContainer.innerHTML = markup;
    }