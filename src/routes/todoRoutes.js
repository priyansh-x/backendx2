import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/', (req,res) => {
    const getTodos = db.prepare('SELECT * FROM Todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos)

})

router.post('/', (req,res) => { 
    const {task} = req.body
    const insertTodo = db.prepare(`INSERT INTO todos (user_id,task) VALUES (?,?)`)
    const result = insertTodo.run(req.userId, task) 

    res.json({id: result.lastInsertRowid , result, task, completed: 0})

})

router.put('/:id', (req,res) => {
    const { completed } = req.body
    const { id } = req.params


    const updateTodo = db.prepare('UPDATE Todos SET Completed = ? ')
    updateTodo.run(completed,id)
    res.json({message:"todo completed"})
})

router.delete('/:id', (req,res) => {


})

export default router