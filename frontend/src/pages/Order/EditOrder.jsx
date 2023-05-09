import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";
import { Container, Row, Col } from "reactstrap";
import { AiFillCalendar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { parseISO, format } from 'date-fns';

const EditOrder = () => {

    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [shippingMethod, setShippingMethod] = useState("");
    const [order, setOrder] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await Axios.get(`http://localhost:4000/orders/${id}`);
                setOrder(response.data);
                setOrderDetail(response.data.orderDetail);
                setOrderDate(response.data.orderDate);
                setUserPhone(response.data.userPhone);
                setShippingMethod(response.data.shippingMethod);
            } catch (error) {
                setError("Error fetching order");
                console.log('Error fetching order:', error);
            }
        };
        fetchOrder();
    }, [id]);

    const handleFormSubmit = (event) => {

        event.preventDefault();

        console.log("In handleFormSubmit");
        console.log(orderDetail);

        // Send the updated data to the server using an API call
        Axios.put(`http://localhost:4000/orders/${id}`, {
            orderDetail: orderDetail,
            orderDate: orderDate,
            userPhone: userPhone,
            shippingMethod: shippingMethod,
        })
            .then(response => {
                console.log(response);
                window.alert('Data has been updated successfully');
                window.location = "http://localhost:3000/ordertable";
                console.log('Successfully updated list');
            })
            .catch(error => {
                console.log(error);
                console.log("error when update the data");
                window.alert('Data is not updated successfully');
                window.location.reload();
            });
    };

    return (
        <body>
            <section>
                <Container>
                    <div className="form">
                        <div className="title code">Update Order Details</div>
                        <div style={{"display": "flex", "justifyContent": "center"}}>
                            <div className="inputs">
                                <form onSubmit={handleFormSubmit}>
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Select your item  :</label>
                                        </Col>
                                        <Col>
                                            <div className="select">
                                                <select name="item" className="timeslot" onChange={(event) => setOrderDetail(event.target.value)} value={orderDetail}>
                                                    <option value="not selected">Select item </option>
                                                    <option value="Dell Inspiron Laptop - LKR 250,000">Dell Inspiron Laptop - LKR 250,000</option>
                                                    <option value="Samsung A50 phone - LKR 65,000">Samsung A50 phone - LKR 65,000</option>
                                                    <option value="Apple MacBook Air - LKR 350,000">Apple MacBook Air - LKR 350,000</option>
                                                </select>
                                            </div>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Customer Contact No.  :</label>
                                        </Col>
                                        <Col>
                                            <input
                                                type="text"
                                                className=""
                                                value={userPhone}
                                                onChange={event => setUserPhone(event.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Shipping Method  :</label>
                                        </Col>
                                        <Col lg=''>
                                            <label for="standard">
                                                <input type="radio" class="Weekend radio" name="section" value="Standard" onChange={(event) => setShippingMethod(event.target.value)} /> Standard
                                            </label>
                                        </Col>
                                        <Col >
                                            <label for="express">
                                                <input type="radio" class="Weekday radio" name="section" value="Express" onChange={(event) => setShippingMethod(event.target.value)} /> Express
                                            </label>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Order Date  :</label>
                                        </Col>
                                        <Col>
                                            <input
                                                type="date"
                                                className=""
                                                value={orderDate}
                                                onChange={event => setOrderDate(event.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <div className="form-btns">
                                        < Row>
                                            <Col>
                                                <button type='cancle' className='secondary__btn submit'>Cancel</button>
                                            </Col>
                                            <Col>
                                                <button type='save' className='primary__btn submit'>Save</button>
                                            </Col>
                                        </ Row>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </body>
    );
};

export default EditOrder;