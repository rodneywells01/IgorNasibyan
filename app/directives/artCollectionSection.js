angular.module('IgorNasibyan').directive("artCollectionSection", function(NodeConnection, $timeout) {
	return {
		templateUrl: 'app/views/art-collection-section.html',
		restrict: 'E', 		
		link: function($scope, elem, attr) { 
			NodeConnection.getImageList().then(function(data) {
				$scope.artFiles = data;
			});

			$scope.expandedClass = false;
			$scope.showArt = false;

			function fetchArtwork() {
				/* Get all of the latest artwork from Igor Nasibyan. */
				NodeConnection.getImageList().then(function(data) {
					$scope.artFiles = data;
				});
			}

			$scope.artFiles = [];
			fetchArtwork(); 



			$scope.displayArt = function() {
				/* Compile and display art-piece elements. */
				$scope.expandedClass = !$scope.expandedClass;
				var container = document.getElementById('artcollection'); 
				var imglist = ""; 
				var i = 0; 
				for (i = 0; i < $scope.artFiles.length; i++) {
					var newimg = "<img class='art-piece' src='app/images/artwork/" + $scope.artFiles[i] + "'>";
					imglist += newimg;
				}

				if (!$scope.showArt) {
					$timeout(function() {$scope.showArt = true}, 350);	
				} else {
					$scope.showArt = false;
				}
				

				// container.innerHTML = imglist;
			};
		}
	};
});