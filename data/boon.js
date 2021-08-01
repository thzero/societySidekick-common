import GameSystemData from './baseGameSystem';

class BoonData extends BaseGameSystemData {
	constructor() {
		super();

		this.factionId = null;
		this.type = null;
		this.uses = 0;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.factionId = requested.factionId;
		this.type = requested.type;
		this.uses = requested.uses;
	}
}

export default BoonData;
