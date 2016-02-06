Meteor.publish('events', function() {
	return Events.find();
});

Meteor.publish('scores', function() {
	return Scores.find();
});