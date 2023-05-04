import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../style/globalStyle.css";


const countries = [
    { name: "USA", states: ["California", "Texas", "Florida"] },
    { name: "Canada", states: ["Ontario", "Quebec", "British Columbia"] },
    { name: "Mexico", states: ["Jalisco", "Mexico City", "Nuevo León"] }
  ];
  
  const statesByCountry = {
    USA: [
      { name: "California", cities: ["Los Angeles", "San Francisco", "San Diego"] },
      { name: "Texas", cities: ["Houston", "Austin", "Dallas"] },
      { name: "Florida", cities: ["Miami", "Orlando", "Tampa"] }
    ],
    Canada: [
      { name: "Ontario", cities: ["Toronto", "Ottawa", "Hamilton"] },
      { name: "Quebec", cities: ["Montreal", "Quebec City", "Gatineau"] },
      { name: "British Columbia", cities: ["Vancouver", "Victoria", "Burnaby"] }
    ],
    Mexico: [
      { name: "Jalisco", cities: ["Guadalajara", "Zapopan", "Tlaquepaque"] },
      { name: "Mexico City", cities: ["Mexico City", "Nezahualcoyotl", "Ecatepec"] },
      { name: "Nuevo León", cities: ["Monterrey", "San Nicolás de los Garza", "Apodaca"] }
    ]
  };

