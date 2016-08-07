angular.module('IgorNasibyan').directive("artCollectionSection", function(NodeConnection, $timeout, PromptService) {
	return {
		templateUrl: 'app/views/art-collection-section.html',
		restrict: 'E', 		
		link: function($scope, elem, attr) {
			$scope.artFiles = []; 
			$scope.expandedClass = false;
			$scope.showArt = false;

			NodeConnection.getImageList().then(function(data) {
				$scope.artFiles = data;
			});

			function fetchArtwork() {
				/* Get all of the latest artwork from Igor Nasibyan. */
				NodeConnection.getImageList().then(function(data) {
					console.log(data);
					$scope.artFiles = data;
				});
			}

			fetchArtwork(); 
			$scope.displayArt = function() {
				/* Compile and display art-piece elements. */
				$scope.expandedClass = !$scope.expandedClass;

				if (!$scope.showArt) {
					$timeout(function() {$scope.showArt = true}, 350);	
				} else {
					$scope.showArt = false;
				}							
			};

			$scope.addArtwork = function(elem){
				console.log(elem);
				var newArt = { storageId: $scope.awards.length};
				PromptService.setPromptConfigDisplay('ArtController', 'uploadFile.html', null, elem, $scope.artFiles);
				PromptService.displayPrompt();
			}

			$scope.editArtwork = function(imageName, element){
				PromptService.setPromptConfigDisplay('ArtController', 'artEdit.html', imageName, element.srcElement, $scope.artFiles);
				PromptService.displayPrompt();
			}
		}
	};
});