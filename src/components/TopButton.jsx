import React from "react";

export default function TopButton({setQuery}) {
  const cities = [
    {
      id: 1,
      title: "Moscow",
    },
    {
      id: 2,
      title: "Saint Petersburg",
    },
    {
      id: 3,
      title: "Simferopol",
    },
    {
      id: 4,
      title: "Sevastopol",
    },
  ];

  return (
    <div className="my-1 flex items-center justify-around">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-lg font-medium text-white"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}
