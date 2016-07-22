angular.module('IgorNasibyan').directive("newspapersSection", function(NodeConnection, PromptService) {
	return {
		templateUrl: 'app/views/newspaper-section.html',
		restrict: 'E', 
		link: function($scope, elem, attr) { 
			$scope.newspapers = [];
			function fetchNewsPapers() {				
				NodeConnection.getNewsPapers().then(function(data) {
					$scope.newspapers = data;
				});
			}

			$scope.add = function() {
				$scope.newNewspaper = {};
				PromptService.setPromptConfig('titledescfiles.html', 'Newspaper', true, $scope.newNewspaper, elem);
				PromptService.displayPrompt();
			}

			fetchNewsPapers();
		}
	};
});