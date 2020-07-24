import Utility from '@thzero/library_common/utility';

class CharacterInventory {
	constructor() {
		this.id = Utility.generateId();
		this.boughtScenarioId = null;
		this.item = null;
		this.quantity = 1;
		this.soldScenarioId = null;
		this.usedScenarioId = null;
		this.used = 0;
		this.value = null;
	}
}

export default CharacterInventory;
