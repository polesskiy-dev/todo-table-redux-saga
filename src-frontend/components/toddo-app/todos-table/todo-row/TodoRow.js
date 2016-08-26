import React from 'react'

const TodoRow = (props) => {
    return <tr>
        <td>{props.todo.text}</td>
        <td>{props.todo.isDone ?
            <span className="glyphicon glyphicon-ok"/>
            :
            <span className="glyphicon glyphicon-remove"/>
        }</td>
    </tr>
}

export default TodoRow;