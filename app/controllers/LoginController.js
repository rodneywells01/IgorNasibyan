app.controller('LoginController', function($scope, $rootScope, $http, PromptService, NodeConnection, mdPanelRef, Upload) {	
	$scope.login = function() {
		var token = btoa($scope.username + ":" + $scope.password);        
		$http.defaults.headers.common['Authorization'] = 'Basic ' + token;
		NodeConnection.login($scope.username, $scope.password).then(function(data){
			if(data.loginstate) {
				$rootScope.loggedIn = true;
				$rootScope.credentials.username = $scope.username;
				$rootScope.credentials.password = $scope.password;	          
				console.log("Auth success!");
				$scope.closeDialog();
			} else {
				$rootScope.loggedIn = false;				
				console.log("Login failure!");
				delete $http.defaults.headers.common['Authorization'];
				// TODO IMPLEMENT TOASTS!
			}			
		});
	};

	// Close dialog
	$scope.closeDialog = function(){
	  	mdPanelRef && mdPanelRef.close();
	};
});