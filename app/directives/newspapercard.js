angular.module('IgorNasibyan').directive("newspaper", function() {
	return {
		templateUrl: 'app/directives/templates/newspapercard.html',
		restrict: 'E', 
		scope: {
			title: '=',
			image: '=',
			description: '='
		},
		link: function(scope, elem, attr) { // Not sure if right order. 
			// scope.title = scope.newspapers[scope.index].title; 
			// scope.image = scope.newspapers[scope.index].image; 
			// scope.description = scope.newspapers[scope.index].description;
		}
	};
});