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

	//Building Live Array
	$scope.liveBuildings = [];

	//Grid Invalidation
	$scope.invalidate = function(origin, zone) {
		//console.log('invalidate at '+ origin.x +'x'+ origin.y +'?....');

		var oriX = origin.x;
		var oriY = origin.y;
		var lengthX = zone.x;
		var lengthY = zone.y;
		//console.log(oriX + ' < ' + lengthX);
		var sizeX = lengthX;
		var sizeY = lengthY;
		var totalX = 0;
		var totalY = 0;

		for (i = oriX; i < (oriX+lengthX); i++) {
			for (j = oriY; j < (oriY+lengthY); j++) {
				//console.log( "The grid is " + i + " / " + j + "<br>");
				var curElem = $("#grid\\:" + i + "\\:" + j);
				curElem.toggleClass("invalidate"); //case is invalidate
				curElem.toggleClass("invalidate:"+(sizeX-1)+":"+(totalX)+":"+(sizeY-1)+":"+(totalY)); //x+/x-/y+/y- direction where it is still invalidate
				//console.log("invalidate:"+(sizeX-1)+":"+(totalX)+":"+(sizeY-1)+":"+(totalY));

				sizeY--;
				totalY=lengthY-sizeY;

			}
			sizeX--;
			sizeY = lengthY;
			totalX=lengthX-sizeX;
			totalY=0;
		}
	}

	$scope.isInvalidate = function(coord) {
		var curElem = $("#grid\\:" + coord.x + "\\:" + coord.y);
		//console.log('checking... x '+coord.x+' y '+coord.y);

		//check outside grid
		if (coord.x >= $scope.gridX || coord.y >= $scope.gridY || coord.x < 0 || coord.y < 0) {
			//console.log('....KO');
			return true;
		}

		if (curElem.hasClass("invalidate")) {
			//console.log('....KO');
			return true;
		}
		//console.log('....OK');
		return false;
	}

	$scope.canSnap = function(coord, size) {
		//console.log('canSnap at '+ coord.x +'x'+ coord.y +'?....');
		//var curElem = $("#grid\\:" + coord.x + "\\:" + coord.y);
		if ($scope.isInvalidate(coord)) {
			//console.log('!canSnap');
			//must find closed free spot
			var turn = 0;
			//console.log('NOP !');

			return false;
		}
		else
		{
			//check if  unit cant fit
			//console.log('=== Original Point... x '+coord.x+' y '+coord.y);
			var ii = 0;
			var ij = 0;

			for (i = coord.x; i < (coord.x+size.x); i++) {
				for (j = coord.y; j < (coord.y+size.y); j++) {
					//console.log('=== testing Point... x '+(coord.x+ii)+' y '+(coord.y+ij));

					if ($scope.isInvalidate({ x: coord.x+ii, y: coord.y+ij }))
					{
						//console.log('NOP2...');
						return false;
					}


					ij++;
				}
				ii++;
				ij=0;
			}
			//console.log('YES');

			return true;
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

			var gID = copie.attr('id'); //gloal ID
			var uID = gID.split(":")[1]; //unit ID
			var fID = Math.floor(uID/100)*100; //family ID
			var currentUnit = scope.scbi.buildings[fID].list[uID];

			copie.css({
				position: 'absolute',
				border: '1px solid red',
				width: scope.gridSizeX * currentUnit.x + 'px',
				height: scope.gridSizeX * currentUnit.y + 'px',
				left: event.pageX - scope.gridSizeX/2 + 'px',
				top: event.pageY - scope.gridSizeY/2 + 'px'
			});

			//Put ID : Unit Code : Array Key
			var originalID = element.attr('id').split(":")[1];
			var liveCount = scope.liveBuildings.length;
			copie.attr("id", "liveunit:" + originalID + ":" + liveCount);

			//Add in Body
			copie.appendTo('body');

			//Add in liveBuildings Array with default values
			scope.liveBuildings.push({ code: originalID, x: -1, y: -1 });
			scope.$apply();

			var gID = copie.attr('id'); //gloal ID
			var aID = gID.split(":")[2]; //Live array Key ID

			function mousemove(event) {

				$('body,html').addClass('mousemove');
				copie.addClass('active');

				y = event.pageY;
				x = event.pageX;

				var caseX = Math.floor((x - refX) / scope.gridSizeX);
				var caseY = Math.floor((y - refY) / scope.gridSizeY);
				//console.log('case x ' + caseX + ' y ' + caseY);

				// == Perf Improv : avoid calculation when Unit did not change case/x/y

				//Snapping elmt to the grid
				if (caseY >= 0 && caseX >= 0 && caseY < scope.gridY && caseX < scope.gridX) {
					//check if current case are invalidate
					if(!scope.canSnap({ x : caseX, y : caseY }, { x : currentUnit.x, y : currentUnit.y })) {
						if (scope.isInvalidate({ x : scope.liveBuildings[aID].x, y : scope.liveBuildings[aID].y})) {
							copie.removeClass('supergreen');
							copie.addClass('todeletion');

							$('body,html').addClass('todeletion');
						}
						else {
							copie.removeClass('supergreen');
							copie.removeClass('todeletion');

							$('body,html').removeClass('todeletion');
						}

						//can't snap here, must find closed free spot
						//stay on last valid
						//y = (scope.liveBuildings[aID].y * scope.gridSizeY + refY);
						//x = (scope.liveBuildings[aID].x * scope.gridSizeX + refX);
						//console.log('on a pas bougé, on fait rien !');
					}
					else {
						//valid pos
						copie.addClass('supergreen');
						copie.removeClass('todeletion');

						$('body,html').removeClass('todeletion');

						y = (caseY * scope.gridSizeY + refY);
						x = (caseX * scope.gridSizeX + refX);

						scope.liveBuildings[aID].x = caseX;
						scope.liveBuildings[aID].y = caseY;

						scope.$apply();
					}




					//console.log(gID + ' | ' + uID + ' | ' + fID + ' | ' + aID);

					//change coordinate in liveBuildings

				}
				else {
					copie.removeClass('supergreen');
					copie.addClass('todeletion');

					$('body,html').addClass('todeletion');
				}

				copie.css({
					top: y + 'px',
					left: x  + 'px'
				});
			}

			function mouseup(event) {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);

				y = $( copie ).css('top').replace(/[^-\d\.]/g, '');;//event.pageY;
				x = $( copie ).css('left').replace(/[^-\d\.]/g, '');;//event.pageX;

				$('body,html').removeClass('mousemove');
				$('body,html').removeClass('todeletion');

				copie.removeClass('active');

				var caseX = Math.floor((x - refX) / scope.gridSizeX);
				var caseY = Math.floor((y - refY) / scope.gridSizeY);




				//Snapping elmt to the grid
				if (caseY >= 0 && caseX >= 0 && caseY < scope.gridY && caseX < scope.gridX
					&& scope.canSnap({ x : caseX, y : caseY }, { x : currentUnit.x, y : currentUnit.y })) {

					//in the grid & canSnap = invalidate
					scope.invalidate({ x : caseX, y : caseY}, { x : currentUnit.x, y : currentUnit.y });



				}
				else if (caseY >= 0 && caseX >= 0 && caseY < scope.gridY && caseX < scope.gridX
					&& scope.canSnap({ x : scope.liveBuildings[aID].x, y : scope.liveBuildings[aID].y }, { x : currentUnit.x, y : currentUnit.y })) {

					//last pos OK
					y = (scope.liveBuildings[aID].y * scope.gridSizeY + refY);
					x = (scope.liveBuildings[aID].x * scope.gridSizeX + refX);

					copie.css({
						top: y + 'px',
						left: x  + 'px'
					});
					console.log('auto move + invalidate.....');
					scope.invalidate({ x : scope.liveBuildings[aID].x, y : scope.liveBuildings[aID].y}, { x : currentUnit.x, y : currentUnit.y });

					copie.addClass('supergreen');
					copie.removeClass('todeletion');

				}
				else {
					//delete !

					copie.remove();
					scope.liveBuildings.splice(aID, 1);
					scope.$apply();
				}




			}

			function mousedown(event) {
				$('body,html').addClass('mousemove');
				copie.addClass('active');

				event.preventDefault();

				scope.invalidate({ x : scope.liveBuildings[aID].x, y : scope.liveBuildings[aID].y}, { x : currentUnit.x, y : currentUnit.y });


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
