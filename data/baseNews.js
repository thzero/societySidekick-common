import SharedConstants from '../constants';

import Data from './index';

class BaseNewsData extends Data {
	constructor() {
		super();

		this.article = '';
		this.gameSystemId = null;
		this.requiresAuth = false;
		this.status = SharedConstants.Status.ACTIVE;
		this.sticky = false;
		this.timestamp = null;
		this.title = '';
		this.type = SharedConstants.NewsType.MAIN;
	}

	map(requested) {
		if (!requested)
			return;

		this.article = requested.article;
		this.gameSystemId = requested.gameSystemId;
		this.requiresAuth = requested.requiresAuth;
		this.status = requested.status;
		this.sticky = false;
		this.timestamp = requested.timestamp;
		this.title = requested.title;
		this.type = requested.type;
	}
}

export default BaseNewsData;