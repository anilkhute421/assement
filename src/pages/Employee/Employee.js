import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../style/globalStyle.css";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const countries = [
  { name: "USA", states: ["California", "Texas", "Florida"] },
  { name: "Canada", states: ["Ontario", "Quebec", "British Columbia"] },
  { name: "Mexico", states: ["Jalisco", "Mexico City", "Nuevo León"] },
  { name: "India", states: ["Chhattisgarh", "Maharastra", "Madhye Pardesh"] },
  { name: "Paksitan", states: ["Jalisco", "Mexico City", "Nuevo León"] },
  { name: "Uk", states: ["Jalisco", "Mexico City", "Nuevo León"] },
];

const statesByCountry = {
  USA: [
    {
      name: "California",
      cities: ["Los Angeles", "San Francisco", "San Diego"],
    },
    { name: "Texas", cities: ["Houston", "Austin", "Dallas"] },
    { name: "Florida", cities: ["Miami", "Orlando", "Tampa"] },
  ],
  Canada: [
    { name: "Ontario", cities: ["Toronto", "Ottawa", "Hamilton"] },
    { name: "Quebec", cities: ["Montreal", "Quebec City", "Gatineau"] },
    { name: "British Columbia", cities: ["Vancouver", "Victoria", "Burnaby"] },
  ],
  Mexico: [
    { name: "Jalisco", cities: ["Guadalajara", "Zapopan", "Tlaquepaque"] },
    {
      name: "Mexico City",
      cities: ["Mexico City", "Nezahualcoyotl", "Ecatepec"],
    },
    {
      name: "Nuevo León",
      cities: ["Monterrey", "San Nicolás de los Garza", "Apodaca"],
    },
  ],
  India: [
    { name: "Chhattisgarh", cities: ["Raipur", "Bilaspur", "kawardha"] },
    {
      name: "Maharastra",
      cities: ["pune", "Nagpur", "mumbai"],
    },
    {
      name: "Madhye Pardesh",
      cities: ["satna", "gunjel", "jabalpur"],
    },  
  ],
  Paksitan: [
    { name: "Chhattisgarh", cities: ["Raipur", "Bilaspur", "kawardha"] },
    {
      name: "Maharastra",
      cities: ["pune", "Nagpur", "mumbai"],
    },
    {
      name: "Madhye Pardesh",
      cities: ["satna", "gunjel", "jabalpur"],
    },  
  ],
  Uk: [
    { name: "Chhattisgarh", cities: ["Raipur", "Bilaspur", "kawardha"] },
    {
      name: "Maharastra",
      cities: ["pune", "Nagpur", "mumbai"],
    },
    {
      name: "Madhye Pardesh",
      cities: ["satna", "gunjel", "jabalpur"],
    },  
  ],
};

