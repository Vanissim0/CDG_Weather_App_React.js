import "./App.css";
// import TopButton from "./components/TopButton";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
// import getWeatherData from './services/weatherService';
import getFormattedWeatherData from "./services/weatherService";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "sevastopol" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-500 to blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-500 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };
  // from-cyan-500 to-blue-700
  return (
    <div
      className={`mx-auto mt-4 h-fit max-w-screen-md bg-gradient-to-br from-green-400 to-blue-700 py-5 px-32 shadow-3xl
    shadow-gray-400 ${formatBackground()}`}
    >
      {/* <TopButton setQuery={setQuery} /> */}

      <Input setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />

          <TemperatureAndDetails weather={weather} />

          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}

      {/* <ToastContainer autoClose={4000} theme="colored" newestOnTop={true} position="bottom-right" /> */}
    </div>
  );
}

export default App;
