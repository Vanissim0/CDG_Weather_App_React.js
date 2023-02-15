import React, { useReducer, useState } from "react";
import { UilSearch, UilLocationPoint, UilPlusSquare } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

export default function Input({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");
  const [cities, setCitites] = useState([]);
  // const [state, dispatch] = useReducer(
  //   (state, action) => {
  //     switch (action.type) {
  //       case "ADD_CITY":
  //         return {
  //           ...state,
  //           cities: [...state.cities, state.city],
  //           city: "",
  //         };
  //       case "ADD_FORECAST":;
      
          
  //       default:
  //         return state;
  //     }
  //   },
  //   {
  //     cities: [],
  //     city: "",
  //   }
  // );

  const onAddCity = () => {
    setCitites([...cities, city]);
  };

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="my-4 flex flex-row justify-center">
      <div className="flex w-3/4 flex-row items-center justify-center space-x-4">
        {/* {state.cities.map((city) => ( */}
        {cities.map((city) => (
          <li key={city}>{city}</li>
        ))}
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city...."
          className="w-full p-2 text-xl font-light capitalize shadow-xl placeholder:lowercase focus:outline-none"
        />
        <UilSearch
          size={25}
          className="cursor-pointer text-white transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="cursor-pointer text-white transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
        {/* <button onClick={() => dispatch({type:'ADD_CITY'})}>add</button> */}
        {/* <button onClick={onAddCity}>add</button> */}
        <UilPlusSquare 
        className="cursor-pointer text-white transition ease-out hover:scale-125"
          onClick={onAddCity}
        />
      </div>

      <div className="flex w-1/4 flex-row items-center justify-center">
        <button
          name="metric"
          className="text-xl font-light text-white transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="mx-1 text-xl text-white">|</p>
        <button
          name="imperial"
          className="text-xl font-light text-white transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}
