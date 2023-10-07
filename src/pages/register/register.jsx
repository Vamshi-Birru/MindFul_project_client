import React, { useState } from 'react';
import "./Register.css";
import axios from 'axios';
import { useNavigate } from 'react-router';

function App() {
  // Step 1: Define state variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(''); // Initialize to an empty string
  const [hearAbout, setHearAbout] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
  // Step 2: Define functions to handle form input changes
  const handleNameChange = (e) => {
    // Allow only alphabets in the name field
    const value = e.target.value.replace(/[^A-Za-z ]/g, '');
    setName(value);
  };

  const handleEmailChange = (e) => {
    // Allow alphanumeric characters in the email field
    const value = e.target.value.replace(/[^A-Za-z0-9@.]/g, '');
    setEmail(value);
  };

  const handlePhoneChange = (e) => {
    // Allow only numbers in the phone field
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleHearAboutChange = (e) => {
    const value = e.target.value;
    const updatedHearAbout = [...hearAbout];

    if (updatedHearAbout.includes(value)) {
      // Remove if already selected
      const index = updatedHearAbout.indexOf(value);
      if (index !== -1) {
        updatedHearAbout.splice(index, 1);
      }
    } else {
      // Add to the list if not already selected
      updatedHearAbout.push(value);
    }

    setHearAbout(updatedHearAbout);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };
  const handlePassword=(e)=>{
    setPassword(e.target.value);
  }

  // Step 3: Define a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response=await axios.post("https://mindful-project-backend.onrender.com/register",{name,email,phone,gender,hearAbout,city,state,password});
        alert("Successfully registered");
        GotoLogin();
    }
    catch(err){
        console.log("error: ",err);
    }

    // You can send the data to your server or perform any other necessary actions here.
  };
  const GotoLogin=()=>{
  
    navigate('/');
}
  return (
    <div className='container'>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>

        <div className='name'>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>

        <div className='email'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className='phone'>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </div>

        <div className='gender'>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              value="Male"
              checked={gender === 'Male'}
              onChange={handleGenderChange}
              required
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={gender === 'Female'}
              onChange={handleGenderChange}
              required
            />{' '}
            Female
          </label>
          <label>
            <input
              type="radio"
              value="Others"
              checked={gender === 'Others'}
              onChange={handleGenderChange}
              required
            />{' '}
            Others
          </label>
        </div>

        <div className='about'>
          <label>How did you hear about this?</label>
          <label>
            <input
              type="checkbox"
              value="LinkedIn"
              checked={hearAbout.includes('LinkedIn')}
              onChange={handleHearAboutChange}
            />
            LinkedIn
          </label>
          <label>
            <input
              type="checkbox"
              value="Friends"
              checked={hearAbout.includes('Friends')}
              onChange={handleHearAboutChange}
            />
            Friends
          </label>
          <label>
            <input
              type="checkbox"
              value="Job Portal"
              checked={hearAbout.includes('Job Portal')}
              onChange={handleHearAboutChange}
            />
            Job Portal
          </label>
          <label>
            <input
              type="checkbox"
              value="Others"
              checked={hearAbout.includes('Others')}
              onChange={handleHearAboutChange}
            />
            Others
          </label>
        </div>

        <div className='city'>
          <label>City:</label>
          <select value={city} onChange={handleCityChange} required>
            <option value="">Select a city</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
          </select>
        </div>

        <div>
          <label>State:</label>
          <input
          className='state'
            type="text"
            value={state}
            onChange={handleStateChange}
            required
            list="state-suggestions"
          />
          <datalist id="state-suggestions">
            <option value="Gujarat" />
            <option value="Maharashtra" />
            <option value="Karnataka" />
          </datalist>
        </div>
        <div className="password">
        <input type="password" className="password" placeholder='Password' onChange={(e)=>handlePassword(e)} />
            </div>
        <div>
          <button className='save' type="submit">Save</button>
        </div>
        
      </form>
    </div>
  );
}

export default App;
