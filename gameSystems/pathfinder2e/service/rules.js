import SharedConstants from '../../../constants';
import Pathfinder2eSharedConstants from '../constants';

import SettingsGameSystem from '../../../data/settingsGameSystem';

import BaseRulesGamesSystemsService from '../../services/baseRules';

class Pathfinder2eRulesGamesSystemsService extends BaseRulesGamesSystemsService {
	static GoldFixed = 2;

	// eslint-disable-next-line
	async calculateCharacterAdditional(correlationId, character, user) {
		let fameTotalEarned = this._initDecimal(0);
		let fameTotalSpent = this._initDecimal(0);
		character.fame.forEach((item) => {
			item.remaining = this._toFixed(item.earned.minus(item.spent), 1);
			item.earned = this._toFixed(item.earned, 1);
			fameTotalEarned = fameTotalEarned.plus(item.earned);
			item.spent = this._toFixed(item.spent, 1);
			fameTotalSpent = fameTotalSpent.plus(item.spent);
		});
		let fameTotalRemaining = fameTotalEarned.minus(fameTotalSpent);
		character.fame.push({
			earned: this._toFixed(fameTotalEarned, 1),
			spent: this._toFixed(fameTotalSpent, 1),
			remaining: this._toFixed(fameTotalRemaining, 1)
		});

		character.reputation.forEach((item) => {
			item.earned = this._toFixed(item.earned, 1);
		});

		if (user) {
			const gameSystemId = SharedConstants.GameSystems.Pathfinder2e.id;
			let settingsGameSystem = user.settings.gameSystems.find(l => l.id === gameSystemId);
			if (!settingsGameSystem)
				settingsGameSystem = new SettingsGameSystem(gameSystemId);

			let achievementPoints = this._initDecimal(character.achievementPoints);
			const response = await this._serviceCharacters.listing(null, user, gameSystemId);
			if (response.success) {
				for(const temp of response.results.data) {
					if (temp.id === character.id)
						continue;
					if (!temp.achievementPoints)
						continue;
					achievementPoints = achievementPoints.plus(temp.achievementPoints);
				}
				settingsGameSystem.achievementPoints = this._toFixed(achievementPoints, 0);
			}
		}

		character.achievementPoints = this._toFixed(character.achievementPoints, 0);
	}

	// eslint-disable-next-line
	async calculateCharacterCleanup(correlationId, character, user) {
		delete character.factionF;
		delete character.factionR;
	}

	// eslint-disable-next-line
	calculateCharacterInit(correlationId, character) {
		character.achievementPoints = this._initDecimal(0);
		character.factionF = null;
		character.factionR = null;
		character.fame = [];
		character.reputation = [];
	}

	// eslint-disable-next-line
	calculateCharacterScenarioAdditional(correlationId, character, item) {
		if (item.achievementPointsEarned)
			character.achievementPoints = character.achievementPoints.plus(item.achievementPointsEarned);

		if (item.fameFactionId && (item.fameEarned || item.fameSpent)) {
			character.factionF = character.fame.find(l => l.id == item.fameFactionId);
			if (!character.factionF) {
				character.factionF = { id: item.fameFactionId, earned: this._initDecimal(0), spent: this._initDecimal(0) };
				character.fame.push(character.factionF);
			}
			character.factionF.earned = character.factionF.earned.plus(item.fameEarned);
			if (item.fameSpent)
				character.factionF.spent = character.factionF.spent.plus(item.fameSpent);
		}

		if (item.reputationFactionId && item.reputationEarned) {
			character.factionR = character.reputation.find(l => l.id == item.reputationFactionId);
			if (!character.factionR) {
				character.factionR = { id: item.reputationFactionId, earned: this._initDecimal(0) };
				character.reputation.push(character.factionR);
			}
			character.factionR.earned = character.factionR.earned.plus(item.reputationEarned);
		}

		if (item.reputationAdditionalFactionId && item.reputationAdditionalEarned) {
			character.factionR = character.reputation.find(l => l.id == item.reputationAdditionalFactionId);
			if (!character.factionR) {
				character.factionR = { id: item.reputationAdditionalFactionId, earned: this._initDecimal(0) };
				character.reputation.push(character.factionR);
			}
			character.factionR.earned = character.factionR.earned.plus(item.reputationAdditionalEarned);
		}
	}

	// eslint-disable-next-line
	calculateCharacterScenarioExperiencePoints(correlationId, character, item) {
		return character.experiencePoints.plus(item.experiencePointsEarned);
	}

	// eslint-disable-next-line
	calculateCharacterScenarioIgnore(correlationId, item) {
		if (item.scenarioStatus === SharedConstants.ScenarioStatus.IGNORE)
			return false;
		if (item.scenarioStatus === SharedConstants.ScenarioStatus.REPEATED)
			return false;
		return true;
	}

