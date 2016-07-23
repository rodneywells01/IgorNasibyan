angular.module('IgorNasibyan').directive("awardsSection", function(NodeConnection, $rootScope, PromptService) {
	return {
		templateUrl: 'app/views/award-section.html',
		restrict: 'E', 
		link: function($scope, elem, attr) { 
			$scope.awards = [];
			function fetchAwards() {				
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

			$scope.addAward = function() {
				console.log($scope.newspapers);
				$scope.newAward = {};
				console.log("Award!")
				PromptService.setPromptConfig('titledescfiles.html', 
						'Award', true, $scope.awards, elem);
				PromptService.displayPrompt();
			}

			fetchAwards();
		}
	};
});