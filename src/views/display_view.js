const PubSub = require('../helpers/pub_sub.js')
const Author = require('../models/author.js')

const DisplayView = function(container){
    this.container = container;
    
}

DisplayView.prototype.bindEvents = function(){
    PubSub.subscribe('Orwell: Data Ready',(event)=>{
        this.books = event.detail
        console.log(this.books);
        
        const OrwellButton = document.getElementById('Orwell')
                OrwellButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.render(this.books)
                })
        
    })
};

DisplayView.prototype.render = function(){

    this.container.innerHTML = '';   

    const page_title = document.querySelector('#logo')
    page_title.textContent = 'Book Trip - George Orwell'


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


    var markerJura = L.marker([56.068, -5.77]).addTo(mymap);
    var markerHampStead = L.marker([51.558, -0.173]).addTo(mymap);
    var markerParis = L.marker([48.804, 2.29]).addTo(mymap);
    var markerWallington = L.marker([51.357, - 0.149]).addTo(mymap);
    markerJura.bindPopup(`<img src="http://books.google.com/books/content?id=kotPYEqx7kMC&amp;printsec=frontcover&amp;img=1&amp;zoom=1&amp;edge=curl&amp;source=gbs_api"><br><b>Jura:</b> Orwell wrote<br><a href="#1984">1984 </a>here.`) 
    markerHampStead.bindPopup("<b>Orwell wrote</b><br>Keep the Aspidistra Flying in Hampstead.")
    markerParis.bindPopup("<b>Here Down and Out</b><br>In Paris And London was written")
    markerWallington.bindPopup(`<b>Wallington</b><br>Where<a href="#Homage to Catalonia"> Homage to Catalonia</a> was written.`)
    mymap.setView([54.863, -2.592], 5);  
}

module.exports = DisplayView;


