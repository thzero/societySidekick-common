import GameSystemData from './gameSystem';

class FactionData extends GameSystemData {
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
