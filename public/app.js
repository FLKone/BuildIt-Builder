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

	angular.element(document).ready(function() {
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

		});

	});


};
});
