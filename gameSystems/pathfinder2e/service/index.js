import Constants from '../../../../constants';
import SharedConstants from '../../../constants';
import Pathfinder2eSharedConstants from '../constants';

import Utility from '@thzero/library_common/utility';

import BaseGamesSystemService from '../../services/index';

import CharacterBoon from '../data/characterBoon';
import CharacterScenario from '../data/characterScenario';

class Pathfinder2eGamesSystemService extends BaseGamesSystemService {
	constructor() {
		super(SharedConstants.GameSystems.Pathfinder2e.friendlyId);
	}

	archetypeName(value, store) {
		if (!store || !value)
			return '';

		return this.archetypeNameById(value.id, store);
	}

	archetypeNameById(id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getClass(id);
		return results ? results.name : '';
	}

	archetypes(store, hasBlank) {
		if (!store || !store.state.classes.listing)
			return [];

		let results = store.state.classes.listing.filter(l => l.gameSystemId === SharedConstants.GameSystems.Pathfinder2e.id);
		results = Utility.sortByName(results.filter(l => l.type === Pathfinder2eSharedConstants.ClassTypes.ARCHETYPE), true);
		if (hasBlank)
			return Utility.selectBlank(results);

		return results;
	}

	boons(store, hasBlank) {
		return this._boons(store, hasBlank, SharedConstants.GameSystems.Pathfinder2e.id);
	}

	calculateExperiencePointLevel(experiencePoints) {
		if (experiencePoints < 4)
			return 1;
		if (experiencePoints < 10)
			return 2;
		return 3;
	}

	className(value, store) {
		if (!store || !value)
			return '';

		return this.classNameById(value.id, store);
	}

	classNameById(id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getClass(id);
		return results ? results.name : '';
	}

	classNamesAndLevels(value, store) {
		if (!store || !value)
			return '';

		const className = this.classNameById(value.classId, store);
		if (value.archetypeId) {
			const archetypeName = this.archetypeNameById(value.archetypeId, store);
			return `${className} ${archetypeName}`;
		}

		return className;
	}

	classes(store, hasBlank) {
		if (!store || !store.state.classes.listing)
			return [];

		let results = store.state.classes.listing.filter(l => l.gameSystemId === SharedConstants.GameSystems.Pathfinder2e.id);
		results = Utility.sortByName(results.filter(l => l.type === Pathfinder2eSharedConstants.ClassTypes.CLASS), true);
		if (hasBlank)
			return Utility.selectBlank(results);

		return results;
	}

	factions(store, hasBlank) {
		return this._factions(store, hasBlank, SharedConstants.GameSystems.Pathfinder2e.id);
	}

	async initializeFetches(store) {
		await this._initializeFetches(store, SharedConstants.GameSystems.Pathfinder2e.id);
	}

	initializeLookups(injector) {
		return this._initializeLookups(injector, 'pathfinder2e');
	}

	isAdventureScenario(value) {
		if (!value)
			return false;

		return value.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.SCENARIO;
	}

	scenarioLookupAdvancementSpeedName(id, lookups) {
		if (!lookups)
			return '';
		return this.lookupName(id, lookups.scenarioAdvancementSpeeds);
	}

	scenarioLookupAdventureName(id, lookups) {
		if (!lookups)
			return '';
		return this.lookupName(id, lookups.scenarioAdventures);
	}

	scenarioLookupEventName(id, lookups) {
		if (!lookups)
			return '';
		return this.lookupName(id, lookups.scenarioEvents);
	}

	scenarioName(item) {
		if (!item || !item.type)
			return '';

		if (item.type.toLowerCase() === Pathfinder2eSharedConstants.ScenarioAdventures.QUEST.toLowerCase())
			return '#' + item.scenario + ' ' + item.name;

		if (item.type.toLowerCase() === Pathfinder2eSharedConstants.ScenarioAdventures.ADVENTURE_PATH.toLowerCase()) {
			if (item.scenario)
				return '#' + item.scenario + ' ' + item.name;
			return item.name;
		}

		if (item.type.toLowerCase() === Pathfinder2eSharedConstants.ScenarioAdventures.SCENARIO.toLowerCase())
			return '#' + item.season + '-' + item.scenario + ' ' + item.name;

		return item.name;
	}

	scenarios(store, hasBlank) {
		return this._scenarios(store, hasBlank, SharedConstants.GameSystems.Pathfinder2e.id);
	}

	// eslint-disable-next-line
	_initializeCharacterBoon(character) {
		return new CharacterBoon();
	}

	// eslint-disable-next-line
	_initializeCharacterScenario(character) {
		return new CharacterScenario();
	}

	async _initializeFetchesI(fetches, store, gameSystemId) {
		if (!super._initializeFetchesI(fetches, store, gameSystemId))
			return;

		fetches.push(store.dispatcher.classes.getClassListing(gameSystemId));
	}

	_initializeLookupsI(injector, lookups, key) {
		lookups = super._initializeLookupsI(injector, lookups, key);
		if (!lookups || !injector || !key)
			return null;

		const service = injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);

		lookups.boonTypes = service._translateName(Pathfinder2eSharedConstants.BoonTypes, 'characters.gameSystems', key + '.boons.types');
		lookups.classTypes = service._translateName(Pathfinder2eSharedConstants.ClassTypes, 'characters.gameSystems', key + '.classes.types');
		lookups.equipmentCategories = service._translateName(Pathfinder2eSharedConstants.EquipmentCategories, 'characters.gameSystems', key + '.equipmentCategories.types');
		lookups.equipmentSecondaryCategories = service._translateName(Pathfinder2eSharedConstants.EquipmentSecondaryCategories, 'characters.gameSystems', key + '.equipmentSecondaryCategories.types');
		lookups.equipmentTertiaryCategories = service._translateName(Pathfinder2eSharedConstants.EquipmentTertiaryCategories, 'characters.gameSystems', key + '.equipmentTertiaryCategories.types');
		lookups.scenarioAdvancementSpeeds = service._translateName(Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds, 'characters.gameSystems', key + '.scenarios.advancementSpeeds');
		lookups.scenarioAdvancementSpeeds = lookups.scenarioAdvancementSpeeds.filter(l => l.id !== Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds.INITIAL);
		lookups.scenarioAdventures = service._translateName(Pathfinder2eSharedConstants.ScenarioAdventures, 'characters.gameSystems', key + '.scenarios.adventures');
		lookups.scenarioAdventures = lookups.scenarioAdventures.filter(l => l.id !== Pathfinder2eSharedConstants.ScenarioAdventures.INITIAL);
		lookups.scenarioEvents = service._translateName(Pathfinder2eSharedConstants.ScenarioEvents, 'characters.gameSystems', key + '.scenarios.events');
		lookups.scenarioEvents = lookups.scenarioEvents.filter(l => l.id !== Pathfinder2eSharedConstants.ScenarioEvents.INITIAL);

		return lookups;
	}
}

export default Pathfinder2eGamesSystemService;
