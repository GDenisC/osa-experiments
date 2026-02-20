const { base } = require('../constants.js');

Class.wrench = {
	PARENT: "genericTank",
	DANGER: 8,
	LABEL: "Wrench",
	BODY: {
			SPEED: 0.85 * base.SPEED,
			FOV: 1.1 * base.FOV,
	},
	GUNS: [
			{
					POSITION: [70, 6.5, 1, 0, 0, 0, 0],
			},
			{
					POSITION: [6, 8.5, -1.5, 8, 0, 0, 0]
			}
	],
	TURRETS: [{
			POSITION: [6, 70, 0, 0, 180, 1],
			TYPE: [
					"crowbarTurretTank",
					{ INDEPENDENT: true }
			],
	},
			{
					POSITION: [6, 60, 0, 0, 180, 1],
					TYPE: [
							"crowbarTurretTank",
							{ INDEPENDENT: true }
					],
			},
			{
					POSITION: [6, 50, 0, 0, 180, 1],
					TYPE: [
							"crowbarTurretTank",
							{ INDEPENDENT: true }
					],
			},
	],
}

Class.auto3.UPGRADES_TIER_3.push('crowbar');
Class.crowbar.UPGRADES_TIER_3 = ['wrench'];
