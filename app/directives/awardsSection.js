angular.module('IgorNasibyan').directive("awardsSection", function(NodeConnection, $rootScope, PromptService) {
	return {
		templateUrl: 'app/views/award-section.html',
		restrict: 'E', 
		link: function($scope, elem, attr) { 
			function fetchAwards() {
				$scope.awards = [];
				NodeConnection.getAwards().then(function(data) {
					$scope.awards = data;					
					console.log($scope.awards);
				});
			}

			$scope.determineCols = function(desiredCols)  {
				var loggedInExtra = 0;
				if ($rootScope.loggedIn) {
					loggedInExtra += 1;
				}

				return (desiredCols >= $scope.awards.length ?  
					$scope.awards.length || 1 : desiredCols) + loggedInExtra;
			};

			$scope.add = function() {
				$scope.newAward = {};
				PromptService.setPromptConfig('titledescfiles.html', 'Award', true, $scope.newAward, elem);
				PromptService.displayPrompt();
			}

			fetchAwards();
		}
	};
});