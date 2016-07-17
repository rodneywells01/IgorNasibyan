var app = angular.module('IgorNasibyan', ['ngMaterial']);
app.run(function($rootScope){
	$rootScope.loggedIn = true;
})