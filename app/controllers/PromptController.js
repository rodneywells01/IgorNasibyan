app.controller('PromptController', function($scope, PromptService, NodeConnection, mdPanelRef) {	
	$scope.fileInput = document.getElementById('fileUpload');
	$scope.promptData = PromptService.promptData;
	$scope.servicebackend = PromptService.servicebackend;
	$scope.backendAdd = PromptService.backendAdd;
	var updateData = "";

	// Send a request using the Node Connection. 	
	$scope.makeBackendRequest = function() {
		if(PromptService.backendAdd) {
			console.log("Add element! - Not functioning yet.");			
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
		console.log(PromptService.promptData);
	};

	// INSERT
	function dbElemInsert () {
		console.log("Inserting..." + $scope.servicebackend);
		NodeConnection.insertDBValue($scope.servicebackend, PromptService.promptData).then(function(data) {
			console.log("Insertion successful!");
			console.log(data);
			updateData = data; 
			$scope.closeDialog();

			// Insert new elem. 
			PromptService.addElement(data);
		});
	}

	// UPDATE
	function dbElemUpdate() {
		console.log("Updaing..." + $scope.servicebackend); 
		NodeConnection.updateDBValue($scope.servicebackend, PromptService.promptData).then(function(data) {
			console.log("Update successful!");
			console.log(data); 
			updateData = data;
			$scope.closeDialog();

		  	// Refresh element.
	  		PromptService.updateOriginal($scope.promptData);
		});
	}

	// DELETE 
	$scope.deleteElement = function() {
		if(confirm("Are you sure you want to delete this?")) {
			NodeConnection.deleteDBValue($scope.servicebackend, PromptService.promptData.id).then(function(data) {
				console.log("Delete succeeded!"); 
				$scope.closeDialog();
			});
		}
	};	

	// Close dialog
	$scope.closeDialog = function(){
		console.log("Closing dialog!");
	  	mdPanelRef && mdPanelRef.close();
	};
});