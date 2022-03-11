class MessageParser{
    constructor(actionProvider){
        this.actionProvider = actionProvider
    }

    parse(message){
        const myMessage = message.toLowerCase()
        if(myMessage.includes('hello')){
            this.actionProvider.greet()
        }
    }
}

export default MessageParser