import Constants from '../../../constants';
import SharedConstants from '../../../common/constants';

import Utility from '@thzero/library_common/utility';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import Service from '@thzero/library/service/index';

class BaseGameSystemService extends Service {
	constructor(il8n) {
		super();

		this.il8n = il8n;
	}

	boonDescription(value, store) {
		if (!store || !value)
			return '';

		return this.boonDescriptionById(value.id, store);
	}

	boonDescriptionById(id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getBoon(id);
		return results ? results.description : '';
	}

	boonName(value, store) {
		if (!store || !value)
			return '';

		return this.boonNameById(value.id, store);
	}

	boonNameById(id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getBoon(id);
		return results ? results.name : '';
	}

	boonUses(value, store) {
		if (!store || !value)
			return '';

		return this.boonUsesById(value.id, store);
	}

	boonUsesById(id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getBoon(id);
		return results ? results.uses : null;
	}

	// eslint-disable-next-line
	boons(store, hasBlank) {
		throw new NotImplementedError();
	}

	characterLookupStatusName(id, lookups) {
		return lookups ? this.lookupName(id, lookups.characterStatus) : '';
	}

	determineScenarioDescription(value, store) {
		if (!value || !store)
			return '';

		return this.determineScenarioDescriptionById(value.scenarioId, store);
	}

	determineScenarioDescriptionById(id, store) {
		if (!id || !store)
			return '';

		const results = store.getters.getScenario(id);
		return this.scenarioDescription(results);
	}

	determineScenarioName(value, store) {
		if (!value || !store)
			return '';

		return this.determineScenarioNameById(value.scenarioId, store);
	}

	determineScenarioNameById(id, store) {
		if (!id || !store)
			return '';

		const results = store.getters.getScenario(id);
		return this.scenarioName(results);
	}

	factionDescription(value, store) {
		if (!store || !value)
			return '';

		return this.factionDescriptionById(value.id, store);
	}

	factionDescriptionById(id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getFaction(id);
		return results ? results.description : '';
	}

	factionName(value, store) {
		if (!store || !value)
			return '';

		return this.factionNameById(value.id, store);
	}

	factionNameById(id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getFaction(id);
		return results ? results.name : '';
	}

	// eslint-disable-next-line
	factions(store, hasBlank) {
		throw new NotImplementedError();
	}

	initializeCharacterBoon(character) {
		if (!character)
			return null;

		return this._initializeCharacterBoon(character);
	}

	initializeCharacterScenario(character) {
		if (!character)
			return null;

		const scenario = this._initializeCharacterScenario(character);

		if (character.scenarios) {
			const scenarios = Utility.sortByOrder(character.scenarios, true);
			const temp = scenarios && scenarios.length > 0 ? scenarios[scenarios.length - 1] : null;
			scenario.order = temp ? Number(temp.order) + 1 : 0;
		}

		return scenario;
	}

	lookupName(id, lookups) {
		if (!id)
			return '';

		const results = lookups.find(l => l.id == id);
		return results ? results.name : '';
	}

	scenarioDescription(item) {
		if (!item)
			return '';

		return item.description;
	}

	scenarioLookupParticipantName(id, lookups) {
		return lookups ? this.lookupName(id, lookups.scenarioParticipants) : '';
	}

	scenarioLookupStatusName(id, lookups) {
		return lookups ? this.lookupName(id, lookups.scenarioStatus) : '';
	}

	// eslint-disable-next-line
	scenarioName(item) {
		return null;
	}

	// eslint-disable-next-line
	scenarios(store, hasBlank) {
		throw new NotImplementedError();
	}

	_boons(store, hasBlank, gameSystemId) {
		if (!store || !gameSystemId || !store.state.boons.listing)
			return [];

		const results = Utility.sortByName(store.state.boons.listing.filter(l => l.gameSystemId === gameSystemId), true);
		if (hasBlank)
			return Utility.selectBlank(results);

		return results;
	}

	_factions(store, hasBlank, gameSystemId) {
		if (!store || !gameSystemId || !store.state.factions.listing)
			return [];

		const results = Utility.sortByName(store.state.factions.listing.filter(l => l.gameSystemId === gameSystemId), true);
		if (hasBlank)
			return Utility.selectBlank(results);

		return results;
	}

	_initializeCharacterBoon() {
		throw new NotImplementedError();
	}

	_initializeCharacterScenario() {
		throw new NotImplementedError();
	}

	async _initializeFetches(store, gameSystemId) {
		if (!store || !gameSystemId)
			return;

		let fetches = [];
		// TODO: Consider collapsing into one request...
		await this._initializeFetchesI(fetches, store, gameSystemId);
		await Promise.all(fetches);
	}


	async _initializeFetchesI(fetches, store, gameSystemId) {
		if (!fetches || !store || !gameSystemId)
			return;

		fetches.push(store.dispatcher.boons.getBoonListing(gameSystemId));
		fetches.push(store.dispatcher.factions.getFactionListing(gameSystemId));
		fetches.push(store.dispatcher.scenarios.getScenarioListing(gameSystemId));
	}

	_initializeLookups(injector, key) {
		if (!injector || !key)
			return null;
		return this._initializeLookupsI(injector, {}, key);
	}

	_initializeLookupsI(injector, lookups, key) {
		if (!injector || !lookups || !key)
			return null;

		const service = injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);

		lookups.characterStatus = service._translateName(SharedConstants.CharactersStatus, 'characters.gameSystems', key + '.status');
		lookups.scenarioParticipants = service._translateName(SharedConstants.ScenarioParticipants, 'characters.gameSystems', key + '.scenarios.participants');
		lookups.scenarioParticipants = lookups.scenarioParticipants.filter(l => l.id !== SharedConstants.ScenarioParticipants.INITIAL);
		lookups.scenarioStatus = service._translateName(SharedConstants.ScenarioStatus, 'characters.gameSystems', key + '.scenarios.statuses');

		return lookups;
	}

	_scenarios(store, hasBlank, gameSystemId) {
		if (!store || !gameSystemId)
			return [];

		const results = store.state.scenarios.listing.filter(l => l.gameSystemId == gameSystemId);
		if (hasBlank)
			return Utility.selectBlank(results);

		return results;
	}
}

export default BaseGameSystemService;
