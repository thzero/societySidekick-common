import Constants from '../../../constants.js';
import SharedConstants from '../../constants.js';

import Utility from '@thzero/library_common/utility/index.js';
import DecimalUtility from '../../utility/decimal.js';

import NotImplementedError from '@thzero/library_common/errors/notImplemented.js';

import BaseGameSystemsService from '../../../gameSystems/service/index.js';

class BaseRulesGamesSystemService extends BaseGameSystemsService {
	async init(injector) {
		await super.init(injector);

		this._serviceCharacters = this._injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
	}

	async calculateCharacter(correlationId, character, user, equipmentId) {
		if (!character)
			return this._error('BaseRulesGamesSystemService', 'calculateCharacter', 'Invalid character.', null, null, null, correlationId);

		// // eslint-disable-next-line
		// let previousGained = this._initDecimal(0)
		// // eslint-disable-next-line
		// let previousEarned = this._initDecimal(0)
		// // eslint-disable-next-line
		// let previousTotal = this._initDecimal(0)

		character.experiencePoints = this._initDecimal(0);
		character.currencyBought = this._initDecimal(0);
		character.currencyGained = this._initDecimal(0);
		character.currencyEarned = this._initDecimal(0);
		character.currencyIncomeEarned = this._initDecimal(0);
		character.currencySpent = this._initDecimal(0);
		character.currencySold = this._initDecimal(0);
		character.currencyTotal = this._initDecimal(0);

		this.calculateCharacterInit(correlationId, character);

		let inventory;
		const scenarios = Utility.sortByOrder(character.scenarios, true);
		for (const item of scenarios) {
			if (!this.calculateCharacterScenarioIgnore(correlationId, item))
				continue;

			if (item.status != SharedConstants.CharactersStatus.ACTIVE) {
				character.status = item.status;
				continue;
			}

			character.experiencePoints = this.calculateCharacterScenarioExperiencePoints(correlationId, character, item);
			item.experiencePoints = character.experiencePoints;

			item.level = null;
			if (!this.calculateCharacterScenarioInitial(correlationId, item))
				item.level = this.calculateLevel(correlationId, character.experiencePoints);

			item.currencyEarned = this._initDecimal(item.currencyEarned);
			character.currencyEarned = character.currencyEarned.plus(item.currencyEarned);
			character.currencyGained = character.currencyGained.plus(item.currencyEarned);
			character.currencyTotal = character.currencyTotal.plus(item.currencyEarned);

			item.currencyGained = item.currencyEarned;
			item.currencyTotal = character.currencyTotal;
			this.calcualteCharacterScenarioCurrency(correlationId, character, item);
			if (item.currencySpent) {
				character.currencySpent = character.currencySpent.plus(item.currencySpent);
				character.currencyTotal = character.currencyTotal.minus(item.currencySpent);
				item.currencyTotal = item.currencyTotal.minus(item.currencySpent);
			}

			item.currencyBought = this._initDecimal(0);
			item.currencySold = this._initDecimal(0);

			if (character.inventory) {
				inventory = character.inventory.filter(l => l.boughtScenarioId === item.id);
				for (const inventoryItem of inventory) {
					if (inventoryItem.id === equipmentId)
						continue;

					inventoryItem.total = this.calculateItemTotal(correlationId, inventoryItem.quantity, inventoryItem.value);
					item.currencyBought = item.currencyBought.plus(inventoryItem.total);
					item.currencyTotal = item.currencyTotal.minus(inventoryItem.total);
					character.currencyBought = character.currencyBought.plus(inventoryItem.total);
					character.currencyTotal = character.currencyTotal.minus(inventoryItem.total);
				}

				inventory = character.inventory.filter(l => l.soldScenarioId === item.id);
				for (const inventoryItem of inventory) {
					if (inventoryItem.id === equipmentId)
						continue;

					const currencySold = this._initDecimal(this.calculateItemTotal(correlationId, inventoryItem.quantity, inventoryItem.value)) * 0.5;
					item.currencyGained = item.currencyGained.plus(item.currencySold);
					item.currencySold = item.currencySold.plus(inventoryItem.total);
					item.currencyTotal = item.currencyTotal.plus(currencySold);
					character.currencyTotal = character.currencyTotal.plus(currencySold);
					character.currencySold = character.currencySold.plus(currencySold);
					character.currencyGained = character.currencyGained.plus(currencySold);
				}
			}

			item.currencyTotal = this._toFixed(item.currencyTotal, this._decimalCurrencyFixed());
			item.currencyBought = this._toFixed(item.currencyBought, this._decimalCurrencyFixed());
			item.currencyEarned = this._toFixed(item.currencyEarned, this._decimalCurrencyFixed());
			item.currencyGained = this._toFixed(item.currencyGained, this._decimalCurrencyFixed());
			item.currencySold = this._toFixed(item.currencySold, this._decimalCurrencyFixed());
			item.currencySpendable = this._toFixed(character.currencyTotal, this._decimalCurrencyFixed());
			item.experiencePoints = this._toFixed(character.experiencePoints, 1);

			// previousGained = character.currencyGained
			// previousEarned = character.currencyEarned
			// previousTotal = character.currencyTotal

			this.calculateCharacterScenarioAdditional(correlationId, character, item);
		}

		character.experiencePoints = this._toFixed(character.experiencePoints, 1);
		character.experiencePointsToNextLevel = this.calculateExperienceToNextLevel(correlationId, character.experiencePoints);
		character.currencyBought = this._toFixed(character.currencyBought, this._decimalCurrencyFixed());
		character.currencyEarned = this._toFixed(character.currencyEarned, this._decimalCurrencyFixed());
		character.currencyIncomeEarned = this._toFixed(character.currencyIncomeEarned, this._decimalCurrencyFixed());
		character.currencyGained = this._toFixed(character.currencyGained, this._decimalCurrencyFixed());
		character.currencySpent = this._toFixed(character.currencySpent, this._decimalCurrencyFixed());
		character.currencySold = this._toFixed(character.currencySold, this._decimalCurrencyFixed());
		character.currencyTotal = this._toFixed(character.currencyTotal, this._decimalCurrencyFixed());

		character.level = this.calculateLevel(correlationId, character.experiencePoints);

		await this.calculateCharacterAdditional(correlationId, character, user);

		await this.calculateCharacterCleanup(correlationId, character, user);

		return this._success(correlationId);
	}

