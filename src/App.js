import { interpolateName } from "loader-utils";
import "./styles.css";
import React, { useState, useEffect } from "react";
export default function App() {
  const [fetchedData, setFetchedData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      console.log(data);
      setFetchedData(data);
    };
    fetchData();
  }, []);

  const handleInput = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
    // let temp = e.target.value;

    // console.log(fetchedData.filter((item)=>{
    //   return item.email.toLowerCase() == temp.toLowerCase()
    // }))
  };
  useEffect(() => {
    if (fetchedData) {
      setFilteredData(
        fetchedData.filter((item) =>
          item.email.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [searchInput]);

  return (
    <div className="App">
      {fetchedData && <input onChange={handleInput} value={searchInput} />}
      {filteredData &&
        filteredData.map((item) => {
          return (
            <div style={{ border: "1px solid black", marginBottom: "20px" }}>
              <ul>
                <li>{item.name}</li>
                <li>{item.email}</li>
                <li>{item.phone}</li>
              </ul>
            </div>
          );
        })}
    </div>
  );
}
