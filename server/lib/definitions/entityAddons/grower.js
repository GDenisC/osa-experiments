const { combineStats } = require('../facilitators.js');
const g = require('../gunvals.js');

Class.growerBullet = {
	PARENT: 'bullet',
	MOTION_TYPE: 'grower',
	BODY: {
		HEALTH: 1e5,
		PENETRATION: 1e5
	}
};

// NOTE: kills all bullets and drones, too op, ignores base
Class.grower = {
	PARENT: 'genericTank',
	LABEL: 'Grower',
	DANGER: 7,
	GUNS: [
		{
			POSITION: { LENGTH: 20, WIDTH: 8 },
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, { damage: 0.1, reload: 0.6, recoil: 0.5 }]),
				TYPE: 'growerBullet'
			}
		},
		{ POSITION: { LENGTH: 5, WIDTH: 10, X: 13 } }
	]
};

//Class.basic.UPGRADES_TIER_3.push('grower');
