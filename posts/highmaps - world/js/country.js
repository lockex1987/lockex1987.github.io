function getCountryDetail() {
    const country = JSON.parse(decodeURIComponent(sessionStorage.getItem('country')));
    const countryInfo = document.getElementById('countryInfo');

    let output = `
                <div class="d-lg-flex p-3">
                    <img src="${country.flag}" class="object-fit-cover mr-5">

                    <div class="flex-grow-1">
                        <div class="container-fluid">
                            <div class="mb-3 font-size-1.5 font-weight-700 color-1">
                                ${country.name}
                            </div>
                            
                            <div class="row">
                                <div class="col-lg-6">
                                    <ul class="list-unstyled">
                                        <li class="mb-1">
                                            <strong>Native Name:</strong>
                                            ${country.nativeName}
                                        </li>
                                        <li class="mb-1">
                                            <strong>Population:</strong>
                                            ${country.population}
                                        </li>
                                        <li class="mb-1">
                                            <strong>Region:</strong>
                                            ${country.region}
                                        </li>
                                        <li class="mb-1">
                                            <strong>Sub Region:</strong>
                                            ${country.subregion}
                                        </li>
                                        <li class="mb-1">
                                            <strong>Capital:</strong>
                                            ${country.capital}
                                        </li>
                                    </ul>
                                </div>

                                <div class="col-lg-6">
                                    <ul class="list-unstyled">
                                        <li class="mb-1">
                                            <strong>Top Level Domain:</strong>
                                            ${country.topLevelDomain}
                                        </li>
                                        <li class="mb-1">
                                            <strong>Currencies:</strong>
                                            ${country.currencies[0].name}
                                        </li>
                                        <li class="mb-1">
                                            <strong>Languages:</strong>
                                            ${country.languages[0].name}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    countryInfo.innerHTML = output;

    fetchBorderDetail(country);
}


function fetchBorderDetail(country) {
    const allCountriesData = JSON.parse(decodeURIComponent(sessionStorage.getItem('allCountriesData')));
    const borderCountries = allCountriesData.filter(countryData =>
        country.borders.includes(countryData.alpha3Code)
    );
    let output = '';
    borderCountries.forEach(country => {
        output += `
                    <li class="d-inline-block flex-shrink-0 mb-2 mr-2">
                        <a href="#" data-country="${encodeURIComponent(JSON.stringify(country))}" class="p-2 text-decoration-none text-center color-1">
                            ${country.name}
                        </a>
                    </li>
                `;
    });
    document.getElementById('borderInfo').innerHTML = output;

    document.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', (event) => {
            sessionStorage.setItem('country', event.currentTarget.dataset.country);

            getCountryDetail();
        });
    });
}

document.querySelector('#backButton').addEventListener('click', (event) => {
    mainScreen.style.display = '';
    detailScreen.style.display = 'none';
});
