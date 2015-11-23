Meteor.publish('events', function(){
	return Events.find({author: this.userId});
});


Meteor.publish('scores', function(){
	return Scores.find({author: this.userId});
});