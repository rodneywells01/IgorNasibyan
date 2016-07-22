var app = angular.module('IgorNasibyan', ['ngMaterial']);
app.run(function($rootScope, $mdPanel){
	$rootScope.loggedIn = true;
});