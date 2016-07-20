app.controller('PromptController', function($scope, $rootScope, $mdPanel, NodeConnection, $rootScope, NodeConnection, mdPanelRef) {	
	$scope.fileInfo = {
		'title': '',
		'description': '',
		'file': '',
		'id': ''
	};

	$scope.elemData = $rootScope.promptData;

	$scope.makeBackendRequest = function() {
		if($rootScope.backendAdd) {
			console.log("Add element! - Not functioning yet.");
			// $scope.dbElemInsert($rootScope.servicebackend);
		} else {
			NodeConnection.updateDBValue($rootScope.servicebackend, $scope.elemData).then(function(data) {
				console.log("Update successful!");
				console.log(data);
				$scope.closeDialog();
			});
		}
	};

	$scope.fileInput = document.getElementById('fileUpload');
	
	$scope.setFile = function() {
		var uploadInput = document.getElementById('fileUpload').click();
        $scope.fileInput = document.getElementById('fileUpload');
        document.getElementById('fileUpload').onchange = function (e) {
            // Update file input object. 
            console.log("File change!");
            console.log($scope.fileInput);
            $scope.elemData.file = $scope.fileInput.files[0];
            $scope.$apply();
        };     
	};

	$scope.displayFileInfo = function() {
		console.log($scope.elemData.file);
		console.log($scope.elemData);
	};

	$scope.dbElemInsert = function (area) {
		console.log("Inserting..." + area);
		NodeConnection.insertElement(area, $scope.elemData).then(function(data) {
			console.log("Insertion successful!");
			console.log(data); 
		});
	};

	$scope.closeDialog = function(){
		console.log("Closing dialog!");
	  	mdPanelRef && mdPanelRef.close();
	};
});