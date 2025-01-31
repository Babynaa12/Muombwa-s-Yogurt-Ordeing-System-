// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./Dashboard";  // Make sure to import your existing Dashboard component
 // Create other components for Sales, Products, Customers, and Deliveries
import Customer from "./pages/Customer";
import Product from "./pages/Product";

import Payment from "./pages/Payment";
import Delivery from "./pages/Delivery";
import Sidebar from "./components/Sidebar";
// import Register from "./pages/Register";
// import Login from "./pages/login";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Sidebar/>
          <Routes>
            {/* {<Route path="/" element={<Login />} /> } */}
            
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/product" element={<Product />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/delivery" element={<Delivery/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Customer from "./pages/Customer";
// import Product from "./pages/Product";
// // import Sale from "./pages/Sale";
// import Register from "./pages/Register";
// import Delivery from "./pages/Delivery";
// import Sidebar from "./components/Sidebar";
// import Login from "./pages/login";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

//   return (
//     <Router>
//       <div className="app-container">
//         {isAuthenticated ? (
//           // Show the Sidebar and protected routes when logged in
//           <>
//             <Sidebar />
//             <div className="main-content">
//               <Routes>
//                 {/* <Route path="/sale" element={<Sale />} /> */}
//                 <Route path="/product" element={<Product />} />
//                 <Route path="/customer" element={<Customer />} />
//                 <Route path="/delivery" element={<Delivery />} />
//                 <Route path="/register" element={<Register />} />
//                 {/* <Route path="*" element={<Navigate to="/sale" />} /> */}
//               </Routes>
//             </div>
//           </>
//         ) : (
//           // Show only the Login page when not authenticated
//           <Routes>
//             <Route
//               path="/"
//               element={<Login onLogin={() => setIsAuthenticated(true)} />} // Pass login handler to Login component
//             />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;
