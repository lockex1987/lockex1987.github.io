const countryUrl = 'https://restcountries.eu/rest/v2/all';

const regionMenu = document.getElementById('regionMenu');
const searchInput = document.getElementById('searchInput');
const result = document.getElementById('result');

const mainScreen = document.getElementById('mainScreen');
const detailScreen = document.getElementById('detailScreen');

let countries;


fetch('https://restcountries.eu/rest/v2/all')
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        countries = json;
        
        // Ở country.html có sử dụng
        sessionStorage.setItem('allCountriesData', encodeURIComponent(JSON.stringify(countries)))

        updatedWeb(countries);
    })
    .catch(function (error) {
        console.log(error)
    });

function updatedWeb(countryList) {
    let output = '';
    for (let i = 0; i < countryList.length; i++) {
        output += `
                <div class="card mb-5" data-country="${ encodeURIComponent(JSON.stringify(countryList[i]))}">
                    <img src=${countryList[i].flag} width="160px" height="80px" class="object-fit-cover"/>
                    
                    <div class="mt-3 pl-3 mb-3 font-size-1.5 font-weight-700 country-name">
                        ${countryList[i].name}
                    </div>

                    <div class="mt-3 pl-3">
                        <strong>Population:</strong>
                        ${countryList[i].population}
                    </div>

                    <div class="mt-3 pl-3">
                        <strong>Region:</strong>
                        ${countryList[i].region}
                    </div>

                    <div class="mt-3 pl-3">
                        <strong>Capital:</strong>
                        ${countryList[i].capital}
                    </div>
                </div>`;
    }
    document.getElementById('result').innerHTML = output;

    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('click', (event) => {
            sessionStorage.setItem('country', event.currentTarget.dataset.country);

            mainScreen.style.display = 'none';
            detailScreen.style.display = '';

            getCountryDetail();
        });
    });
}

function filterCountries() {
    let filteredList = [];
    for (let i = 0; i < countries.length; i++) {
        if (regionMenu.value === countries[i].region || regionMenu.value === 'all') {
            filteredList.push(countries[i]);
            console.log(countries[i]);
        }
    }

    updatedWeb(filteredList);
}

regionMenu.addEventListener('change', filterCountries);

function searchCountry() {
    let searchResultCountryList = countries.filter(country => {
        const regex = new RegExp(`${searchInput.value}`, 'gi');
        return country.name.match(regex);
    });

    updatedWeb(searchResultCountryList);
}

searchInput.addEventListener('input', searchCountry);
