app.controller('PromptController', function($scope, PromptService, NodeConnection, mdPanelRef, Upload) {	
	$scope.promptData = PromptService.promptData;
	$scope.servicebackend = PromptService.servicebackend;
	$scope.backendAdd = PromptService.backendAdd;
	$scope.image = PromptService.image;
	$scope.file = "";
	console.log($scope.image);
	var updateData = "";

	// Send a request using the Node Connection. 	
	$scope.makeBackendRequest = function() {
		if(PromptService.backendAdd) {
			dbElemInsert();
		} else {
			dbElemUpdate();
		}
	};
	
	$scope.setFile = function() {		
		$scope.fileInput = document.getElementById('fileUpload');        
        $scope.fileInput.click();
        $scope.fileInput.onchange = function (e) {
    		$scope.fileInput = document.getElementById('fileUpload');

            // Update file input object. 
            console.log("File change!");
            console.log($scope.fileInput);
            // $scope.file = $scope.fileInput.files[0];
            PromptService.promptData.file = $scope.fileInput.files[0];
            $scope.$apply();
        };     
	};

	// DEBUG
	$scope.displayFileInfo = function() {
		console.log($scope.file);
	};

	// INSERT
	function dbElemInsert () {
		NodeConnection.uploadImage($scope.servicebackend, $scope.file).then(function(data) {
			NodeConnection.insertDBValue($scope.servicebackend, PromptService.promptData).then(function(data) {
				updateData = data; 
				$scope.closeDialog();			
				PromptService.addElement(data);
			});
		});		
	}

	// UPDATE
	function dbElemUpdate() {		
		NodeConnection.updateDBValue($scope.servicebackend, PromptService.promptData).then(function(data) {			
			$scope.closeDialog();						
	  		PromptService.updateOriginal(data);
		});
	}

	// DELETE 
	$scope.deleteElement = function() {		
		if(confirm("Are you sure you want to delete this?")) {
			NodeConnection.deleteDBValue($scope.servicebackend, PromptService.promptData._id).then(function(data) {
				$scope.closeDialog();				
				PromptService.removeElement(PromptService.selectedId);
			});
		}
	};	

	// Close dialog
	$scope.closeDialog = function(){
	  	mdPanelRef && mdPanelRef.close();
	};
});