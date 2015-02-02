angular.module('biBuilder', [])
.controller('MainCtrl', ['$scope', function($scope) {

	//Grid Setup
	$scope.gridSizeX = 20;
	$scope.gridSizeY = 20;
	$scope.gridX = 50;
	$scope.gridY = 50;
	$scope.totalX = $scope.gridSizeX * ($scope.gridX);
	$scope.totalY = $scope.gridSizeY * ($scope.gridY);

	//Buildings Arrays (from scbi.js)
	$scope.scbi = scbi;

	//Utility: num to array(num)
	$scope.getNumber = function(num) {
		return new Array(num);
	}

	//Utility: show/hidd sub building menu
	$scope.shidd = function(category) {
		console.log(category);
		if (category.show) {
			category.show = 0;
		}
		else
		{
			category.show = 1;
		}
	}

}])
.directive('draggable', function($document) {
return function(scope, element, attr) {

	angular.element(document).ready(function() {
		//referenciel #grid;
		var refX = jQuery('#grid').offset().left;
		var refY = jQuery('#grid').offset().top;

		element.css({
			border: '1px solid red',
			width: scope.gridSizeX*2 + 'px',
			height: scope.gridSizeX*2 + 'px',
			lineHeight: scope.gridSizeX*2 + 'px'
		});

		element.on('mousedown', function(event) {
			// Prevent default dragging of selected content
			event.preventDefault();

			var copie = $(element).clone();

			copie.css({
				position: 'absolute',
				border: '1px solid green',
				width: scope.gridSizeX * 2 + 'px',
				height: scope.gridSizeX * 2 + 'px',
				left: event.pageX - scope.gridSizeX/2 + 'px',
				top: event.pageY - scope.gridSizeY/2 + 'px'
			});

			copie.appendTo('body');

			function mousemove(event) {
				y = event.pageY;
				x = event.pageX;

				var caseX = Math.floor((x - refX) / scope.gridSizeX);
				var caseY = Math.floor((y - refY) / scope.gridSizeY);


				//Snapping elmt to the grid
				if (caseY >= 0 && caseX >= 0 && caseY < scope.gridY && caseX < scope.gridX) {
					y = (caseY * scope.gridSizeY + refY);
					x = (caseX * scope.gridSizeX + refX);
				}

				copie.css({
					top: y + 'px',
					left: x  + 'px'
				});
			}

			function mouseup(event) {

				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}

			function mousedown(event) {
				event.preventDefault();

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
