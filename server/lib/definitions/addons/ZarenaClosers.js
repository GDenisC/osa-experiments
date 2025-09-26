const { dereference, skillSet, combineStats } = require('../facilitators');
const g = require('../gunvals');

const ARENA_CLOSER_SKILL_SET = skillSet({
	rld: 1,
	dam: 1,
	pen: 1,
	str: 1,
	spd: 1,
	atk: 1,
	hlt: 1,
	shi: 1,
	rgn: 1,
	mob: 1
});

let lastTurretId = 0;
const newTurret = function (turret, isObject) {
	if (isObject) {
		turret = dereference(turret);
	} else {
		if (Array.isArray(turret)) return turret.map(newTurret);
		if (typeof turret == 'object') return turret;
		turret = dereference(Class[turret]);
	}

	const name = `OSA_CLOSER_TURRET_${++lastTurretId}`;

	if (turret.GUNS) turret.GUNS = makeGuns(turret.GUNS);
	if (turret.TURRETS)
		turret.TURRETS = turret.TURRETS.map(turret => forTurret(turret));

	Class[name] = turret;

	return name;
};

const forTurret = function (turret) {
	if (turret && typeof turret.TYPE == 'string') {
		return {
			...turret,
			TYPE: newTurret(turret.TYPE)
		};
	}

	if (turret && typeof turret.TYPE == 'object') {
		return {
			...turret,
			TYPE: newTurret(turret.TYPE, true)
		};
	}

	if (turret && Array.isArray(turret.TYPE))
		return {
			...turret,
			TYPE: turret.TYPE.map(turret => newTurret(turret))
		};

	console.log('no support for turret:', turret);

	return turret;
};

const makeGuns = function (guns) {
	return guns.map(gun => {
		gun = dereference(gun);
		if (gun.PROPERTIES) {
			if (gun.PROPERTIES.TYPE) {
				if (Array.isArray(gun.PROPERTIES.TYPE)) {
					gun.PROPERTIES.TYPE.push({ LAYER: 12 });
				} else {
					gun.PROPERTIES.TYPE = [gun.PROPERTIES.TYPE, { LAYER: 12 }];
				}
			}
			if (gun.PROPERTIES.SHOOT_SETTINGS) {
				gun.PROPERTIES.SHOOT_SETTINGS = combineStats([
					g.arenaCloser,
					gun.PROPERTIES.SHOOT_SETTINGS
				]);
			}
		}
		return gun;
	});
};

const toArenaCloser = tank => {
	tank.ARENA_CLOSER = true;
	tank.ACCEPTS_SCORE = false;
	tank.LABEL += ' Arena Closer';
	tank.NAME = 'Arena Closer';
	tank.SIZE = 34;
	tank.LAYER = 13;
	tank.BODY = {
		REGEN: 1e5,
		HEALTH: 1e6,
		DENSITY: 30,
		DAMAGE: 1e5,
		FOV: 2,
		SPEED: 8
	};
	tank.HITS_OWN_TYPE = 'never';
	tank.SKILL = ARENA_CLOSER_SKILL_SET;
	tank.COLOR = 3;
	tank.DANGER = 10;
	tank.DRAW_HEALTH = false;
	const makeGuns = guns =>
		guns.map(gun => {
			gun = dereference(gun);
			if (gun.PROPERTIES) {
				if (gun.PROPERTIES.TYPE) {
					if (Array.isArray(gun.PROPERTIES.TYPE)) {
						gun.PROPERTIES.TYPE.push({ LAYER: 12 });
					} else {
						gun.PROPERTIES.TYPE = [gun.PROPERTIES.TYPE, { LAYER: 12 }];
					}
				}
				if (gun.PROPERTIES.SHOOT_SETTINGS) {
					gun.PROPERTIES.SHOOT_SETTINGS = combineStats([
						g.arenaCloser,
						gun.PROPERTIES.SHOOT_SETTINGS
					]);
				}
			}
			return gun;
		});
	if (tank.GUNS) tank.GUNS = makeGuns(tank.GUNS);
	if (tank.TURRETS) tank.TURRETS = tank.TURRETS.map(t => forTurret(t));
	return tank;
};

const makeTree = tank => {
	const def = dereference(tank);
	const closer = toArenaCloser(def);
	const name = `OSA_CLOSER_${(tank.LABEL ?? 'undefined').toUpperCase()
		.replace(' ', '_')
		.replace('-', '_')}`;
	for (let i = 0; i < 10; ++i) {
		const tier = `UPGRADES_TIER_${i}`;
		const upgrades = tank[tier];
		if (upgrades != null) {
			closer[tier] = upgrades.map(u =>
				Array.isArray(u) ? u.map(x => makeTree(Class[x])) : makeTree(Class[u])
			);
		}
	}
	Class[name] = closer;
	return name;
};

Class.addons.UPGRADES_TIER_0.push(
	makeTree(Class.basic),
	makeTree(Class.bosses)
);
