module.exports = {
	level_cap: 1000,
	growth: true,
	defineLevelSkillPoints: level => {
		if (level < 2) return 0;
		if (level <= 40) return 1;
		if (level <= 45 && (level & 1) == 1) return 1;
		if (level <= 51 && level % 2 == 1) return 1;
		if (level % 10 == 1) return 1;
		return 0;
	},
	/**
	 * Arras new (current) growth: `mult + Math.pow((score - 26263) / 3660, 0.6575 + Math.pow(score, 0.8) / 1e8) / 8`
	 *
	 * Exploding curve (from a suggestion): `mult + (Math.pow(score / 26263, 0.1 + Math.pow(level / 90 - 1, 3) / 100) - 1) * 10`
	 *
	 * Overgrowth (my own version): `mult + ((score % 1e6) / 1e6) * (1 + Math.floor(score / 1e6))`
	 *
	 * Overgrowth v2 (my own version):
	 * ```js
	 * let wave = 1;
	 * // 1e6, 2e6, 3e6, 4e6, ...
	 * while (score > 1e6 * wave) {
	 *	 score -= 1e6 * wave;
	 *	 wave += 1;
	 * }
	 * return mult + (score / 1e6 / wave) * Math.pow(2, wave);
	 * ```
	 *
	 * Overgrowth v3 (my own version):
	 * ```js
	 * level = level / 45 - 1;
	 * return mult + ((1.25 + Math.cos((level - 1) * Math.PI)) * Math.pow(2, level)) / 2;
	 * ```
	 *
	 * Other growth curves
	 *
	 * Growth over time (global, playing normal arras and then good players become large): `mult + (level / 45 - 1) * (Math.pow(1 + performance.now() / 100000, 0.1) * 5 - 4)`
	 *
	 * Based on kills (non polygons):
	 * ```js
	 * mult + Math.pow(
	 *	((entity.killCount.bosses * 16 +
	 *		entity.killCount.solo * 4 +
	 *		entity.killCount.assists) /
	 *		25) *
	 *		(entity.settings.reloadToAcceleration ? 3 : 1),
	 *	0.7
	 *);
	 *```
	 *
	 * Based on health skills (also increments):
	 * ```js
	 * if (
	 *   entity.skill.raw[7] == entity.skill.caps[7] &&
	 *   entity.skill.raw.reduce((a, b) => a + b, 0) > 42
	 * ) {
	 *   entity.skill.caps[7] += 1;
	 *   entity.skill.update();
	 * }
	 * return mult * Math.pow(1 + Math.max(0, entity.skill.amount('hlt') - 6) / 10, 2);
	 * ```
	 *
	 * Based on skills prestiges:
	 * ```
	 * if (!entity.skillPrestige) entity.skillPrestige = 0;
	 * const raw = entity.skill.raw.reduce((a, b) => a + b, 0);
	 * if (!entity.skill.old42 && raw == 42) {
	 *  entity.skill.old42 = entity.skill.raw.slice();
	 * }
	 * if (raw == 42 + (entity.skillPrestige + 1) * 6) {
	 *  entity.skillPrestige += 1;
	 *  for (let i = 0; i < 9; ++i) {
	 *    entity.skill.raw[i] = entity.skill.old42[i];
	 * }
	 * entity.skill.update();
	 * }
	 * return mult + (Math.pow(2, entity.skillPrestige) - 1);
	 * ```
	 */
	defineGrowthMultiplier: (mult, score) => {
		let wave = 1;
		// 1e6, 2e6, 3e6, 4e6, ...
		while (score > 1e6 * wave) {
			score -= 1e6 * wave;
			wave += 1;
		}
		return mult + (score / 1e6 / wave) * Math.pow(2, wave);
	},
	growthStatsMultipliers: {
		health: level => 0.05 * level,
		shield: level => 0.02 * level,
		regen: level => 0.002 * level
	}
};
