const RequestHelper = function (url) {
    this.url = url;
};

RequestHelper.prototype.get = function () {
    return fetch(this.url)
        .then(response => response.json())
        .catch((err) => { console.log('An error has occurred:', err) })
};

module.exports = RequestHelper;
