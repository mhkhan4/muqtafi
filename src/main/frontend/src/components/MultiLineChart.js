import React, { Component } from 'react'
import Chart from 'react-google-charts'
import GetDataWithoutValue from '../restApiMethods/GetDataWithoutValue';

const GetLineData = (points) =>{
    let lineData = [];
    let users = ['x'];
    
    for (const userId in points){
        users.push(points[userId][0]);
    }
    lineData.push(users);
    lineData.push([0, 0, 0, 0]);

    for (const userId in points){
        //use weeks
        //each task when it's done it should have the date assigned to it
    }


    console.log(lineData);
    
}
const LineData = [
  ['x', 'dogs', 'cats', 'tiger'],
  [0, 0, 0, 0],
  [1, 10, 5, 12],
  [2, 23, 15, 12],
  [3, 17, 9, 19],
  [4, 18, 10, 6],
  [5, 9, 5, 110],
  [6, 11, 3, 12],
  [7, 27, 19, 4],
  [8, 27, 19, 4],
]
const LineChartOptions = {
  hAxis: {
    title: 'Week',
  },
  vAxis: {
    title: 'Points',
  },
  series: {
    1: { curveType: 'function' },
  },
}
function MultiLineChart(points) {
    delete points['0'];
    return (
      <div className="container mt-5">
        <h2>Performance comparison of users</h2>
        <Chart
          width={'700px'}
          height={'410px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={GetLineData(points)}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
    )
}
export default MultiLineChart