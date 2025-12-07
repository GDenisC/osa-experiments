require('../weapons.js');
const { Weapon, makeWeapons } = require('../weapon.js');
const { combineStats, dereference } = require('../facilitators.js');
const { statnames } = require('../constants.js');
const g = require('../gunvals.js');

function makeRailgun(tier) {
	const name = 'railgunTier' + tier;
	Class[name] = dereference(Class.railgun);
	Class[name].LABEL = 'Railgun lvl' + (tier + 1);
	Class[name].GUNS = WeaponClass.railgun
		.length((length, i) => (i == 1 ? length + (tier + 1) * 2 : length))
		.shootSettings(
			(stats, i) =>
				i == 1
					? combineStats(
							[stats].concat(
								Array.from({ length: tier + 1 }, () => ({
									reload: 0.9,
									damage: 1.3,
									health: 1.3,
									speed: 1.1,
									maxSpeed: 1.1
								}))
							)
					  )
					: stats,
			false
		)
		.expand();
	if (tier == 0) {
		Class.railgun.UPGRADES_TIER_3 = [name];
	} else {
		Class['railgunTier' + (tier - 1)]['UPGRADES_TIER_' + (tier + 3)] = [name];
	}
}

for (let tier = 0; tier < 6; ++tier) {
	//makeRailgun(tier);
}
