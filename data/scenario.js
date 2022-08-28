import SharedConstants from '../constants.js';

import BaseGameSystemData from './baseGameSystem.js';

class ScenarioData extends BaseGameSystemData {
	constructor() {
		super();

		this.description = null;
		this.repeatable = false;
		this.scenario = null;
		this.season = null;
		this.successResults = [];
		this.successResultsSeparator = ' /';
		this.type = SharedConstants.ScenarioTypes.INITIAL;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.description = requested.description;
		this.repeatable = requested.repeatable;
		this.scenario = requested.scenario;
		this.season = requested.season;
		this.successResults = requested.successResults;
		this.successResultsSeparator = requested.successResultsSeparator;
		this.type = requested.type;
	}
}

export default ScenarioData;
