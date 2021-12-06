import React, { useContext, useEffect, useState } from "react";
import "./style/Nav.scss";
import { UserContext } from "./context/userContext";

const Navigation = () => {
  const { item, setItem } = useContext(UserContext);
  const [today, setDate] = useState(new Date());
  const [theDay, setTheDay] = useState(new Date());
  // Save the current date to be able to trigger an update

  React.useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      setDate(new Date());
    }, 1000 * 60);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  useEffect(() => {
    if (theDay.getDay() !== today.getDay()) {
      let people = JSON.parse(item);

      let myPerson = people.map((item) => {
        item.condition = null;
        return item;
      });
      setItem(JSON.stringify(myPerson));
      setTheDay(today);
    }
  }, [today]);

  return (
    <div className="navigation">
      <p>Attendance</p>
      <p>{today.toDateString()}</p>
    </div>
  );
};

export default Navigation;
