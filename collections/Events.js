Events = new Mongo.Collection('events');

Events.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

Player = new SimpleSchema({
	id: {
		type: String
	},
	name: {
		type: String
	},
	totalScore: {
		type: Number,
		defaultValue: 0
	}
});

Judge = new SimpleSchema({
	id: {
		type: String
	},
	name: {
		type: String
	},
	email: {
		type: String
	},
	category: {
		type: String
	}
});

Scores = new Mongo.Collection('scores');

Scores.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

Score = new SimpleSchema({
	score: {
		type: Number,
		label: "Judge Score"
	},
	round: {
		type: Number
	},
	eventId: {
		type: String
	},
	judgeId: {
		type: String
	},
	playerId: {
		type: String
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

Scores.attachSchema( Score );

EventSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Event Name"
	},
	timeLimit: {
		type: Number,
		label: "Time Limit",
		autoValue: function() {
		   var string = this.field("timeLimitString");
		   if (string.isSet) {
		   	   var components = string.value.split(":");
		   	   var seconds = parseInt(components[0], 10) * 60 + parseInt(components[1], 10);
		       return seconds;
		    }
		}
	},
	rounds: {
		type: Number,
		label: "Rounds",
	},
	players: { 	
		type: [Player]
	},
	judges: {
		type: [Judge]
	},
	scores: {
		type: [Score],
		optional: true
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
	},
	inGame: {
		type: Boolean,
		label: "In Game",
		defaultValue: false,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
	currentRound: {
		type: Number,
		label: "Current Round",
		defaultValue: 1,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
	currentTime: {
		type: Number,
		label: "Current Time",
		defaultValue: 0,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
	currentPlayerId: {
		type: String,
		label: "Current Player",
		optional: true,
		autoform: {
			type: "hidden"
		}
	}
});

Events.attachSchema( EventSchema );
