// import React from "react"
// import styled from "styled-components";

// const Project = () => {

//     return (
//         <ProjectContainer>

//             <p>project</p>

//         </ProjectContainer>

//     )

// }

// export default Project;

// const ProjectContainer = styled.div`

// position:absolute;
// left:700px;
// top:300px;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(apiKey);

  useEffect(() => {
    if (watch("country")) {
    //   axios
    //     .get(
    //       `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${watch(
    //         "country"
    //       )}`,
    //       {
    //         headers: {
    //           "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    //           "x-rapidapi-key": "08785c93ecmsh4074de3d9843d03p18379bjsnbaef2b736977",
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       setStates(response.data.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    const options = {
        method: 'GET',
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${watch(
                    "country"
                  )}`,
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      };
      
      try {
          const response =  axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
    }
  }, [watch("country")]);

  useEffect(() => {
    if (watch("state")) {
      axios
        .get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${watch(
            "country"
          )}/regions/${watch("state")}/cities`,
          {
            headers: {
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key": "08785c93ecmsh4074de3d9843d03p18379bjsnbaef2b736977",
            },
          }
        )
        .then((response) => {
          setCities(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [watch("country"), watch("state")]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ position: "absolute", left: "200px", top: "300px" }}>
        <label htmlFor="country">Select a country:</label>
        <select
          {...register("country", { required: true })}
          id="country"
          defaultValue=""
          onChange={(event) => {
            setValue("state", "");
            setValue("city", "");
          }}
        >
          <option value="">-- Select a country --</option>
          {countries.map((country) => (
            <option key={country.name.common} value={country.cca3}>
              {country.name.common}
            </option>
          ))}
        </select>
        {errors.country && <span>This field is required</span>}
      </div>

      {watch("country") && (
        <div style={{ position: "absolute", left: "300px", top: "400px" }}>
          <label htmlFor="state">Select a state:</label>
          <select
            {...register("state", { required: true })}
            id="state"
            defaultValue=""
            onChange={() => {
              setValue("city", "");
            }}
          >
            <option value="">-- Select a state --</option>
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && <span>This field is required</span>}
        </div>
       )} 

      {watch("state") && (
        <div>
          <label htmlFor="city">Select a city:</label>
          <select
            {...register("city", { required: true })}
            id="city"
            defaultValue=""
          >
            <option value="">-- Select a city --</option>
            {cities.map((city) => (
              <option key={city.city} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
          {errors.city && <span>This field is required</span>}
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
