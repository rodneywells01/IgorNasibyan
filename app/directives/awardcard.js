angular.module('IgorNasibyan').directive("awardcard", function() {
	return {
		templateUrl: 'app/directives/templates/awardcard.html',
		restrict: 'E', 
		link: function(scope, elem, attr) { // Not sure if right order. 
			scope.imagePath = attr.pic; 
			scope.title = attr.title; 
			scope.description = attr.description;
		}
	};
});