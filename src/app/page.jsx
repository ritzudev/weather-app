"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const images = {
  Clear: "/images/clear.png",
  Clouds: "/images/cloud.png",
  Mist: "/images/mist.png",
  Rain: "/images/rain.png",
  Snow: "/images/snow.png",
};

async function fetchWeather(cityName) {
  const APIKey = "11eb9e5837f88b03093c11de59e306be";
  try {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIKey}`
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error al realizar la petición:", error);
  }
}

export default function Home() {
  //const weather = await fetchWeather();
  const inputRef = useRef(null);
  const [weather, setWeather] = useState(null);
  const [isError, setError] = useState(false);

  const keyEnter = (event) => {
    if (event.key === "Enter") {
      handleButton();
    }
  };

  const handleButton = async () => {
    try {
      const data = await fetchWeather(inputRef.current.value);

      if (data.cod === "404") {
        setError(true);
      } else {
        setError(false);
        setWeather(data);
      }
    } catch (error) {
      console.error("Error al obtener el clima:", error);
    }
  };

  return (
    <main className="grid place-items-center w-full  min-h-screen bg-[#04263e] px-4">
      <section
        style={{
          height:
            inputRef.current === null || inputRef.current.value === ""
              ? "6rem"
              : isError
              ? "24rem"
              : "36rem",
        }}
        className="bg-white group text-[#04263e] px-8 rounded-3xl py-5 w-72 sm:w-96 flex flex-col justify-center items-center  hover:items-center gap-8 transition-all duration-1000  ease-out"
      >
        <div className="h-9 flex items-center gap-3 transition-all duration-700 ease-in-out">
          <span className="material-icons md-36  text-[#04263e]">fmd_good</span>
          <input
            className="text-xl outline-none text-[#04263e] w-32 sm:w-56 font-mono font-extrabold transition-all duration-1000  ease-out"
            placeholder="Enter Your Location"
            type="text"
            ref={inputRef}
            style={{ textTransform: "uppercase" }}
            onKeyDown={keyEnter}
          />
          <span
            onClick={handleButton}
            className="material-icons md-36  rounded-full text-[#04263e] bg-[#def4ff] p-1 hover:bg-[#04263e] hover:text-white transition-all duration-300 ease-linear"
          >
            search
          </span>
        </div>

        {inputRef.current === null ||
        inputRef.current.value === "" ? null : isError ? (
          <Image className="delay-300" src="/images/404.png" width={500} height={500} alt="404" />
        ) : (
          <div className="w-full flex flex-col gap-6 delay-300">
            <div className="flex transition-all items-center fade-in duration-1000 ease-out font-mono flex-col gap-6">
              <img
                className="w-52 sm:w-60   transition-all duration-1000 ease-out "
                src={images[weather.weather[0].main]}
              />
              <div className="text-black  flex-col flex items-center">
                <span className="text-6xl font-bold">
                  {Math.round(weather.main.temp)}°C{" "}
                </span>
                <span className="text-xl">
                  {weather.weather[0].description}
                </span>
              </div>
            </div>
            <div className=" justify-between w-full text-sm sm:text-xl font-bold flex  transition-all duration-1000 ease-out">
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M269.5 69.9c11.1-7.9 25.9-7.9 37 0C329 85.4 356.5 96 384 96c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 149.7 417 160 384 160c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4C42.8 92.6 61 83.5 75.3 71.6c11.1-9.5 27.3-10.1 39.2-1.7l0 0C136.7 85.2 165.1 96 192 96c27.5 0 55-10.6 77.5-26.1zm37 288C329 373.4 356.5 384 384 384c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 437.7 417 448 384 448c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 373.2 165.1 384 192 384c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0zm0-144C329 229.4 356.5 240 384 240c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 293.7 417 304 384 304c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.5 27.3-10.1 39.2-1.7l0 0C136.7 229.2 165.1 240 192 240c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z" />
                </svg>
                <span>
                  {weather.main.humidity}%
                  <br />
                  <span className="text-sm">Humidity</span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z" />
                </svg>

                <span>
                  {weather.wind.speed}km/h <br />
                  <span className="text-sm">Wind Speed</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/*  {isError ? <img src={images[404]} /> : null} */}

        {/* {inputRef.current != null && isError == false ? (
          
        ) : null} */}
      </section>
    </main>
  );
}
