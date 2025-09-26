const { combineStats } = require('./facilitators.js');

class Weapon {
	constructor(GUNS, layer = 0) {
		this.output = GUNS;
		this._layer = layer;
		this.cloned = false;
	}

	getClone() {
		if (this.cloned) return this;

		const weapon = new Weapon(this.getGuns(), this._layer);
		weapon.cloned = true;

		return weapon;
	}

	modify(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			self.output[i] = f(self.output[i], i);
		}

		return self;
	}

	position(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			self.output[i].POSITION = f(self.output[i].POSITION, i);
		}

		return self;
	}

	length(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			self.output[i].POSITION[0] = f(self.output[i].POSITION[0], i);
		}

		return self;
	}

	width(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			self.output[i].POSITION[1] = f(self.output[i].POSITION[1], i);
		}

		return self;
	}

	aspect(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			self.output[i].POSITION[2] = f(self.output[i].POSITION[2], i);
		}

		return self;
	}

	x(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			self.output[i].POSITION[3] = f(self.output[i].POSITION[3], i);
		}

		return self;
	}

	y(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			self.output[i].POSITION[4] = f(self.output[i].POSITION[4], i);
		}

		return self;
	}

	angle(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			self.output[i].POSITION[5] = f(self.output[i].POSITION[5], i);
		}

		return self;
	}

	delay(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			self.output[i].POSITION[6] = f(self.output[i].POSITION[6], i);
		}

		return self;
	}

	properties(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			if (!self.output[i].PROPERTIES) continue;

			self.output[i].PROPERTIES = f(self.output[i].PROPERTIES, i);
		}

		return self;
	}

	combineStats(stats) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			if (!self.output[i].PROPERTIES?.SHOOT_SETTINGS) continue;

			self.output[i].PROPERTIES.SHOOT_SETTINGS = combineStats([
				self.output[i].PROPERTIES.SHOOT_SETTINGS,
				...stats
			]);
		}

		return self;
	}

	type(f) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			if (!self.output[i].PROPERTIES?.TYPE) continue;

			self.output[i].PROPERTIES.TYPE = f(self.output[i].PROPERTIES.TYPE);
		}

		return self;
	}

	addType(type) {
		const self = this.getClone();

		for (let i = 0, l = self.output.length; i < l; ++i) {
			if (!self.output[i].PROPERTIES?.TYPE) continue;

			if (!Array.isArray(self.output[i].PROPERTIES.TYPE)) {
				self.output[i].PROPERTIES.TYPE = [self.output[i].PROPERTIES.TYPE];
			}

			self.output[i].PROPERTIES.TYPE.push(type);
		}

		return self;
	}

	layer(layer) {
		const self = this.getClone();

		self._layer = layer;

		return self;
	}

	expand() {
		return this.output;
	}

	getGuns() {
		return JSON.parse(JSON.stringify(this.output));
	}
}

/** Supports layer */
const makeWeapons = function (weapons) {
	weapons = weapons.sort((a, b) => a._layer - b._layer);

	const GUNS = [];

	for (let i = 0, l = weapons.length; i < l; ++i) {
		GUNS.push(...weapons[i].expand());
	}

	return GUNS;
};

module.exports = { Weapon, makeWeapons };
