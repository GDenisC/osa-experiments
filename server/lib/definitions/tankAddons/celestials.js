const { generateProceduralClasses } = require('../procedural.js');
const { base } = require('../constants.js');

/*
LABEL       VALUE   SHAPE SIZE HEALTH SHIELD SPEED DAMAGE REGEN
Terrestrial 500000  7     35   1000   50     0.7   9      0.3
Celestial   1000000 9     45   1500   75     0.5   12     0.3
Eternal     4000000 11    90   3000   150    0.15  18     0.1


base*
REGEN: 0.3
*/

Class.proc_celestial = {
	PARENT: 'genericTank',
	LABEL: 'Celestial',
	DANGER: 6,
	FACING_TYPE: ['spin', { speed: 0.02 }],
	HITS_OWN_TYPE: 'hardOnlyBosses',
	BODY: { PUSHABILITY: 0.05 },
	CONTROLLERS: [['minion', { turnwiserange: 360 }], 'canRepel'],
	AI: { NO_LEAD: true },
	REROOT_UPGRADE_TREE: 'proc_celestial'
};

// ETERNAL: CONTROLLERS: [["minion", {orbit: 240}]]

Class.proc_celestial.UPGRADES_TIER_0 = generateProceduralClasses({
	template: 'proc_celestial',
	mockup: 'proc_celestial',
	baseBranch: (context, tiers) => {
		console.log(context.mockup.LABEL, tiers);
	},
	branches: {
		empty: (context, tier) => {
			if (tier != 0) context.addLabel('A' + tier);
		},
		empty2: (context, tier) => {
			if (tier != 0) context.addLabel('B' + tier);
		},
		empty3: (context, tier) => {
			if (context.tiers['empty2'] > 1) return context.cancel();

			if (tier != 0) context.addLabel('C' + tier);
		},
		empty4: (context, tier) => {
			if (tier != 0) context.addLabel('D' + tier);
		}
	},
	maxTiers: 6,
	rerootUpgradeTree: false
});
