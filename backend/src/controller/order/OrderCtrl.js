import OrderModel from '../../models/order/OrderModel.js';

// Create a function to create a new order
export async function createOne(req, res) {
    const orderDetail = req.body.orderDetail
    const userPhone = req.body.userPhone
    // const orderID = req.body.orderID
    const orderDate = req.body.orderDate
    const shippingMethod = req.body.shippingMethod

    console.log(orderDate + orderDetail + shippingMethod)

    const order = new OrderModel({

        userId: "45821463#23669545",
        orderDetail: orderDetail,
        userPhone: userPhone,
        // orderID: orderID,
        orderDate: orderDate,
        shippingMethod: shippingMethod
    });

    try {
        await order.save()
        console.log("successfully data inserted")
        res.status(200).send("Data inserted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while inserting data");
    }
}

// Create a function to read all order data
export async function getAll(req, res) {

    const userId = "45821463#23669545";

    try {
        const orders = await OrderModel.find({ userId });
        res.status(200).json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while retrieving data');
    }
}


// Create a function to update a order by id
export async function updateOne(req, res) {
    const objectId = req.params.id;
    const { orderDetail, userPhone, orderDate, shippingMethod } = req.body;
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            objectId,
            {
                orderDetail: orderDetail,
                userPhone: userPhone,
                // orderID: orderID,
                orderDate: orderDate,
                shippingMethod: shippingMethod
            },
            { new: true }
        );
        res.status(200).send(updatedOrder);
        console.log('Order updated successfully');

    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while updating data');
    }
}

// Create a function to delete a order by id
export async function deleteOne(req, res) {
    const objectId = req.params.id;
    try {
        await OrderModel.findByIdAndDelete(objectId);
        res.status(200).send('order deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while deleting data');
    }
}

// Export all the controller functions as an object
export default { createOne, getAll, updateOne, deleteOne };
