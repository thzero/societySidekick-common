import SharedConstants from '../../../constants';
import Pathfinder2eSharedConstants from '../constants';

import DecimalUtility from '../../../../utility/decimal';

import CharacterData from '../../../data/character';
import Pathfinder2eCharacterScenario from './characterScenario';

class Pathfinder2eCharacterData extends CharacterData {
	constructor() {
		super();

		this.achievementPoints = DecimalUtility.init(0);
		this.archetypeId = null;
		this.boonAdvancedId = null;
		this.boonFactionId = null;
		this.boonGeneric1Id = null;
		this.boonGeneric2Id = null;
		this.boonGeneric3Id = null;
		this.classId = null;
		this.factionId = null;
		this.fame = [];
		this.reputation = [];
	}

	init(gameSystemId, name, number, user) {
		if (!gameSystemId || !name || !number)
			return;

		super.init(gameSystemId, name, number, user);

		const scenario = new Pathfinder2eCharacterScenario();
		scenario.currencyEarned = 15;
		scenario.scenarioAdvancementSpeed = Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds.INITIAL;
		scenario.scenarioAdventure = Pathfinder2eSharedConstants.ScenarioAdventures.INITIAL;
		scenario.scenarioEvent = Pathfinder2eSharedConstants.ScenarioEvents.INITIAL;
		scenario.scenarioId = Pathfinder2eSharedConstants.ScenarionInitialId;
		scenario.gameSystemId = SharedConstants.GameSystems.Pathfinder2e.id;

		this.scenarios.push(scenario);
	}
}

export default Pathfinder2eCharacterData;
