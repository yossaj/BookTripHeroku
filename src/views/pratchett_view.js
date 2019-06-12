const PubSub = require('../helpers/pub_sub.js')
const Author = require('../models/author.js')

const PratchettDisplay = function (container) {
    this.container = container
}

PratchettDisplay.prototype.bindEvents = function () {
    PubSub.subscribe('Pratchett: Data Ready', (event) => {
        this.books = event.detail
        const rowlButton = document.getElementById('pratchett')
        rowlButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.render(this.books)
        })

    })
};



PratchettDisplay.prototype.render = function () {

    this.container.innerHTML = '';

    mymap.setView([54.863, -2.592], 5);



    const page_title = document.querySelector('#logo')
    page_title.textContent = 'Book Trip - Terry Pratchett'


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

};


module.exports = PratchettDisplay;