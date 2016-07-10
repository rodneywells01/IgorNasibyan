angular.module('IgorNasibyan').directive("anchorLink", function($anchorScroll, $location) {
	return {
		templateUrl: 'app/directives/templates/anchor-link.html',
		restrict: 'E', 
		link: function(scope, elem, attr) { // Not sure if right order. 
			scope.isOpen = false;
			scope.scrollTo = function(hash) {
				$location.hash(hash); 
				$anchorScroll();
			};

		}
	};
});