const { generateProceduralClasses } = require('../procedural');
const { base } = require('../constants.js');

Class['smasher'] = {
	PARENT: 'genericSmasher',
	LABEL: 'Smasher',
	DANGER: 6,
	TURRETS: [
		{
			POSITION: [21.5, 0, 0, 0, 360, 0],
			TYPE: 'smasherBody',
			ID: 'body'
		}
	]
};

Class['smasher'].UPGRADES_TIER_2 = generateProceduralClasses({
	template: 'smasher',
	mockup: 'smasher',
	branches: {
		mega: (context, tier) => {
			if (tier == 0) return;

			context.addLabel(['Mega', 'Beta', 'Alpha', 'Omega', 'Delta'][tier - 1]);

			context.mockup.BODY = {
				SPEED: 1.05 * (context.mockup.BODY.SPEED ?? base.SPEED),
				FOV: 1.1 * (context.mockup.BODY.FOV ?? base.FOV),
				DENSITY: (4 / tier) * (context.mockup.BODY.DENSITY ?? base.DENSITY)
			};

			for (let turret of context.getTurretsById('body')) {
				turret.POSITION[0] += 3.5;
			}
		},
		spike: (context, tier) => {
			if (tier == 0) return;

			context.addLabel(
				['Spike', 'Spiker', 'Thorn', 'Power', 'Powerful'][tier - 1]
			);

			context.mockup.BODY = {
				SPEED: 1.05 * (context.mockup.BODY.SPEED ?? base.SPEED),
				DAMAGE: 1.1 * (context.mockup.BODY.DAMAGE ?? base.DAMAGE)
			};

			console.log(context.mockup.BODY.DAMAGE, tier);

			context.mockup.TURRETS = Array.from({ length: 2 + tier }, (_, i) => ({
				POSITION: [
					context.mockup.TURRETS[0].POSITION[0] - (tier == 1 ? 3 : 0),
					0,
					0,
					(120 / tier) * i,
					360,
					0
				],
				TYPE: 'spikeBody',
				ID: context.mockup.TURRETS[0]
			}));
		}
	},
	maxTiers: 6,
	rerootUpgradeTree: false
});
