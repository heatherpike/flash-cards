app.factory('FlashCardsFactory', function ($http) {
    return {
        getFlashCards: function (category) {
            //this function initially returns a promise for a response from the get request
            //then once the response is generate then it returns a promise for the data
            //then we resolve that when we call this function in our controller (above)
            //in the controller we also need a promise but instead of returning something we 
            //set the property on the scope (otherwise it would just return another promise)

            var queryParams = {};

            if (category) {
                queryParams.category =category;
            }

            var promiseForData = $http.get('/cards', {params:queryParams}).then(function (response) {
                return response.data;
            });

            return promiseForData;
        }
    }
});