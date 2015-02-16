var app = angular.module('FlashCards', []);

app.controller('MainController', function ($scope, FlashCardsFactory) {

    console.log(FlashCardsFactory);

    FlashCardsFactory.getFlashCards().then(function(data) {
        $scope.flashCards = data;
        console.log($scope.flashCards);
    });
    

});


app.controller('FlashCardController', function ($scope) {

    $scope.answered = false;
    $scope.answeredCorrectly = null;

    $scope.answerQuestion = function (answer) {

        if ($scope.answered) {
            return;
        }

        $scope.answered = true;
        $scope.answeredCorrectly = answer.correct;

    };

});

app.factory('FlashCardsFactory', function ($http) {
    return { 
        getFlashCards: function () {
            //this function initially returns a promise for a response from the get request
            //then once the response is generate then it returns a promise for the data
            //then we resolve that when we call this function in our controller (above)
            //in the controller we also need a promise but instead of returning something we 
            //set the property on the scope (otherwise it would just return another promise)
            var promiseForData = $http.get('/cards').then(function(response) {
                return response.data;
            });
            return promiseForData;
        }
    };
});








