app.controller('UploadArtController', function($scope, PromptService, NodeConnection, mdPanelRef, Upload) {		
	// Send a request using the Node Connection. 	
	$scope.makeBackendRequest = function() {
		dbElemInsert();
	};
	
	$scope.setFile = function() {		
		document.getElementById('fileUpload').click();
	};

	// INSERT
	function dbElemInsert() {
		NodeConnection.uploadImage('Art', $scope.file).then(function(data) {
			console.log("Data upload success!");
			$scope.closeDialog();
		});		
	}

	function deleteArtwork() {
		// NodeConnection.deleteArtwork()
	}

	// Close dialog
	$scope.closeDialog = function(){
	  	mdPanelRef && mdPanelRef.close();
	};
});