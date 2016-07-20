angular.module('IgorNasibyan').directive("newspapersSection", function(NodeConnection) {
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

			fetchNewsPapers();
		}
	};
});