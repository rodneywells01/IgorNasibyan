angular.module('IgorNasibyan').directive("awardsSection", function(NodeConnection) {
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
				return desiredCols >= $scope.awards.length ? 
					$scope.awards.length || 1 : desiredCols;
			}

			fetchAwards();
		}
	};
});