import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoAction } from '../action/todoAction'

export default function Home() {
    const [text, setText] = useState('')
    
    const {todos} = useSelector(state => state.todoReducer)
    const dispatch = useDispatch()

    const inputHandler = (e) => {
        setText(e.target.value)
    }

    const submitHandler = () => {
        dispatch(todoAction(text))
    }

    console.log(todos)

  return (
    <>
        <input onChange={inputHandler}></input>
        <button onClick={submitHandler}>Add</button>
        {todos.map((item, index) => <h4 key={index}>{item}</h4>)}
    </>
  )
}
