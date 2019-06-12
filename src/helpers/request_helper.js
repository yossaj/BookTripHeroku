const RequestHelper = function (url) {
    this.url = url;
};

RequestHelper.prototype.get = function () {
    return fetch(this.url)
        .then(response => response.json())
        .catch((err) => { console.log('You done fuck up son', err) })
};

module.exports = RequestHelper;
