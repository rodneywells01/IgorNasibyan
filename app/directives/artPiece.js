angular.module('IgorNasibyan').directive("artPiece", function(PromptService) {
	return {
		templateUrl: 'app/directives/templates/art-piece.html',
		scope: { imagename : '='},
		restrict: 'E', 
		link: function(scope, elem, attr) { 
			scope.imagePath = "app/images/artwork/" + scope.imagename;
			scope.displayFullSize = function() {
				PromptService.setPromptConfigDisplay('artDisplay.html', scope.imagePath, elem[0]);
				PromptService.displayPrompt();
			}
		}
	};
});
