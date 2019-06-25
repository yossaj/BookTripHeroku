const PubSub = require('../helpers/pub_sub.js')
const Author = require('../models/author.js')

const HemmingwayDisplay = function(container){
    this.container = container
}


HemmingwayDisplay.prototype.bindEvents = function () {
    PubSub.subscribe('Hemmingway: Data Ready', (event) => {
        this.books = event.detail
        const HemButton = document.getElementById('hemmingway')
        HemButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.render(this.books)
        })

    })
};

HemmingwayDisplay.prototype.render = function () {
    this.container.innerHTML = '';

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

    const markerKeyWest = L.marker([24.694, -81.68 ])
    const markerPamplona = L.marker([42.821, -1.642] )
    const markerSunValley = L.marker([34.114, -118.237] )
    const markerWyoming = L.marker([43.269, -107.58] )
    const markerChicago = L.marker([41.866, -87.687] )

    const view = [40.680, -90.970];
    const hemingwayLocations = [markerKeyWest, markerPamplona, markerChicago, markerSunValley, markerWyoming];
    const package = [hemingwayLocations, view]
    PubSub.publish("Authors Details: markers", package)
}
    module.exports = HemmingwayDisplay;