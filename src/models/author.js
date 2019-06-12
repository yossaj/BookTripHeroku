const RequestHelper = require('../helpers/request_helper.js')
const PubSub = require('../helpers/pub_sub.js')
const key = 'AIzaSyDKYnNw1oaeEluPDXXo8NzGI8d7NzEtw7w'

const Author = function(){
    this.books = []

}

Author.prototype.bindEvents = function(){
    this.getData('george+orwell', 'George Orwell', 'Orwell: Data Ready')
    this.getData('ernest+hemingway', 'Ernest Hemingway','Hemmingway: Data Ready')
    this.getData('lin+yu+tang', 'Lin Yutang', 'Lin Yutang: Data Ready')
    this.getData('vladimir+nobokov', 'Vladimir Nabokov', 'Nobokov: Data Ready')
    this.getData('terry+pratchett', 'Terry Pratchett', 'Pratchett: Data Ready')
    this.getData('ursala+le+guin', 'Ursula K. Le Guin', 'Guin: Data Ready')
    this.getData('fyodor+dostoyevsky', 'Fyodor Dostoyevsky', 'Dost: Data Ready')
}

Author.prototype.getData = function (search, name, channel) {
    const request = new RequestHelper(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${key}`)

    request.get()
        .then((data) => {  
            const correctAuthor = this.filterAuthor(data.items, `${name}`);
            this.books = correctAuthor
            PubSub.publish(`${channel}`, this.books)
        })
}

Author.prototype.filterAuthor = function(allBooks, authorName){
    const hasAuthor = this.filterUndefined(allBooks);
    const matchingAuthor = this.filterMatchingAuthor(hasAuthor, authorName)   
    const onlyWriter = matchingAuthor.filter(book => {
        return book.volumeInfo.authors[1] === undefined
        // return book.volumeInfo.authors.length() === 1
    })
    
    return onlyWriter
}

Author.prototype.filterUndefined = function(allBooks) {
    
    const hasAuthor = allBooks.filter(book =>
        book.volumeInfo.authors !== undefined)
        return hasAuthor
}

Author.prototype.filterMatchingAuthor = function(hasAuthor, authorName){
    const matchingAuthor = hasAuthor.filter(book => {
        return book.volumeInfo.authors[0] === authorName
    })
    return matchingAuthor

}

module.exports =  Author;