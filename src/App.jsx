import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm,setSearchTerm] = useState("")
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`https://disease.sh/v3/covid-19/countries`);
      setCountries(res.data);
    };
    getData();
  }, []);
const handleChange = (e) =>{
  // console.log(searchTerm)
  setSearchTerm(e.target.value);
}

  return (
    <>
      <div className="navbar mb-10 shadow-lg bg-neutral text-neutral-content  sticky top-0 z-50 py-2">
          <h2 className="mx-auto text-3xl font-bold">Covid 19 Report Worldwide</h2>
      </div>
      <div className="container">
        <div className="form-control mb-5">
          <input
            type="text"
            placeholder="Search By a Country Name and Continent Name"
            className="input input-primary input-bordered"
            onChange={handleChange}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Country</th>
                <th>Population</th>
                <th>Total Cases</th>
                <th>Today's Cases</th>
                <th>Total Deaths</th>
                <th>Today's Deaths</th>
                <th>Continent</th>
              </tr>
            </thead>
            <tbody>
              {countries
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.country
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase()) ||
                    val.continent
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((item, i) => (
                  <tr key={i}>
                    <td>{item.country}</td>
                    <td>{item.population}</td>
                    <td>{item.cases}</td>
                    <td>{item.todayCases}</td>
                    <td>{item.deaths}</td>
                    <td>{item.todayDeaths}</td>
                    <td>{item.continent}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
