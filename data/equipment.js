import GameSystemData from './gameSystem';

class EquipmentData extends GameSystemData {
	constructor() {
		super();

		this.gameSystemId = null;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.repeatable = requested.repeatable;
		this.scenario = requested.scenario;
		this.season = requested.season;
		this.type = requested.type;
	}
}

export default EquipmentData;
