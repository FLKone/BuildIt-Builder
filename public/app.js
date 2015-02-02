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

	$scope.positions = [{ Name: "Quarterback", Code: "QB" },
						{ Name: "Wide Receiver", Code: "WR" }];


	$scope.eddb = {
		version : 0.1,
		buildings : {
			10 : {
				name : 'Residential Zone',
				code : 'rz',
				show : 1,
				list : {
					100 : {
						name:'Residential Zone', x:2, y:2, price:0,
						population:1836,
					},
				},
			},
			20 : {
				name : 'Stores',
				code : 'sz',
				show : 1,
				list : {
					200 : {
						name:'Building Supply Store', x:2, y:2, price:100,
						max:1,
					},
					201 : {
						name:'Hardware Store', x:2, y:2, price:2500,
						max:1,
					},
					202 : {
						name:'Farmer’s Market', x:2, y:2, price:5000,
						max:1,
					},
					203 : {
						name:'Furniture Store', x:2, y:2, price:8000,
						max:1,
					},
					204 : {
						name:'Gardening Supplies', x:2, y:2, price:13000,
						max:1,
					},
					205 : {
						name:'Donut Shop', x:2, y:2, price:17000,
						max:1,
					},
					206 : {
						name:'Fashion Store', x:2, y:2, price:22000,
						max:1,
					},
					207 : {
						name:'Fast Food Restaurant', x:2, y:2, price:25000,
						max:1,
					},
					208 : {
						name:'Home Appliances', x:2, y:2, price:30000,
						max:1,
					},
				},
			},
			30 : {
				name : 'Factories',
				code : 'fz',
				show : 1,
				max : 10,
				list : {
					300 : {
						name:'High-Tech Factory', x:2, y:2, price:20000,
						dirtyx:6, dirtyy:6,
					},
					301 : {
						name:'Nano-Tech Factory', x:2, y:2, price:50000,
						dirtyx:0, dirtyy:0,
					},
				},
			},
			40 : {
				name : 'Fire Service',
				code : 'fsc',
				show : 1,
				list : {
					400 : {
						name:'Small Fire Station', x:1, y:1, price:6100,
						zonex:6, zoney:8,
					},
					401 : {
						name:'Basic Fire Station', x:2, y:2, price:11000,
						zonex:10, zoney:12,
					},
					402 : {
						name:'Deluxe Fire Station', x:4, y:2, price:42100,
						zonex:22, zoney:22,
					},
				},
			},
		},
	};

	$scope.shidd = function(category) {
		console.log(category);
		if (category.show) {
			console.log('show');

			category.show = 0;
		}
		else
		{
			console.log('hidden');
			category.show = 1;
		}
	}

	console.log($scope.positions);
	console.log($scope.eddb.buildings);

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
