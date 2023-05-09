import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../images/logo-hm.png';
import './footer.css'
import * as Icons from 'react-bootstrap-icons';

const Footer = () => {
    return (
<footer className="page-footer font-small blue pt-4 bg-dark">

    <div className="container text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <img src={logo} alt="Logo" width={250} />
            </div>

            <hr className="clearfix w-80 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase"><b>Useful Links</b></h5>
                <ul className="list-unstyled">
                    <li><a href="/Loging">Sign In</a></li>
                    <li><a href="/registation">Sign Up</a></li>
                    <li><a href="#!">Services</a></li>
                    <li><a href="#!">About Us</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase"><b>Users</b></h5>
                <ul className="list-unstyled">
                    <li><a href="#Contacts">Contacts</a></li>
                    <li><a href="/ManagmentLogin">My Orders</a></li>
                    <li><a href="#!">Blog</a></li>
                    <li><a href="#!">Help</a></li>
                </ul>
            </div>
        </div>
    </div>


    {/* <hr className="container" />
    <div className="footer-copyright text-center py-3">© 2023 Copyright :
        <a href="#!"> Team GYMLY</a>
    </div> */}

</footer>
    )}


export default Footer;

// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from '../../images/logo.png';
// import './footer.css'

// const Footer = () => <footer className="page-footer font-small blue pt-4 bg-dark">
//     <div className="container text-center text-md-left">
//         <div className="row">
//             <div className="col-md-6 mt-md-0 mt-3">
//                 <img src={logo} alt="Logo" width={250} />
//                 <p>Wanna Add Some pharagraph to this</p>
//             </div>

//             <hr className="clearfix w-80 d-md-none pb-0" />

//             <div className="col-md-3 mb-md-0 mb-3">
//                 <h5 className="text-uppercase"><b>Links</b></h5>
//                 <ul className="list-unstyled">
//                     <li><a href="#!">Link 1</a></li>
//                     <li><a href="#!">Link 2</a></li>
//                     <li><a href="#!">Link 3</a></li>
//                     <li><a href="#!">Link 4</a></li>
//                 </ul>
//             </div>

//             <div className="col-md-3 mb-md-0 mb-3">
//                 <h5 className="text-uppercase"><b>Links</b></h5>
//                 <ul className="list-unstyled">
//                     <li><a href="#!">Link 1</a></li>
//                     <li><a href="#!">Link 2</a></li>
//                     <li><a href="#!">Link 3</a></li>
//                     <li><a href="#!">Link 4</a></li>
//                 </ul>
//             </div>
//         </div>
//     </div>


//     <hr />
//     <div className="footer-copyright text-center py-3">© 2023 Copyright :
//         <a href="#!"> Team GYMLY</a>
//     </div>

// </footer>

// export default Footer;