import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loadedChats: true,    
    currentChatId: 0,
    chats: [
        {
            chatId: 0,
            latestMessages: [
            {
                message: 'THis is a chat message',
                time: '14:32', 
                sender: "chris",
                sent: true 
            },
            {
                message: 'THis is a chat message',
                time: '14:32', 
                sender: "chris",
                sent: false 
            }
            ]
        },
        {
            chatId: 1,
            latestMessages: [
                {
                    message: 'THis is a chat message',
                    time: '14:32', 
                    sender: "chris",
                    sent: true 
                },
                {
                    message: 'THis is a chat message',
                    time: '14:32', 
                    sender: "chris",
                    sent: false 
                }
            ]
        }
    ]
}



const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SEND: 
            return {
                ...state,
            }
        case actionTypes.CHANGE_CHAT: 
            console.log('Changing chat');
            return {
                ...state,
                currentChatId: action.chatId,
            }
        default: return state;
    }
}

export default reducer; 