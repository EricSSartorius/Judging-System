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
		min: 1,
		max: 10,
		defaultValue: 1
	},
	players: { 	
		optional: true,
		type: [Player]
	},
	judges: {
		optional: true,
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