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