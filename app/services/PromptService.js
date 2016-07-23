app.service('PromptService', function($mdPanel) {	
	// Configuration
	var position = $mdPanel.newPanelPosition()
			.absolute()
			.center(); 
	var animation = $mdPanel.newPanelAnimation(); 
	animation.openFrom({top:0, left:0}); 
	// animation.closeTo({top: 50%, left: 100%}); 
  	animation.closeTo({top:0, left:0});
	animation.withAnimation($mdPanel.animation.SCALE); 
	var config = {
		animation: animation,
		attachTo: angular.element(document.body), 
		controller: 'PromptController', 
		templateUrl: 'app/views/prompt.html', 
		panelClass: '', 
		position: position,
		trapFocus: true, 
		zIndex: 150, 
		clickOutsideToClose: true, 
		clickEscapeToClose: true, 
		hasBackdrop: true
	};

	// Present the configured prompt to the user. 
	this.displayPrompt = function() {	
		$mdPanel.open(config); 
	};

	// Hold critical prompt information. 
	this.servicebackend = "";
	this.backendAdd = false;
	this.promptData = {};
	this.promptDataOriginal = {};
	var elementSelected = "";

	function shallowCopy( original )  
	{
	    // First create an empty object with
	    // same prototype of our original source
	    var clone = Object.create( Object.getPrototypeOf( original ) ) ;

	    var i , keys = Object.getOwnPropertyNames( original ) ;

	    for ( i = 0 ; i < keys.length ; i ++ )
	    {
	        // copy each property into the clone
	        Object.defineProperty( clone , keys[ i ] ,
	            Object.getOwnPropertyDescriptor( original , keys[ i ] )
	        ) ;
	    }

	    return clone ;
	}

	this.setPromptConfig = function(templateUrl, servicebackend, backendfunctionality, promptData, element) {
		config = {
			animation: animation,
			attachTo: angular.element(document.body), 
			controller: 'PromptController', 
			templateUrl: 'app/promptviews/' + templateUrl, 
			panelClass: '', 
			position: position,
			trapFocus: true, 
			zIndex: 150, 
			clickOutsideToClose: true, 
			clickEscapeToClose: true, 
			hasBackdrop: true
		};

		this.servicebackend = servicebackend;
		this.backendAdd = backendfunctionality;
		this.promptData = shallowCopy(promptData);
		this.promptDataOriginal = promptData;
		elementSelected = element;
	};

	this.getElementBeingEdited = function() {
		return elementSelected;
	}

	this.updateOriginal = function(newData) {
		var i , keys = Object.keys( this.promptDataOriginal ) ;

	    for ( i = 0 ; i < keys.length ; i ++ )
	    {
	        this.promptDataOriginal[keys[i]] = newData[keys[i]];
	    }
	}

	this.addElement = function(newData) {
		console.log(this.promptDataOriginal);
		this.promptDataOriginal.push(newData);
	};

});
