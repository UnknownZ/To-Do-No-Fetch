import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import './List.css'

function List() {
  const [taskText, setTaskText] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    userCreation()
  }, [])

  /*
  Se espera a la creacion de usuario y se obtiene la lista
  */

  const userCreation = async () => {
    await createUser()
    getToDoList()
  }

  /*
  Funcion de creacion del usuario en la API
  */

  const createUser = () => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/unknown', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([])
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
      })
      .catch(error => {
        console.log("Error en la creacion: " + error);
      });
  }

  /*
  Actualizacion de la API cuando cambia la lista
  */

  const updateToApi = (arr) => {
    console.log(taskList)
    fetch('https://playground.4geeks.com/apis/fake/todos/user/unknown', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(arr)
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
      })
      .catch(error => {
        console.log("Error al enviar la lista: " + error);
      });
  }

  /*
  Recepcion de la lista de la API
  */

  const getToDoList = () => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/unknown', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        data.forEach(element => delete element.id
        );
        setTaskList(data)
      })
      .catch(error => {
        console.log("Error al obtener la lista: " + error);
      });
  }

  const addTodo = () => {
    const arr = [...taskList, { label: taskText, done: false, }]
    setTaskList([...arr])
    updateToApi(arr)
    setTaskText("")
  }

  const deleteTodo = (index) => {
    const arr = taskList.filter((_, current) => index !== current)
    setTaskList([...arr])
    updateToApi(arr)
  }

  const deleteAll = () => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/unknown', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();

      })
      .then(data => {
        setTaskList([])
      })
      .catch(error => {
        console.log("DELETE: " + error);
      });
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
                addTodo()
              }
            }}
          >
          </input>
        </li>

        {taskList.map((task, index) => {
          return (
            <li key={index}>
              {task.label}
              <div className="icon">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => {
                    deleteTodo(index)
                  }
                  }
                />
              </div>
            </li>
          )
        })}
      </ul>
      {taskList.length + " pending tasks"} <br />
      <button onClick={ deleteAll }>
        Delete all tasks
      </button>
    </div>
  )

}

export default List