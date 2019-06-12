const PubSub = require('../helpers/pub_sub.js')
const Author = require('../models/author.js')

const GuinDisplay = function (container) {
    this.container = container;

}

GuinDisplay.prototype.bindEvents = function () {
    PubSub.subscribe('Guin: Data Ready', (event) => {
        this.books = event.detail
        const guinButton = document.getElementById('guin')
        guinButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.render(this.books)
        })

    })
};


GuinDisplay.prototype.render = function () {
    this.container.innerHTML = '';

    mymap.setView([40.680, -90.970], 4)


    const page_title = document.querySelector('#logo')
    page_title.textContent = 'Book Trip - Ernest Hemingway'

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


    var markerBerkeley = L.marker([37.873, -122.27]).addTo(mymap);
    var markerPortland = L.marker([45.576, -122.66]).addTo(mymap);
}

module.exports = GuinDisplay;