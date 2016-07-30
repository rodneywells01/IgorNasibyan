angular.module('IgorNasibyan').directive("anchorLink", function($anchorScroll, $location, $rootScope, NodeConnection, PromptService) {
	return {
		templateUrl: 'app/directives/templates/anchor-link.html',
		restrict: 'E', 
		link: function(scope, elem, attr) { // Not sure if right order. 
			scope.isOpen = false;
			scope.scrollTo = function(hash) {
				$location.hash(hash); 
				$anchorScroll();
			};

			scope.login = function() {
				if(!$rootScope.loggedIn) {
					PromptService.setPromptConfigMinimal('LoginController', 'login-form.html');
					PromptService.displayPrompt();
				} else {
					if(confirm("Are you sure you'd like to logout?"))
						$rootScope.loggedIn = false;
				}
			}

		}
	};
});