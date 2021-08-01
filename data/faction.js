import BaseGameSystemData from './baseGameSystem';

class FactionData extends BaseGameSystemData {
	constructor() {
		super();
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;
	}
}

export default FactionData;
