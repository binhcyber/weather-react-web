import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [search, setSearch] = useState("Ho Chi Minh");
  const [classDegree, setClassDegree] = useState("weather");
  const [customBackground, setCustomBackground] = useState("bgWeather");
  console.log(search);
  const [data, setData] = useState(null);
  useEffect(() => {
    let geoApi = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=950e030c8b60c7670445859d6c9d8f84`;
    fetch(geoApi)
      .then((res) => res.json())
      .then((res) => {
        let { lat, lon } = {
          lat: res[0].lat,
          lon: res[0].lon,
        };
        console.log(lat, lon);
        getLocation(lat, lon);
      });
  }, [search]);
  const getLocation = async (lat, lon) => {
    let locationApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=950e030c8b60c7670445859d6c9d8f84`;
    let dataLocation = await fetch(locationApi).then((res) => res.json());
    console.log(setData(dataLocation));
    const getDegree = Math.floor(data.main.temp - 273.15);
    if (getDegree <= 20 && getDegree > 10) {
      setClassDegree("cool");
      setCustomBackground("coolBgWeather");
    }
    if (getDegree <= 10) {
      setClassDegree("cold");
      setCustomBackground("coldBgWeather");
    }
    if (getDegree > 20 && getDegree <= 30) {
      setClassDegree("warm");
      setCustomBackground("warmBgWeather");
    }
    if (getDegree > 30) {
      setClassDegree("hot");
      setCustomBackground("hotBgWeather");
    }
  };

  return (
    <div classname="App">
      <div className={customBackground}>
        <div className={classDegree}>
          <div className="weather__content">
            <div className="weather__search">
              <input
                className="search"
                type="text"
                name="search"
                id="search"
                placeholder="Your City..."
                onKeyUp={(e) => {
                  setSearch(e.target.value.trim());
                }}
              />
            </div>
            <div className="weather__info">
              <div className="countryside">
                <span className="capital">{data?.name}</span>
                <span>,</span>
                <span className="country">{data?.country}</span>
              </div>
              <p className="date">{new Date().toLocaleString("vi")}</p>
              <div className="temparature">
                <p className="degree">{Math.floor(data?.main.temp - 273.15)}</p>
                <sub>o</sub>
                <p className="c">C</p>
              </div>
              <h1 className="sky">
                {data?.weather[0] ? data.weather[0].main : ""}
              </h1>
              <div className="desciption">
                <div className="more__desc">
                  <i className="fa-solid fa-eye" />
                  <p className="visible">{data?.visibility + "(m)"}</p>
                </div>
                <div className="more__desc">
                  <i className="fa-solid fa-wind" />
                  <p className="wind__desc">{data?.wind.speed + "(m/s)"}</p>
                </div>
                <div className="more__desc">
                  <i className="fa-solid fa-cloud-sun" />
                  <p className="sun__desc">{data?.main.humidity + "(%)"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