	// eslint-disable-next-line
	async calculateCharacterAdditional(correlationId, character, user) {
	}

	// eslint-disable-next-line
	async calculateCharacterCleanup(correlationId, character, user) {
	}

	calculateCharacterCurrencyCurrent(correlationId, character, value) {
		if (!character || !character.currencyTotal)
			return 0;

		return this._toFixed(this._initDecimal(character.currencyTotal).minus(value ? value : 0), this._decimalCurrencyFixed());
	}

	calculateCharacterCurrencyScenario(correlationId, scenario, value) {
		if (!scenario || !scenario.currencySpendable)
			return 0;

		return this._toFixed(this._initDecimal(scenario.currencySpendable).minus(value ? value : 0), this._decimalCurrencyFixed());
	}

	// eslint-disable-next-line
	calculateCharacterInit(correlationId, character) {
	}

	// eslint-disable-next-line
	calculateCharacterScenarioAdditional(correlationId, character, item) {
	}

	// eslint-disable-next-line
	calcualteCharacterScenarioCurrency(correlationId, character, item) {
		if (!item.currencyIncomeEarned)
			return;

		character.currencyIncomeEarned = character.currencyIncomeEarned.plus(item.currencyIncomeEarned);
		character.currencyGained = character.currencyGained.plus(item.currencyIncomeEarned);
		character.currencyTotal = character.currencyTotal.plus(item.currencyIncomeEarned);
		item.currencyGained = item.currencyGained.plus(item.currencyIncomeEarned);
		item.currencyTotal = item.currencyTotal.plus(item.currencyIncomeEarned);
	}

	calculateCharacterScenarioExperiencePoints(correlationId, character, item) {
		return character.experiencePoints.plus(item.experiencePointsEarned);
	}

	// eslint-disable-next-line
	calculateCharacterScenarioIgnore(correlationId, item) {
		return false;
	}

	// eslint-disable-next-line
	calculateCharacterScenarioInitial(correlationId, item) {
		return false;
	}

	// eslint-disable-next-line
	calculateItemTotal(correlationId, quantity, value) {
		if (!quantity || !value)
			return 0;

		return this._initDecimal(quantity) * value;
	}

	calculateItemTotalFixed(correlationId, quantity, value) {
		return this._toFixed(this._initDecimal(this.calculateItemTotal(correlationId, quantity, value)), this._decimalCurrencyFixed());
	}

	// eslint-disable-next-line
	calculateLevel(correlationId, experiencePoints) {
		throw new NotImplementedError();
	}

	// eslint-disable-next-line
	calculateScenario(correlationId, scenario) {
	}

	// eslint-disable-next-line
	calculateScenarioExperiencePointsEarned(correlationId, scenario) {
		throw new NotImplementedError();
	}

	clean(value) {
		if (value === null || value === undefined)
			return null;
		if (value === '')
			return null;
		return String.trim(value);
	}

	cleanDecimal(value) {
		return DecimalUtility.clean(value, this._decimalFixed());
	}

	// eslint-disable-next-line
	isAdventureScenario(correlationId, scenario) {
		return false;
	}

	_decimalFixed() {
		return 2;
	}

	_decimalCurrencyFixed() {
		return 2;
	}

	_initDecimal(value) {
		return DecimalUtility.init(value ? value : 0);
	}

	_toFixed(value, places) {
		return DecimalUtility.toFixed(value, places);
	}
}

export default BaseRulesGamesSystemService;
