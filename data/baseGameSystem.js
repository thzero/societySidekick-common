import NamedData from '@thzero/library_common/data/named';

class BaseGameSystemData extends NamedData {
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
}

export default BaseGameSystemData;
