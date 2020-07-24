import GameSystemData from './gameSystem';

class ClassData extends GameSystemData {
	constructor() {
		super();

		this.bulk = null;
		this.category = null;
		this.cost = null;
		this.level = null;
		this.categorySecondary = null;
		this.categoryTertiary = null;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.bulk = requested.bulk;
		this.category = requested.category;
		this.cost = requested.cost;
		this.level = requested.level;
		this.categorySecondary = requested.categorySecondary;
		this.categoryTertiary = requested.categoryTertiary;
	}
}

export default ClassData;
