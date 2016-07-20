var app = angular.module('IgorNasibyan', ['ngMaterial']);
app.run(function($rootScope, $mdPanel){
	$rootScope.loggedIn = true;

	var position = $mdPanel.newPanelPosition()
			.absolute()
			.center(); 

	var animation = $mdPanel.newPanelAnimation(); 
	animation.openFrom({top:0, left:0}); 
	// animation.closeTo({top: 50%, left: 100%}); 
  	animation.closeTo({top:0, left:0});

	animation.withAnimation($mdPanel.animation.SCALE); 
	var config = {
		animation: animation,
		attachTo: angular.element(document.body), 
		controller: 'PromptController', 
		templateUrl: 'app/views/prompt.html', 
		panelClass: '', 
		position: position,
		trapFocus: true, 
		zIndex: 150, 
		clickOutsideToClose: true, 
		clickEscapeToClose: true, 
		hasBackdrop: true
	};

	$rootScope.displayPrompt = function() {	
		$mdPanel.open(config); 
	}

	$rootScope.servicebackend = "";
	$rootScope.backendAdd = false;
	$rootScope.promptData = {};

	$rootScope.setPromptConfig = function(templateUrl, servicebackend, backendfunctionality, promptData) {
		config = {
			animation: animation,
			attachTo: angular.element(document.body), 
			controller: 'PromptController', 
			templateUrl: 'app/promptviews/' + templateUrl, 
			panelClass: '', 
			position: position,
			trapFocus: true, 
			zIndex: 150, 
			clickOutsideToClose: true, 
			clickEscapeToClose: true, 
			hasBackdrop: true
		};

		$rootScope.servicebackend = servicebackend;
		$rootScope.backendAdd = backendfunctionality;
		$rootScope.promptData = promptData;
	}

})