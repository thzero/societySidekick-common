import SharedConstants from '../constants';

import BaseGameSystemData from './baseGameSystem';

class ScenarioData extends BaseGameSystemData {
	constructor() {
		super();

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

		this.repeatable = requested.repeatable;
		this.scenario = requested.scenario;
		this.season = requested.season;
		this.successResults = requested.successResults;
		this.successResultsSeparator = requested.successResultsSeparator;
		this.type = requested.type;
	}
}

export default ScenarioData;
