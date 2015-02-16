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