const Employee = () => {
    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        age: Yup.string().required("Age is required"),
        sex: Yup.string().required("gender is required"),
        mobile: Yup.string()
          .matches(/^[6-9]\d{9}$/, 'Invalid Indian mobile number')
          .required('Mobile number is required'),
          idType: Yup.string().required('ID Type is required'),
        //   govId: Yup.string()
        //     .when('idType', {
        //       is: 'Aadhar',
        //       then: Yup.string()
        //         .matches(/^[0-9]+$/, 'Must be a valid 12-digit numeric string')
        //         .required('Govt ID is required'),
        //     //   otherwise: Yup.string()
        //     })
        //     .when('idType', {
        //       is: 'PAN',
        //       then: Yup.string()
        //         .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Must be a valid 10-digit alpha-numeric string')
        //         .required('Govt ID is required')
        //     }),
        guardianName: Yup.string(),
        email: Yup.string().email('Invalid email address'),
        emergencyContact: Yup.string()
          .matches(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
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

  const handleCountryChangee = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChangee = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
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

    const onSubmithandler = async (data) => {
        console.log(data);
        // try {
        //   const response = await axios.post('https://example.com/api/user', data);
        //   console.log(response);
        // } catch (error) {
        //   console.error(error);
        // }
    };

    const handleCancel = () => {
        console.log("cancel");
    };

    const handleCountryChange = async (event) => {
        const selectedCountry = event.target.value;
        const { data } = await axios.get(
            `https://example.com/api/countries/${selectedCountry}/states`
        );
        setStates(data.states);
    };

    const handleStateChange = async (event) => {
        const selectedState = event.target.value;
        const { data } = await axios.get(
            `https://example.com/api/states/${selectedState}/cities`
        );
        setCities(data.cities);
    };

    const [states, setStates] = React.useState([]);
    const [cities, setCities] = React.useState([]);

    const idType = watch("idType");

    return (
        <form
            onSubmit={handleSubmit(onSubmithandler)}
            style={{
                // position: 'absolute',
                // left: '200px',
                // top: '110px',
                border: "1px solid red",
                margin: "100px auto",
                // width:'80%'
                zIndex: "99999",
                width: "80%",
            }}
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
                <div>
                    <input type="text" {...register("name")} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div>
                    <label>Date of birth or Age</label>
                </div>
                <div>
                    <input
                        type="text"
                        {...register("age")}
                        placeholder="dd/mm/yyyy or age in years"
                    />
                    {errors.age && <p>{errors.age.message}</p>}
                </div>
                <div>
                    <label>Sex</label>
                </div>
                <div>
                    <select {...register("sex")}>
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    {errors.sex && <p>{errors.sex.message}</p>}
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
                    <input type="tel" {...register("mobile")} />
                    {errors.mobile && <p>{errors.mobile.message}</p>}
                </div>
                <div>
                    <label>Govt Issue ID</label>
                </div>
                <div>
                    <select {...register("idType")}>
                        <option value="">Select</option>
                        <option value="Aadhar">Aadhar</option>
                        <option value="PAN">PAN</option>
                    </select>
                    {errors.idType && <p>{errors.idType.message}</p>}
                </div>
                <label>Enter Government ID</label>
                <input type="text" {...register("govId")} />
                {errors.govId && <p>{errors.govId.message}</p>}
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
                    <select {...register("contactType")}>
                        <option value="">Select</option>
                        <option value="Personal">mother</option>
                        <option value="Business">father</option>
                        <option value="Business">brother</option>
                        <option value="Business">sister</option>
                    </select>
                </div>

                <div>
                    <input type="text" {...register("guardianName")} />
                </div>
                <div>
                    <label>Email</label>
                </div>
                <div>
                    <input type="email" {...register("email")} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Emergency Contact Number</label>
                </div>
                <div>
                    <input type="tel" {...register("emergencyContact")} />
                    {errors.emergencyContact && <p>{errors.emergencyContact.message}</p>}
                </div>
            </div>
            <h2>Address Details</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0px' }}>
                <div>
                    <label>Address</label>
                </div>
                <div>
                    <input type="text" {...register("address")} />
                </div>
                <div>
                    <label>State</label>
                </div>
                <div>
                    <select {...register("state")} onChange={handleStateChangee}>
                    {/* <select  onChange={handleStateChangee}> */}
                        <option value="">Select</option>
                        {/* {states.map((state) => (
                            <option key={state.code} value={state.code}>
                                {state.name}
                            </option>
                        ))} */}
                        {stateOptions}
                    </select>
                </div>
                <div>
                    <label>City</label>
                </div>
                <div>
                    <select {...register("city")}>
                    {/* <select onChange={(e) => setSelectedCity(e.target.value)}> */}
                        <option value="">Select</option>
                        {/* {cities.map((city) => (
                            <option key={city.code} value={city.code}>
                                {city.name}
                            </option>
                        ))} */}
{cityOptions}
                    </select>
                </div>
                <div>
                    <label>Country</label>
                </div>
                <div>
                    <select {...register("country")} onChange={handleCountryChangee}>
                    {/* <select   onChange={handleCountryChangee}> */}
                        <option value="">Select</option>
                        {/* {COUNTRIES.map((country) => (
      <option key={country.code} value={country.code}>
        {country.name}
      </option>
    ))} */}{countryOptions}
                    </select>

                </div>
                <div>
                    <label>Pincode</label>
                </div>
                <div>
                    <input type="text" {...register("pincode")} />
                </div>
            </div>
            <h2>Other Details</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0px' }}>
                <div>
                    <label>Occupation</label>
                </div>
                <div>
                    <input type="text" {...register("occupation")} />
                </div>
                <div>
                    <label>Religion</label>
                </div>
                <div>
                    <select {...register("religion")}>
                        <option value="">Select</option>
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
                    <select {...register("maritalStatus")}>
                        <option value="">Select</option>
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
                    <select {...register("bloodGroup")}>
                        <option value="">Select</option>
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
            <div style={{ display: 'flex' }}>
                <div>
                    <label>Nationality</label>
                </div>

                <div style={{ marginLeft: '90px' }}>
                    <select {...register("nationality")}>
                        <option value="">Select</option>
                        <option value="Indian">Indian</option>
                        <option value="American">American</option>
                        <option value="British">British</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Korean">Korean</option>
                    </select>
                </div>
            </div>
            <div className="button-container" style={{ float: 'right' }}>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default Employee;
