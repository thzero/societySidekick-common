export default {
	options: {
		admin: { // Role name
			can: [ // list of allowed operations
				'boons',
				'boons:create',
				'boons:edit',
				'boons:delete',
				'boons:search',
				'boons:update',
				'classes',
				'classes:create',
				'classes:edit',
				'classes:delete',
				'classes:search',
				'classes:update',
				'equipment',
				'equipment:create',
				'equipment:edit',
				'equipment:delete',
				'equipment:search',
				'equipment:update',
				'factions',
				'factions:create',
				'factions:edit',
				'factions:delete',
				'factions:search',
				'factions:update',
				'news',
				'news:create',
				'news:edit',
				'news:delete',
				'news:search',
				'news:update',
				'scenarios',
				'scenarios:create',
				'scenarios:edit',
				'scenarios:delete',
				'scenarios:search',
				'scenarios:update',
				'users',
				'users:claims',
				'users:claims:edit',
				'users:edit',
				'users:delete',
				'users:search',
				'users:update'
			]
		},
		superAdmin: { // Role name
			can: [ // list of allowed operations
				'users:delete'
			],
			inherits: ['admin']
		}
	}
};
