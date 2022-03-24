import { add_todo } from "./actionTypes"

export const todoAction = (data) => {
    return {
        type : add_todo,
        payload : data
    }
}