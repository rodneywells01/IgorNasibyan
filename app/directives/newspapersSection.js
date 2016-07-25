angular.module('IgorNasibyan').directive("newspapersSection", function(NodeConnection, PromptService) {
	return {
		templateUrl: 'app/views/newspaper-section.html',
		restrict: 'E', 
		link: function($scope, elem, attr) { 
			$scope.newspapers = [];
			function fetchNewsPapers() {				
				NodeConnection.getNewsPapers().then(function(data) {
					$scope.newspapers = data;
					var i = 0; 
					for (i = 0; i < $scope.newspapers.length; i++) {
						$scope.newspapers[i].storageId = i;
					}
					console.log($scope.newspapers);
				});
			}

			$scope.add = function() {
				var newNewspaper = { storageId: $scope.newspapers.length - 1};
				PromptService.setPromptConfig('titledescfiles.html', 'Newspaper', true, $scope.newspapers, newNewspaper, null);
				PromptService.displayPrompt();
			}

			$scope.edit = function(newspaper) {
				// Display prompt with info. 
				PromptService.setPromptConfig('titledescfiles.html', 'Newspaper', false, $scope.newspapers, newspaper.storageId, null);
				PromptService.displayPrompt();
			};

			fetchNewsPapers();
		}
	};
});