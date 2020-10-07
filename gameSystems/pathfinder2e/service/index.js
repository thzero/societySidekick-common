import SharedConstants from '../../../constants';

import LibraryUtility from '@thzero/library_common/utility';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import SharedGameSystemGamesSystemsService from '../../services/index';

class Pathfinder2eeGameSystemGamesSystemsService extends SharedGameSystemGamesSystemsService {
	constructor(il8n) {
		super();

		this.il8n = il8n;
	}

	boonDescription(correlationId, value, store) {
		if (!store || !value)
			return '';

		return this.boonDescriptionById(correlationId, value.id, store);
	}

	// eslint-disable-next-line
	boonDescriptionById(correlationId, id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getBoon(id);
		return results ? results.description : '';
	}

	boonName(correlationId, value, store) {
		if (!store || !value)
			return '';

		return this.boonNameById(correlationId, value.id, store);
	}

	// eslint-disable-next-line
	boonNameById(correlationId, id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getBoon(id);
		return results ? results.name : '';
	}

	// eslint-disable-next-line
	boonUses(correlationId, value, store) {
		if (!store || !value)
			return '';

		return this.boonUsesById(value.id, store);
	}

	// eslint-disable-next-line
	boonUsesById(correlationId, id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getBoon(id);
		return results ? results.uses : null;
	}

	// eslint-disable-next-line
	boons(correlationId, store, hasBlank) {
		throw new NotImplementedError();
	}

	// eslint-disable-next-line
	characterLookupStatusName(correlationId, id, lookups) {
		return lookups ? this.lookupName(correlationId, id, lookups.characterStatus) : '';
	}

	determineScenarioDescription(correlationId, value, store) {
		if (!value || !store)
			return '';

		return this.determineScenarioDescriptionById(correlationId, value.scenarioId, store);
	}

	determineScenarioDescriptionById(correlationId, id, store) {
		if (!id || !store)
			return '';

		const results = store.getters.getScenario(id);
		return this.scenarioDescription(correlationId, results);
	}

	determineScenarioName(correlationId, value, store) {
		if (!value || !store)
			return '';

		return this.determineScenarioNameById(correlationId, value.scenarioId, store);
	}

	determineScenarioNameById(correlationId, id, store) {
		if (!id || !store)
			return '';

		const results = store.getters.getScenario(id);
		return this.scenarioName(correlationId, results);
	}

	factionDescription(correlationId, value, store) {
		if (!store || !value)
			return '';

		return this.factionDescriptionById(correlationId, value.id, store);
	}

	// eslint-disable-next-line
	factionDescriptionById(correlationId, id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getFaction(id);
		return results ? results.description : '';
	}

	factionName(correlationId, value, store) {
		if (!store || !value)
			return '';

		return this.factionNameById(correlationId, value.id, store);
	}

	// eslint-disable-next-line
	factionNameById(correlationId, id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getFaction(id);
		return results ? results.name : '';
	}

	// eslint-disable-next-line
	factions(correlationId, store, hasBlank) {
		throw new NotImplementedError();
	}

	initializeCharacterBoon(correlationId, character) {
		if (!character)
			return null;

		return this._initializeCharacterBoon(correlationId, character);
	}

	initializeCharacterScenario(correlationId, character) {
		if (!character)
			return null;

		const scenario = this._initializeCharacterScenario(correlationId, character);

		if (character.scenarios) {
			const scenarios = LibraryUtility.sortByOrder(character.scenarios, true);
			const temp = scenarios && scenarios.length > 0 ? scenarios[scenarios.length - 1] : null;
			scenario.order = temp ? Number(temp.order) + 1 : 0;
		}

		return scenario;
	}

	// eslint-disable-next-line
	lookupName(correlationId, id, lookups) {
		if (!id)
			return '';

		const results = lookups.find(l => l.id == id);
		return results ? results.name : '';
	}

	// eslint-disable-next-line
	scenarioDescription(correlationId, item) {
		if (!item)
			return '';

		return item.description;
	}

	// eslint-disable-next-line
	scenarioLookupParticipantName(correlationId, id, lookups) {
		return lookups ? this.lookupName(correlationId, id, lookups.scenarioParticipants) : '';
	}

	// eslint-disable-next-line
	scenarioLookupStatusName(correlationId, id, lookups) {
		return lookups ? this.lookupName(correlationId, id, lookups.scenarioStatus) : '';
	}

	// eslint-disable-next-line
	scenarioName(correlationId, item) {
		return null;
	}

	// eslint-disable-next-line
	scenarios(correlationId, store, hasBlank) {
		throw new NotImplementedError();
	}

	// eslint-disable-next-line
	_boons(correlationId, store, hasBlank, gameSystemId) {
		if (!store || !gameSystemId || !store.state.boons.listing)
			return [];

		const results = LibraryUtility.sortByName(store.state.boons.listing.filter(l => l.gameSystemId === gameSystemId), true);
		if (hasBlank)
			return LibraryUtility.selectBlank(results);

		return results;
	}

	// eslint-disable-next-line
	_factions(correlationId, store, hasBlank, gameSystemId) {
		if (!store || !gameSystemId || !store.state.factions.listing)
			return [];

		const results = LibraryUtility.sortByName(store.state.factions.listing.filter(l => l.gameSystemId === gameSystemId), true);
		if (hasBlank)
			return LibraryUtility.selectBlank(results);

		return results;
	}

	// eslint-disable-next-line
	_initializeCharacterBoon(correlationId, character) {
		throw new NotImplementedError();
	}

	// eslint-disable-next-line
	_initializeCharacterScenario(correlationId, character) {
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

	// eslint-disable-next-line
	_scenarios(correlationId, store, hasBlank, gameSystemId) {
		if (!store || !gameSystemId)
			return [];

		const results = store.state.scenarios.listing.filter(l => l.gameSystemId == gameSystemId);
		if (hasBlank)
			return LibraryUtility.selectBlank(results);

		return results;
	}
}

export default Pathfinder2eeGameSystemGamesSystemsService;
