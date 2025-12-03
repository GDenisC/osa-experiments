const HEAD = Symbol('HEAD');
const TAIL = Symbol('TAIL');

export const makeSharedHealth = function (className, mockup, count, onSpawn = null, onDamage = null) {
	const recursionFix = new Set();

	function computeDamage(body, head, damage) {
		if (recursionFix.has(body)) return;
		recursionFix.add(body);
		const owned = recursionFix.size == 1;
		if (onDamage) {
			let newDamage = onDamage(body, head, damage, owned);
			if (owned) damage = newDamage;
		};

		let lowestHealth = 0;

		head.damageReceived = damage;
		head.contemplationOfMortality();

		if (head.health.current > lowestHealth) {
			lowestHealth = head.health.current;
		}

		for (const tail of head[TAIL].values()) {
			tail.damageReceived = damage;
			tail.contemplationOfMortality();

			if (tail.health.current > lowestHealth) {
				lowestHealth = tail.health.current;
			}
		}

		// syncing fix
		head.health.current = lowestHealth;
		for (const tail of head[TAIL].values()) {
			tail.health.current = lowestHealth;
		}

		if (owned) recursionFix.clear();
	}

	Class[className + 'Parent'] = mockup;

	Class[className + 'Head'] = {
		PARENT: className + 'Parent',
		ON: [
			{
				event: 'define',
				handler: function ({ body }) {
					if (body[TAIL]) return;
					body[TAIL] = new Set();
					for (let i = 0; i < count; ++i) {
						let tail = new Entity(body);
						tail.team = body.team;
						tail.define(className + 'Tail');
						if (onSpawn) onSpawn(tail);
						tail[HEAD] = body;
						body[TAIL].add(tail);
					}
				}
			},
			{
				event: 'damage',
				handler: function ({ body }) {
					computeDamage(body, body, body.damageReceived);
				}
			}
		]
	};

	Class[className + 'Tail'] = {
		PARENT: className + 'Parent',
		ON: [
			{
				event: 'damage',
				handler: function ({ body }) {
					computeDamage(body, body[HEAD], body.damageReceived);
				}
			},
			{
				event: 'dead',
				handler: function ({ body }) {
					body[HEAD][TAIL].delete(body);
				}
			}
		]
	};
};
