import SharedConstants from '../../../constants';
import Starfinder1eSharedConstants from '../constants';

import CharacterData from '../../../data/character';
import Starfinder1eCharacterScenario from './characterScenario';

class Starfinder1eCharacterData extends CharacterData {
	constructor() {
		super();

		this.boonAllyId = null;
		this.boonFactionId = null;
		this.boonPersonalId = null;
		this.boonPromoId = null;
		this.boonSocialId = null;
		this.boonStarshipId = null;
		this.classId = null;
		this.factionId = null;
		this.fame = [];
		this.reputation = [];
		this.themeId = null;
	}

	init(gameSystemId, name, number, user) {
		if (!gameSystemId || !name || !number)
			return;

		super.init(gameSystemId, name, number, user);

		const scenario = new Starfinder1eCharacterScenario();
		scenario.currencyEarned = 1000;
		scenario.experiencePointsEarned = 0;
		scenario.fameEarned = 0;
		scenario.scenarioAdvancementSpeed = Starfinder1eSharedConstants.ScenarioAdvancementSpeeds.INITIAL;
		scenario.scenarioAdventure = Starfinder1eSharedConstants.ScenarioAdventures.INITIAL;
		scenario.scenarioId = Starfinder1eSharedConstants.ScenarionInitialId;
		scenario.gameSystemId = SharedConstants.GameSystems.Pathfinder2e.id;

		this.scenarios.push(scenario);
	}
}

export default Starfinder1eCharacterData;
