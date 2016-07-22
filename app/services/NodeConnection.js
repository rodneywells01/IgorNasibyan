app.service('NodeConnection', function($http, $q) {
	// var server = "localhost:3000"; 
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
	}

	this.getAwards = function() {
		return httpGet('/awards'); 
	}

	this.addNewValue = function(url, data) {
		return httpPost('/add' + url, data);
	}

	this.insertDBValue = function(area, data) {
		var url = "/insert" + area; 
		return httpPost(url, data);
	}; 

	this.updateDBValue = function(area, data) {
		var url = "/update" + area; 
		return httpPost(url, data);
	}

	function httpGetReq(req) {
		var deferred = $q.defer();        
        $http(req).success(function (response) {
        	console.log("SUCCESS");
            deferred.resolve(response);
        }).error(function (reason) {
        	console.log("FAILURE");
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


});