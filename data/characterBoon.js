import LibraryUtility from '@thzero/library_common/utility/index.js';

class CharacterBoon {
	constructor() {
		this.id = LibraryUtility.generateId();
		this.boonId = null;
		this.locationId = null;
		this.timestamp = null;
	}
}

export default CharacterBoon;
