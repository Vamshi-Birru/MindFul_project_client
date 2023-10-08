import React, { useState, useEffect } from 'react';
import './home.css';
import { UserContext } from '../../components/UserContext';
import { useContext } from 'react';
import { Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBCol,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBInput,
  MDBCheckbox,
  MDBRow,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Cookies from 'js-cookie';
const Home = () => {
  const [users, setUsers] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState([]);
  const [userData, setUserData] = useState({});
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleIconClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // const { user } = useContext(UserContext);
  // const { userId, name } = user;
  const userId = Cookies.get('userId');
  const name = Cookies.get('name');

  const headers = {
    userid: userId
  };

  const config = {
    headers: headers,
  };
  const fetchUsers = async () => {
    try {

      const response = await axios.get("https://mindful-project-backend.onrender.com/crud/get", config);
      console.log(response);
      setUsers(response.data);
    }
    catch (err) {
      console.log("error: ", err);
    }
  }


  const submitUserForm = async () => {
    try {
      // console.log('Submitted User Data:', userData);
      const response = await axios.post("https://mindful-project-backend.onrender.com/crud/create", userData, config);
      console.log(response);

    }
    catch (err) {
      console.log("Error: ", err);
    }
  };
  const toggleUserDetails = (index) => {
    const updatedShowUserDetails = [...showUserDetails];
    updatedShowUserDetails[index] = !updatedShowUserDetails[index];
    setShowUserDetails(updatedShowUserDetails);
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
          <div className="center-button">
            <MDBDropdown>
              <MDBDropdownToggle>Add User <MDBIcon fas icon='plus' /></MDBDropdownToggle>
              <MDBDropdownMenu style={{ width: '320px' }}>
                <form className='px-4 py-3'>
                  <MDBInput label='Name' type='text' className='mb-4' onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                  <MDBInput label='Email address' type='email' onChange={(e) => setUserData({ ...userData, email: e.target.value })} className='mb-4' />
                  <MDBInput label='Phone' type='tel' className='mb-4' onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                  <MDBBtn color='primary' className='btn-block' onClick={() => submitUserForm()}>
                    Submit
                  </MDBBtn>
                </form>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <h2>User List</h2>
          <div className='usersList'>

            {users.map((user, index) => (

              <div key={user._id} className='user'>
                <MDBCard>

                  <MDBCardHeader>{user.username}
                    <Dropdown>
                      <Dropdown.Toggle  style={{  cursor: "pointer" ,width:"0"}} className="align-self-start" >
                      <BsThreeDots />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </MDBCardHeader>

                  {showUserDetails[index] && (
                    <MDBCardBody>
                      <MDBCardText>Email: {user.email}</MDBCardText>
                      <MDBCardText>Phone: {user.phone}</MDBCardText>
                    </MDBCardBody>
                  )}
                  <MDBBtn onClick={() => toggleUserDetails(index)}>View Details</MDBBtn>
                </MDBCard>
              </div>
            ))}

          </div>
        </div>
      )}


    </div>
  );
};

export default Home;
