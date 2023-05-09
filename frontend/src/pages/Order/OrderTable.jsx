import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Table } from 'reactstrap'
import '../../App.css'
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderTable = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [orders, setOrders] = useState([]); // Stores all the orders fetched from the API
    const [tempData, setTempData] = useState([]); // Stores the filtered orders or all orders if no search is made
    const tableRef = useRef(null); // Ref to the table element

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:4000/orders");
                const ordersWithId = response.data.map(order => ({
                    ...order,
                    orderId: order._id.toString()
                }));
                setOrders(ordersWithId);
            } catch (error) {
                console.log('Error fetching orders:', error);
            }
        };
        
        fetchOrders();
    }, []);

    // Update tempData with all orders initially and whenever orders state changes
    useEffect(() => {
        setTempData(orders);
    }, [orders]);

    const handleEdit = (id) => {
        navigate(`/EditOrder/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/orders/${id}`)
            .then(response => {

                console.log('order deleted successfully');
                // Refresh the table to show updated data
                window.alert('Data has been deleted successfully');
                window.location.reload();
            })
            .catch(error => {
                console.log('Error deleting order:', error);
            });
    }

    const handleAddNewOrder = () => {
        navigate('/addorder')
    }

    const handleGenerateReport = () => {
        // Create a new PDF document
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        // const doc = new jsPDF();

        // Add title to PDF
        const title = "Order Report";
        doc.text(title, marginLeft, 40);
      
        // Define columns for the table
        const columns = [
          { header: "Order ID", dataKey: "orderId" },
          { header: "Order Date", dataKey: "orderDate" },
          { header: "Order Detail", dataKey: "orderDetail" },
          { header: "Contact Number", dataKey: "userPhone" },
          { header: "Shipping Method", dataKey: "shippingMethod" }
        ];
      
        // Create rows from orders data
        const rows = orders.map(order => ({
          orderId: order._id.toString(),
          orderDate: order.orderDate,
          orderDetail: order.orderDetail,
          userPhone: order.userPhone,
          shippingMethod: order.shippingMethod
        }));
      
        // Add the table to the document
        doc.autoTable({
            startY: 60,
            columns,
            body: rows
        });
      
        // Save the PDF as a file and download it
        doc.save("OrderReport.pdf");
    };

    const onSearchChange = (value) => {
        console.log(value);

        const newData = orders.filter((ord) =>
            ord.orderDetail.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        ); // Filter orders whose orderDetail includes the search query
        console.log(newData);
        setTempData(newData)
    }

    return (
        <section>
            <Container>
                <div className="title code">Order List</div>
                <br />
                <Row>
                    <Col>
                        <input type="button" className="tertiary_btn" value="Add New Order" onClick={handleAddNewOrder} />
                    </Col>
                    <Col>
                        <input type="button" className="tertiary_btn" value="Generate a report" onClick={handleGenerateReport} />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <input
                                    type="search"
                                    className='search'
                                    placeholder="Search"
                                    onChange={(e) => onSearchChange(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <AiOutlineSearch className="i" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />

                <Row>
                    <div>
                        <Table dark striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Date</th>
                                    <th>Order Detail</th>
                                    <th>Contact Number</th>
                                    <th>Shipping Method</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* {orders.map((row) => ( */}
                                {tempData.map((row) => (
                                    <tr key={row._id}>
                                        <td>{row.orderId}</td>
                                        <td>{row.orderDate}</td>
                                        <td>{row.orderDetail}</td>
                                        <td>{row.userPhone}</td>
                                        <td>{row.shippingMethod}</td>
                                        <>
                                            <td>
                                                <button className='edit_btn' onClick={() => handleEdit(row._id)}>Edit</button>
                                            </td>
                                            <td>
                                                <button className='delete_btn' onClick={() => handleDelete(row._id)}>Delete</button>
                                            </td>
                                        </>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>
            </Container>
        </section>
    )
}

export default OrderTable;