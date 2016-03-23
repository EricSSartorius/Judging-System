Meteor.startup(function(){
  process.env.MAIL_URL="smtp://postmaster%40sandboxcb135e4a800843b59c23cbc56e2a67fc.mailgun.org:message@smtp.mailgun.org:587";

  Accounts.emailTemplates.from="no-reply@ujudge.meteor.com";
  Accounts.emailTemplates.sitename= "UJudge";
  Accounts.emailTemplates.verifyEmail.text = function(user,url){
    return "Welcome to UJudge " + user.username + " !\n" +  " To activate your Account, simply click the link below:\n\n" + url;
  };
  Accounts.emailTemplates.verifyEmail.subject = function(user){
    return "Verify your email for UJudge.";
  };
  Accounts.config({
    sendVerificationEmail: true
  });
});
