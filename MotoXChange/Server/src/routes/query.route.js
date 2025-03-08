import express from 'express';
import { addQuery,getAllQueries,resolveQuery } from '../controllers/query.controller.js';
const router = express.Router();

// Route to add a query
router.post('/add', addQuery);
router.get('/fetch', getAllQueries); // Fetch all queries
router.put('/:id/resolve', resolveQuery); // Update status to 'resolved'
export default router;
