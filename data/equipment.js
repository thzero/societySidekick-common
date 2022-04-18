import BaseGameSystemData from './baseGameSystem';

class EquipmentData extends BaseGameSystemData {
	constructor() {
		super();

		this.description = null;
		this.gameSystemId = null;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.description = requested.description;
		this.scenario = requested.scenario;
		this.season = requested.season;
		this.type = requested.type;
	}
}

export default EquipmentData;
