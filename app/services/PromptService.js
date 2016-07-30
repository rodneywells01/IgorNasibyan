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
	this.config = {
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
		$mdPanel.open(this.config); 
	};

	// Hold critical prompt information. 
	this.servicebackend = "";
	this.backendAdd = false;
	this.promptData = {};
	this.promptDataOriginal = {};
	this.selectedId = 0; 
	this.image = "";

	function shallowCopy( original ) {
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

	    return clone;
	}

	this.setPromptConfig = function(templateUrl, servicebackend, backendfunctionality, 
		promptData, selectedId, image) {
		this.config = {
			animation: animation,
			attachTo: angular.element(document.body), 
			controller: 'PromptController', 
			templateUrl: 'app/promptviews/' + templateUrl, 
			panelClass: 'full-art-prompt', 
			position: position,
			trapFocus: true, 
			zIndex: 150, 
			clickOutsideToClose: true, 
			escapeToClose: true, 
			hasBackdrop: true
		};

		this.servicebackend = servicebackend;
		this.backendAdd = backendfunctionality;
		if (this.backendAdd) {
			this.promptData = {};		
		} else {
			this.promptData = shallowCopy(promptData[selectedId]);			
		}		
		this.promptDataOriginal = promptData;
		this.selectedId = selectedId;

		// Remove key to make promptData DataModel adherant, 
		delete this.promptData.storageId;
	};

	this.setPromptConfigDisplay = function(templateUrl, image, elem) {
		var animation = animateElementOrigin(elem);

		this.config = {
			animation: animation,
			attachTo: angular.element(document.body), 
			controller: 'PromptController', 
			templateUrl: 'app/promptviews/' + templateUrl, 
			panelClass: '', 
			position: position,
			trapFocus: true, 
			zIndex: 150, 
			clickOutsideToClose: true, 
			escapeToClose: true, 
			hasBackdrop: true
		};

		this.image = image;
	}

	this.setPromptConfigMinimal = function(controller, templateUrl) {
		this.config = {
			animation: animation,
			attachTo: angular.element(document.body), 
			controller: controller, 
			templateUrl: 'app/promptviews/' + templateUrl, 
			panelClass: '', 
			position: position,
			trapFocus: true, 
			zIndex: 150, 
			clickOutsideToClose: true, 
			escapeToClose: true, 
			hasBackdrop: true
		};
	}

	this.updateOriginal = function(newData) {
		this.promptDataOriginal[this.selectedId] = newData;
		this.promptDataOriginal[this.selectedId].storageId = this.selectedId;			
	};

	this.addElement = function(newData) {
		// Affix ID and push to original array. 
		console.log(this.promptDataOriginal);
		newData.storageId = this.promptDataOriginal.length;
		this.promptDataOriginal.push(newData);		
	};

	this.removeElement = function(id) {
		// Remove elment from original array and compress data.
		this.promptDataOriginal.splice(id, 1);

		// Compress original ids. 
		for (; id < this.promptDataOriginal.length; id++) {
			this.promptDataOriginal[id].storageId -= 1;
		}
	};

	function animateElementOrigin(elem) {
		var animation = $mdPanel.newPanelAnimation(); 		
		var elemPosition = getPosition(elem);
		var widthmodifier = window.innerWidth / 2; 
		var heightmodifier = window.innerHeight / 2;
		var ypos = elemPosition.y - heightmodifier;
		var xpos = elemPosition.x - widthmodifier;		
		animation.openFrom({top: ypos, left: xpos});
	  	animation.closeTo({top: ypos, left: xpos});
		animation.withAnimation($mdPanel.animation.SCALE); 
		return animation;
	}

	function getPosition(el) {
		var xPos = 0;
		var yPos = 0;

		while (el) {
			if (el.tagName == "BODY") {
				// deal with browser quirks with body/window/document and page scroll
				var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
				var yScroll = el.scrollTop || document.documentElement.scrollTop;
				xPos += (el.offsetLeft - xScroll + el.clientLeft);
				yPos += (el.offsetTop - yScroll + el.clientTop);
			} else {
				// for all other non-BODY elements
				xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
				yPos += (el.offsetTop - el.scrollTop + el.clientTop);
			}
			el = el.offsetParent;
		}
		return {
			x: xPos,
			y: yPos
		};
	}

});
