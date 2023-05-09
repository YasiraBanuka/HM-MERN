import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    orderDetail: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    },
    shippingMethod: {
        type: String,
        required: true
    },
});


//OrderData is the collection name
const Order = mongoose.model('OrderData', OrderSchema);

export default Order;