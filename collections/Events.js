Events = new Mongo.Collection('events');

Events.allow({
	insert: function(userId, doc) {
		return !!userId;
	}
});

Player = new SimpleSchema({
	name: {
		type: String
	}
});

Judge = new SimpleSchema({
	name: {
		type: String
	},
	category: {
		type: String
	}
});

EventSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Event Name"
	},
	timeLimit: {
		type: Number,
		label: "Time Limit"
	},
	rounds: {
		type: Number,
		label: "Rounds"
	},
	players: {
		type: [Player]
	},
	judges: {
		type: [Judge]
	},
	author: {
		type: String,
		label: "author",
		autoValue: function() {
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	}
});

Events.attachSchema( EventSchema );