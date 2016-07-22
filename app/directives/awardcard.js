angular.module('IgorNasibyan').directive("awardcard", function($rootScope, PromptService) {
	return {
		templateUrl: 'app/directives/templates/awardcard.html',
		scope: {
			editFn: '&',
			elementData: '=elementdata'
		},
		restrict: 'E', 
		link: function(scope, elem, attr) {
			scope.awardInfo = {
				'title' : scope.elementData.title,
				'description': scope.elementData.description,
				'file': 'app/images/award/' + scope.elementData.fileName,
				'id': scope.elementData._id
			};

			// Display prompt with info. 		
			scope.edit = function() {
				PromptService.setPromptConfig('titledescfiles.html', 'Award', false, scope.awardInfo, elem);
				PromptService.displayPrompt();
			}
		}
	};
});