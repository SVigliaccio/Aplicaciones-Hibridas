import express from "express";
import {getUsers, getUserById, addUser, updateUser, deleteUser, auth} from "../controllers/user-controller.js" 

const router = express.Router();

// Rutas para los usuarios
router.get('/', getUsers )
router.get('/:id', getUserById )
router.post('/', addUser )
router.post('/auth', auth )
router.delete('/:id', deleteUser )
router.put('/:id', updateUser)

export default router;