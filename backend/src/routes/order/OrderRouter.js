import express from 'express';
import { createOne, getAll, updateOne, deleteOne } from '../../controller/order/OrderCtrl.js';

const router = express.Router();

console.log('IN orderRouter');

// create a schedule
router.post('/orders', createOne);

// get all schedules
router.get('/orders', getAll);

// update a schedule by id
router.put('/orders/:id', updateOne);

// delete a schedule by id
router.delete('/orders/:id', deleteOne);

export default router;
