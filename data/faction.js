import BaseGameSystemData from './baseGameSystem.js';

class FactionData extends BaseGameSystemData {
	constructor() {
		super();

		this.description = null;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.description = requested.description;
	}
}

export default FactionData;
