import SharedConstants from '../constants';

import BaseNewsData from '@thzero/library_common/data/baseNews';

class NewsData extends BaseNewsData {
	constructor() {
		super();

		this.gameSystemId = null;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.gameSystemId = requested.gameSystemId;
	}

	_defaultStatus() {
		return SharedConstants.Status.ACTIVE;
	}

	_defaultType() {
		return SharedConstants.NewsTypes.MAIN;
	}
}

export default NewsData;
