import '../css/common.css';
import countryCardTpl from '../templates/country-card.hbs';
import countriesListTpl from '../templates/country-list.hbs';
import API from './api-service';
import getRefs from './get-refs';
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import debounce from 'lodash.debounce';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));


function onSearch(e) {
    e.preventDefault();

    const form = e.target;
    const searchQuery = form.value;


    API.fetchCountries(searchQuery)
        .then(
            country => {
                console.log(country);
                const markup = countryCardTpl(country);
                const list = countriesListTpl(country);
                console.log(markup);
                console.log(country.lenght);
            
                if (country.length > 10) {
                    clearCardContainer();
                    pnotify()
                }
    
                if (country.length > 1 && country.length <= 10) {
                    clearCardContainer();
                    renderCountryCard(list);
                }

                if (country.length == 1) {
                    clearCardContainer();
                    renderCountryCard(markup);
                }
            })
        .catch(onFetchError)
        .finally(() => (form.value = ''));
}
    

function renderCountryCard(tpl) {
    refs.cardContainer.insertAdjacentHTML('beforeend', tpl);
}

function clearCardContainer() {
    refs.cardContainer.innerHTML = '';
}
    
function onFetchError() {
    alert('Oh! Something went wrong!');
}

function pnotify() {
    error ({
        title: 'Oh No!',
        text: 'Something terrible happened.'
    })
}
