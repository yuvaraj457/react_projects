import { add_todo } from "../action/actionTypes"

const initialState = {
    todos : []
}

export const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case add_todo:
            return {
                todos :[...state.todos, action.payload]
            }
        default :
            return state
    }
}