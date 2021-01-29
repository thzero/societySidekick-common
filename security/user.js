export default {
	options: {
		user: {
			can: [ // list of allowed operations
				'character',
				'character:edit',
				'character:delete',
				'user'
			]
		},
		admin: {
			can: [ ],
			inherits: ['user']
		}
	}
};
