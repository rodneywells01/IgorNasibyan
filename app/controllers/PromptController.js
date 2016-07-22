app.controller('PromptController', function($scope, PromptService, NodeConnection, mdPanelRef) {	
	$scope.fileInput = document.getElementById('fileUpload');
	$scope.promptData = PromptService.promptData;
	$scope.servicebackend = PromptService.servicebackend;
	var updateData = "";

	// Send a request using the Node Connection. 	
	$scope.makeBackendRequest = function() {
		if(PromptService.backendAdd) {
			console.log("Add element! - Not functioning yet.");
			// $scope.dbElemInsert($rootScope.servicebackend);
		} else {
			dbElemUpdate($scope.servicebackend);
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
	function dbElemInsert (area) {
		console.log("Inserting..." + area);
		NodeConnection.insertElement(area, PromptService.promptData).then(function(data) {
			console.log("Insertion successful!");
			console.log(data);
			updateData = data; 
			$scope.closeDialog();
		});
	}

	// UPDATE
	function dbElemUpdate(area) {
		console.log("Updaing..." + area); 
		NodeConnection.updateDBValue(area, PromptService.promptData).then(function(data) {
			console.log("Update successful!");
			console.log(data); 
			updateData = data;
			$scope.closeDialog();
		});
	}

	// Close dialog
	$scope.closeDialog = function(){
		console.log("Closing dialog!");
	  	mdPanelRef && mdPanelRef.close();

	  	// Refresh element.
	  	PromptService.updateOriginal($scope.promptData);
	};
});