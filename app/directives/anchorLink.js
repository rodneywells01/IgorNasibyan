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
					var result = document.getElementById("mainfab");
					var loginbutton = angular.element(result)[0];
					PromptService.setPromptConfigDisplay('LoginController', 'login-form.html', null, loginbutton);
					PromptService.displayPrompt();
				} else {
					if(confirm("Are you sure you'd like to logout?"))
						$rootScope.loggedIn = false;
				}
			}

		}
	};
});