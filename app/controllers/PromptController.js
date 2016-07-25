app.controller('PromptController', function($scope, PromptService, NodeConnection, mdPanelRef) {	
	$scope.fileInput = document.getElementById('fileUpload');
	$scope.promptData = PromptService.promptData;
	$scope.servicebackend = PromptService.servicebackend;
	$scope.backendAdd = PromptService.backendAdd;
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
        $scope.fileInput.click();
        $scope.fileInput.onchange = function (e) {
            // Update file input object. 
            console.log("File change!");
            console.log($scope.fileInput);
            PromptService.promptData.file = $scope.fileInput.files[0];
            $scope.$apply();
        };     
	};

	// DEBUG
	$scope.displayFileInfo = function() {
		console.log(PromptService.promptDataOriginal);
	};

	// INSERT
	function dbElemInsert () {
		NodeConnection.insertDBValue($scope.servicebackend, PromptService.promptData).then(function(data) {
			updateData = data; 
			$scope.closeDialog();
			PromptService.addElement(data);
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