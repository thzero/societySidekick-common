import Starfinder1eSharedConstants from '../constants.js';

import CharacterScenario from '../../../data/characterScenario.js';

class Starfinder1eCharacterScenario extends CharacterScenario {
	constructor() {
		super();

		this.boon1Id = null;
		this.boon2Id = null;
		this.classId = null;
		this.experiencePointsEarned = 1;
		this.fameFactionId = null;
		this.fameEarned = 2;
		this.fameSpent = null;
		this.reputationEarned = 2;
		this.reputationSpent = null;
		this.scenarioAdvancementSpeed = Starfinder1eSharedConstants.ScenarioAdvancementSpeeds.STANDARD;
	}
}

export default Starfinder1eCharacterScenario;
