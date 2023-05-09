import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'reactstrap'
import '../../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCalendar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { parseISO, format } from 'date-fns';

const AddOrder = () => {

    const [orderDetail, setOrderDetail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [shippingMethod, setShipMethod] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log('In handleFormSubmit');
        console.log(orderDetail + userPhone + shippingMethod);

        try {
            const response = await Axios.post(
                'http://localhost:4000/orders/',
                {
                    orderDetail: orderDetail,
                    userPhone: userPhone,
                    shippingMethod: shippingMethod,
                    orderDate: orderDate
                }
            );
            console.log(response);
            window.alert('Data has been inserted successfully');
            console.log('Successfully inserted list');
            window.location = '/OrderTable'
        } catch (error) {
            console.log(error);
            console.log('error when update the data');
            window.alert('Data insert unsuccessfull');

        }
    };

    return (
        <body>
            <section >
                <Container>
                    <div className="form">
                        <div className="title code">New Order</div>
                        <br />
                        <div style={{"display": "flex", "justifyContent": "center"}}>
                            <div className="inputs">
                                <form
                                    onSubmit={handleFormSubmit}
                                >
                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Select your item  :</label>
                                        </Col>
                                        <Col>
                                            <div className="select">
                                                <select name="item" className="timeslot" onChange={(event) => setOrderDetail(event.target.value)} value={orderDetail}>
                                                    <option value="not selected">Select item </option>
                                                    <option value="Dell Inspiron Laptop - LKR 250,000">Dell Inspiron Laptop - LKR 250,000</option>
                                                    <option value="Samsung A50 phone - LKR 65,000">Samsung A50 phone - LKR 65,000</option>
                                                    <option value="Apple MacBook Air - LKR 350,000">Apple MacBook Air - LKR 350,000</option>
                                                    <option value="Asus Vivobook Pro 15 - LKR 300,000">Asus Vivobook Pro 15 - LKR 300,000</option>
                                                    <option value="iPhone 13 pro max - LKR 280,000">iPhone 13 pro max - LKR 280,000</option>
                                                    <option value="HP pavillion laptop - LKR 200,000">HP pavillion laptop - LKR 200,000</option>
                                                </select>
                                            </div>
                                        </Col>
                                    </Row>
                                    <br />

                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Customer Contact No.  :</label>
                                        </Col>
                                        <Col>
                                            <input type="text" name="" placeholder="" onChange={(event) => setUserPhone(event.target.value)} value={userPhone} />
                                        </Col>
                                    </Row>
                                    <br />

                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Shipping Method  :</label>
                                        </Col>
                                        <Col lg=''>
                                            <label for="standard">
                                                <input type="radio" class="Weekend radio" name="section" value="Standard" onChange={(event) => setShipMethod(event.target.value)} /> Standard
                                            </label>
                                        </Col>
                                        <Col >
                                            <label for="express">
                                                <input type="radio" class="Weekday radio" name="section" value="Express" onChange={(event) => setShipMethod(event.target.value)} /> Express
                                            </label>
                                        </Col>
                                    </Row>
                                    <br />

                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Order Date  :</label>
                                        </Col>
                                        <Col>
                                            <input type="date" name="" placeholder="" onChange={(event) => setOrderDate(event.target.value)} value={orderDate} />
                                        </Col>
                                    </Row>
                                    <br />

                                    <div className="form-btns">
                                        < Row>
                                            <Col>
                                                <button type='cancle' className='secondary__btn submit'>Cancel</button>
                                            </Col>
                                            <Col>
                                                <button type='save' className='primary__btn submit'>Submit</button>
                                            </Col>
                                        </ Row>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container >
            </section >
        </body>
    )
}

export default AddOrder;