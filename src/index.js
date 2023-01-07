import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

list.style.display = "flex";
list.style.flexDirection = "column";
list.style.listStyle = "none";
info.style.display = "flex";
info.style.flexDirection = "column";
info.style.width = "300px";

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
    if (event.target.value == '') {
        return
    }
    else if (event.target.value != '') {
        fetchCountries(event)
            .then(data => {
                if (data.length === 1) {
                    handleOneResult(data)
                }
                else if (data.length > 1 && data.length <= 10) {
                    handleSomeResults(data)
                }
                else if (data.length > 10) {
                    handleManyResults()
                }
            })
            .catch(err => {})
    }
}

function handleOneResult(data) {
    list.innerHTML = "";
    info.innerHTML = `
    <h2 style="display:flex; gap:10px; align-items:center"><img src="${data[0].flags.svg}" alt= "Flag of ${data[0].name.official}" height="30px">${data[0].name.official}</h2>
    <div style="display:flex; gap:10px"><p style="font-weight:700">Capital:</p><p>${data[0].capital}</p></div>
    <div style="display:flex; gap:10px"><p style="font-weight:700">Population:</p><p>${data[0].population}</p></div>
    <div style="display:flex; gap:10px"><p style="font-weight:700">Languages:</p><p>${makeString(data[0].languages)}</p></div>`;
}

function handleSomeResults(data) {
    list.innerHTML = "";
    info.innerHTML = "";
    data.forEach(element => {
        const item = document.createElement('li');
        item.style.display = "flex";
        item.style.gap = "10px";
        item.style.alignItems = "center";
        item.insertAdjacentHTML('beforeend', `<img src="${element.flags.svg}" alt "Flag of ${element.name.official}" width="30px"><p>${element.name.official}</p>`);
        list.append(item);
    });
}

function handleManyResults() {
    list.innerHTML = "";
    info.innerHTML = "";
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function makeString(obj) {
    return Object.values(obj).join(', ');
}