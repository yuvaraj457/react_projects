class ActionProvider {
    constructor(createChatBotMessage, setStateFunc){
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet(){
        const greetMessage = this.createChatBotMessage('Hi, buddy')
        this.updateChatbotState(greetMessage)
    }

    updateChatbotState(message) {
        this.setState(prevState => ({
            ...prevState, messages : [prevState.messages, message]
        }))
    }
}

export default ActionProvider