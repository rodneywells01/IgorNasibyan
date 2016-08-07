app.controller('ArtController', function($scope, PromptService, NodeConnection, mdPanelRef, Upload) {		
	// Send a request using the Node Connection. 	
	if (PromptService.image != null){
		$scope.file = 'app/images/art/' + PromptService.image;	
	}
	
	$scope.makeBackendRequest = function() {
		dbElemInsert();
	};
	
	$scope.setFile = function() {		
		document.getElementById('fileUpload').click();
	};

	// INSERT
	function dbElemInsert() {
		console.log($scope.file);
		NodeConnection.uploadImage('Art', $scope.file).then(function(data) {
			console.log("Data upload success!");
			$scope.closeDialog();
		});		
	}

	$scope.deleteArtwork = function() {
		console.log("Let's delete the artwork!");
		if(confirm("Are you sure you would like to delete this art piece?")) {
			console.log("Deleting artwork...");
			NodeConnection.deleteDBValue('Art', 0, PromptService.image).then(function(data) {
				if(data.deleted == true) {
					console.log("Deletion Success!");
				} else {
					console.log("Deletion failure!");
				}
				// TODO recompile view.
				$scope.closeDialog();
			});
		}
	}

	// Close dialog
	$scope.closeDialog = function(){
	  	mdPanelRef && mdPanelRef.close();
	};
});