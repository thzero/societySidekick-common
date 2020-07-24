import Constants from '../../../../constants';
import SharedConstants from '../../../constants';
import Starfinder1eSharedConstants from '../constants';

import Utility from '@thzero/library_common/utility';

import BaseGamesSystemService from '../../services/index';

import CharacterBoon from '../data/characterBoon';
import CharacterScenario from '../data/characterScenario';

class Starfinder1eGamesSystemService extends BaseGamesSystemService {
	constructor() {
		super(SharedConstants.GameSystems.Starfinder1e.friendlyId);
	}

	boons(store, hasBlank) {
		return this._boons(store, hasBlank, SharedConstants.GameSystems.Starfinder1e.id);
	}

	calculateExperiencePointLevel(experiencePoints) {
		if (experiencePoints <=1)
			return 1;
		if (experiencePoints <= 2)
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
		if (!store || !value || !value.classes)
			return '';

		let classNames = [];
		let temp;
		for (const clazz of value.classes) {
			temp = this.classNameById(clazz.id, store);
			classNames.push(`${temp} / ${clazz.level}`);
		}

		let results = classNames.join(', ');

		if (value.themeId) {
			const themeName = this.themeNameById(value.themeId, store);
			return `${results} ${themeName}`;
		}

		return results;
	}

	classes(store, hasBlank) {
		if (!store || !store.state.classes.listing)
			return [];

		let results = store.state.classes.listing.filter(l => l.gameSystemId === SharedConstants.GameSystems.Starfinder1e.id);
		results = Utility.sortByName(results.filter(l => l.type === Starfinder1eSharedConstants.ClassTypes.CLASS), true);
		if (hasBlank)
			return Utility.selectBlank(results);

		return results;
	}

	factions(store, hasBlank) {
		return this._factions(store, hasBlank, SharedConstants.GameSystems.Starfinder1e.id);
	}

	async initializeFetches(store) {
		await this._initializeFetches(store, SharedConstants.GameSystems.Starfinder1e.id);
	}

	initializeLookups(injector) {
		return this._initializeLookups(injector, 'starfinder1e');
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

	scenarioName(item) {
		if (!item || !item.type)
			return '';

		if (item.type.toLowerCase() === Starfinder1eSharedConstants.ScenarioAdventures.QUEST.toLowerCase())
			return '#' + item.scenario + ' ' + item.name;

		if (item.type.toLowerCase() === Starfinder1eSharedConstants.ScenarioAdventures.ADVENTURE_PATH.toLowerCase()) {
			if (item.scenario)
				return '#' + item.scenario + ' ' + item.name;
			return item.name;
		}

		if (item.type.toLowerCase() === Starfinder1eSharedConstants.ScenarioAdventures.SCENARIO.toLowerCase())
			return '#' + item.season + '-' + item.scenario + ' ' + item.name;

		return item.name;
	}

	scenarios(store, hasBlank) {
		return this._scenarios(store, hasBlank, SharedConstants.GameSystems.Starfinder1e.id);
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

	themes(store, hasBlank) {
		if (!store || !store.state.classes.listing)
			return [];

		let results = store.state.classes.listing.filter(l => l.gameSystemId === SharedConstants.GameSystems.Starfinder1e.id);
		results = Utility.sortByName(results.filter(l => l.type === Starfinder1eSharedConstants.ClassTypes.THEME), true);
		if (hasBlank)
			return Utility.selectBlank(results);

		return results;
	}

	// eslint-disable-next-line
	_initializeCharacterBoon(character) {
		return new CharacterBoon();
	}

	// eslint-disable-next-line
	_initializeCharacterScenario(character) {
		const scenario = new CharacterScenario();

		if (character && character.scenarios) {
			const scenarios = Utility.sortByOrder(character.scenarios, true);
			const temp = scenarios && scenarios.length > 0 ? scenarios[scenarios.length - 1] : null;
			scenario.classId = temp ? temp.classId : null;
		}

		return scenario;
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

		lookups.boonTypes = service._translateName(Starfinder1eSharedConstants.BoonTypes, 'characters.gameSystems', key + '.boons.types');
		lookups.classTypes = service._translateName(Starfinder1eSharedConstants.ClassTypes, 'characters.gameSystems', key + '.classes.types');
		lookups.equipmentCategories = service._translateName(Starfinder1eSharedConstants.EquipmentCategories, 'characters.gameSystems', key + '.equipmentCategories');
		lookups.equipmentSecondaryCategories = service._translateName(Starfinder1eSharedConstants.EquipmentSecondaryCategories, 'characters.gameSystems', key + '.equipmentSecondaryCategories');
		lookups.equipmentTertiaryCategories = service._translateName(Starfinder1eSharedConstants.EquipmentTertiaryCategories, 'characters.gameSystems', key + '.equipmentTertiaryCategories');
		lookups.scenarioAdvancementSpeeds = service._translateName(Starfinder1eSharedConstants.ScenarioAdvancementSpeeds, 'characters.gameSystems', key + '.scenarios.advancementSpeeds');
		lookups.scenarioAdvancementSpeeds = lookups.scenarioAdvancementSpeeds.filter(l => l.id !== Starfinder1eSharedConstants.ScenarioAdvancementSpeeds.INITIAL);
		lookups.scenarioAdventures = service._translateName(Starfinder1eSharedConstants.ScenarioAdventures, 'characters.gameSystems', key + '.scenarios.adventures');
		lookups.scenarioAdventures = lookups.scenarioAdventures.filter(l => l.id !== Starfinder1eSharedConstants.ScenarioAdventures.INITIAL);
		return lookups;
	}
}

export default Starfinder1eGamesSystemService;
