import React, {useReducer}  from "react";
import Navbar from "./Navbar";
import useGetData from "../restApiMethods/GetData";
import "./Tracker.css";
import MultiLineChart from "./MultiLineChart";

const getWeekNumber = (startDate) =>{
    function getWeeksDiff(startDate, endDate) {
        const msInWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.round(Math.abs(endDate - startDate) / msInWeek);
    }

    if(typeof startDate !== 'undefined'){
      startDate = Object.keys(startDate)[0];
    }
    // let currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();

    return getWeeksDiff(new Date(startDate), new Date());
 
}

function Tracker() {
  const [value, setValue] = useReducer(x=> x+1,0);
  const points = useGetData("graph", value);  
    return (
      <div>
          <Navbar />
          <div className="idea-design">
              <h1 className="header">Week - {getWeekNumber(points["0"])}</h1>
              {MultiLineChart(points)}
          </div>
      </div>
    )
}

export default Tracker