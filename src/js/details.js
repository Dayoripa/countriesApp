const details = document.querySelector('.details');

window.onload = () => {
    startDetailscountry();
}

//Save details in LocalStorage
const startDetailscountry = () => {

    const details = JSON.parse(localStorage.getItem('detailscountry') );
    showDetailsCountry(details);
}



const showDetailsCountry = (obj) => {

    const divBorder = document.createElement('DIV');
        divBorder.classList.add('border');

    const h3 = document.createElement('H3');
        h3.classList.add('border__heading');
        h3.textContent = 'Border Countries:';

        divBorder.appendChild(h3);

    const divButton = document.createElement('DIV');
       divButton.classList.add('border__content');

       divBorder.appendChild(divButton);

    
    const border = obj.borders;
    
// Convierte los elementos del atributo borders del obje en Array
    const totalBorder = Object.values(border);

// Itera los elementos del Border para crear los botones dinamicos de acuerdo a la cantidad de bordes que tenga
    totalBorder.forEach(border => {
    
// create buttos at HTML
       const button = document.createElement('BUTTON');
       button.classList.add('border__btn');
       button.textContent = `${border}`;

       divButton.appendChild(button);
    })
    

    const div = document.createElement('DIV');
    div.innerHTML = `
            <div class="details__grid container">
                <div class="details__flag">
                    <img src="${obj.flags}" alt="${obj.alt}">
                </div>

                <div class="details__text">
                    <h2 class="details__heading">${obj.name}</h2>
                    <div class="details__info">
                        <ul class="list">
                            <li class="list__text"><span>Native name:</span> ${obj.name} </li>
                            <li class="list__text"><span>Population:</span> ${obj.pop}</li>
                            <li class="list__text"><span>Region:</span> ${obj.region} </li>
                            <li class="list__text"><span>Sub Region:</span> ${obj.subrg} </li>
                            <li class="list__text"><span>Capital:</span> ${obj.cap} </li>
                        </ul>

                        <ul class="list">
                            <li class="list__text"><span>Top Level Domain:</span> ${obj.tld} </li>
                            <li class="list__text"><span>Currencies:</span> ${obj.currency} </li>
                            <li class="list__text"><span>Languajes:</span> ${obj.language} </li>
                        </ul>
                    </div>
                </div>

               
            </div>
    `
    
    details.appendChild(div);
    const grid = document.querySelector('.details__grid');
    grid.appendChild(divBorder);

}