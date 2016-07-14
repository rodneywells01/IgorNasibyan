app.service('NodeConnection', function($http, $q) {
	// var server = "localhost:3000"; 
	this.getImage = function(imageName) {
		return httpGet('app/images/artwork/')
	};

	this.getImageList = function() {
		console.log("here");
		var data = httpGet('artcollection');
		console.log("Here it is!");
		console.log(data);
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
});