import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    // Add your API call or logic here
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Register</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>
                  Already have an account?{" "}
                  <Link to="/" className="text-decoration-none">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
//register for login 
// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     email: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Registration Data:", formData);
//     // Add your registration API call or logic here
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h3 className="text-center mb-4">Register</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="username" className="form-label">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Enter your username"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="phone" className="form-label">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="Enter your phone number"
//                     required
//                   />
//                 </div>
//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary">
//                     Register
//                   </button>
//                 </div>
//               </form>
//               <div className="text-center mt-3">
//                 <p>
//                   Already have an account?{" "}
//                   <a href="/" className="text-primary">
//                     Login here
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
