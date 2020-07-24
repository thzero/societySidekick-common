import SharedConstants from '../constants';

import Utility from '@thzero/library_common/utility';

class CharacterScenario {
	constructor() {
		this.id = Utility.generateId();
		this.currencyBought = 0;
		this.currencyEarned = null;
		this.currencyIncomeEarned = null;
		this.currencySpendable = 0;
		this.currencySpent = 0;
		this.currencySold = 0;
		this.experiencePointsEarned = 0;
		this.experiencePoints = 0;
		this.locationId = null;
		this.order = 0;
		this.scenarioId = null;
		this.scenarioParticipant = SharedConstants.ScenarioParticipants.PLAYER;
		this.scenarioStatus = SharedConstants.ScenarioStatus.INITIAL;
		this.status = SharedConstants.CharactersStatus.ACTIVE;
		this.timestamp = null;
	}
}

export default CharacterScenario;
