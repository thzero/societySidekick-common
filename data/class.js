import GameSystemData from './gameSystem';

class ClassData extends GameSystemData {
	constructor() {
		super();
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;
	}
}

export default ClassData;
