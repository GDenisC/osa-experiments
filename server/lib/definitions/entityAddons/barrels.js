const { generateProceduralClasses } = require('../procedural.js');
const { combineStats } = require('../facilitators.js');
const g = require('../gunvals.js');

/**
 * Basic
 * -> Sniper -> Assassin, Rifle, Hunter
 * -> Twin
 * -> Machine Gun
 * -> Pounder -> Destroyer, Launcher, Artillery
 * -> Director -> Overseer, Spawner, Cruiser
 * -> Trapper -> Twin, Builder, Mech
 */

// does not interact with OSA/other addons
const TYPE = Symbol('barrels_TYPE');

const BarrelType = {
	/** Used for shooting */
	Barrel: 0,
	/** Placed before barrel starts (does not change length), does not shoot  */
	UnderBarrel: 1,
	/** Placed at/after barrel but does not shoot */
	UpperBarrel: 2
};

// dont use it outside of this addon
function cloneBarrel(barrel) {
	return {
		POSITION: {
			X: barrel.POSITION.X,
			Y: barrel.POSITION.Y,
			LENGTH: barrel.POSITION.LENGTH,
			WIDTH: barrel.POSITION.WIDTH,
			ASPECT: barrel.POSITION.ASPECT,
			ANGLE: barrel.POSITION.ANGLE,
			DELAY: barrel.POSITION.DELAY
		},
		PROPERTIES: {
			RAW_SHOOT_SETTINGS: barrel.PROPERTIES.RAW_SHOOT_SETTINGS.slice(),
			TYPE: barrel.PROPERTIES.TYPE
		},
		[TYPE]: barrel[TYPE]
	};
}

const Upgrades = {
	makeBasic: function () {
		return [
			{
				POSITION: {
					X: 0,
					Y: 0,
					LENGTH: 20,
					WIDTH: 8,
					ASPECT: 1,
					ANGLE: 0,
					DELAY: 0
				},
				PROPERTIES: {
					RAW_SHOOT_SETTINGS: [],
					TYPE: 'bullet'
				},
				[TYPE]: BarrelType.Barrel
			}
		];
	},

	upgradeToSniper: function (barrels) {
		return barrels.map(x => {
			if (x[TYPE] == BarrelType.UnderBarrel) return x;
			if (x[TYPE] == BarrelType.UpperBarrel) {
				x.POSITION.X += 4;
			}
			if (x[TYPE] == BarrelType.Barrel) {
				x.POSITION.LENGTH += 4;
				x.PROPERTIES.RAW_SHOOT_SETTINGS.push(g.sniper);
			}
			return x;
		});
	},

	upgradeToAssassin: function (barrels) {
		for (const barrel of barrels.slice()) {
			if (barrel[TYPE] != BarrelType.Barrel) continue;
			barrels.push({
				POSITION: {
					...barrel.POSITION,
					X: barrel.POSITION.X == 0 ? 7.8 : barrel.POSITION.X,
					LENGTH: 5.2,
					ASPECT: -1.4
				},
				[TYPE]: BarrelType.UnderBarrel
			});
			barrel.PROPERTIES.RAW_SHOOT_SETTINGS.push(g.assassin);
		}
		return barrels.map(x => {
			if (x[TYPE] == BarrelType.UnderBarrel) return x;
			if (x.POSITION.X == 0) {
				x.POSITION.X += 7.8;
				x.POSITION.LENGTH -= 7.8;
			}
			x.POSITION.X += 5;
			return x;
		});
	},

	upgradeToTwin: function (barrels) {
		const maxDelay = Math.max(1, ...barrels.map(x => x.POSITION.DELAY));

		const leftBarrels = barrels.slice().map(old => {
			let barrel = cloneBarrel(old);
			barrel.POSITION.DELAY /= 2;
			barrel.POSITION.Y += 5.5;
			if (barrel[TYPE] == BarrelType.Barrel) {
				barrel.PROPERTIES.RAW_SHOOT_SETTINGS.push(g.twin);
			}
			return barrel;
		});

		const rightBarrels = barrels.map(barrel => {
			barrel.POSITION.DELAY = barrel.POSITION.DELAY / 2 + maxDelay / 2;
			barrel.POSITION.Y -= 5.5;
			if (barrel[TYPE] == BarrelType.Barrel) {
				barrel.PROPERTIES.RAW_SHOOT_SETTINGS.push(g.twin);
			}
			return barrel;
		});

		return leftBarrels.concat(rightBarrels);
	},

	upgradeToMachine: function (barrels) {
		return barrels.map(x => {
			x.POSITION.WIDTH += 2;
			if (x[TYPE] != BarrelType.UpperBarrel && x.POSITION.X == 0) {
				x.POSITION.X += 7.8;
				x.POSITION.LENGTH -= 7.8;
			}
			if (x[TYPE] == BarrelType.Barrel) {
				x.POSITION.ASPECT += 0.4;
				x.PROPERTIES.RAW_SHOOT_SETTINGS.push(g.machineGun, { size: 0.92 });
			}
			return x;
		});
	},

	upgradeToPounder: function (barrels) {
		return barrels.map(x => {
			if (x[TYPE] == BarrelType.UpperBarrel) {
				x.POSITION.X += 0.5;
				x.POSITION.WIDTH += 3.85;
				return x;
			}
			x.POSITION.LENGTH += 0.5;
			x.POSITION.WIDTH += 3.85;
			if (x[TYPE] == BarrelType.Barrel) {
				x.PROPERTIES.RAW_SHOOT_SETTINGS.push(g.pounder);
			}
			return x;
		});
	}
};

const bulletTypeToStats = {
	bullet: g.basic,
	drone: g.drone,
	trap: g.trap
};

function create(upgrades) {
	let barrels = Upgrades.makeBasic();
	for (const upgrade of upgrades) {
		barrels = upgrade(barrels);
	}
	for (const barrel of barrels) {
		if (barrel[TYPE] == BarrelType.Barrel) {
			barrel.PROPERTIES.RAW_SHOOT_SETTINGS.unshift(
				bulletTypeToStats[barrel.PROPERTIES.TYPE]
			);
			barrel.PROPERTIES['SHOOT_SETTINGS'] = combineStats(
				barrel.PROPERTIES.RAW_SHOOT_SETTINGS
			);
		}
	}
	return barrels;
}

Class.omega = {
	PARENT: 'genericTank',
	LABEL: 'Omega'
};

generateProceduralClasses({
	template: 'proc_barrels',
	mockup: 'omega',
	branches: {
		sniper: (ctx, tier) => {
			//if (tier == 0) return;
			ctx.addLabel('Sniper.' + tier);
			ctx.mockup.GUNS = Upgrades.upgradeToSniper(ctx.mockup.GUNS);
		}
	}
});

//Class.basic.UPGRADES_TIER_1.push('omega');
