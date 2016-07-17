angular.module('IgorNasibyan').directive("awardsSection", function(NodeConnection) {
	return {
		templateUrl: 'app/views/award-section.html',
		restrict: 'E', 
		scope: {			
		},
		link: function($scope, elem, attr) { 
			function fetchAwards() {
				$scope.awards = [];
				NodeConnection.getAwards().then(function(data) {
					$scope.awards = data;
				});
			}

			$scope.determineCols = function(desiredCols)  {
				return desiredCols >= $scope.awards.length ? 
					$scope.awards.length : desiredCols;
			}

			fetchAwards();
		}
	};
});