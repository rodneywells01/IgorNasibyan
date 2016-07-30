app.controller('LoginController', function($scope, $rootScope, PromptService, NodeConnection, mdPanelRef, Upload) {	
	$scope.login = function() {
		NodeConnection.login($scope.username, $scope.password).then(function(data){
			if(data.loginstate) {
				$rootScope.loggedIn = true;
				$rootScope.credentials.username = $scope.username;
				$rootScope.credentials.password = $scope.password;
				console.log("Auth success!");
				$scope.closeDialog();
			} else {
				console.log("Login failure!");
				//TODO IMPLEMENT TOASTS!
			}
			
		});
	};

	// Close dialog
	$scope.closeDialog = function(){
	  	mdPanelRef && mdPanelRef.close();
	};
});