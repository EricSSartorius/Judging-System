Scores = new Mongo.Collection('scores');

Scores.allow({
	insert: function(userId, doc) {
		return !!userId;
	}
});

ScoreSchema = new SimpleSchema({
	score: {
		type: Number,
		label: "Judge Score"
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

Scores.attachSchema( ScoreSchema );