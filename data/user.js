import BaseUserData from '@thzero/library_common/data/baseUser.js';

import UserSettings from './settingsUser.js';

class UserData extends BaseUserData {
	constructor() {
		super();
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;
	}

	_initUserSettings() {
		return new UserSettings();
	}
}

export default UserData;
