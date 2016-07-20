angular.module('IgorNasibyan').directive("newspaper", function($rootScope) {
	return {
		templateUrl: 'app/directives/templates/newspapercard.html',
		restrict: 'E', 
		scope: {
			title: '=',
			image: '=',
			description: '=',
			id: '='
		},
		link: function(scope, elem, attr) { // Not sure if right order. 
			scope.elemData = {
				title: scope.title,
				image: scope.image, 
				description: scope.description, 
				id: scope.id, 
			};

			scope.edit = function() {
				// Display prompt with info. 
				$rootScope.setPromptConfig('titledescfiles.html', 'Newspaper', false, scope.elemData);
				$rootScope.displayPrompt();
			}
		}
	};
});