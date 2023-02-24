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

  const onAddCity = () => {
    if (city !== "" && cities.includes(city) == 0) setCitites([...cities, city]);

    if (cities.includes(city) ) { 
      let deletedCity = '';
      deletedCity = cities.indexOf(city) 
      // console.log(deletedCity)
      (...cities.splice(deletedCity, 1))
      // delete cities[deletedCity]
      // console.log(cities)
    }
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
    <div className="flex flex-row justify-center">
      <div className="flex w-3/4 flex-row items-center justify-center space-x-4">
        <select
          id="selectCity"
          className="w-5 cursor-pointer py-[7px] text-xl capitalize focus:outline-none"
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
          className="cursor-pointer text-white transition hover:scale-125 hover:animate-ping"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={40}
          className="cursor-pointer text-white transition hover:scale-125 hover:animate-bounce"
          onClick={handleLocationClick}
        />
        <UilPlusSquare
          size={40}
          className="cursor-pointer text-white transition ease-out  hover:animate-spin-slow active:text-green-400"
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
