import randomstring from 'randomstring';

Template.hello.viewmodel({


    stopTimeout:null,
    foreignUserId: null,
    connected:false,

    userId() {
        return Meteor.userId();
    },

    userObj() {
        return Meteor.users.findOne({_id: this.userId()});
    },

    foreignUserObj() {

        if(this.connected()) {
            return Meteor.users.findOne({_id:this.foreignUserId()});
        }
        return {};
    },

    foreignUserIsTyping() {
        return (this.foreignUserObj() && this.foreignUserObj().profile && this.foreignUserObj().profile.isTyping);
    },

    connectUser() {
        Meteor.subscribe("foreignUser",this.foreignUserId(),() => {
            this.connected(true);
        });
    },

    createUser() {

        Accounts.createUser({
            email: `${randomstring.generate()}@google.de`,
            password: "test123"
        });
    },

    logTyping() {
        Meteor.call("user.isTyping",true);

        clearTimeout(this.stopTimeout());
        this.stopTimeout(setTimeout(() => {
            Meteor.call("user.isTyping",false);
            console.log("STOPPED");
        },5000));
    }
});