angular.module('IgorNasibyan').directive("editButton", function($rootScope) {
	return {
		templateUrl: 'app/directives/templates/edit-button.html',
		restrict: 'E', 
		scope: {
		},
		link: function(scope, elem, attr) { // Not sure if right order. 
			$rootScope.loggedIn;			
		}
	};
});