app.controller('MainController', function($scope, $anchorScroll, $location, $mdPanel, NodeConnection) {
	$scope.message = "Swag in the club yo"; 
	$scope.awardURL = "https://theaphidroom.files.wordpress.com/2012/02/gb11-gold-medal_475x393-300x248.jpg";
	$scope.contact = {
		email: '',
		homePhone: '',
		location: '',
		mobilePhone: '', 
		socialFacebook: '',
		socialTwitter: '',
		socialLinkedIn: '',
		socialYoutube: ''
	};


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

	function fetchAllInfo() {
		fetchContactInfo(); 
	}

	function fetchContactInfo() {
		NodeConnection.getContactInfo().then(function(data) {
			// if(err) {
			// 	console.log("Error!!");
			// 	console.log(err);
			// } else {
				console.log("Data obtained!");
				console.log(data);

				// Assign Data. 
				var keys = Object.keys($scope.contact);
				var i = 0; 
				for (i = 0; i < keys.length; i++) {
					$scope.contact[keys[i]] = data[0][keys[i]]; 
				}			
		});
	}

	fetchAllInfo();
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