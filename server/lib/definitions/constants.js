module.exports = {
	// polygon stats
	basePolygonDamage: 1,
	basePolygonHealth: 2,

	// default skill caps
	dfltskl: 9,
	smshskl: 12,

	// base stats
	base: {
	    ACCEL: 1.6,
	    SPEED: 5.25,
	    HEALTH: 20,
	    DAMAGE: 3,
	    RESIST: 1,
	    PENETRATION: 1.05,
	    SHIELD: 5.75,
	    REGEN: 0.01,
	    FOV: 1.02,
	    DENSITY: 0.5,
	},

	// stat names
	statnames: {
		mixed: {
			BULLET_SPEED: 'Weapon Speed',
			BULLET_HEALTH: 'Weapon Health',
			BULLET_PEN: 'Weapon Penetration',
			BULLET_DAMAGE: 'Weapon Damage',
		},
		swarm: {
			BULLET_SPEED: 'Swarm Speed',
			BULLET_HEALTH: 'Swarm Health',
			BULLET_PEN: 'Swarm Penetration',
			BULLET_DAMAGE: 'Swarm Damage',
		},
		necro: {
			BULLET_SPEED: 'Drone Speed',
			BULLET_HEALTH: 'Drone Health',
			BULLET_PEN: 'Drone Penetration',
			BULLET_DAMAGE: 'Drone Damage',
			RELOAD: 'Max Drone Count',
		},
		mixedNecro: {
			BULLET_SPEED: 'Weapon Speed',
			BULLET_HEALTH: 'Weapon Health',
			BULLET_PEN: 'Weapon Penetration',
			BULLET_DAMAGE: 'Weapon Damage',
			RELOAD: 'Reload / Max Drone Count',
		},
		trap: {
			BULLET_SPEED: 'Placement Speed',
			BULLET_HEALTH: 'Trap Health',
			BULLET_PEN: 'Trap Penetration',
			BULLET_DAMAGE: 'Trap Damage',
		},
		desmos: {
			BULLET_SPEED: 'Wave Frequency',
		},
		whirlwind: {
			BULLET_SPEED: 'Orbit Speed',
			BULLET_HEALTH: 'Satellite Health',
			BULLET_PEN: 'Satellite Penetration',
			BULLET_DAMAGE: 'Satellite Damage',
			RELOAD: 'Respawn Rate',
		},
		heal: {
			BULLET_PEN: 'Healing Precision',
			BULLET_DAMAGE: 'Healing Amount',
		},
		smasher: {
			RELOAD: "Engine Acceleration"
		},
		flail: {
			BULLET_HEALTH: 'Ball Longevity',
			BULLET_PEN: 'Ball Sharpness',
			BULLET_DAMAGE: 'Ball Damage',
			RELOAD: 'Ball Density',
		},
	}
}
