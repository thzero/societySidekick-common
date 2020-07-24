import SharedConstants from '../../../constants';
import Starfinder1eSharedConstants from '../constants';

import BaseRulesGamesSystemService from '../../services/baseRules';

class Starfinder1eRulesGamesSystemService extends BaseRulesGamesSystemService {
	static CurrencyFixed = 2;

	async calculateCharacterAdditional(character) {
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
			item.spent = this._toFixed(item.spent, 1);
		});
	}

	async calculateCharacterCleanup(character) {
		delete character.class;
		delete character.factionF;
		character.reputationEarned = this._toFixed(character.reputationEarned, 1);
	}

	calculateCharacterInit(character) {
		character.class = null;
		character.classes = [];
		character.factionF = null;
		character.fame = [];
		character.reputationEarned = this._initDecimal(0);
	}

	calculateCharacterScenarioAdditional(character, item) {
		if (item.fameFactionId && (item.fameEarned || item.fameSpent)) {
			character.factionF = character.fame.find(l => l.id == item.fameFactionId);
			if (!character.factionF) {
				character.factionF = { id: item.fameFactionId, earned: this._initDecimal(0), spent: this._initDecimal(0) };
				character.fame.push(character.factionF);
			}
			character.factionF.earned = character.factionF.earned.plus(item.fameEarned);
			character.reputationEarned = character.reputationEarned.plus(item.fameEarned);
			if (item.fameSpent)
				character.factionF.spent = character.factionF.spent.plus(item.fameSpent);
		}

		if (item.classId) {
			character.class = character.classes.find(l => l.id == item.classId);
			if (!character.class) {
				character.class = { id: item.classId, level: 0 };
				character.classes.push(character.class);
			}
			character.class.level = character.class.level + 1;
		}
	}

	// eslint-disable-next-line
	calculateCharacterScenarioCanSelectClass(character, scenario, experiencePointsEarned) {
		if (!character || !character.scenarios)
			return false;

		if (this.calculateCharacterScenarioInitial(scenario))
			return false;

		const order = Number(scenario.order);
		if (order === 1)
			return true;

		let previousScenario = character.scenarios.find(l => l.order === (order - 1));
		if (previousScenario) {
			const xp = previousScenario.experiencePoints + scenario.experiencePointsEarned;
			const level = this.calculateLevel(xp);
			return level > previousScenario.level;
		}

		return false;
	}

	calculateCharacterScenarioExperiencePoints(character, item) {
		return character.experiencePoints.plus(item.experiencePointsEarned);
	}

	calculateCharacterScenarioIgnore(item) {
		if (item.scenarioStatus === SharedConstants.ScenarioStatus.IGNORE)
			return false;
		if (item.scenarioStatus === SharedConstants.ScenarioStatus.REPEATED)
			return false;
		return true;
	}

	calculateCharacterScenarioInitial(item) {
		return (item.scenarioAdventure === Starfinder1eSharedConstants.ScenarioAdventures.INITIAL);
	}

	calculateExperienceToNextLevel(experiencePoints) {
		const remainder = 3 - experiencePoints % 3;
		return remainder;
	}

	calculateLevel(experiencePoints) {
		const level = Math.floor(experiencePoints / 3);
		return 1 + level;
	}

	// eslint-disable-next-line
	calculateScenario(scenario) {
	}

	_decimalFixed() {
		return Starfinder1eRulesGamesSystemService.CurrencyFixed;
	}

	_decimalCurrencyFixed() {
		return Starfinder1eRulesGamesSystemService.CurrencyFixed;
	}
}

export default Starfinder1eRulesGamesSystemService;
