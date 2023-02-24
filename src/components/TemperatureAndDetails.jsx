import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilPlusSquare,
  UilSetting,
  UilWheelBarrow,
  UilWheelchair,
  UilWheelchairAlt,
} from "@iconscout/react-unicons";
import { iconUrlFromCode } from "../services/weatherService";
import { formatLocalTime } from "../services/weatherService";

export default function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div
        className="
        flex items-center justify-center py-3 
        text-xl text-cyan-300"
      >
        <p>{details}</p>
      </div>

      <div
        className="
        lfex-row flex items-center 
        justify-between py-3 text-white"
      >
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div
            className="flex items-center justify-center text-sm
                font-light"
          >
            <UilSetting
              size={30}
              className="mr-1 cursor-pointer text-white transition ease-out hover:animate-spin-slow active:text-green-400"
            />
          </div>
          <div
            className="flex items-center justify-center text-sm
                font-light"
          >
            <UilTemperature size={18} className="mr-1" />
            Real fell:
            <span className="ml-1 font-medium">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div
            className="flex items-center justify-center text-sm
                font-light"
          >
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="ml-1 font-medium">{`${humidity.toFixed()}%`}</span>
          </div>
          <div
            className="flex items-center justify-center text-sm
                font-light"
          >
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="ml-1 font-medium">{`${speed.toFixed()}km/h`}</span>
          </div>
        </div>
      </div>

      <div
        className="felx-row flex items-center justify-center 
        space-x-2 py-1 text-sm text-white"
      >
        <UilSun />
        <p className="font-light">
          Rise: <span>{formatLocalTime(sunrise, timezone, "hh:mm a")}</span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">
          Set: <span>{formatLocalTime(sunset, timezone, "hh:mm a")}</span>
        </p>
        <p className="font-light">|</p>

        <UilSun />
        <p className="font-light">
          High: <span>{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <UilSun />
        <p className="font-light">
          Low <span>{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}
