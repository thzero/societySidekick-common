import SharedConstants from '../../constants';

const Constants = {
	BoonTypes: {
		ALLY: 'ally',
		ADVANCED: 'advanced',
		DOWNTIME: 'downtime',
		FACTION: 'faction',
		GENERAL: 'general',
		HEROIC: 'heroic',
		ITEM: 'item',
		MENTOR: 'mentor',
		NONE: 'none',
		PROMOTIONAL: 'promotional',
		PROPERTY: 'property',
		SERVICE: 'service',
		SOCIAL: 'social',
		SLOTLESS: 'slotless',
		TRIGGER: 'trigger'
	},
	ClassTypes: {
		ARCHETYPE: 'archetype',
		CLASS: 'class'
	},
	EquipmentCategories: {
		ADVENTURING_GEAR: 'adventuring_gear',
		AMMUNITION: 'ammunition',
		ARMOR: 'armor',
		DRUG: 'drug',
		RUNE: 'rune',
		SHIELD: 'shield',
		SNARE: 'snare',
		STAVE: 'stave',
		STRUCTURE: 'structure',
		TATTOO: 'tattoo',
		WEAPON: 'weapon'
	},
	EquipmentSecondaryCategories: {
		ARMOR: 'armor',
		HEAVY: 'heavy',
		HELD_ITEM: 'held_item',
		LIGHT: 'light',
		MEDIUM: 'medium',
		MELEE: 'melee',
		RANGED: 'ranged',
		UNARMORED: 'unarmored',
		WEAPON: 'weapon'
	},
	EquipmentTertiaryCategories: {
		ADVANCED: 'advanced',
		MARTIAL: 'martial',
		SIMPLE: 'simple',
		UNARMED: 'unarmed'
	},
	ScenarioAdvancementSpeeds: {
		INITIAL: 'initial',
		STANDARD: 'standard',
		SLOW: 'slow'
	},
	ScenarioAdventures: {
		QUEST: 'quest',
		SCENARIO: 'scenario',
		ADVENTURE_PATH: 'adventurePath',
		ACHIEVEMENT_POINTS: 'achievementPoints',
		INITIAL: 'initial'
	},
	ScenarioEvents: {
		INITIAL: 'initial',
		STANDARD: 'standard',
		PREMIER: 'premier',
		PREMIER_PLUS: 'premierPlus'
	},
	ScenarionInitialId: 'ciHt2sZZFDtRuaq1YDzkiy'
};

Constants.AdvancementPoints = [
	{
		adventure: Constants.ScenarioAdventures.QUEST,
		participant: SharedConstants.ScenarioParticipants.PLAYER,
		event: Constants.ScenarioEvents.STANDARD,
		earned: 1
	},
	{
		adventure: Constants.ScenarioAdventures.QUEST,
		participant: SharedConstants.ScenarioParticipants.PLAYER,
		event: Constants.ScenarioEvents.PREMIER,
		earned: 1
	},
	{
		adventure: Constants.ScenarioAdventures.QUEST,
		participant: SharedConstants.ScenarioParticipants.PLAYER,
		event: Constants.ScenarioEvents.PREMIER_PLUS,
		earned: 1.5
	},
	{
		adventure: Constants.ScenarioAdventures.QUEST,
		participant: SharedConstants.ScenarioParticipants.GAMEMASTER,
		event: Constants.ScenarioEvents.STANDARD,
		earned: 2
	},
	{
		adventure: Constants.ScenarioAdventures.QUEST,
		participant: SharedConstants.ScenarioParticipants.GAMEMASTER,
		event: Constants.ScenarioEvents.PREMIER,
		earned: 2
	},
	{
		adventure: Constants.ScenarioAdventures.QUEST,
		participant: SharedConstants.ScenarioParticipants.GAMEMASTER,
		event: Constants.ScenarioEvents.PREMIER_PLUS,
		earned: 3
	},
	{
		adventure: Constants.ScenarioAdventures.SCENARIO,
		participant: SharedConstants.ScenarioParticipants.PLAYER,
		event: Constants.ScenarioEvents.STANDARD,
		earned: 4
	},
	{
		adventure: Constants.ScenarioAdventures.SCENARIO,
		participant: SharedConstants.ScenarioParticipants.PLAYER,
		event: Constants.ScenarioEvents.PREMIER,
		earned: 5
	},
	{
		adventure: Constants.ScenarioAdventures.SCENARIO,
		participant: SharedConstants.ScenarioParticipants.PLAYER,
		event: Constants.ScenarioEvents.PREMIER_PLUS,
		earned: 6
	},
	{
		adventure: Constants.ScenarioAdventures.SCENARIO,
		participant: SharedConstants.ScenarioParticipants.GAMEMASTER,
		event: Constants.ScenarioEvents.STANDARD,
		earned: 8
	},
	{
		adventure: Constants.ScenarioAdventures.SCENARIO,
		participant: SharedConstants.ScenarioParticipants.GAMEMASTER,
		event: Constants.ScenarioEvents.PREMIER,
		earned: 10
	},
	{
		adventure: Constants.ScenarioAdventures.SCENARIO,
		participant: SharedConstants.ScenarioParticipants.GAMEMASTER,
		event: Constants.ScenarioEvents.PREMIER_PLUS,
		earned: 12
	},
	{
		adventure: Constants.ScenarioAdventures.ADVENTURE_PATH,
		participant: SharedConstants.ScenarioParticipants.PLAYER,
		event: Constants.ScenarioEvents.STANDARD,
		earned: 12
	},
	{
		adventure: Constants.ScenarioAdventures.ADVENTURE_PATH,
		participant: SharedConstants.ScenarioParticipants.PLAYER,
		event: Constants.ScenarioEvents.PREMIER,
		earned: 12
	},
	{
		adventure: Constants.ScenarioAdventures.ADVENTURE_PATH,
		participant: SharedConstants.ScenarioParticipants.PLAYER,
		event: Constants.ScenarioEvents.PREMIER_PLUS,
		earned: 12
	},
	{
		adventure: Constants.ScenarioAdventures.ADVENTURE_PATH,
		participant: SharedConstants.ScenarioParticipants.GAMEMASTER,
		event: Constants.ScenarioEvents.STANDARD,
		earned: 12
	},
	{
		adventure: Constants.ScenarioAdventures.ADVENTURE_PATH,
		participant: SharedConstants.ScenarioParticipants.GAMEMASTER,
		event: Constants.ScenarioEvents.PREMIER,
		earned: 12
	},
	{
		adventure: Constants.ScenarioAdventures.ADVENTURE_PATH,
		participant: SharedConstants.ScenarioParticipants.GAMEMASTER,
		event: Constants.ScenarioEvents.PREMIER_PLUS,
		earned: 12
	}
];

export default Constants;
