/*
const g = require('../gunvals');
const { combineStats, dereference } = require('../facilitators');
const { generateProceduralClasses } = require('../procedural');

const TWIN_NAMES =
	'Double Triple Quadruple Quintuple Sextuple Septuple Octuple'.split(' ');

const TWIN_GUN = {
	POSITION: {
		LENGTH: 20,
		WIDTH: 8,
		ASPECT: 1,
		X: 0,
		Y: 0,
		ANGLE: 0,
		DELAY: 0
	},
	PROPERTIES: {
		SHOOT_SETTINGS: combineStats([g.basic]),
		TYPE: 'bullet'
	}
};

Class.basic.UPGRADES_TIER_1 = generateProceduralClasses({
	template: 'basic',
	mockup: 'basic',
	branches: [
		/* TWIN *\/ {
			LABEL: tier => TWIN_NAMES[tier - 1],
			OVERWRITE_LABEL: true,
			DANGER: _ => 1,
			GUNS: (_, tier) => {
				let gunsAmount = tier + 1;

				const isMiddle = gunsAmount & 0b1;

				const output = [];

				const delta = 30;
				const max = Math.ceil(gunsAmount / 2);

				for (let i = max; i > 0; --i) {
					const gunTop = dereference(TWIN_GUN);
					const gunBottom = dereference(TWIN_GUN);

					gunBottom.POSITION.ANGLE = -(gunTop.POSITION.ANGLE = delta * (i - 1));
					gunBottom.POSITION.DELAY = (gunTop.POSITION.DELAY = (i - 1) / max);

					if (!isMiddle)
						gunBottom.POSITION.Y = -(gunTop.POSITION.Y =
							TWIN_GUN.POSITION.WIDTH / 2 + 2);

					gunBottom.POSITION.X = (gunTop.POSITION.X = (TWIN_GUN.LENGTH / 2) * -(i / max));

					output.push(gunTop, gunBottom);
				}

				if (isMiddle) {
					// odd, care about a middle one
					const middleGun = dereference(TWIN_GUN);
					output.push(middleGun);
				}

				return output;
			},
			MAX_TIERS: TWIN_NAMES.length
		}
	],
	maxTiers: Infinity
});
Class.basic.UPGRADES_TIER_2 = [];
*/