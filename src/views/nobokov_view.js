const PubSub = require('../helpers/pub_sub.js')
const Author = require('../models/author.js')

const NobokovDisplay = function (container) {
    this.container = container
}

NobokovDisplay.prototype.bindEvents = function () {
    PubSub.subscribe('Nobokov: Data Ready', (event) => {
        this.books = event.detail
        const rowlButton = document.getElementById('nobokov')
        rowlButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.render(this.books)
        })

    })
};

NobokovDisplay.prototype.render = function () {

    this.container.innerHTML = '';




    const page_title = document.querySelector('#logo')
    page_title.textContent = 'Book Trip - Vladimir Nobokov'


    mymap.setView([52.522, 13.412], 4)

    console.log(this.books);

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

    const markerBerlin = L.marker([52.616, 13.447]).addTo(mymap);
    const markerPeters = L.marker([ 59.88, 30.465]).addTo(mymap);
    // const markerSunValley = L.marker([34.114, -118.237], { icon: blackIcon }).addTo(mymap);
    markerBerlin.bindPopup(`<a href="https://en.wikipedia.org/wiki/Vladimir_Nabokov#Berlin_years_(1922%E2%80%9337)">Nabokov left Berlin to escape the Nazis</a>`);
    markerPeters.bindPopup(`<a href="https://en.wikipedia.org/wiki/Vladimir_Nabokov#Russia">Nabokov was born in St. Petersburg in 1889</a>`);

}



module.exports = NobokovDisplay;


/* <img src="http://books.google.com/books/content?id=MIzUSDvML0kC&amp;printsec=frontcover&amp;img=1&amp;zoom=1&amp;edge=curl&amp;source=gbs_api"></img> */