// display input box, Add button, then add todo's on clicking of that btn


import { useState } from 'react'
import './todo.css'

export default function Todo(){

    const[input, setInput] = useState('')
    const[todoArray, setTodoArray] = useState([])

    function handleChecked(id){
        setTodoArray(todoArray.map((t) => {
            if(t.id === id){
                return {
                    ...t,
                    completed: !t.completed
                }
            }
            else return t
        }))
    }

    function addTodoItem(){

        if(input.trim().length === 0) return

        const newItem = {
            id: todoArray.length+1,
            text: input,
            completed: false
        }

        setTodoArray((prev) => [...prev, newItem])
        setInput('')
    }

    function handleDelete(id){
        setTodoArray(todoArray.filter((t) => t.id!==id))
    }

    return <div className="todo-container">
        <h1>Todo's</h1>
        <input type="text" placeholder="Enter todo" value={input}
        onChange={(e) => setInput(e.target.value)}/>
        <button onClick={(e) => addTodoItem(e)}>Add Todo</button>

        <ul className='todo-list'>
            {todoArray.map((item, index) => <li key={index}>
                <input type="checkbox" checked={item.completed} onChange={() => handleChecked(item.id)}/>
                <span className={ item.completed ? 'strikethrough' : ''}>{item.text}</span>
                <button className='btn' onClick={() => handleDelete(item.id)}> Delete</button>
            </li>)}
        </ul>
        
    </div>
}