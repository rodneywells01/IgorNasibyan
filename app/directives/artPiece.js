angular.module('IgorNasibyan').directive("artPiece", function() {
	return {
		templateUrl: 'app/directives/templates/art-piece.html',
		scope: { imagename : '='},
		restrict: 'E', 
		link: function($scope, elem, attr) { 
			console.log($scope.imagename);
			$scope.imagePath = "app/images/artwork/" + $scope.imagename;
		}
	};
});
