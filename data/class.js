import GameSystemData from './gameSystem';

class ClassData extends GameSystemData {
	constructor() {
		super();

		this.category = null;
		this.level = null;
		this.categorySecondary = null;
		this.categoryTertiary = null;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.category = requested.category;
		this.level = requested.level;
		this.categorySecondary = requested.categorySecondary;
		this.categoryTertiary = requested.categoryTertiary;
	}
}

export default ClassData;
