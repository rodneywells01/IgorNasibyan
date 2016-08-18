angular.module('IgorNasibyan').directive("artPiece", function(PromptService) {
	return {
		templateUrl: 'app/directives/templates/art-piece.html',
		scope: { 
			imagename : '=',
			editFn: '&'
		},
		restrict: 'E', 
		link: function(scope, elem, attr) { 
			scope.imagePath = "app/images/art/" + scope.imagename;
			scope.displayFullSize = function() {
				PromptService.setPromptConfigDisplayImage('ArtController', 'artDisplay.html', scope.imagePath, elem[0]);
				PromptService.displayPrompt();
			}
		}
	};
});
