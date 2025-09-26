const { Weapon, makeWeapons } = require('../weapon.js');
const { combineStats } = require('../facilitators.js');
const { statnames } = require('../constants.js');
const g = require('../gunvals.js');

const desmosWeapon = new Weapon(
	[
		{
			POSITION: [20, 8, -4 / 3, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.desmos]),
				TYPE: ['bullet', { CONTROLLERS: ['snake'] }]
			}
		},
		{
			POSITION: [3.75, 10, 2.125, 1.5, -6.25, 90, 0]
		},
		{
			POSITION: [3.75, 10, 2.125, 1.5, 6.25, -90, 0]
		}
	],
	1 // layer! note: its not required
);

const pentaShotWeapon = new Weapon(
	[
		{
			POSITION: [16, 8, 1, 0, -3, -30, 2 / 3],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
				TYPE: 'bullet'
			}
		},
		{
			POSITION: [16, 8, 1, 0, 3, 30, 2 / 3],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
				TYPE: 'bullet'
			}
		},
		{
			POSITION: [19, 8, 1, 0, -2, -15, 1 / 3],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
				TYPE: 'bullet'
			}
		},
		{
			POSITION: [19, 8, 1, 0, 2, 15, 1 / 3],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
				TYPE: 'bullet'
			}
		},
		{
			POSITION: [22, 8, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
				TYPE: 'bullet'
			}
		}
	],
	0 // bottom layer
);

// weapon depends on weapon
const pentaDesmosWeapon = new Weapon(
	pentaShotWeapon
		.getGuns()
		.map(gun =>
			desmosWeapon
				.angle(a => a + gun.POSITION[5])
				.delay(() => gun.POSITION[6])
				.combineStats([g.twin, g.tripleShot])
				.expand()
		)
		.flat(),
	0
);

// TIER 1

// single weapon showcase
Class.desmos = {
	PARENT: 'genericTank',
	LABEL: 'Desmos',
	STAT_NAMES: statnames.desmos,
	GUNS: desmosWeapon.expand()
};

// TIER 2

// you can modify the weapon!
Class.pounderDesmos = {
	PARENT: 'genericTank',
	LABEL: 'Pounder-Desmos',
	STAT_NAMES: statnames.desmos,
	GUNS: desmosWeapon.combineStats([g.pounder]).expand()
};

// layers showcase
Class.dumbDesmos = {
	PARENT: 'genericTank',
	LABEL: 'Dumb Desmos',
	STAT_NAMES: statnames.desmos,
	GUNS: makeWeapons([desmosWeapon, pentaShotWeapon])
};

// a class for the "weapon depends on weapon" showcase
Class.pentaDesmos = {
	PARENT: 'genericTank',
	LABEL: 'PentaDesmos',
	STAT_NAMES: statnames.desmos,
	GUNS: pentaDesmosWeapon.expand()
};

// multiple weapons
Class.octoDesmos = {
	PARENT: 'genericTank',
	LABEL: 'Octo-Desmos',
	STAT_NAMES: statnames.desmos,
	GUNS: makeWeapons(
		(() => {
			let weapons = [];

			const delta = 45;
			for (let angle = delta; angle <= 360; angle += delta) {
				weapons.push(desmosWeapon.angle(ANGLE => ANGLE + angle));
			}

			return weapons;
		})()
	)
};

Class.desmos.UPGRADES_TIER_2 = [
	'pounderDesmos',
	'octoDesmos',
	'dumbDesmos',
	'pentaDesmos'
];
