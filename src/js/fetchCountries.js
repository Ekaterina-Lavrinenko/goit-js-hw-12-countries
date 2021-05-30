import '../css/common.css';
import countryCardTpl from '../templates/country-card.hbs';
import API from './api-service';
import getRefs from './get-refs';

const refs = getRefs();

refs.searchForm.addEventListener('input', onSearch);


function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;

    API.fetchCountries(searchQuery)
    .then(renderCountryCard)
        .catch(onFetchError)
        .finally(() => form.reset());
    }

function renderCountryCard(country) {
        const markup = countryCardTpl(country);
        refs.cardContainer.innerHTML = markup;
}
    
function onFetchError(error) {
    alert('Oh! Something went wrong!');
}