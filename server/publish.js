Meteor.publish('events', function(){
	return Events.find({author: this.userId});
	return Scores.find({author: this.userId});
});
