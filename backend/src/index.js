import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import OrderModel from './models/order/OrderModel.js'


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

let database;

app.listen(PORT, () => {

    // Start the server
    console.log(`Server started on port ${PORT}`)

    //connect db
    mongoose
        .connect("mongodb+srv://happyitpproject:12345@cluster0.ujqnw4p.mongodb.net/?retryWrites=true&w=majority")
        .then((connection) => {
            database = connection;
            console.log("Database Synced");
        })
        .catch((err) => {
            console.log(err.message);
        });
});

//connect with frontend
app.get("/getData", (req, res) => {
    res.send("Hello I'm from backend");
});

app.post("/orders", async (req, res) => {

    const orderDetail = req.body.orderDetail
    const userPhone = req.body.userPhone
    const orderDate = req.body.orderDate
    const shippingMethod = req.body.shippingMethod

    console.log(orderDate + orderDetail + shippingMethod)

    const order = new OrderModel({

        userId: "45821463#23669545",
        orderDetail: orderDetail,
        userPhone: userPhone,
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
});



// Read all order table 
app.get("/orders", async (req, res) => {

    const userId = "45821463#23669545";

    try {
        const orders = await OrderModel.find({ userId });
        res.status(200).json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while retrieving data');
    }

});

// read a single order by id for update
app.get('/orders/:id', async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        console.log('order read successfully for update');
        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while retrieving data');
    }
});


// Update the order datas by _uid document by document
app.put("/orders/:id", async (req, res) => {
    const objectId = req.params.id;
    const { orderDetail, userPhone, orderDate, shippingMethod } = req.body;
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            objectId,
            {
                orderDetail: orderDetail,
                userPhone: userPhone,
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
});

// Delete the order datas by _uid document by document
app.delete("/orders/:id", async (req, res) => {
    const objectId = req.params.id;
    try {
        await OrderModel.findByIdAndDelete(objectId);
        console.log("'order deleted successfully'");
        res.status(200).send('order deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while deleting data');
    }
});


// confirmation part - request to change instructor

// user inserts data to change instructor 
// app.post("/changerequest", async (req, res) => {
//     const { currentInstructor, requestInstructor, reason, status } = req.body;

//     // Validation checks
//     if (!currentInstructor || !requestInstructor || !reason || !status) {
//         return res.status(400).send("Please provide all required fields.");
//     }

//     const IRequest = new IRequestModel({
//         userId: "45821463#23669545",
//         currentInstructor,
//         requestInstructor,
//         reason,
//         status,
//     });

//     try {
//         await IRequest.save();
//         console.log("successfully data inserted");
//         res.status(200).send("Data inserted successfully");
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Error occurred while inserting data");
//     }
// });




