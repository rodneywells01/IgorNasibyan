app.service('NodeConnection', function($http, $q) {
	// var server = "localhost:3000"; 
	this.getImage = function(imageName) {
		return httpGet('app/images/artwork/')
	};

	this.getImageList = function() {
		
	};

	this.getContactInfo = function() {
		return httpGet('/contact-information');
	};

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
});