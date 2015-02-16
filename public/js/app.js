var app = angular.module('FlashCards', []);

app.controller('MainController', function ($scope, FlashCardsFactory) {

    console.log(FlashCardsFactory);

    FlashCardsFactory.getFlashCards().then(function(data) {
        $scope.flashCards = data;
    });

    $scope.categories = [
        'MongoDB',
        'Express',
        'Angular',
        'Node'
    ];

    $scope.getCategoryCards = function (category) {
        $scope.currentCategory = category;
        FlashCardsFactory.getFlashCards(category).then(function (data) {
            $scope.flashCards = data;
        })

    }

});


app.controller('FlashCardController', function ($scope, ScoreFactory) {

    $scope.answered = false;
    $scope.answeredCorrectly = null;

    $scope.answerQuestion = function (answer) {

        if ($scope.answered) {
            return;
        }

        $scope.answered = true;
        $scope.answeredCorrectly = answer.correct;

        if ($scope.answeredCorrectly) {
            ScoreFactory.correct++;
        } else {
            ScoreFactory.incorrect++;
        }

    };
});

app.controller('StatsController', function ($scope, ScoreFactory) {
    $scope.scores = ScoreFactory;
});

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

app.factory('ScoreFactory', function($http) {
    return {
        correct: 0,
        incorrect: 0
    };
})