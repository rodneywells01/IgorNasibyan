angular.module('IgorNasibyan').directive("contactSection", function(NodeConnection) {
	return {
		templateUrl: 'app/views/contact-section.html',
		restrict: 'E', 
		scope: {			
		},
		link: function($scope, elem, attr) { 
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

			function fetchContactInfo() {
				NodeConnection.getContactInfo().then(function(data) {					
					$scope.contact = data[0];		
				});
			}

			fetchContactInfo();
		}
	};
});