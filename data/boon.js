import BaseGameSystemData from './baseGameSystem.js';

class BoonData extends BaseGameSystemData {
	constructor() {
		super();

		this.description = null;
		this.factionId = null;
		this.type = null;
		this.uses = 0;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.description = requested.description;
		this.factionId = requested.factionId;
		this.type = requested.type;
		this.uses = requested.uses;
	}
}

export default BoonData;
