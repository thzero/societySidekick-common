import NamedData from '@thzero/library_common/data/named';

class GameSystemData extends NamedData {
	constructor() {
		super();

		this.active = true;
		this.description = null;
		this.family = null;
		this.friendlyId = null;
		this.gameSystemId = null;
		this.genius = null;
		this.species = null;
		this.url = null;
	}

	map(requested) {
		if (!requested)
			return;

		this.active = requested.active;
		this.description = requested.description;
		this.family = requested.family;
		this.friendlyId = requested.friendlyId;
		this.gameSystemId = requested.gameSystemId;
		this.genius = requested.genius;
		this.species = requested.species;
		this.url = requested.url;
	}
}

export default GameSystemData;
