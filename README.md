# U-Judge (Beta)

### What is U-Judge?
[U-Judge](https://ujudge.meteor.com), or Universal Judge, is an online judging system that can be used to judge all kinds of events. 

As updates happen, the customizability of events will expand. However, currently the only type of event that can be judged follows the same format as a figure skating or skateboarding competition. Players take turns one by one performing during a timed round and judges input their scores accordingly. In the future, the ability to create and judge 1v1 or team vs team matches, among other custom features will also be implemented.

###How to create an event
So how does this all work? Upon creating an account, you will be given the ability to create, administrate, and judge competitions.
Without creating an account, access is only given to quick scoreboard for simple matches that do not require a judge.

To create an event, open the sidebar and navigate to 'Create Event.' On the create event screen,first enter the event name, time limit, and number of rounds. Next, enter the names (team name optional) for up to 100 players. After inputing player information, lastly add 1-7 judges. All judges are linked to the email address given to them so make sure your judges have a U-Judge account linked to the email address that you provided for them.

###How to administer an event
After an event has been created, open the sidebar and navigate to 'Admin Console.' At the admin console, first select the event that you want to run from the dropdown menu at the top of your console. After selecting an event, the time limit set for the event and the name of the first player should show up. At this point, the judges are still not able to give any scores yet because the event has not been started. Upon pushing the 'Start Player' button however, the timer will start to countdown and the judges will be able to submit their score for the current round. Once a judge has submitted a score, the name of the judge and their score given will pop up under the admin console and the number will also be added to the round and total score.

If all judges have scored before the time limit reaches zero and you want to end the round for the player, select the "Force Stop" button. If the timer reaches zero and the judges have not given a score yet, they will be able to do so until the 'Next Player' button is pushed so make sure not to move to the next player until all judges have scored.

After all players in the event have finished their first round, if you have made an event with more than one round then select 'Next Round' and the next round will start back at the first player. If a player is unable to compete at any point, their round can be skipped by pushing 'Next Player' and bypassing the 'Start Player' option. Also, if a winner is determined mid game, the whole event can be ended by pushing 'End Game.' Just make sure that everything is completly finished before pushing the button or you might have some very upset competitors.

*Note: At any point during the game you may check the leaderboard by navigating to 'Leaderboard' on the sidebar.*

###How to Judge an event
Once an administrater has created an event and added your email address, simply login to U-Judge using the email address that was inputted and then navigate to the "Judging Console" on the sidebar. If there is no game in session, the ability to score will be disabled. Once the timer has started, the players name will be shown and the ability to input a score will be available. Use the slider to give the player a score from 1-10 and then hit 'Confirm' once you have made your descision. Upon hitting 'Confirm,' the ability to give a score will be disabled until the administer starts the next round or player.

###Quick Scoreboard
If you have a simple match that does not have a need for judges, then Quick Scoreboard can be used. An account does not need to be created to use this feature. Upon navigating to 'Quick Scoreboard' on the sidebar, you will find a simple scoreboard. Set the time for the match, and adjust points for each side as needed throughout the match. The left team is blue and the right team is red. The team with the higher score will have their current score highlighted in their respective color.


## Built With
Angular-Meteor

Shout out to [Scott Tolinski](https://github.com/stolinski) for the great [Meteor package](https://atmospherejs.com/stolinski/stylus-multi) to get everything off the ground! 