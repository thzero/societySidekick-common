import SharedConstants from '../../../constants.js';
import Starfinder1eSharedConstants from '../constants.js';

import LibraryUtility from '@thzero/library_common/utility';

import SharedGameSystemGamesSystemsService from '../../services/index.js';

import CharacterBoon from '../data/characterBoon.js';
import CharacterScenario from '../data/characterScenario.js';

class Starfinder1eGameSystemGamesSystemsService extends SharedGameSystemGamesSystemsService {
	constructor() {
		super(SharedConstants.GameSystems.Starfinder1e.friendlyId);
	}

	boons(correlationId, store, hasBlank) {
		return this._boons(correlationId, store, hasBlank, SharedConstants.GameSystems.Starfinder1e.id);
	}

	// eslint-disable-next-line
	calculateExperiencePointLevel(correlationId, experiencePoints) {
		if (experiencePoints <=1)
			return 1;
		if (experiencePoints <= 2)
			return 2;
		return 3;
	}

	className(correlationId, value, store) {
		if (!store || !value)
			return '';

		return this.classNameById(correlationId, value.id, store);
	}

	// eslint-disable-next-line
	classNameById(correlationId, id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getClass(id);
		return results ? results.name : '';
	}

	classNamesAndLevels(correlationId, value, store) {
		if (!store || !value || !value.classes)
			return '';

		let classNames = [];
		let temp;
		for (const clazz of value.classes) {
			temp = this.classNameById(correlationId, clazz.id, store);
			classNames.push(`${temp} / ${clazz.level}`);
		}

		let results = classNames.join(', ');

		if (value.themeId) {
			const themeName = this.themeNameById(value.themeId, store);
			return `${results} ${themeName}`;
		}

		return results;
	}

	// eslint-disable-next-line
	classes(correlationId, store, hasBlank) {
		if (!store || !store.state.classes.listing)
			return [];

		let results = store.state.classes.listing.filter(l => l.gameSystemId === SharedConstants.GameSystems.Starfinder1e.id);
		results = LibraryUtility.sortByName(results.filter(l => l.type === Starfinder1eSharedConstants.ClassTypes.CLASS), true);
		if (hasBlank)
			return LibraryUtility.selectBlank(results);

		return results;
	}

	factions(correlationId, store, hasBlank) {
		return this._factions(correlationId, store, hasBlank, SharedConstants.GameSystems.Starfinder1e.id);
	}

	async initializeFetches(correlationId, store) {
		await this._initializeFetches(correlationId, store, SharedConstants.GameSystems.Starfinder1e.id);
	}

	initializeLookups(correlationId, injector) {
		return this._initializeLookups(correlationId, injector, 'starfinder1e');
	}

	scenarioLookupAdvancementSpeedName(correlationId, id, lookups) {
		if (!lookups)
			return '';
		return this.lookupName(correlationId, id, lookups.scenarioAdvancementSpeeds);
	}

	scenarioLookupAdventureName(correlationId, id, lookups) {
		if (!lookups)
			return '';
		return this.lookupName(correlationId, id, lookups.scenarioAdventures);
	}

	scenarioName(correlationId, item) {
		if (!item || !item.type)
			return '';

		if (
				(item.type.toLowerCase() === Starfinder1eSharedConstants.ScenarioAdventures.ADVENTURE.toLowerCase()) ||
				(item.type.toLowerCase() === Starfinder1eSharedConstants.ScenarioAdventures.MODULE.toLowerCase())
			) {
			return item.name;
		}

		if (item.type.toLowerCase() === Starfinder1eSharedConstants.ScenarioAdventures.ADVENTURE_PATH.toLowerCase()) {
			if (item.scenario)
				return '#' + item.scenario + ' ' + item.name;
			return item.name;
		}

		if (item.type.toLowerCase() === Starfinder1eSharedConstants.ScenarioAdventures.QUEST.toLowerCase())
			return '#' + item.scenario + ' ' + item.name;

		if (item.type.toLowerCase() === Starfinder1eSharedConstants.ScenarioAdventures.SCENARIO.toLowerCase())
			return '#' + item.season + '-' + item.scenario + ' ' + item.name;

		return item.name;
	}

