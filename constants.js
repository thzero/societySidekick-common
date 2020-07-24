const Constants = {
	CharactersStatus: {
		ACTIVE: 'active',
		DEAD: 'dead',
		RETIRED: 'retired'
	},
	ErrorCodes: {
		Characters: {
			InvalidStatus: 'characters.invalidStatus'
		},
		DuplicateGamerTag: 'duplicateGamerTag',
		DuplicateName: 'duplicateName',
		DuplicateNumber: 'duplicateNumber',
		DuplicateOrder: 'duplicateOrder',
		InvalidObject: 'invalidObject',
		InvalidPermissions: 'invalidPermissions',
		ObjectChanged: 'objectChanged',
		QuotaReached: 'quotaExceeded'
	},
	ErrorFields: {
		Generic: 'generic',
		Name: 'name',
		Number: 'number',
		Order: 'order'
	},
	GameSystems: {
		DungeonsAndDragons5e: {
			id: 'dtVMQdxpXTExB2udEmV11K', // '6f148c32-a68c-4f8f-803b-857f0ab48134',
			friendlyId: 'dungeonsanddragons5e'
		},
		Pathfinder2e:
		{
			id: 'nFxpKVcCusf4qztVj9CpT5', // 'df6bca9b-4347-45e3-951b-0145eb458ace',
			friendlyId: 'pathfinder2e'
		},
		Starfinder1e:
		{
			id: 'hZZ8KYnj5gzbFSRC4yb4PE',
			friendlyId: 'starfinder1e'
		}
	},
	NewsTypes: {
		ADMIN: 'admin',
		MAIN: 'main'
	},
	Roles: {
		Admin: 'admin',
		User: 'user'
	},
	ScenarioParticipants: {
		INITIAL: 'initial',
		PLAYER: 'player',
		GAMEMASTER: 'gamemaster'
	},
	ScenarioStatus: {
		INITIAL: 'initial',
		IGNORE: 'ignore',
		REPEATED: 'repeated',
		REPLAY: 'replay'
	},
	ScenarioTypes: {
		INITIAL: 'initial'
	},
	SortBy: {
		Characters: {
			CharacterName: 'characterName',
			Level: 'characterLevel'
		},
		Boons: {
			BoonName: 'boonName'
		},
		Scenarios: {
			CharacterName: 'characterName',
			DatePlayed: 'datePlayed',
			ScenarioName: 'scenarioName',
			ScenarioNumber: 'scenarioNumber',
			Season: 'season'
		}
	},
	Status: {
		ACTIVE: 'active'
	}
};

export default Constants;
