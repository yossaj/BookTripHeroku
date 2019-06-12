const  Author = require('./models/author.js')
const DisplayView = require('./views/display_view.js')
const HemmingwayDisplay = require('./views/hemmingway_view.js')
const LinyutangDisplay = require('./views/linyutang_view.js')
const NobokovDisplay = require('./views/nobokov_view.js')
const PratchettDisplay = require('./views/pratchett_view.js')
const GuinDisplay = require('./views/guin_view.js')
const DostDisplay = require('./views/dost_view.js')



document.addEventListener('DOMContentLoaded', () => {
   console.log('Javascript Loaded');

    const displayContainer = document.querySelector('#book-list')
    const displayView = new DisplayView(displayContainer)
    displayView.bindEvents();

    const hemmingwayDisplay = new HemmingwayDisplay(displayContainer)
    hemmingwayDisplay.bindEvents();

    const linyutangDisplay = new LinyutangDisplay(displayContainer)
    linyutangDisplay.bindEvents()

    const nobokovDisplay = new NobokovDisplay(displayContainer)
    nobokovDisplay.bindEvents();

    const pratchettDisplay = new PratchettDisplay(displayContainer)
    pratchettDisplay.bindEvents();

    const guinDisplay = new GuinDisplay(displayContainer)
    guinDisplay.bindEvents();
    
    const dostDisplay = new DostDisplay(displayContainer)
    dostDisplay.bindEvents();

    const author = new Author();
    author.bindEvents()

});

  