angular.module('biBuilder', [])
.controller('MainCtrl', ['$scope', function($scope) {

	$scope.gridSizeX = 20;
	$scope.gridSizeY = 20;

	$scope.gridX = 50;
	$scope.gridY = 50;

	$scope.totalX = $scope.gridSizeX * ($scope.gridX);
	$scope.totalY = $scope.gridSizeY * ($scope.gridY);

	$scope.getNumber = function(num) {
		return new Array(num);
	}

	//Buildings Prototype
	function Unit(){
		this.name = '';
		this.id = -1;
		this.color = "#FFF";
		this.height = 2;
		this.width = 2;
	}

	$scope.units = [];

	//fake data
	var unit = new Unit();
	unit.name = 'Zone R';
	unit.id = 1;
	unit.color = "green";
	unit.height = 2;
	unit.width = 2;

	$scope.units.push( unit  );

	var unit = new Unit();
	unit.name = 'Zone I';
	unit.id = 2;
	unit.color = "yellow";
	unit.height = 3;
	unit.width = 2;

	$scope.units.push( unit  );
	//fake data

}])
.directive('draggable', function($document) {
return function(scope, element, attr) {

	//referenciel #grid;
	var refX = jQuery('#grid').offset().left;
	var refY = jQuery('#grid').offset().top;

	console.log ('refX ' + refX + ' refY ' + refY);

	element.css({
		position: 'relative',
		border: '1px solid red',
		backgroundColor: 'lightgrey',
		cursor: 'pointer',
		display: 'block',
		width: scope.gridSizeX + 'px',
		height: scope.gridSizeX + 'px'
	});

	element.on('mousedown', function(event) {
		// Prevent default dragging of selected content
		event.preventDefault();

		//console.log ('screen ' + event.clientX + ' / ' + event.clientY);

		var copie = $(element).clone();

		copie.css({
			position: 'absolute',
			border: '1px solid green',
			backgroundColor: 'lightgrey',
			cursor: 'pointer',
			display: 'block',
			width: scope.gridSizeX * 2 + 'px',
			height: scope.gridSizeX * 2 + 'px',
			left: event.pageX - scope.gridSizeX/2 + 'px',
			top: event.pageY - scope.gridSizeY/2 + 'px'
		});

		copie.appendTo('body');

		function mousemove(event) {
			y = event.pageY;
			x = event.pageX;
			//console.log(copie);
			console.log ('befor ' + x + ' x ' + y);

			var caseX = Math.floor((x - refX) / scope.gridSizeX);
			var caseY = Math.floor((y - refY) / scope.gridSizeY);
			console.log('caseY = ' + caseY + ' X ' + caseX);

			//Snapping elmt to the grid
			if (caseY >= 0 && caseX >= 0 && caseY < scope.gridY && caseX < scope.gridX) {
				//console.log('inside the grid');

				//console.log("y= " + y + " scope=" + scope.gridSizeY + ' mod=' + ( y % scope.gridSizeY ));
				y = (caseY * scope.gridSizeY + refY);
				x = (caseX * scope.gridSizeX + refX);
			}
			else {
				//console.log('outside the grid');
			}

			console.log ('after ' + x + ' / ' + y);
			//console.log ('abspo ' + jQuery(element).offset().left + ' / ' + jQuery(element).offset().top);

			copie.css({
				top: y + 'px',
				left: x  + 'px'
			});
		}

		function mouseup(event) {
			//console.log('mouseup');

			$document.off('mousemove', mousemove);
			$document.off('mouseup', mouseup);
		}

		function mousedown(event) {
			event.preventDefault();

			//console.log('mousedown');

			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		}

		$document.on('mousemove', mousemove);
		copie.on('mousedown', mousedown);
		$document.on('mouseup', mouseup);


		//clonedElm = $(element).clone();
		//console.log(clonedElm);
/*
		clonedElm.css({
			position: 'absolute',
			border: '1px solid green',
			backgroundColor: 'lightgrey',
			cursor: 'pointer',
			display: 'block',
			width: scope.gridSizeX + 'px',
			height: scope.gridSizeX + 'px',
			left: absX + 'px',
			top: absY + 'px'
		});
*/
		//$(event.srcElement).parent().append(clonedElm);

//		clonedElm.on('mousemove', mousemove);
//		clonedElm.on('mouseup', mouseup);
	});
/*
	//start Values - used for relative mvmt
	var startX = 0, startY = 0, x = 0, y = 0;

	//referenciel #grid;
	var refY = jQuery('#grid').offset().top;
	var refX = jQuery('#grid').offset().left;

	var baseDiffX = refX - jQuery(element).offset().left;
	var baseDiffY = refY - jQuery(element).offset().top;

	console.log ('difff ' + baseDiffX + ' / ' + baseDiffY);

	element.css({
		position: 'relative',
		border: '1px solid red',
		backgroundColor: 'lightgrey',
		cursor: 'pointer',
		display: 'block',
		width: scope.gridSizeX + 'px',
		height: scope.gridSizeX + 'px'
	});

	element.on('mousedown', function(event) {
		// Prevent default dragging of selected content
		event.preventDefault();
		startX = event.screenX - x;
		startY = event.screenY - y;
		$document.on('mousemove', mousemove);
		$document.on('mouseup', mouseup);
	});

	function mousemove(event) {
		y = event.screenY - startY;
		x = event.screenX - startX;

		//console.log ('befor ' + x + ' x ' + y);

		var absX = jQuery(element).offset().left;
		var absY = jQuery(element).offset().top;

		//Snapping elmt to the grid
		if ((refX < absX && (refX + scope.totalX) > absX) && (refY < absY && (refY + scope.totalY) > absY) ) {
			//console.log("y= " + y + " scope=" + scope.gridSizeY + ' mod=' + ( y % scope.gridSizeY ));
			//y = y - ( y % scope.gridSizeY );
			//x = x - ( x % scope.gridSizeX );
		}
		else {
			//console.log('outside the grid');
		}

		//console.log ('after ' + x + ' / ' + y);
		//console.log ('abspo ' + jQuery(element).offset().left + ' / ' + jQuery(element).offset().top);

		element.css({
			top: y + 'px',
			left:  x + 'px'
		});
	}

	function mouseup() {
		console.log('mouseup');

		x = event.screenX - startX;
		y = event.screenY - startY;


		var absX = jQuery(element).offset().left;
		var absY = jQuery(element).offset().top;

		console.log ('befor ' + x + ' x ' + y);
		console.log ('relat ' + absX + ' x ' + absY);
		console.log ('refer ' + refX + ' / ' + refY);
		console.log ('difff ' + baseDiffX + ' / ' + baseDiffY);



		if ((refX < absX && (refX + scope.totalX) > absX) && (refY < absY && (refY + scope.totalY) > absY) )
		{
			//in  : OK;
			console.log("y= " + y + " scope=" + scope.gridSizeY + ' mod=' + ( y % scope.gridSizeY ));
			//y = y - ( y % scope.gridSizeY );

			element.css({
				//top: ( y % scope.gridSizeY ) + 'px'
				//left:  0 + 'px'
			});
		}
		else {
			//outside the grid : reseting elmt position.

			element.css({
				top: 0 + 'px',
				left:  0 + 'px'
			});

			//reset elmt position if outside the grid;
			startX = 0;
			startY = 0;

			x = 0;
			y = 0;

		}


		$document.off('mousemove', mousemove);
		$document.off('mouseup', mouseup);
	}

	*/
};
});
