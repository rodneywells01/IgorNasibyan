app.controller('MainController', function($scope) {
	$scope.message = "Swag in the club yo";

	$scope.awardURL = "https://theaphidroom.files.wordpress.com/2012/02/gb11-gold-medal_475x393-300x248.jpg";

	// FAB open controls 
	$scope.isOpen = false;

	$scope.newspapers = [
		{
			'title': 'Test Paper Title 1',
			'image': '',
			'description': 'Great article'
		},
		{
			'title': 'Test Paper Title 2',
			'image': '',
			'description': 'Great article'
		},
		{
			'title': 'Test Paper Title 3',
			'image': '',
			'description': 'Great article'
		},
	];

		console.log($scope.newspapers[0].title);

});