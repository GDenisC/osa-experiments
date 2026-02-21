use std::collections::HashMap;
use itertools::Itertools;

use wasm_bindgen::prelude::*;

type Entity = u16;

#[wasm_bindgen]
pub struct HashGrid {
	pub cell_size: usize,
	pub width: usize,
	pub height: usize,
	pub(crate) cells: HashMap<isize, Vec<Entity>>,
}

#[wasm_bindgen]
impl HashGrid {
	#[wasm_bindgen(constructor)]
	pub fn new(cell_size: usize, width: usize, height: usize) -> Self {
		Self {
			cell_size,
			width,
			height,
			cells: HashMap::new(),
		}
	}

	pub fn insert(
		&mut self,
		entity: Entity,
		min_x: isize,
		min_y: isize,
		max_x: isize,
		max_y: isize,
	) {
		let end_x = max_x >> self.cell_size;
		let end_y = max_y >> self.cell_size;
		for x in (min_x >> self.cell_size)..=end_x {
			for y in (min_y >> self.cell_size)..=end_y {
				let key = x + y * self.width as isize;
				let cell = self.cells.get_mut(&key);
				if let Some(cell) = cell {
					cell.push(entity);
				} else {
					self.cells.insert(key, vec![entity]);
				}
			}
		}
	}

	pub fn query(&self, min_x: isize, min_y: isize, max_x: isize, max_y: isize) -> Vec<Entity> {
		let mut output = Vec::new();

		let end_x = max_x >> self.cell_size;
		let end_y = max_y >> self.cell_size;
		for x in (min_x >> self.cell_size)..=end_x {
			for y in (min_y >> self.cell_size)..=end_y {
				let key = x + y * self.width as isize;
				let cell = self.cells.get(&key);
				if let Some(cell) = cell {
					output.extend(cell);
				}
			}
		}

		output.into_iter().unique().collect()
	}

	pub fn clear(&mut self) {
		self.cells.clear();
	}
}

#[test]
pub fn test_1() {
	let mut grid = HashGrid::new(1, 10, 10);
	grid.insert(0, -2, -2, 2, 2);
	grid.insert(1, -1, -1, 3, 3);
	assert_eq!(grid.query(0, 0, 1, 1), vec![0, 1]);

	grid.clear();
	assert_eq!(grid.cells.len(),  0);
	assert_ne!(grid.cells.capacity(), 0);
}
