angular.module('IgorNasibyan').directive("newspaper", function($rootScope, PromptService) {
	return {
		templateUrl: 'app/directives/templates/newspapercard.html',
		restrict: 'E', 
		scope: {
			editFn: '&',
			elementData: '=elementdata'
		},
		link: function(scope, elem, attr) { // Not sure if right order. 		
			scope.newspaperData = {
				'title': scope.elementData.title,
				'file': 'app/images/newspaper/' + scope.elementData.fileName,
				'description': scope.elementData.description,
				'id': scope.elementData._id
			};
		}
	};
});