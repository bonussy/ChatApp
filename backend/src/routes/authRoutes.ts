import express from 'express';
import { Router } from 'express';
import { register, login, getAllUsers, getMe, logout } from '../controllers/authController';
import { authenticate } from '../utils/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticate, getAllUsers); // Protected route
router.get('/me', authenticate, getMe)
router.get('/logout', logout);

export default router;