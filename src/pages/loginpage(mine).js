// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../components/authcontext';

// const LoginPage = () => {
//   const { login } = useAuth();
//   const history = useNavigate();
//   const [membershipId, setMembershipId] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = {
//       membershipId,
//       password
//     };

//     login(userData);
//     history.push('/profilepage'); // Redirect to profile page after successful login
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
//         <h2 className="text-2xl mb-4">Login</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">Membership ID</label>
//           <input
//             type="text"
//             value={membershipId}
//             onChange={(e) => setMembershipId(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


// ./pages/loginpage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/authcontext'; // Ensure this path is correct

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [membershipId, setMembershipId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      membershipId,
      password
    };

    login(userData);
    navigate('/profile'); // Redirect to profile page after successful login
  };

  const handleSignUp = () => {
    navigate('/profilecreationpage'); // Redirect to sign up page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Membership ID</label>
          <input
            type="text"
            value={membershipId}
            onChange={(e) => setMembershipId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4 flex justify-between items-center">
          <button type="submit" className="w-1/2 bg-blue-500 text-white py-2 rounded">
            Login
          </button>
          <button type="button" onClick={handleSignUp} className="w-1/2 bg-green-500 text-white py-2 rounded">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
