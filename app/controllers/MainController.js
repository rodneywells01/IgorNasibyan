app.controller('MainController', function($scope, $anchorScroll, $location, $mdPanel, NodeConnection) {
	
});

function DialogCode() {
	var position = $mdPanel.newPanelPosition()
			.absolute()
			.center(); 

		var animation = $mdPanel.newPanelAnimation(); 
		animation.openFrom('#ViewCollectionButton'); 
		// animation.closeTo({top: 50%, left: 100%}); 
      	animation.closeTo({top:0, left:0});

		animation.withAnimation($mdPanel.animation.SCALE); 
		var config = {
			animation: animation,
			attachTo: angular.element(document.body), 
			controller: 'ArtController', 
			templateUrl: 'app/views/artcollection.html', 
			panelClass: '', 
			position: position,
			trapFocus: true, 
			zIndex: 150, 
			clickOutsideToClose: true, 
			clickEscapeToClose: true, 
			hasBackdrop: true
		};

		$mdPanel.open(config); 
}