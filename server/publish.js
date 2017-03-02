/**
 * Created by dennis on 01.03.17.
 */

Meteor.publishComposite('chatMessages',function(chatId) {

    check(chatId,String);


    //   Meteor._sleepForMs(2000);

    return {

        find: function () {

            try {


                return Chats.find({_id:chatId,$or:[{user1:this.userId},{user2:this.userId}]});
            }
            catch(e) {
                return null;
            }
        },
        children: [{

            find: function (chat) {
                return Messages.find({chatId: chat._id}, {sort: {createdAt: -1}, limit: 30});
            }
        },
            {
                find: function (chat) {

                    var foreignUser = null;
                    if (chat.user1 == this.userId) {
                        foreignUser = chat.user2
                    }
                    else {
                        foreignUser = chat.user1;
                    }

                    return Meteor.users.find(foreignUser, {fields: {profile: 1, 'status.online': 1}});
                }
            }
        ]

    }

});



Meteor.publishComposite('foreignUser',function(userId) {



    //   Meteor._sleepForMs(2000);

    return {

        find: function () {
            return Meteor.users.find({_id: userId});
        }
    }

});