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
	$scope.awards = [];
	$scope.newspapers = [];

	function fetchAllInfo() {
		fetchContactInfo(); 
		fetchNewsPapers();
		fetchAwards();
		// fetchArtWork();
	}

	function fetchContactInfo() {
		NodeConnection.getContactInfo().then(function(data) {					
			$scope.contact = data[0];		
		});
	}

	function fetchNewsPapers() {
		NodeConnection.getNewsPapers().then(function(data) {
			$scope.newspapers = data;
		});
	}

	function fetchAwards() {
		NodeConnection.getAwards().then(function(data) {
			$scope.awards = data;
		});
	}

	function fetchArtwork() {
		NodeConnection.getImageList().then(function(data) {
			$scope.artFiles = data;
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