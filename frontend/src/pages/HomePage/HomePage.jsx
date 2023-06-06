import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";


const HomePage = () => {
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]); 




  useEffect(() => {
    const fetchCars = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/user_cars", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchCars();

  }, [token]);

  console.log(cars)

  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      <Link to="/add">
        <p>click to add new car</p>
      </Link>
      <Link to="/search">
        <p>click to search</p>
      </Link>
      <Link to="/favorites">
        <p>Favorites Page</p>
      </Link>
      <Link to="/add_review">
        <p>Review Form</p>
      </Link>


      {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))}

    </div>
  );
};

export default HomePage;