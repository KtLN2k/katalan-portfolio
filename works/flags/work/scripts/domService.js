import { countries, reset, search } from "./countriesService.js";
const cardsContainer = document.getElementById('cards');

document.getElementById('search-input').addEventListener('input', (event) => {
    console.log(event.target.value);
    reset();
    cardsContainer.innerHTML = '';

    if (!event.target.value || event.target.value === '') {
        createCards();
    } else {
        search(event.target.value);
        createCards();
    }
});

const generateCard = (country) => {
    const card = document.createElement('div');
    card.className = "card";

    const cardImg = document.createElement('img');
    cardImg.src = country.flags.png;
    cardImg.className = "card-image";

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    const cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerText = country.name.common;

    const population = document.createElement('p');
    population.className = "card-text";
    population.innerText = `Population: ${country.population}`;

    const region = document.createElement('p');
    region.className = "card-text";
    region.innerText = `Region: ${country.region}`;

    const cardFooter = document.createElement('div');
    cardFooter.className = "card-footer";

    const heartIcon = document.createElement('i');
    heartIcon.className = "fas fa-heart heart-icon";

    // בדיקה אם המדינה קיימת ב-localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteCountries') || '[]');
    const isFavorite = favorites.includes(country.name.common);
    
    // הגדרת הצבע הראשוני בהתאם לסטטוס
    heartIcon.classList.add(isFavorite ? 'text-danger' : 'text-dark');

    heartIcon.addEventListener('click', () => {
        const currentFavorites = JSON.parse(localStorage.getItem('favoriteCountries') || '[]');
        const countryName = country.name.common;

        if (currentFavorites.includes(countryName)) {
            const updatedFavorites = currentFavorites.filter(fav => fav !== countryName);
            localStorage.setItem('favoriteCountries', JSON.stringify(updatedFavorites));
            heartIcon.classList.remove('text-danger');
            heartIcon.classList.add('text-dark');
        } else {
            currentFavorites.push(countryName);
            localStorage.setItem('favoriteCountries', JSON.stringify(currentFavorites));
            heartIcon.classList.remove('text-dark');
            heartIcon.classList.add('text-danger');
        }
    });

    cardFooter.appendChild(heartIcon);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(population);
    cardBody.appendChild(region);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    return card;
};

const createCards = () => {
    cardsContainer.innerHTML = '';
    for (const country of countries) {
        const card = generateCard(country);
        cardsContainer.appendChild(card);
    }
};

export { createCards };