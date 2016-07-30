var app = angular.module('IgorNasibyan', ['ngMaterial', 'ngFileUpload']);
app.run(function($rootScope, $mdPanel){
	$rootScope.loggedIn = false;
	$rootScope.credentials = {
		username: '',
		password: ''
	};
});