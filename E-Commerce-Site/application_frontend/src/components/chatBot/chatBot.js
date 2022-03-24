
import ChatBot from 'react-simple-chatbot';

export const Chatbot = () => {
  return (
    <ChatBot
      steps={[
        {
          id: '1',
          message: 'Hi, whats your name?',
          trigger: '2',
        },
        {
          id: '2',
          user: true,
          trigger: '3',
        },
        {
          id: '3',
          message: 'Hi {previousValue}, nice to meet you!',
          trigger: '4'
        },
        {
          id: '4',
          message : 'Below some of the support options available, please select what kind of support you want?',
          trigger : 'supportOptions'
        },
        {
          id: 'supportOptions',
          options : [
            {value : 'product', label : 'product', trigger : '5'},
            {value : 'user', label : 'user', trigger : '5'},
            {value : 'contactUs', label : 'contactUs', trigger : '6'}
          ],
        },
        {
          id : '5',
          message : 'ok good',
          end: true
        },
        {
          id : '6',
          message : 'you can contact through mail: \n yuvaraj@mail.com \n phone: 12347899'
        }
      ]}
    />
  )
    }
