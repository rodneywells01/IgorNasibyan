app.service('NodeConnection', function($http, $q, Upload, $rootScope) {
	this.getImage = function(imageName) {
		return httpGet('app/images/artwork/')
	};

	this.getImageList = function() {
		var data = httpGet('artcollection');
		return data;
	};

	this.getContactInfo = function() {
		return httpGet('/contact-information');
	};

	this.getNewsPapers = function() {
		return httpGet('/newspapers');
	};

	this.getAwards = function() {
		return httpGet('/awards'); 
	};

	this.addNewValue = function(url, data) {
		return httpPost('/add' + url, data);
	};

	this.insertDBValue = function(area, data) {
		var url = "/insert" + area; 		
		return httpPost(url, data);
	}; 

	this.updateDBValue = function(area, data) {
		var url = "/update" + area; 
		return httpPost(url, data);
	};

	this.deleteDBValue = function(area, id, fileName) {
		var url = "/delete" + area; 
		return httpPost(url, { 'id': id, 'fileName': fileName });
	};

	this.uploadImage = function(area, file) {
		var url = "/upload" + area;	
		return httpPostFile(url, file);
	};

	this.login = function(username, password) {
		var data = {
			username: username,
			password: password
		};
		var url = '/login';
		return httpPost(url, data);
	}

	function httpGetReq(req) {
		var deferred = $q.defer();        
        $http(req).success(function (response) {
            deferred.resolve(response);
        }).error(function (reason) {
            deferred.reject(reason);
        });

        return deferred.promise;
	}

	function httpGet(url) {
		var deferred = $q.defer();        
        $http.get(url).success(function (response) {
            deferred.resolve(response);
        }).error(function (reason) {
            deferred.reject(reason);
        });

        return deferred.promise;
	}

	function httpPost(url, data) {
		var deferred = $q.defer();
		var req = {
			method: 'POST', 
			url: url, 
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};
		$http(req).success(function (response) {
			deferred.resolve(response);
		}).error(function (reason) {
			deferred.reject(reason);
		});

		return deferred.promise;
	}

	function httpPostFile(url, data) {
		var deferred = $q.defer();
		Upload.upload({
			url: url,
			data: {file: data}
		}).then(function(response) {
			if (response.data.error_code === 0) {
				console.log("File upload successful!");
			} else {
				console.log("File upload error!");
				console.log(response);
			}	
			deferred.resolve(response);			
		}, function (reason) { //catch error
            console.log('Error status: ' + reason.status);
            $window.alert('Error status: ' + reason.status);
            deferred.reject(reason);
        });

		return deferred.promise;
	}
});