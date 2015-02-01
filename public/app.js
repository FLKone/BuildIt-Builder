angular.module('biBuilder', [])
.controller('MainCtrl', ['$scope', function($scope) {

	$scope.gridSizeX = 25;
	$scope.gridSizeY = 25;

	$scope.gridX = 30;
	$scope.gridY = 30;

	$scope.totalX = $scope.gridSizeX * ($scope.gridX);
	$scope.totalY = $scope.gridSizeY * ($scope.gridY);

	$scope.getNumber = function(num) {
		return new Array(num);
	}

	function Unit(){
		this.name = '';
		this.id = -1;
		this.color = "green";
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

	console.log($scope.units);

	$scope.test = 'Hello world!dds dsd';


}])
.directive('draggable', function($document) {
return function(scope, element, attr) {
	console.log(scope.units);


	var startX = 0, startY = 0, x = 0, y = 0;



	var baseY = jQuery(element).offset().top;
	var baseX = jQuery(element).offset().left;

	//console.log (jQuery(element).offset().top);

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

		//referenciel #grid;
		var refY = jQuery('#grid').offset().top;
		var refX = jQuery('#grid').offset().left;


		console.log ('refer ' + refX + ' / ' + refY);

		console.log ('befor ' + x + ' / ' + y);

		//On gère le snap
		if (x < scope.totalX && y < scope.totalY) {
			y = y - ( y % scope.gridSizeY );
			x = x - ( x % scope.gridSizeX );
		}

		console.log ('after ' + x + ' / ' + y);

		element.css({
			top: y + 'px',
			left:  x + 'px'
		});
	}

	function mouseup() {
		console.log('mouseup');

		x = event.screenX - startX;
		y = event.screenY - startY;

		if (x > scope.totalX || y > scope.totalY) {

			element.css({
				top: baseY + 'px',
				left:  baseX + 'px'
			});


			//reset la position de l'unit;

			startX = baseX;
			startY = baseY;


			x = baseX;
			y = baseY;
		}
		$document.off('mousemove', mousemove);
		$document.off('mouseup', mouseup);
	}
};
});