	// eslint-disable-next-line
	calculateCharacterScenarioInitial(correlationId, item) {
		return (item.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.INITIAL);
	}

	// eslint-disable-next-line
	calculateExperienceToNextLevel(correlationId, experiencePoints) {
		const remainder = 12 - experiencePoints % 12;
		return remainder;
	}

	// eslint-disable-next-line
	calculateLevel(correlationId, experiencePoints) {
		const level = Math.floor(experiencePoints / 12);
		return 1 + level;
	}

	calculateScenario(correlationId, scenario) {
		scenario.achievementPointsEarned = this.calculateScenarioAchievementPointsEarned(correlationId, scenario);
		scenario.downtimePointsEarned = this.calculateScenarioDowntimePointsEarned(correlationId, scenario);
		scenario.experiencePointsEarned = this.calculateScenarioExperiencePointsEarned(correlationId, scenario);
		scenario.fameEarned = this.calculateScenarioFameEarned(scenario);
	}

	// eslint-disable-next-line
	calculateScenarioAchievementPointsEarned(correlationId, scenario) {
		if (!scenario)
			return 0;

		const value = Pathfinder2eSharedConstants.AdvancementPoints.find(l =>
			l.adventure === scenario.scenarioAdventure &&
			l.participant === scenario.scenarioParticipant &&
			l.event === scenario.scenarioEvent);

		return value ? value.earned : 0;
	}

	// eslint-disable-next-line
	calculateScenarioDowntimePointsEarned(correlationId, scenario) {
		if (!scenario)
			return 0;

		let value = 0;
		if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE)
			value = 0;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE_PATH)
		value = 24;
	else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.MODULE)
			value = 0;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.QUEST)
			value = 2;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.SCENARIO)
			value = 8;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ACHIEVEMENT_POINTS)
			value = 0;

		if (scenario.scenarioAdvancementSpeed === Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds.SLOW)
			value = value / 2;

		return value;
	}

	// eslint-disable-next-line
	calculateScenarioExperiencePointsEarned(correlationId, scenario) {
		if (!scenario)
			return 0;

		let value = 0;
		if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.QUEST)
			value = 1;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.SCENARIO)
			value = 4;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE)
			value = 0;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE_PATH)
			value = 12;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ACHIEVEMENT_POINTS)
			value = 12;

		// Not doing this here because this is usually already taken into account when
		// the paper scenario sheet is created
		// if (scenario.scenarioAdvancementSpeed === Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds.SLOW)
		// 	value = value / 2

		return value;
	}

	// eslint-disable-next-line
	calculateScenarioFameEarned(correlationId, scenario) {
		if (!scenario)
			return 0;

		let value = 0;
		if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.QUEST)
			value = 1;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.SCENARIO)
			value = 4;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE)
			value = 0;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE_PATH)
			value = 12;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ACHIEVEMENT_POINTS)
			value = 12;

		// Not doing this here because this is usually already taken into account when
		// the paper scenario sheet is created
		// if (scenario.scenarioAdvancementSpeed === Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds.SLOW)
		// 	value = value / 2

		return value;
	}

	// eslint-disable-next-line
	calculateScenarioReputationEarned(correlationId, scenario) {
		if (!scenario)
			return 0;

		let value = 0;
		if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.QUEST)
			value = 1;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.SCENARIO)
			value = 4;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE)
			value = 0;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE_PATH)
			value = 12;
		else if (scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ACHIEVEMENT_POINTS)
			value = 12;

		// Not doing this here because this is usually already taken into account when
		// the paper scenario sheet is created
		// if (scenario.scenarioAdvancementSpeed === Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds.SLOW)
		// 	value = value / 2

		return value;
	}

	// eslint-disable-next-line
	isAchievementPointsEarnedReadOnly(correlationId, scenario) {
		if (!scenario)
			return false;

		return !(
			(scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE) ||
			(scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.MODULE)
		);
	}

	// eslint-disable-next-line
	isAdventureScenario(correlationId, scenario) {
		if (!scenario)
			return false;

		return !(
			(scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE) ||
			(scenario.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.MODULE)
		);
	}

	// eslint-disable-next-line
	isDowntimePointsReadOnly(correlationId, scenario) {
		if (!scenario)
			return false;

		return scenario.scenarioAdventure !== Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE;
	}

	_decimalFixed() {
		return Pathfinder2eRulesGamesSystemsService.GoldFixed;
	}

	_decimalCurrencyFixed() {
		return Pathfinder2eRulesGamesSystemsService.GoldFixed;
	}
}

export default Pathfinder2eRulesGamesSystemsService;
