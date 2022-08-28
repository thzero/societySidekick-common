import SharedConstants from '../constants.js';

import BaseGameSystemData from './baseGameSystem.js';

class CharacterData extends BaseGameSystemData {
	constructor() {
		super();

		this.boons = [];
		this.currencyBought = 0;
		this.currencyEarned = 0;
		this.currencyIncomeEarned = 0;
		this.currencySpent = 0;
		this.currencySold = 0;
		this.currencyTotal = 0;
		this.experiencePoints = 0;
		this.inventory = [];
		this.number = '';
		this.scenarios = [];
		this.status = SharedConstants.CharactersStatus.ACTIVE;
		this.tagLine = '';
	}

	init(gameSystemId, name, number, user) {
		if (!gameSystemId || !name || !number)
			return;

		this.gameSystemId = gameSystemId;
		this.name = name;
		this.number = number;
		this.status = SharedConstants.CharactersStatus.ACTIVE;
		this.userId = user.id;
	}
}

export default CharacterData;
