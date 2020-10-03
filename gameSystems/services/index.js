import SharedConstants from '../../../common/constants';

import LibraryUtility from '@thzero/library_common/utility';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import BaseGameSystemGamesSystemsService from '../../../gameSystems/service/index';

class SharedGameSystemGamesSystemsService extends BaseGameSystemGamesSystemsService {
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
			const scenarios = LibraryUtility.sortByOrder(character.scenarios, true);
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

		const results = LibraryUtility.sortByName(store.state.boons.listing.filter(l => l.gameSystemId === gameSystemId), true);
		if (hasBlank)
			return LibraryUtility.selectBlank(results);

		return results;
	}

	_factions(store, hasBlank, gameSystemId) {
		if (!store || !gameSystemId || !store.state.factions.listing)
			return [];

		const results = LibraryUtility.sortByName(store.state.factions.listing.filter(l => l.gameSystemId === gameSystemId), true);
		if (hasBlank)
			return LibraryUtility.selectBlank(results);

		return results;
	}

	_initializeCharacterBoon() {
		throw new NotImplementedError();
	}

	_initializeCharacterScenario() {
		throw new NotImplementedError();
	}

	async _initializeFetches(correlationId, store, gameSystemId) {
		if (!store || !gameSystemId)
			return;

		let fetches = [];
		// TODO: Consider collapsing into one request...
		await this._initializeFetchesI(correlationId, fetches, store, gameSystemId);
		await Promise.all(fetches);
	}


	async _initializeFetchesI(correlationId, fetches, store, gameSystemId) {
		if (!fetches || !store || !gameSystemId)
			return;

		fetches.push(store.dispatcher.boons.getBoonListing(correlationId, gameSystemId));
		fetches.push(store.dispatcher.factions.getFactionListing(correlationId, gameSystemId));
		fetches.push(store.dispatcher.scenarios.getScenarioListing(correlationId, gameSystemId));
	}

	_initializeLookups(correlationId, injector, key) {
		if (!injector || !key)
			return null;
		return this._initializeLookupsI(correlationId, injector, {}, key);
	}

	_initializeLookupsI(correlationId, injector, lookups, key) {
		if (!injector || !lookups || !key)
			return null;

		lookups.characterStatus = this._translateName(correlationId, SharedConstants.CharactersStatus, 'characters.gameSystems', key + '.status');
		lookups.scenarioParticipants = this._translateName(correlationId, SharedConstants.ScenarioParticipants, 'characters.gameSystems', key + '.scenarios.participants');
		lookups.scenarioParticipants = lookups.scenarioParticipants.filter(l => l.id !== SharedConstants.ScenarioParticipants.INITIAL);
		lookups.scenarioStatus = this._translateName(correlationId, SharedConstants.ScenarioStatus, 'characters.gameSystems', key + '.scenarios.statuses');

		return lookups;
	}

	_scenarios(store, hasBlank, gameSystemId) {
		if (!store || !gameSystemId)
			return [];

		const results = store.state.scenarios.listing.filter(l => l.gameSystemId == gameSystemId);
		if (hasBlank)
			return LibraryUtility.selectBlank(results);

		return results;
	}
}

export default SharedGameSystemGamesSystemsService;
