angular.module('IgorNasibyan').directive("artPiece", function() {
	return {
		templateUrl: 'app/directives/templates/art-piece.html',
		scope: { imagename : '='},
		restrict: 'E', 
		link: function($scope, elem, attr) { 
			$scope.imagePath = "app/images/artwork/" + $scope.imagename;
		}
	};
});
