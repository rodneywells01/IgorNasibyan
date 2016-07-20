angular.module('IgorNasibyan').directive("awardcard", function($rootScope) {
	return {
		templateUrl: 'app/directives/templates/awardcard.html',
		restrict: 'E', 
		link: function(scope, elem, attr) { // Not sure if right order. 
			scope.imagePath = attr.pic; 
			scope.title = attr.title; 
			scope.description = attr.description;
			scope.id = attr.id;

			scope.awardInfo = {
				'title' : scope.title,
				'description': scope.description,
				'file': scope.file,
				'id': scope.id
			};
			
			scope.edit = function() {
				// Display prompt with info. 
				$rootScope.setPromptConfig('titledescfiles.html', 'Award', false, scope.awardInfo);
				$rootScope.displayPrompt();
			}
		}
	};
});