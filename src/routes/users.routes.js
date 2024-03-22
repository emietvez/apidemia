import { Router } from "express";
import { createUser, getUsers } from "../controllers/users.controller.js";

const router = Router();

router.get('/', (req, res) => {
    res.render("index")
})

router.get('/users', getUsers)
router.post('/user', createUser)

export default router;