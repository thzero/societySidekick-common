export default {
	options: {
		users: {
			can: [ // list of allowed operations
				'character',
				'character:edit',
				'character:delete',
				'user'
			]
		},
		admin: {
			can: [ ],
			inherits: ['users']
		}
	}
};
