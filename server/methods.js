/**
 * Created by dennis on 01.03.17.
 */

Meteor.methods({


    'user.isTyping': function(bool) {
        Meteor.users.update({_id:this.userId},{$set:{'profile.isTyping':bool}});
    }


});