	scenarios(correlationId, store, hasBlank) {
		return this._scenarios(correlationId, store, hasBlank, SharedConstants.GameSystems.Starfinder1e.id);
	}

	themeName(value, store) {
		if (!store || !value)
			return '';

		return this.themeNameById(value.id, store);
	}

	themeNameById(id, store) {
		if (!store || !id)
			return '';

		const results = store.getters.getClass(id);
		return results ? results.name : '';
	}

	// eslint-disable-next-lin
	themes(correlationId, store, hasBlank) {
		if (!store || !store.state.classes.listing)
			return [];

		let results = store.state.classes.listing.filter(l => l.gameSystemId === SharedConstants.GameSystems.Starfinder1e.id);
		results = LibraryUtility.sortByName(results.filter(l => l.type === Starfinder1eSharedConstants.ClassTypes.THEME), true);
		if (hasBlank)
			return LibraryUtility.selectBlank(results);

		return results;
	}

	// eslint-disable-next-line
	_initializeCharacterBoon(correlationId, character) {
		return new CharacterBoon();
	}

	// eslint-disable-next-line
	_initializeCharacterScenario(correlationId, character) {
		const scenario = new CharacterScenario();

		if (character && character.scenarios) {
			const scenarios = LibraryUtility.sortByOrder(character.scenarios, true);
			const temp = scenarios && scenarios.length > 0 ? scenarios[scenarios.length - 1] : null;
			scenario.classId = temp ? temp.classId : null;
		}

		return scenario;
	}

	async _initializeFetchesI(correlationId, fetches, store, gameSystemId) {
		if (!super._initializeFetchesI(correlationId, fetches, store, gameSystemId))
			return;

		fetches.push(store.dispatcher.classes.getClassListing(correlationId, gameSystemId));
	}

	_initializeLookupsI(correlactionId, injector, lookups, key) {
		lookups = super._initializeLookupsI(correlactionId, injector, lookups, key);
		if (!lookups || !injector || !key)
			return null;

		lookups.boonTypes = this._translateName(correlactionId, Starfinder1eSharedConstants.BoonTypes, 'characters.gameSystems', key + '.boons.types');
		lookups.classTypes = this._translateName(correlactionId, Starfinder1eSharedConstants.ClassTypes, 'characters.gameSystems', key + '.classes.types');
		lookups.equipmentCategories = this._translateName(correlactionId, Starfinder1eSharedConstants.EquipmentCategories, 'characters.gameSystems', key + '.equipmentCategories');
		lookups.equipmentSecondaryCategories = this._translateName(correlactionId, Starfinder1eSharedConstants.EquipmentSecondaryCategories, 'characters.gameSystems', key + '.equipmentSecondaryCategories');
		lookups.equipmentTertiaryCategories = this._translateName(correlactionId, Starfinder1eSharedConstants.EquipmentTertiaryCategories, 'characters.gameSystems', key + '.equipmentTertiaryCategories');
		lookups.scenarioAdvancementSpeeds = this._translateName(correlactionId, Starfinder1eSharedConstants.ScenarioAdvancementSpeeds, 'characters.gameSystems', key + '.scenarios.advancementSpeeds');
		lookups.scenarioAdvancementSpeeds = lookups.scenarioAdvancementSpeeds.filter(l => l.id !== Starfinder1eSharedConstants.ScenarioAdvancementSpeeds.INITIAL);
		lookups.scenarioAdventures = this._translateName(correlactionId, Starfinder1eSharedConstants.ScenarioAdventures, 'characters.gameSystems', key + '.scenarios.adventures');
		lookups.scenarioAdventures = lookups.scenarioAdventures.filter(l => l.id !== Starfinder1eSharedConstants.ScenarioAdventures.INITIAL);
		return lookups;
	}
}

export default Starfinder1eGameSystemGamesSystemsService;
