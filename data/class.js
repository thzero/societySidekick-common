import GameSystemData from './gameSystem';

class ClassData extends GameSystemData {
	constructor() {
		super();

		this.level = null;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.level = requested.level;
	}
}

export default ClassData;
