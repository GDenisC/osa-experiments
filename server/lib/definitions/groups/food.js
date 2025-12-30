const { basePolygonDamage, basePolygonHealth } = require('../constants.js');
const {
	makeRelic,
	makeCrasher,
	makeRarities,
	makePresent,
	makeLaby,
	encode3d,
	encode4d
} = require('../facilitators.js');

// EGGS
Class.egg = {
	PARENT: 'food',
	LABEL: 'Egg',
	VALUE: 5,
	SHAPE: 0,
	SIZE: 4.5,
	COLOR: 'veryLightGrey',
	INTANGIBLE: true,
	VISIBLE_ON_BLACKOUT: true,
	BODY: {
		DAMAGE: 0,
		DENSITY: 2,
		HEALTH: 0.5 * basePolygonHealth,
		PENETRATION: 1,
		PUSHABILITY: 0,
		ACCELERATION: 0.015
	},
	DRAW_HEALTH: false
};
Class.gem = {
	PARENT: 'food',
	LABEL: 'Gem',
	VALUE: 2e3,
	SHAPE: 6,
	SIZE: 4.5,
	COLOR: 'aqua',
	BODY: {
		DAMAGE: basePolygonDamage / 4,
		DENSITY: 4,
		HEALTH: 10,
		PENETRATION: 2,
		RESIST: 2,
		PUSHABILITY: 0.25,
		ACCELERATION: 0.015
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false,
	GIVE_KILL_MESSAGE: true
};
Class.jewel = {
	PARENT: 'food',
	LABEL: 'Jewel',
	VALUE: 1e5,
	SHAPE: 6,
	SIZE: 8,
	COLOR: 'yellow',
	BODY: {
		DAMAGE: basePolygonDamage / 4,
		DENSITY: 4,
		HEALTH: 50,
		PENETRATION: 2,
		RESIST: 2,
		PUSHABILITY: 0.25,
		ACCELERATION: 0.015
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false,
	GIVE_KILL_MESSAGE: true
};
makeRarities('egg');

// SQUARES
Class.square = {
	PARENT: 'food',
	LABEL: 'Square',
	VALUE: 30,
	SHAPE: 4,
	SIZE: 14,
	COLOR: 'gold',
	BODY: {
		DAMAGE: basePolygonDamage,
		DENSITY: 4,
		HEALTH: basePolygonHealth,
		PENETRATION: 2,
		ACCELERATION: 0.0075
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false
};
makeRarities('square');

// TRIANGLES
Class.triangle = {
	PARENT: 'food',
	LABEL: 'Triangle',
	VALUE: 120,
	SHAPE: 3,
	SIZE: 10,
	COLOR: 'orange',
	BODY: {
		DAMAGE: basePolygonDamage,
		DENSITY: 6,
		HEALTH: 3 * basePolygonHealth,
		RESIST: 1.15,
		PENETRATION: 1.5,
		ACCELERATION: 0.005
	},
	DRAW_HEALTH: true
};
makeRarities('triangle');

// PENTAGONS
Class.pentagon = {
	PARENT: 'food',
	LABEL: 'Pentagon',
	VALUE: 400,
	SHAPE: 5,
	SIZE: 21,
	COLOR: 'purple',
	BODY: {
		DAMAGE: 6 * basePolygonDamage,
		DENSITY: 8,
		HEALTH: 40 * basePolygonHealth,
		RESIST: 1.25,
		PENETRATION: 1.1,
		ACCELERATION: 0.0035
	},
	DRAW_HEALTH: true
};
makeRarities('pentagon');

// BETA PENTAGONS
Class.betaPentagon = {
	PARENT: 'food',
	LABEL: 'Beta Pentagon',
	VALUE: 2500,
	SHAPE: 5,
	SIZE: 30,
	COLOR: 'purple',
	BODY: {
		DAMAGE: 2 * basePolygonDamage,
		DENSITY: 30,
		HEALTH: 75 * basePolygonHealth,
		RESIST: Math.pow(1.25, 2),
		PENETRATION: 1.1,
		SHIELD: 20 * basePolygonHealth,
		ACCELERATION: 0.003
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
makeRarities('betaPentagon');

// ALPHA PENTAGONS
Class.alphaPentagon = {
	PARENT: 'food',
	LABEL: 'Alpha Pentagon',
	VALUE: 15e3,
	SHAPE: 5,
	SIZE: 58,
	COLOR: 'purple',
	BODY: {
		DAMAGE: 2 * basePolygonDamage,
		DENSITY: 80,
		HEALTH: 562.5 * basePolygonHealth,
		RESIST: Math.pow(1.25, 3),
		PENETRATION: 1.1,
		SHIELD: 40 * basePolygonHealth,
		ACCELERATION: 0.0025
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
makeRarities('alphaPentagon');

// HEXAGONS
Class.hexagon = {
	PARENT: 'food',
	LABEL: 'Hexagon',
	VALUE: 500,
	SHAPE: 6,
	SIZE: 25,
	COLOR: 'hexagon',
	BODY: {
		DAMAGE: 6 * basePolygonDamage,
		DENSITY: 8,
		HEALTH: 320 * basePolygonHealth,
		RESIST: 1.3,
		SHIELD: 50 * basePolygonHealth,
		PENETRATION: 1.1,
		ACCELERATION: 0.003
	},
	DRAW_HEALTH: true
};
makeRarities('hexagon');

// 3D POLYGONS
Class.sphere = {
	PARENT: 'food',
	LABEL: 'The Sphere',
	FACING_TYPE: 'noFacing',
	VALUE: 1e7,
	SHAPE: 0,
	SIZE: 9,
	COLOR: {
		BASE: 'veryLightGrey',
		BRIGHTNESS_SHIFT: -15
	},
	BODY: {
		DAMAGE: 4,
		DENSITY: 16,
		HEALTH: 30,
		RESIST: 1.25,
		PENETRATION: 15,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true,
	PROPS: [
		{
			POSITION: [17, 0, 0, 0, 1],
			TYPE: ['egg', { COLOR: { BRIGHTNESS_SHIFT: -14 }, BORDERLESS: true }]
		},
		{
			POSITION: [15, 1, -1, 0, 1],
			TYPE: ['egg', { COLOR: { BRIGHTNESS_SHIFT: -9 }, BORDERLESS: true }]
		},
		{
			POSITION: [13, 2, -2, 0, 1],
			TYPE: ['egg', { COLOR: { BRIGHTNESS_SHIFT: -8 }, BORDERLESS: true }]
		},
		{
			POSITION: [11, 3, -3, 0, 1],
			TYPE: ['egg', { COLOR: { BRIGHTNESS_SHIFT: -3 }, BORDERLESS: true }]
		},
		{
			POSITION: [8, 3.25, -3.25, 0, 1],
			TYPE: ['egg', { COLOR: { BRIGHTNESS_SHIFT: 3 }, BORDERLESS: true }]
		},
		{
			POSITION: [6, 3, -3, 0, 1],
			TYPE: ['egg', { COLOR: { BRIGHTNESS_SHIFT: 9 }, BORDERLESS: true }]
		}
	]
};
Class.cube = {
	PARENT: 'food',
	LABEL: 'The Cube',
	VALUE: 2e7,
	SIZE: 10,
	COLOR: 'egg',
	SHAPE: [
		[0.1, 0],
		[0.6, -0.8660254037844386],
		[1.1, 0],
		[0.6, 0.8660254037844386],
		[0.1, 0],
		[-0.05, 0.08660254037844387],
		[0.45, 0.9526279441628825],
		[-0.55, 0.9526279441628825],
		[-1.05, 0.08660254037844387],
		[-0.05, 0.08660254037844387],
		[0.1, 0],
		[-0.05, -0.08660254037844387],
		[-1.05, -0.08660254037844387],
		[-0.55, -0.9526279441628825],
		[0.45, -0.9526279441628825],
		[-0.05, -0.08660254037844387]
	],
	BODY: {
		DAMAGE: 4.8,
		DENSITY: 20,
		HEALTH: 40,
		RESIST: 1.25,
		PENETRATION: 17.5,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false,
	GIVE_KILL_MESSAGE: true
};
Class.cube3d = {
	PARENT: 'food',
	LABEL: 'Cube',
	VALUE: 2e7,
	SIZE: 30,
	COLOR: 'egg',
	SHAPE: encode3d({
		VERTEXES: [
			[1, 1, 1],
			[-1, 1, 1],
			[-1, -1, 1],
			[1, -1, 1],
			[1, 1, -1],
			[-1, 1, -1],
			[-1, -1, -1],
			[1, -1, -1]
		],
		FACES: [
			[0, 1, 2, 3],
			[4, 5, 6, 7],
			[1, 2, 6, 5],
			[0, 3, 7, 4],
			[0, 1, 5, 4],
			[2, 3, 7, 6]
		],
		SCALE: 7.5,
		VERTEXES_SCALE: 0.1
	}),
	BODY: {
		DAMAGE: 4.8,
		DENSITY: 20,
		HEALTH: 40,
		RESIST: 1.25,
		PENETRATION: 17.5,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false,
	GIVE_KILL_MESSAGE: true
};
Class.tetrahedron = {
	PARENT: 'food',
	LABEL: 'The Tetrahedron',
	VALUE: 3e7,
	SIZE: 12,
	COLOR: 'egg',
	SHAPE:
		'M -0.065 0.037 L -0.934 -0.477 L -0.054 1.047 Z M 0.065 0.037 L 0.054 1.047 L 0.934 -0.477 Z M 0 -0.075 L 0.88 -0.57 L -0.88 -0.57 Z',
	BODY: {
		DAMAGE: 6,
		DENSITY: 23,
		HEALTH: 50,
		RESIST: 1.25,
		PENETRATION: 22.5,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
Class.tetrahedron3d = {
	PARENT: 'food',
	LABEL: 'The Tetrahedron',
	VALUE: 3e7,
	SIZE: 12 * 2,
	COLOR: 'egg',
	SHAPE: encode3d({
		/* prettier-ignore */
		FACES: [
			[[1, 1, 1], [-1, 1, -1], [1, -1, -1]],
			[[-1, 1, -1], [-1, -1, 1], [1, -1, -1]],
			[[1, 1, 1], [1, -1, -1], [-1, -1, 1]],
			[[1, 1, 1], [-1, -1, 1], [-1, 1, -1]]
		],
		SCALE: 5,
		VERTEXES_SCALE: 0.1
	}),
	BODY: {
		DAMAGE: 6,
		DENSITY: 23,
		HEALTH: 50,
		RESIST: 1.25,
		PENETRATION: 22.5,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
Class.octahedron = {
	PARENT: 'food',
	LABEL: 'The Octahedron',
	VALUE: 4e7,
	SIZE: 13,
	COLOR: 'egg',
	SHAPE:
		'M -0.053 0.053 L -0.947 0.053 L -0.053 0.947 Z M 0.053 0.053 L 0.053 0.947 L 0.947 0.053 Z M 0.053 -0.053 L 0.947 -0.053 L 0.053 -0.947 Z M -0.053 -0.053 L -0.053 -0.947 L -0.947 -0.053 Z',
	BODY: {
		DAMAGE: 6.5,
		DENSITY: 26,
		HEALTH: 60,
		RESIST: 1.25,
		PENETRATION: 30,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
Class.octahedron3d = {
	PARENT: 'food',
	LABEL: 'The Octahedron',
	VALUE: 4e7,
	SIZE: 13 * 2,
	COLOR: 'egg',
	SHAPE: encode3d({
		FACES: (function () {
			const x = 3 / (2 * Math.sqrt(2));
			const y = 3 / 2;
			// prettier-ignore
			return [
				[[-x, 0, x], [-x, 0, -x], [0, y, 0]],
				[[-x, 0, -x], [x, 0, -x], [0, y, 0]],
				[[x, 0, -x], [x, 0, x], [0, y, 0]],
				[[x, 0, x], [-x, 0, x], [0, y, 0]],
				[[x, 0, -x], [-x, 0, -x], [0, -y, 0]],
				[[-x, 0, -x], [-x, 0, x], [0, -y, 0]],
				[[x, 0, x], [x, 0, -x], [0, -y, 0]],
				[[-x, 0, x], [x, 0, x], [0, -y, 0]]
			];
		})(),
		SCALE: 7.5,
		VERTEXES_SCALE: 0.1
	}),
	BODY: {
		DAMAGE: 6.5,
		DENSITY: 26,
		HEALTH: 60,
		RESIST: 1.25,
		PENETRATION: 30,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
Class.dodecahedron = {
	PARENT: 'food',
	LABEL: 'The Dodecahedron',
	VALUE: 5e7,
	SIZE: 18,
	COLOR: 'egg',
	SHAPE:
		'M -0.341 -0.469 H 0.341 L 0.552 0.179 L 0 0.58 L -0.552 0.179 Z M -0.951 -0.309 L -0.95 0.238 L -0.674 0.149 L -0.458 -0.517 L -0.629 -0.751 Z M -0.588 0.809 L -0.067 0.977 L -0.067 0.687 L -0.633 0.276 L -0.909 0.366 Z M 0.588 0.809 L 0.908 0.366 L 0.633 0.276 L 0.067 0.687 L 0.067 0.977 Z M 0.951 -0.309 L 0.629 -0.751 L 0.458 -0.517 L 0.674 0.149 L 0.95 0.238 Z M 0 -1 L -0.52 -0.83 L -0.35 -0.595 H 0.35 L 0.52 -0.83 Z',
	BODY: {
		DAMAGE: 7,
		DENSITY: 28,
		HEALTH: 70,
		RESIST: 1.25,
		PENETRATION: 32.5,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
Class.dodecahedron3d = {
	PARENT: 'food',
	LABEL: 'The Dodecahedron',
	VALUE: 5e7,
	SIZE: 18 * 2,
	COLOR: 'egg',
	SHAPE: encode3d({
		FACES: (function () {
			let phi = (1 + Math.sqrt(5)) / 2,
				x = 1,
				y = 1 / phi,
				z = 2 - phi;

			x *= 1.5;
			y *= 1.5;
			z *= 1.5;

			return [
				[
					[z, 0, x],
					[-z, 0, x],
					[-y, y, y],
					[0, x, z],
					[y, y, y]
				],
				[
					[-z, 0, x],
					[z, 0, x],
					[y, -y, y],
					[0, -x, z],
					[-y, -y, y]
				],
				[
					[z, 0, -x],
					[-z, 0, -x],
					[-y, -y, -y],
					[0, -x, -z],
					[y, -y, -y]
				],
				[
					[-z, 0, -x],
					[z, 0, -x],
					[y, y, -y],
					[0, x, -z],
					[-y, y, -y]
				],
				[
					[0, x, -z],
					[0, x, z],
					[y, y, y],
					[x, z, 0],
					[y, y, -y]
				],
				[
					[0, x, z],
					[0, x, -z],
					[-y, y, -y],
					[-x, z, 0],
					[-y, y, y]
				],
				[
					[0, -x, -z],
					[0, -x, z],
					[-y, -y, y],
					[-x, -z, 0],
					[-y, -y, -y]
				],
				[
					[0, -x, z],
					[0, -x, -z],
					[y, -y, -y],
					[x, -z, 0],
					[y, -y, y]
				],
				[
					[x, z, 0],
					[x, -z, 0],
					[y, -y, y],
					[z, 0, x],
					[y, y, y]
				],
				[
					[x, -z, 0],
					[x, z, 0],
					[y, y, -y],
					[z, 0, -x],
					[y, -y, -y]
				],
				[
					[-x, z, 0],
					[-x, -z, 0],
					[-y, -y, -y],
					[-z, 0, -x],
					[-y, y, -y]
				],
				[
					[-x, -z, 0],
					[-x, z, 0],
					[-y, y, y],
					[-z, 0, x],
					[-y, -y, y]
				]
			];
		})(),
		SCALE: 6.5,
		VERTEXES_SCALE: 0.1
	}),
	BODY: {
		DAMAGE: 7,
		DENSITY: 28,
		HEALTH: 70,
		RESIST: 1.25,
		PENETRATION: 32.5,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
Class.icosahedron = {
	PARENT: 'food',
	LABEL: 'The Icosahedron',
	VALUE: 1e8,
	SIZE: 20,
	COLOR: 'egg',
	SHAPE:
		'M -0.836 0.482 L -0.127 0.639 L -0.617 -0.209 Z M 0.699 -0.333 L 0.913 0.362 L 0.896 -0.447 Z M 0.638 -0.439 L 0.143 -0.972 L 0.836 -0.553 Z M 0.836 0.482 L 0.617 -0.209 L 0.127 0.639 Z M -0.638 -0.439 L -0.143 -0.972 L -0.836 -0.553 Z M -0.699 -0.333 L -0.913 0.362 L -0.896 -0.447 Z M 0 -0.965 L -0.49 -0.43 H 0.49 Z M -0.061 0.772 L -0.77 0.61 L -0.061 1 Z M 0.061 0.772 L 0.77 0.61 L 0.061 1 Z M 0 0.62 L -0.537 -0.31 L 0.537 -0.31 Z',
	BODY: {
		DAMAGE: 9,
		DENSITY: 30,
		HEALTH: 80,
		RESIST: 1.25,
		PENETRATION: 35,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
Class.icosahedron3d = {
	PARENT: 'food',
	LABEL: 'The Icosahedron',
	VALUE: 1e8,
	SIZE: 20 * 2,
	COLOR: 'egg',
	SHAPE: encode3d({
		FACES: (function () {
			let phi = (1 + Math.sqrt(5)) / 2, // golden ratio
				x = 1 / 2,
				y = 1 / (2 * phi);
			x *= 3;
			y *= 3;

			return [
				[
					[0, y, -x],
					[y, x, 0],
					[-y, x, 0]
				],
				[
					[0, y, x],
					[-y, x, 0],
					[y, x, 0]
				],
				[
					[0, y, x],
					[0, -y, x],
					[-x, 0, y]
				],
				[
					[0, y, x],
					[x, 0, y],
					[0, -y, x]
				],
				[
					[0, y, -x],
					[0, -y, -x],
					[x, 0, -y]
				],
				[
					[0, y, -x],
					[-x, 0, -y],
					[0, -y, -x]
				],
				[
					[0, -y, x],
					[y, -x, 0],
					[-y, -x, 0]
				],
				[
					[0, -y, -x],
					[-y, -x, 0],
					[y, -x, 0]
				],
				[
					[-y, x, 0],
					[-x, 0, y],
					[-x, 0, -y]
				],
				[
					[-y, -x, 0],
					[-x, 0, -y],
					[-x, 0, y]
				],
				[
					[y, x, 0],
					[x, 0, -y],
					[x, 0, y]
				],
				[
					[y, -x, 0],
					[x, 0, y],
					[x, 0, -y]
				],
				[
					[0, y, x],
					[-x, 0, y],
					[-y, x, 0]
				],
				[
					[0, y, x],
					[y, x, 0],
					[x, 0, y]
				],
				[
					[0, y, -x],
					[-y, x, 0],
					[-x, 0, -y]
				],
				[
					[0, y, -x],
					[x, 0, -y],
					[y, x, 0]
				],
				[
					[0, -y, -x],
					[-x, 0, -y],
					[-y, -x, 0]
				],
				[
					[0, -y, -x],
					[y, -x, 0],
					[x, 0, -y]
				],
				[
					[0, -y, x],
					[-y, -x, 0],
					[-x, 0, y]
				],
				[
					[0, -y, x],
					[x, 0, y],
					[y, -x, 0]
				]
			];
		})(),
		SCALE: 20,
		VERTEXES_SCALE: 0.03
	}),
	BODY: {
		DAMAGE: 9,
		DENSITY: 30,
		HEALTH: 80,
		RESIST: 1.25,
		PENETRATION: 35,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
Class.cuboctahedron = {
	PARENT: 'food',
	LABEL: 'The Cuboctahedron',
	VALUE: 2e8,
	SIZE: 22 * 2,
	COLOR: 'egg',
	SHAPE: encode3d({
		VERTEXES: (function () {
			const scale = 0.1;
			const x = (Math.SQRT2 / 2) * scale;
			return [
				[x, 0.0, x],
				[x, 0.0, -x],
				[-x, 0.0, x],
				[-x, 0.0, -x],
				[x, x, 0.0],
				[x, -x, 0.0],
				[-x, x, 0.0],
				[-x, -x, 0.0],
				[0.0, x, x],
				[0.0, x, -x],
				[0.0, -x, x],
				[0.0, -x, -x]
			];
		})(),
		FACES: [
			[0, 5, 1, 4],
			[0, 8, 2, 10],
			[7, 2, 6, 3],
			[7, 11, 5, 10],
			[9, 1, 11, 3],
			[9, 6, 8, 4],
			[0, 4, 8],
			[1, 5, 11],
			[2, 7, 10],
			[3, 6, 9],
			[4, 1, 9],
			[5, 0, 10],
			[6, 2, 8],
			[7, 3, 11]
		],
		SCALE: 11.5
	}),
	BODY: {
		DAMAGE: 11,
		DENSITY: 32,
		HEALTH: 90,
		RESIST: 1.25,
		PENETRATION: 17.5,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false,
	GIVE_KILL_MESSAGE: true
};
Class.truncatedOctahedron = {
	PARENT: 'food',
	LABEL: 'The Truncated Octahedron',
	VALUE: 4e8,
	SIZE: 24 * 2,
	COLOR: 'egg',
	SHAPE: encode3d({
		VERTEXES: (function () {
			const scale = 0.1,
				x = (Math.SQRT2 / 2) * scale,
				y = Math.SQRT2 * scale;

			return [
				[x, 0.0, y],
				[x, 0.0, -y],
				[-x, 0.0, y],
				[-x, 0.0, -y],
				[y, x, 0.0],
				[y, -x, 0.0],
				[-y, x, 0.0],
				[-y, -x, 0.0],
				[0.0, y, x],
				[0.0, y, -x],
				[0.0, -y, x],
				[0.0, -y, -x],
				[0.0, x, y],
				[0.0, x, -y],
				[0.0, -x, y],
				[0.0, -x, -y],
				[y, 0.0, x],
				[y, 0.0, -x],
				[-y, 0.0, x],
				[-y, 0.0, -x],
				[x, y, 0.0],
				[x, -y, 0.0],
				[-x, y, 0.0],
				[-x, -y, 0.0]
			];
		})(),
		FACES: [
			[0, 14, 10, 21, 5, 16],
			[1, 13, 9, 20, 4, 17],
			[2, 12, 8, 22, 6, 18],
			[3, 15, 11, 23, 7, 19],
			[4, 20, 8, 12, 0, 16],
			[5, 21, 11, 15, 1, 17],
			[7, 23, 10, 14, 2, 18],
			[6, 22, 9, 13, 3, 19],
			[0, 12, 2, 14],
			[1, 15, 3, 13],
			[4, 16, 5, 17],
			[6, 19, 7, 18],
			[8, 20, 9, 22],
			[10, 23, 11, 21]
		],
		SCALE: 7.5
	}),
	BODY: {
		DAMAGE: 13,
		DENSITY: 34,
		HEALTH: 100,
		RESIST: 1.25,
		PENETRATION: 17.5,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false,
	GIVE_KILL_MESSAGE: true
};
Class.greatDirhombicosidodecahedron = {
	PARENT: 'food',
	LABEL: 'The Great Dirhombicosidodecahedron',
	VALUE: 5e10,
	SIZE: 40 * 2,
	COLOR: 'egg',
	SHAPE: encode3d({
		VERTEXES: (function () {
			const v =
					Math.sqrt(
						2 * (3 - Math.sqrt(5) - Math.sqrt(2 * (5 * Math.sqrt(5) - 11)))
					) / 4,
				x =
					Math.sqrt(2 * (Math.sqrt(5) - 1 - 2 * Math.sqrt(Math.sqrt(5) - 2))) /
					4,
				y = Math.sqrt(2 * (2 - Math.sqrt(2 * (Math.sqrt(5) - 1)))) / 4,
				z =
					Math.sqrt(
						2 * (3 - Math.sqrt(5) + Math.sqrt(2 * (5 * Math.sqrt(5) - 11)))
					) / 4,
				w = Math.sqrt((3 - Math.sqrt(5)) / 4),
				q =
					Math.sqrt(2 * (Math.sqrt(5) - 1 + 2 * Math.sqrt(Math.sqrt(5) - 2))) /
					4,
				e = Math.sqrt((Math.sqrt(5) - 1) / 4),
				r = Math.sqrt(2 * (2 + Math.sqrt(2 * (Math.sqrt(5) - 1)))) / 4;

			return [
				[x, v, r],
				[x, v, -r],
				[x, -v, r],
				[x, -v, -r],
				[-x, v, r],
				[-x, v, -r],
				[-x, -v, r],
				[-x, -v, -r],
				[r, x, v],
				[r, x, -v],
				[r, -x, v],
				[r, -x, -v],
				[-r, x, v],
				[-r, x, -v],
				[-r, -x, v],
				[-r, -x, -v],
				[v, r, x],
				[v, r, -x],
				[v, -r, x],
				[v, -r, -x],
				[-v, r, x],
				[-v, r, -x],
				[-v, -r, x],
				[-v, -r, -x],
				[0.0, w, e],
				[0.0, w, -e],
				[0.0, -w, e],
				[0.0, -w, -e],
				[e, 0.0, w],
				[e, 0.0, -w],
				[-e, 0.0, w],
				[-e, 0.0, -w],
				[w, e, 0.0],
				[w, -e, 0.0],
				[-w, e, 0.0],
				[-w, -e, 0.0],
				[z, y, q],
				[z, y, -q],
				[z, -y, q],
				[z, -y, -q],
				[-z, y, q],
				[-z, y, -q],
				[-z, -y, q],
				[-z, -y, -q],
				[q, z, y],
				[q, z, -y],
				[q, -z, y],
				[q, -z, -y],
				[-q, z, y],
				[-q, z, -y],
				[-q, -z, y],
				[-q, -z, -y],
				[y, q, z],
				[y, q, -z],
				[y, -q, z],
				[y, -q, -z],
				[-y, q, z],
				[-y, q, -z],
				[-y, -q, z],
				[-y, -q, -z]
			];
		})(),
		FACES: [
			[16, 10, 53, 36, 29],
			[16, 41, 45, 34, 1],
			[17, 11, 52, 37, 28],
			[17, 40, 44, 34, 0],
			[18, 8, 55, 38, 29],
			[18, 43, 47, 35, 3],
			[19, 9, 54, 39, 28],
			[19, 42, 46, 35, 2],
			[20, 14, 57, 40, 31],
			[20, 37, 49, 32, 5],
			[21, 15, 56, 41, 30],
			[21, 36, 48, 32, 4],
			[22, 12, 59, 42, 31],
			[22, 39, 51, 33, 7],
			[23, 13, 58, 43, 30],
			[23, 38, 50, 33, 6],
			[24, 10, 6, 44, 54],
			[24, 14, 2, 48, 58],
			[25, 11, 7, 45, 55],
			[25, 15, 3, 49, 59],
			[26, 8, 4, 46, 52],
			[26, 12, 0, 50, 56],
			[27, 9, 5, 47, 53],
			[27, 13, 1, 51, 57],
			[0, 12, 7, 11],
			[0, 34, 7, 33],
			[2, 14, 5, 9],
			[2, 35, 5, 32],
			[4, 8, 3, 15],
			[4, 32, 3, 35],
			[6, 10, 1, 13],
			[6, 33, 1, 34],
			[8, 18, 15, 21],
			[8, 26, 15, 25],
			[10, 16, 13, 23],
			[10, 24, 13, 27],
			[12, 22, 11, 17],
			[12, 26, 11, 25],
			[14, 20, 9, 19],
			[14, 24, 9, 27],
			[16, 1, 23, 6],
			[16, 29, 23, 30],
			[18, 3, 21, 4],
			[18, 29, 21, 30],
			[20, 5, 19, 2],
			[20, 31, 19, 28],
			[22, 7, 17, 0],
			[22, 31, 17, 28],
			[24, 54, 27, 57],
			[24, 58, 27, 53],
			[26, 52, 25, 59],
			[26, 56, 25, 55],
			[28, 37, 31, 42],
			[28, 39, 31, 40],
			[30, 41, 29, 38],
			[30, 43, 29, 36],
			[32, 48, 35, 47],
			[32, 49, 35, 46],
			[34, 44, 33, 51],
			[34, 45, 33, 50],
			[36, 21, 43, 18],
			[36, 47, 43, 48],
			[38, 23, 41, 16],
			[38, 45, 41, 50],
			[40, 17, 39, 22],
			[40, 51, 39, 44],
			[42, 19, 37, 20],
			[42, 49, 37, 46],
			[44, 6, 51, 1],
			[44, 57, 51, 54],
			[46, 4, 49, 3],
			[46, 59, 49, 52],
			[48, 2, 47, 5],
			[48, 53, 47, 58],
			[50, 0, 45, 7],
			[50, 55, 45, 56],
			[52, 11, 59, 12],
			[52, 42, 59, 37],
			[54, 9, 57, 14],
			[54, 40, 57, 39],
			[56, 15, 55, 8],
			[56, 38, 55, 41],
			[58, 13, 53, 10],
			[58, 36, 53, 43],
			[0, 11, 22],
			[0, 33, 45],
			[1, 10, 23],
			[1, 33, 44],
			[2, 9, 20],
			[2, 32, 47],
			[3, 8, 21],
			[3, 32, 46],
			[4, 15, 18],
			[4, 35, 49],
			[5, 14, 19],
			[5, 35, 48],
			[6, 13, 16],
			[6, 34, 51],
			[7, 12, 17],
			[7, 34, 50],
			[24, 53, 13],
			[24, 57, 9],
			[25, 52, 12],
			[25, 56, 8],
			[26, 55, 15],
			[26, 59, 11],
			[27, 54, 14],
			[27, 58, 10],
			[36, 18, 30],
			[36, 58, 47],
			[37, 19, 31],
			[37, 59, 46],
			[38, 16, 30],
			[38, 56, 45],
			[39, 17, 31],
			[39, 57, 44],
			[40, 22, 28],
			[40, 54, 51],
			[41, 23, 29],
			[41, 55, 50],
			[42, 20, 28],
			[42, 52, 49],
			[43, 21, 29],
			[43, 53, 48]
		],
		SCALE: 15,
		VERTEXES_SCALE: 0.1
	}),
	BODY: {
		DAMAGE: 21,
		DENSITY: 52,
		HEALTH: 200,
		RESIST: 1.25,
		PENETRATION: 17.5,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false,
	GIVE_KILL_MESSAGE: true
};
Class.truncatedIcosidodecahedron = {
	PARENT: 'food',
	LABEL: 'The Truncated Icosidodecahedron',
	VALUE: 5e11,
	SIZE: 60 * 2,
	COLOR: 'egg',
	SHAPE: encode3d({
		VERTEXES: (function () {
			const C0 = (3 + Math.sqrt(5)) / 4,
				C1 = (1 + Math.sqrt(5)) / 2,
				C2 = (5 + Math.sqrt(5)) / 4,
				C3 = (2 + Math.sqrt(5)) / 2,
				C4 = (3 * (1 + Math.sqrt(5))) / 4,
				C5 = (3 + Math.sqrt(5)) / 2,
				C6 = (5 + 3 * Math.sqrt(5)) / 4,
				C7 = (4 + Math.sqrt(5)) / 2,
				C8 = (7 + 3 * Math.sqrt(5)) / 4,
				C9 = (3 + 2 * Math.sqrt(5)) / 2;

			return [
				[0.5, 0.5, C9],
				[0.5, 0.5, -C9],
				[0.5, -0.5, C9],
				[0.5, -0.5, -C9],
				[-0.5, 0.5, C9],
				[-0.5, 0.5, -C9],
				[-0.5, -0.5, C9],
				[-0.5, -0.5, -C9],
				[C9, 0.5, 0.5],
				[C9, 0.5, -0.5],
				[C9, -0.5, 0.5],
				[C9, -0.5, -0.5],
				[-C9, 0.5, 0.5],
				[-C9, 0.5, -0.5],
				[-C9, -0.5, 0.5],
				[-C9, -0.5, -0.5],
				[0.5, C9, 0.5],
				[0.5, C9, -0.5],
				[0.5, -C9, 0.5],
				[0.5, -C9, -0.5],
				[-0.5, C9, 0.5],
				[-0.5, C9, -0.5],
				[-0.5, -C9, 0.5],
				[-0.5, -C9, -0.5],
				[1.0, C0, C8],
				[1.0, C0, -C8],
				[1.0, -C0, C8],
				[1.0, -C0, -C8],
				[-1.0, C0, C8],
				[-1.0, C0, -C8],
				[-1.0, -C0, C8],
				[-1.0, -C0, -C8],
				[C8, 1.0, C0],
				[C8, 1.0, -C0],
				[C8, -1.0, C0],
				[C8, -1.0, -C0],
				[-C8, 1.0, C0],
				[-C8, 1.0, -C0],
				[-C8, -1.0, C0],
				[-C8, -1.0, -C0],
				[C0, C8, 1.0],
				[C0, C8, -1.0],
				[C0, -C8, 1.0],
				[C0, -C8, -1.0],
				[-C0, C8, 1.0],
				[-C0, C8, -1.0],
				[-C0, -C8, 1.0],
				[-C0, -C8, -1.0],
				[0.5, C3, C7],
				[0.5, C3, -C7],
				[0.5, -C3, C7],
				[0.5, -C3, -C7],
				[-0.5, C3, C7],
				[-0.5, C3, -C7],
				[-0.5, -C3, C7],
				[-0.5, -C3, -C7],
				[C7, 0.5, C3],
				[C7, 0.5, -C3],
				[C7, -0.5, C3],
				[C7, -0.5, -C3],
				[-C7, 0.5, C3],
				[-C7, 0.5, -C3],
				[-C7, -0.5, C3],
				[-C7, -0.5, -C3],
				[C3, C7, 0.5],
				[C3, C7, -0.5],
				[C3, -C7, 0.5],
				[C3, -C7, -0.5],
				[-C3, C7, 0.5],
				[-C3, C7, -0.5],
				[-C3, -C7, 0.5],
				[-C3, -C7, -0.5],
				[C2, C1, C6],
				[C2, C1, -C6],
				[C2, -C1, C6],
				[C2, -C1, -C6],
				[-C2, C1, C6],
				[-C2, C1, -C6],
				[-C2, -C1, C6],
				[-C2, -C1, -C6],
				[C6, C2, C1],
				[C6, C2, -C1],
				[C6, -C2, C1],
				[C6, -C2, -C1],
				[-C6, C2, C1],
				[-C6, C2, -C1],
				[-C6, -C2, C1],
				[-C6, -C2, -C1],
				[C1, C6, C2],
				[C1, C6, -C2],
				[C1, -C6, C2],
				[C1, -C6, -C2],
				[-C1, C6, C2],
				[-C1, C6, -C2],
				[-C1, -C6, C2],
				[-C1, -C6, -C2],
				[C0, C4, C5],
				[C0, C4, -C5],
				[C0, -C4, C5],
				[C0, -C4, -C5],
				[-C0, C4, C5],
				[-C0, C4, -C5],
				[-C0, -C4, C5],
				[-C0, -C4, -C5],
				[C5, C0, C4],
				[C5, C0, -C4],
				[C5, -C0, C4],
				[C5, -C0, -C4],
				[-C5, C0, C4],
				[-C5, C0, -C4],
				[-C5, -C0, C4],
				[-C5, -C0, -C4],
				[C4, C5, C0],
				[C4, C5, -C0],
				[C4, -C5, C0],
				[C4, -C5, -C0],
				[-C4, C5, C0],
				[-C4, C5, -C0],
				[-C4, -C5, C0],
				[-C4, -C5, -C0]
			];
		})(),
		FACES: [
			[0, 2, 26, 74, 106, 58, 56, 104, 72, 24],
			[1, 25, 73, 105, 57, 59, 107, 75, 27, 3],
			[4, 28, 76, 108, 60, 62, 110, 78, 30, 6],
			[5, 7, 31, 79, 111, 63, 61, 109, 77, 29],
			[8, 9, 33, 81, 113, 65, 64, 112, 80, 32],
			[10, 34, 82, 114, 66, 67, 115, 83, 35, 11],
			[12, 36, 84, 116, 68, 69, 117, 85, 37, 13],
			[14, 15, 39, 87, 119, 71, 70, 118, 86, 38],
			[16, 20, 44, 92, 100, 52, 48, 96, 88, 40],
			[17, 41, 89, 97, 49, 53, 101, 93, 45, 21],
			[18, 42, 90, 98, 50, 54, 102, 94, 46, 22],
			[19, 23, 47, 95, 103, 55, 51, 99, 91, 43],
			[0, 24, 48, 52, 28, 4],
			[1, 5, 29, 53, 49, 25],
			[2, 6, 30, 54, 50, 26],
			[3, 27, 51, 55, 31, 7],
			[8, 32, 56, 58, 34, 10],
			[9, 11, 35, 59, 57, 33],
			[12, 14, 38, 62, 60, 36],
			[13, 37, 61, 63, 39, 15],
			[16, 40, 64, 65, 41, 17],
			[18, 19, 43, 67, 66, 42],
			[20, 21, 45, 69, 68, 44],
			[22, 46, 70, 71, 47, 23],
			[72, 104, 80, 112, 88, 96],
			[73, 97, 89, 113, 81, 105],
			[74, 98, 90, 114, 82, 106],
			[75, 107, 83, 115, 91, 99],
			[76, 100, 92, 116, 84, 108],
			[77, 109, 85, 117, 93, 101],
			[78, 110, 86, 118, 94, 102],
			[79, 103, 95, 119, 87, 111],
			[0, 4, 6, 2],
			[1, 3, 7, 5],
			[8, 10, 11, 9],
			[12, 13, 15, 14],
			[16, 17, 21, 20],
			[18, 22, 23, 19],
			[24, 72, 96, 48],
			[25, 49, 97, 73],
			[26, 50, 98, 74],
			[27, 75, 99, 51],
			[28, 52, 100, 76],
			[29, 77, 101, 53],
			[30, 78, 102, 54],
			[31, 55, 103, 79],
			[32, 80, 104, 56],
			[33, 57, 105, 81],
			[34, 58, 106, 82],
			[35, 83, 107, 59],
			[36, 60, 108, 84],
			[37, 85, 109, 61],
			[38, 86, 110, 62],
			[39, 63, 111, 87],
			[40, 88, 112, 64],
			[41, 65, 113, 89],
			[42, 66, 114, 90],
			[43, 91, 115, 67],
			[44, 68, 116, 92],
			[45, 93, 117, 69],
			[46, 94, 118, 70],
			[47, 71, 119, 95]
		],
		SCALE: 2.5,
		VERTEXES_SCALE: 0.1
	}),
	BODY: {
		DAMAGE: 31,
		DENSITY: 72,
		HEALTH: 300,
		RESIST: 1.25,
		PENETRATION: 17.5,
		ACCELERATION: 0.002
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false,
	GIVE_KILL_MESSAGE: true
};

// PRESENTS
Class.presentSymbol = {
	SHAPE: [
		[0.3, -0.3],
		[1, -0.3],
		[1, 0.3],
		[0.3, 0.3],
		[0.3, 1],
		[-0.3, 1],
		[-0.3, 0.3],
		[-1, 0.3],
		[-1, -0.3],
		[-0.3, -0.3],
		[-0.3, -1],
		[0.3, -1]
	],
	SIZE: 13,
	COLOR: 'white'
};
Class.presentRY = makePresent('red', 'yellow');
Class.presentRP = makePresent('red', 'purple');
Class.presentRW = makePresent('red', 'white');

Class.presentGY = makePresent('green', 'yellow');
Class.presentGP = makePresent('green', 'purple');
Class.presentGW = makePresent('green', 'white');

Class.presentBY = makePresent('blue', 'yellow');
Class.presentBP = makePresent('blue', 'purple');
Class.presentBW = makePresent('blue', 'white');

// RELICS
for (let [gemColor, name] of [
	[undefined, ''],
	['powerGem', 'Power'],
	['spaceGem', 'Space'],
	['realityGem', 'Reality'],
	['soulGem', 'Soul'],
	['timeGem', 'Time'],
	['mindGem', 'Mind']
]) {
	let gem;
	if (gemColor) {
		gem = Class[name + 'Gem'] = {
			PARENT: 'gem',
			LABEL: name + ' Gem',
			SHAPE: 6,
			COLOR: gemColor
		};
	}

	Class[name + 'EggRelic'] = makeRelic('egg', 0.5, gem, 7);
	Class[name + 'SquareRelic'] = makeRelic('square', 1, gem);
	Class[name + 'TriangleRelic'] = makeRelic('triangle', 1.45, gem);
	Class[name + 'PentagonRelic'] = makeRelic('pentagon', -0.6, gem);
	Class[name + 'BetaPentagonRelic'] = makeRelic('betaPentagon', -0.6, gem);
	Class[name + 'AlphaPentagonRelic'] = makeRelic('alphaPentagon', -0.6, gem);
	Class[name + 'HexagonRelic'] = makeRelic(
		'hexagon',
		-0.4,
		gem,
		undefined,
		6.25
	);
}

// 4D
Class.tesseract = {
	PARENT: 'food',
	LABEL: 'The Tesseract',
	VALUE: 42e7,
	SIZE: 25,
	COLOR: 'egg',
	SHAPE:
		'M 0.47 -0.375 L 0.71 -0.615 L 0.71 0.615 L 0.47 0.375 Z M -0.375 -0.47 L -0.615 -0.71 L 0.615 -0.71 L 0.375 -0.47 Z M -0.47 0.375 L -0.71 0.615 L -0.71 -0.615 L -0.47 -0.375 Z M 0.375 0.47 L 0.615 0.71 L -0.615 0.71 L -0.375 0.47 Z M 0.35 0.35 L 0.35 -0.35 L -0.35 -0.35 L -0.35 0.35 Z',
	BODY: {
		DAMAGE: 10,
		DENSITY: 40,
		RESIST: 1.25,
		HEALTH: 200,
		PENETRATION: 50,
		ACCELERATION: 0.003
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
Class.tesseract4d = {
	PARENT: 'food',
	LABEL: 'The Tesseract',
	VALUE: 1e16,
	SIZE: 25 * 3,
	COLOR: 'egg',
	SHAPE: encode4d({
		// prettier-ignore
		VERTEXES: [
			[ -1, 1, 1, 1 ],   [ 1, 1, 1, 1 ],
			[ 1, -1, 1, 1 ],   [ -1, -1, 1, 1 ],
			[ -1, 1, -1, 1 ],  [ 1, 1, -1, 1 ],
			[ 1, -1, -1, 1 ],  [ -1, -1, -1, 1 ],
			[ -1, 1, 1, -1 ],  [ 1, 1, 1, -1 ],
			[ 1, -1, 1, -1 ],  [ -1, -1, 1, -1 ],
			[ -1, 1, -1, -1 ], [ 1, 1, -1, -1 ],
			[ 1, -1, -1, -1 ], [ -1, -1, -1, -1 ]
		],
		FACES: [
			// broken
			[0,1,2,3], [7,6,5,4], [0,1,5,4], [1,2,6,5], [2,3,7,6], [3,0,4,7],
			[8,9,10,11], [15,14,13,12], [8,9,13,12], [9,10,14,13], [10,11,15,14], [11,8,12,15],
			[0,1,9,8],
			[4,5,13,12],
			[1,2,10,9],
			[3,0,8,11],
			[2,3,11,10],
			[7,6,14,15],[5,6,14,13], [4,7,15,12]
		],
		VERTEXES_SCALE: 0.1,
		SCALE: 6
	}),
	BODY: {
		DAMAGE: 10 * 2,
		DENSITY: 40 * 2,
		RESIST: 1.25,
		HEALTH: 200 * 5,
		PENETRATION: 50,
		ACCELERATION: 0.003
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};

// LABY
let polyNames = ['egg', 'square', 'triangle', 'pentagon', 'hexagon'],
	shinyNames = ['', 'shiny', 'legendary', 'shadow', 'rainbow', 'trans'].concat(
		Array.from({ length: 0 }, (_, i) => `rarity${i + 6}`)
	);
for (let tier = 0; tier < 6; tier++) {
	for (let poly in polyNames) {
		let polyName = polyNames[poly];
		polyName = polyName[0].toUpperCase() + polyName.slice(1);

		for (let shiny in shinyNames) {
			let shinyName = shinyNames[shiny];
			let food = shinyName + polyName;
			food = food[0].toLowerCase() + food.slice(1);

			Class[`laby_${poly}_${tier}_${shiny}_0`] = makeLaby(
				Class[food],
				parseInt(poly),
				parseInt(shiny),
				tier,
				polyName === 'Triangle' && tier > 0 ? 2 / 3 : 1
			);

			Class[`laby_${poly}_${tier}_${shiny}_1`] = makeCrasher(
				Class[`laby_${poly}_${tier}_${shiny}_0`]
			);
		}
	}
}
