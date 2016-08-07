angular.module('IgorNasibyan').directive("addCard", function($rootScope) {
	return {
		templateUrl: 'app/directives/templates/add-card.html',
		restrict: 'E', 
		scope: {
			addFn: '&'
		},
		link: function(scope, elem, attr) { // Not sure if right order. 
			$rootScope.loggedIn;
			scope.imagePath = attr.pic; 
			scope.title = attr.title; 
			scope.description = attr.description;	

			scope.addEvent = function(event) {
				scope.addFn(event.srcElement);
			};	
		}
	};
});