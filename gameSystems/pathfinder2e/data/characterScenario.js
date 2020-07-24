import Pathfinder2eSharedConstants from '../constants';

import CharacterScenario from '../../../data/characterScenario';

class Pathfinder2eCharacterScenario extends CharacterScenario {
	constructor() {
		super();

		this.achievementPointsEarned = null;
		this.achievementPointsSpent = 0;
		this.boon1Id = null;
		this.boon2Id = null;
		this.downtimePointsEarned = 0;
		this.downtimePointsSpent = 0;
		this.fameFactionId = null;
		this.fameEarned = 0;
		this.fameSpent = null;
		this.reputationFactionId = null;
		this.reputationEarned = null;
		this.reputationAdditionalFactionId = null;
		this.reputationAdditionalEarned = null;
		this.scenarioAdvancementSpeed = Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds.STANDARD;
		this.scenarioAdventure = Pathfinder2eSharedConstants.ScenarioAdventures.SCENARIO;
		this.scenarioEvent = Pathfinder2eSharedConstants.ScenarioEvents.STANDARD;
	}
}

export default Pathfinder2eCharacterScenario;
