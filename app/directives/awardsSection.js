angular.module('IgorNasibyan').directive("awardsSection", function(NodeConnection, $rootScope, PromptService) {
	return {
		templateUrl: 'app/views/award-section.html',
		restrict: 'E', 
		link: function($scope, elem, attr) { 
			$scope.awards = [];
			function fetchAwards() {				
				NodeConnection.getAwards().then(function(data) {
					$scope.awards = data;					
					var i = 0; 
					for (i = 0; i < $scope.awards.length; i++) {
						$scope.awards[i].storageId = i;
					}
					console.log($scope.awards);
				});
			}

			$scope.determineCols = function(desiredCols)  {
				return (desiredCols >= $scope.awards.length ?  
					$scope.awards.length || 1 : desiredCols) ;
			};

			$scope.addAward = function() {
				var newAward = { storageId: $scope.awards.length - 1};
				PromptService.setPromptConfig('titledescfiles.html', 'Award', true, $scope.awards, newAward, null);
				PromptService.displayPrompt();
			}

			// Display prompt with info. 		
			$scope.editAward = function(award) {
				PromptService.setPromptConfig('titledescfiles.html', 'Award', false, $scope.awards, award.storageId, null);
				PromptService.displayPrompt();
			};

			fetchAwards();
		}
	};
});