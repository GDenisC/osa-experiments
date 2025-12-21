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
	 * Arras new growth (inaccurate at very high scores (~1b)): score => Math.pow((score - 26263) / 3660, 0.6575) / 8
	 * Exploding curve: (Math.pow(score / 26263, 0.1 + Math.pow(level / 90 - 1, 3) / 100) - 1) * 10
	 * Overgrowth (my own): ((score % 1e6) / 1e6) * (1 + Math.floor(score / 1e6))
	 */
	defineGrowthMultiplier: score => {
		let wave = 1;
		// 1e6, 2e6, 3e6, 4e6, ...
		while (score > 1e6 * wave) {
			score -= 1e6 * wave;
			wave += 1;
		}
		return score / 1e6 / wave * Math.pow(2, wave - 1);
	}
};
