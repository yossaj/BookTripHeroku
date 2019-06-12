const PubSub = require('../helpers/pub_sub.js')
const Author = require('../models/author.js')

const DostDisplay = function (container) {
    this.container = container;

}

DostDisplay.prototype.bindEvents = function () {
    PubSub.subscribe('Dost: Data Ready', (event) => {
        this.books = event.detail
        const dostButton = document.getElementById('dostoevsky')
        dostButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.render(this.books)
        })

    })
};


DostDisplay.prototype.render = function () {
    this.container.innerHTML = '';


    mymap.setView([55.924, 43.012], 4)


    const page_title = document.querySelector('#logo')
    page_title.textContent = 'Book Trip - Fyodor Dostoyevsky'

    for (let book of this.books) {
        const textContainer = document.createElement('div')
        textContainer.setAttribute('class', 'text')
        const imgContainer = document.createElement('div')
        imgContainer.setAttribute('class', 'image')
        const title = document.createElement('h2');
        title.setAttribute('id', book.volumeInfo.title)
        title.textContent = book.volumeInfo.title
        const name = document.createElement('h3');
        name.textContent = book.volumeInfo.authors[0]
        const bookCover = document.createElement('img');
        bookCover.src = book.volumeInfo.imageLinks.thumbnail;
        const description = document.createElement('p')
        description.textContent = book.volumeInfo.description
        this.container.appendChild(imgContainer)
        imgContainer.appendChild(bookCover);
        this.container.appendChild(textContainer)
        textContainer.appendChild(title)
        textContainer.appendChild(name)
        textContainer.appendChild(description)
    }

    var markerMoscow = L.marker([55.924, 38.012]).addTo(mymap);
    var markerOmsk= L.marker([54.989,  73.358]).addTo(mymap);
    var markerSemipalatinsk = L.marker([50.412, 80.241]).addTo(mymap);
    var markerGeneva = L.marker([46.195, 6.132]).addTo(mymap);
    var markerStPeters = L.marker([59.933, 30.32]).addTo(mymap);

}

module.exports = DostDisplay;