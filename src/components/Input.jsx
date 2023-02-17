import React, { useReducer, useState } from "react";
import {
  UilSearch,
  UilLocationPoint,
  UilPlusSquare,
} from "@iconscout/react-unicons";
import { toast } from "react-toastify";

export default function Input({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");
  const [cities, setCitites] = useState([]);

//   const handleFormSubmit = () => {
//   const { city1, cities1 } = this.state;
//   localStorage.setItem('city1')
//   localStorage.setItem('cities1')
// }

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

  // const handleChange = (event) => {
  //   this.setState({ value: event.target.value });
  // };

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

  // const handleSearchClickSelected = (event) => {
  //   // if (city !== "") setQuery({ q: cities.city });
  //   this.setState({ value: event.target.value });
  // };

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
    <div className="flex flex-row justify-center">
      <div className="flex w-3/4 flex-row items-center justify-center space-x-4">
        <select
          id="selectCity"
          className="w-5 py-[7px] text-xl capitalize focus:outline-none cursor-pointer"
          onChange={(e) => setCity(e.currentTarget.value)}
          onClick={handleSearchClick}
        >
          <option value="" className="font-light" onChange={handleSearchClick}>
            Select city
          </option>
          {cities.map((city) => (
            <option
              className="list-none font-light"
              key={city}
              name={city}
              onChange={() => setQuery({ q: city })}
              // onClick={handleSearchClick}
            >
              {city}
            </option>
          ))}
        </select>
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city...."
          className="w-full p-2 text-xl font-light capitalize shadow-xl placeholder:lowercase focus:outline-none"
        />
        <UilSearch
          size={40}
          className="cursor-pointer text-white transition ease-out hover:scale-125 hover:animate-ping"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={40}
          className="cursor-pointer text-white transition ease-out hover:scale-125 hover:animate-bounce"
          onClick={handleLocationClick}
        />
        <UilPlusSquare
          size={40}
          className="cursor-pointer text-white transition ease-out hover:scale-125 hover:animate-spin-slow"
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
