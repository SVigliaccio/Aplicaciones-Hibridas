import express from "express";
import {getUsers, getUserById, addUser, updateUser, deleteUser, auth} from "../controllers/user-controller.js" 
import { validacionToken, validacionTokenPUT } from "../middlewares/auth.js";

const router = express.Router();

// Rutas para los usuarios
router.get('/', validacionToken, getUsers )
router.get('/:id', getUserById )
router.post('/', addUser )
router.post('/auth', auth )
router.delete('/:id', validacionTokenPUT, deleteUser)
router.put('/:id', validacionTokenPUT, updateUser)

export default router;