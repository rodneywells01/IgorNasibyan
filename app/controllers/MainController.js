app.controller('MainController', function($scope, $anchorScroll, $location, $mdPanel) {
	$scope.message = "Swag in the club yo"; 
	$scope.awardURL = "https://theaphidroom.files.wordpress.com/2012/02/gb11-gold-medal_475x393-300x248.jpg";

	// FAB open controls 

	$scope.newspapers = [
		{
			'title': 'Test Paper Title 1',
			'image': '',
			'description': 'Great article'
		},
		{
			'title': 'Test Paper Title 2',
			'image': '',
			'description': 'Great article'
		},
		{
			'title': 'Test Paper Title 3',
			'image': '',
			'description': 'Great article'
		},	
	];

	
	$scope.showDialog = function() {

	};

	console.log($scope.newspapers[0].title);	
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