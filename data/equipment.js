import BaseGameSystemData from './baseGameSystem';

class EquipmentData extends BaseGameSystemData {
	constructor() {
		super();

		this.gameSystemId = null;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.scenario = requested.scenario;
		this.season = requested.season;
		this.type = requested.type;
	}
}

export default EquipmentData;
