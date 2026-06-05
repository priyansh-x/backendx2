import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()
router.post('/register' , (req,res) => {
    const {username, password} = req.body
    //encrypt pwd
    const hashedPassword = bcrypt.hashSync(password,8)
    try{
        const insertUser = db.prepare(`INSERT INTO users (username,password) VALUES (?,?)`)
        const result = insertUser.run(username,hashedPassword)

        const defaultTodo = `Wsup, add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id,task) VALUES (?,?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn:'24h'})
        res.json({token})

    } catch (err){
        console.log(err.message)
        res.sendStatus(503)
    }
    console.log(username,hashedPassword)

})


router.post('/login', (req,res) => {


})


export default router