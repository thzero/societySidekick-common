import NamedData from '@thzero/library_common/data/named.js';

class OrganizedPlayData extends NamedData {
	constructor() {
		super();

		this.active = true;
		this.description = null;
		this.gameSystemId = null;
		this.url = null;
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.active = requested.active;
		this.description = requested.description;
		this.gameSystemId = requested.gameSystemId;
		this.name = requested.name;
		this.url = requested.url;
	}
}

export default OrganizedPlayData;
