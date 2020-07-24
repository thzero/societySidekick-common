import SharedConstants from '../constants';

import GameSystemData from './gameSystem';

class ScenarioData extends GameSystemData {
	constructor() {
		super();

		this.repeatable = false;
		this.scenario = null;
		this.season = null;
		this.type = SharedConstants.ScenarioTypes.INITIAL;
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

export default ScenarioData;
