
import React, { Component, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Main = () => {
  const [listName, setListName] = useState('')
  const todoList = useSelector(state => state.todoList)

  const dispatch = useDispatch()
  const addToDoList = () => {
    dispatch({
      type: 'ADD_TODOLIST',
      payload
    })
  }

  return (
    
  )
}



