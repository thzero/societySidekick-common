import BaseGameSystemData from './baseGameSystem';

class ClassData extends BaseGameSystemData {
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
