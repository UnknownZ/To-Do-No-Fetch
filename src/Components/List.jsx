import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import './List.css'

function List() {
  const [taskText, setTaskText] = useState("")
  const [taskList, setTaskList] = useState([])
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleRemove = (index) => {
    setTaskList(taskList.filter((_, current) => index !== current))
  }



  return (
    <div id="lista">
      <ul>
        <li>
          <input
            value={taskText}
            type="text"
            placeholder="Type a new task"
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTaskList([...taskList, taskText])
                setTaskText("")
              }
            }}
          >
          </input>
        </li>

        {taskList.map((task, index) => {
          return (
            <li key={index}>
              {task}
              <div className="icon">
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() =>
                  setTaskList(
                    taskList.filter((_, current) => index !== current)
                  )
                }
              />
              </div>
            </li>
          )
        })}
      </ul>
      {taskList.length + " pending tasks"}
    </div>
  )

}

export default List