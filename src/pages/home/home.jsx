import React, { useState, useEffect } from 'react';
import './home.css';
import { UserContext } from '../../components/UserContext';
import { useContext } from 'react';
import UserForm from '../../components/UserForm';

import axios from 'axios';
const Home = () => {
  const [users, setUsers] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);

  const { user } = useContext(UserContext);
  const { userId, name } = user;
  const headers = {
    userid: userId
  };

  const config = {
    headers: headers,
  };
  const fetchUsers = async () => {
    try {

      const response = await axios.get("http://localhost:8080/crud/get", config);
      console.log(response);
      setUsers(response.data);
    }
    catch (err) {
      console.log("error: ", err);
    }
  }
  const toggleAddUserForm = () => {
    setIsAddingUser(!isAddingUser);
  };

  const handleSubmitUserForm = async(userData) => {
    
    
    try{
      console.log('Submitted User Data:', userData);
      const response=await axios.post("http://localhost:8080/crud/create",userData,config);
      console.log(response);
      setIsAddingUser(false);
    }
    catch(err){
      console.log("Error: ",err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="dashboard-container">
      <h1>Welcome, {name}</h1>
      {users.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        <div className="users">
          {isAddingUser &&<UserForm onSubmit={handleSubmitUserForm} />}
          <div className="fab" onClick={toggleAddUserForm}>
            +
          </div>

          <h2>User List</h2>

          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <strong>Name:</strong> {user.username}<br />
                <strong>Email:</strong> {user.email}<br />
                <strong>Phone:</strong> {user.phone}<br />

              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  );
};

export default Home;
