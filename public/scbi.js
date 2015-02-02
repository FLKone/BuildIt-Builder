var scbi = {
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
