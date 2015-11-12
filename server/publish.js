Meteor.publish('events', function(){
	return Events.find({author: this.userId});
});