const Employee = () => {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.string().required("Age is required"),
    sex: Yup.string().required("G ender is required"),
    idType: Yup.string().required("ID Type is required"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(phoneRegExp, "Invalid Indian mobile number"),
        govId: Yup.string()
        .when('idType', {
            is: (val) => val === 'Aadhar',
            then: (schema) => schema.required('Aadhar no. is required').matches(/^[0-9]{12}$/, 'Invalid Aadhar number')
        })
        .when('idType', {
          is: (val) => val === 'PAN',
          then: (schema) => schema.required('Pan No. is required').matches(/^[A-Za-z0-9]{10}$/, 'Invalid pan number')
        }),
    guardianName: Yup.string(),
    email: Yup.string().email("Invalid email address"),
    emergencyContact: Yup.string().required("Mobile number is required")
    .matches(phoneRegExp,"Invalid Indian mobile number"),
    address: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    country: Yup.string(),
    pincode: Yup.string(),
    occupation: Yup.string(),
    religion: Yup.string(),
    maritalStatus: Yup.string(),
    bloodGroup: Yup.string(),
    nationality: Yup.string(),
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCountryChangee = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleStateChangee = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const countryOptions = countries.map((country) => (
    <option key={country.name} value={country.name}>
      {country.name}
    </option>
  ));

  const stateOptions =
    selectedCountry &&
    statesByCountry[selectedCountry].map((state) => (
      <option key={state.name} value={state.name}>
        {state.name}
      </option>
    ));

  const cityOptions =
    selectedState &&
    statesByCountry[selectedCountry]
      .find((state) => state.name === selectedState)
      .cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const user_register = process.env.REACT_APP_API_KEY+'/api/v1/signup_manually'


  const onSubmithandler = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post(user_register, data);
      toast.success('Your Data Succsufully Submit');
      setLoading(false);
      setTimeout(() => {
        navigate("view-user");
      }, 3000);
    } catch (error) {
      toast.error('Somthing Went Wrong');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("cancel");
    reset();

  };

 
  return (
    <form
      onSubmit={handleSubmit(onSubmithandler)}
      style={{
        margin: "100px 0px 20px 270px",
        width: "80%",
      }}
      id='create-course-form'
    >
      <h2>Personal Details</h2>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <label>Name</label>
        </div>
        <div >
          <input type="text" {...register("name")} className="inputStyle" placeholder="Name"/>
          {errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Date of birth or Age</label>
        </div>
        <div>
          <input
            type="text"
            {...register("age")}
            placeholder="dd/mm/yyyy or age in years"
          className="inputStyle"/>
          {errors.age && <p style={{color:'red'}}>{errors.age.message}</p>}
        </div>
        <div>
          <label>Sex</label>
        </div>
        <div>
          <select {...register("sex")} className="inputStyle">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {errors.sex && <p style={{color:'red'}}>{errors.sex.message}</p>}
        </div>
      </div>

      <div
        style={{
          margin: "20px 0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <label>Mobile</label>
        </div>
        <div>
          <input type="tel" {...register("mobile")} className="inputStyle" placeholder="mobile"/>
          {errors.mobile && <p style={{color:'red'}}>{errors.mobile.message}</p>}
        </div>
        <div>
          <label>Govt Issue ID</label>
        </div>
        <div>
          <select {...register("idType")}className="inputStyle">
            <option value="">Select Id</option>
            <option value="Aadhar">Aadhar</option>
            <option value="PAN">PAN</option>
          </select>
          {errors.idType && <p style={{color:'red'}}>{errors.idType.message}</p>}
        </div>
        <div>
        <label>Enter Government ID</label>
        </div>
        <div>
        <input type="text" {...register("govId")}className="inputStyle" placeholder="Enter Government ID"/>
        <div>
        {errors.govId && <p style={{color:'red'}}>{errors.govId.message}</p>}
        </div>
        </div>
      </div>
      <h2>Contact Details</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0px",
        }}
      >
        <div>
          <label>Guardian Deatils</label>
        </div>
        <div>
          <select {...register("contactType")}className="inputStyle">
            <option value="">Guardian Deatils</option>
            <option value="mother">mother</option>
            <option value="father">father</option>
            <option value="brother">brother</option>
            <option value="sister">sister</option>
          </select>
        </div>

        <div>
          <input type="text" {...register("guardianName")} className="inputStyle" placeholder="Guardian Name"/>
        </div>
        <div>
          <label>Email</label>
        </div>
        <div>
          <input type="email" {...register("email")} className="inputStyle" placeholder="Email"/>
          {errors.email && <p style={{color:'red'}}>{errors.email.message}</p>}
        </div>
        <div>
          <label>Emergency Contact Number</label>
        </div>
        <div>
          <input type="tel" {...register("emergencyContact")} className="inputStyle" placeholder="Emergency Contact Number"/>
          {errors.emergencyContact && <p style={{color:'red'}}>{errors.emergencyContact.message}</p>}
        </div>
      </div>
      <h2>Address Details</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0px",
        }}
      >
        <div>
          <label>Address</label>
        </div>
        <div>
          <input type="text" {...register("address")} className="inputStyle" placeholder="Address"/>
        </div>
        <div>
          <label>State</label>
        </div>
        <div>
          <select {...register("state")} onChange={handleStateChangee} className="inputStyle">
            <option value="">Select State</option>
            {stateOptions}
          </select>
        </div>
        <div>
          <label>City</label>
        </div>
        <div>
          <select {...register("city")} onChange={handleCityChange} className="inputStyle">
            <option value="">Select city</option>
            {cityOptions}
          </select>
        </div>
        <div>
          <label>Country</label>
        </div>
        <div>
          <select {...register("country")} onChange={handleCountryChangee} className="inputStyle">
            <option value="">Select Country</option>
            {countryOptions}
          </select>
        </div>
        <div>
          <label>Pincode</label>
        </div>
        <div>
          <input type="text" {...register("pincode")} className="inputStyle" placeholder="Pincode"/>
        </div>
      </div>
      <h2>Other Details</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0px",
        }}
      >
        <div>
          <label>Occupation</label>
        </div>
        <div>
          <input type="text" {...register("occupation")} className="inputStyle" placeholder="Occupation"/>
        </div>
        <div>
          <label>Religion</label>
        </div>
        <div>
          <select {...register("religion")} className="inputStyle">
            <option value="">Select Religion</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
            <option value="Sikh">Sikh</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Jain">Jain</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Marital Status</label>
          </div>
          <div>
          <select {...register("maritalStatus")} className="inputStyle">
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
            <option value="Separated">Separated</option>
          </select>
        </div>
        <div>
          <label>Blood Group</label>
        </div>
        <div>
          <select {...register("bloodGroup")} className="inputStyle">
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <label>Nationality</label>  
        </div>

        <div style={{ marginLeft: "35px" }}>
          <select {...register("nationality")} className="inputStyle">
            <option value="">Select Nationality</option>
            <option value="Indian">Indian</option>
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
          </select>
        </div>
      </div>
      <div className="button-container" style={{ float: "right" }}>
        <button type="button" onClick={handleCancel} className="inputStyle">
          Cancel
        </button>
        
        <button type="submit" className="inputStyle">{loading ?
              <div className="loadingWrapper">
                <CircularProgress sx={{ color: "#f55a2c" }} />
              </div>
              :  'Submit' }</button>

      </div>
    </form>
  );
};

export default Employee;
