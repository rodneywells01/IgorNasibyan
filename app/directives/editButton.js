angular.module('IgorNasibyan').directive("editButton", function() {
	return {
		templateUrl: 'app/directives/templates/edit-button.html',
		restrict: 'E', 
		scope: {
			editFn: '&'
		},
		link: function(scope, elem, attr) { // Not sure if right order. 
			scope.imagePath = attr.pic; 
			scope.title = attr.title; 
			scope.description = attr.description;
		}
	};
});