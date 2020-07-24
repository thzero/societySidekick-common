import Data from './index';

import UserSettings from './settingsUser';

class BaseUserData extends Data {
	constructor() {
		super();

		this.planId = null;
		this.roles = [];
		this.settings = new UserSettings();
		this.user = null;
	}

	map(requested) {
		if (!requested)
			return;

		this.planId = requested.planId;
		this.roles = requested.roles;
	}
}

export default BaseUserData;