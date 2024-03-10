const paises = document.querySelector('#country');
const form = document.querySelector('#form');
const select = document.querySelector('.forms__select');

const getCountries = countries => new Promise(resolve => {
    resolve(countries);

});

document.addEventListener('DOMContentLoaded', () => {
    consultCountries();
    form.addEventListener('submit', validForm);
    select.addEventListener('change', consultRegion);
});

const consultCountries = async () => {
    const url = 'https://restcountries.com/v3.1/all';

    try {
        const resp = await fetch(url);
        const res = await resp.json();
        const countries = await getCountries(res);
        showCountries(countries);
    } catch (error) {
        console.log(error);
    }

}

const showCountries = (countries) => {

    countries.forEach(country => {
        const { flags: {png}, name: {common},  population, region, capital } = country;
        
        const card = document.createElement('DIV');
        card.classList.add('card');

        card.innerHTML = `
            <div class="card__flag">
                <a href="details.html"><img src="${png}" alt="Flag ${common}"></a>
            </div>
             <div class="card__body">
                 <h3 class="card__heading">${common}</h3>
                 <ul>
                     <li class="card__list"><span>Population:</span>${population}</li>
                     <li class="card__list"><span>Region:</span>${region}</li>
                     <li class="card__list"><span>Capital:</span> ${capital} </li>
                 </ul>
             </div>
        `;

        paises.appendChild(card);
    });
}

const validForm = (e) => {
    e.preventDefault();
    
    const input = document.querySelector('#input').value;

    if(input.trim() == '') {
        showAlert('Debes agregar un termino a la busqueda');
        return;
    }

    getCountry(input.toLowerCase());
    document.querySelector('#input').value = '';
}

const showAlert = () => {

    cleanHtml(paises);
    const existAlert = document.querySelector('.alert');
    
    if(!existAlert) {
        const div = document.createElement('DIV');
        div.classList.add('alert');

        const p = document.createElement('P');
        p.classList.add('alert__text');
        p.textContent = 'The field must have a value';

        div.appendChild(p);
        form.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}

const getCountry = async country => {
    try {
        const url = `https://restcountries.com/v3.1/name/${country}`;
        const resp = await fetch(url);
        const res = await resp.json();
        const countrys = await getCountries(res);
        showCountry(countrys);
    } catch (error) {
        console.log(error);
    }
}

const showCountry = countrys => {

    cleanHtml(paises);

    countrys.forEach(country => {
        const { flags: {png, alt}, name: {common}, population, region, capital } = country;

        const card = document.createElement('DIV');
        card.classList.add('card');

        const divImg = document.createElement('DIV');
        divImg.classList.add('card__flag');

        const a = document.createElement('A');
        a.href = "details.html";

        const img = document.createElement('IMG');
        img.src =`${png}`;
        img.alt = `${alt}`;

        const cardBody = document.createElement('DIV');
        cardBody.classList.add('card__body');

        const h3 = document.createElement('H3');
        h3.classList.add('card__heading');
        h3.textContent = `${common}`;

        const ul = document.createElement('UL');
        
        ul.innerHTML = `
                        <li class="card__list"><span>Population:</span>${population}</li>
                        <li class="card__list"><span>Region:</span>${region}</li>
                        <li class="card__list"><span>Capital:</span> ${capital} </li>
        `;
                
        a.appendChild(img);
        card.appendChild(divImg);
        card.appendChild(cardBody);
        divImg.appendChild(a);
        cardBody.appendChild(h3);
        cardBody.appendChild(ul);
        paises.appendChild(card);
    });
}

const consultRegion = async () => {
    const region = document.querySelector('#region').value;
    const url = `https://restcountries.com/v3.1/region/${region}`;
    
    try {
        const resp = await fetch(url);
        const res = await resp.json();
        const region = await getCountries(res);
        showCountriesRegion(region);
    } catch (error) {
        console.log(error);
    }
}

const showCountriesRegion = region => {

    cleanHtml(paises);

    region.forEach(country => {
        const { flags: {png, alt}, name: {common}, population, region, capital } = country;
        
        const card = document.createElement('DIV');
        card.classList.add('card');

        card.innerHTML = `
            <div class="card">
                <div class="card__flag">
                    <a href="details.html"><img src="${png}" alt="${alt}"></a>
                </div>
                <div class="card__body">
                    <h3 class="card__heading">${common}</h3>
                    <ul>
                        <li class="card__list"><span>Population:</span>${population}</li>
                        <li class="card__list"><span>Region:</span> ${region} </li>
                        <li class="card__list"><span>Capital:</span> ${capital} </li>
                    </ul>
                </div>
            <div>
        `       
        paises.appendChild(card);
    })
}

const cleanHtml = element => {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
