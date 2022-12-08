import React from 'react'
import Chart from 'react-google-charts'

function getIndexOfUsers(users){
  let indexOfUsers = {};
  for (let i = 0; i < users.length;i++){
    indexOfUsers[users[i]] = i;
  }
  return indexOfUsers;
}
const GetLineData = (points) =>{
    let lineData = [];
    let users = ['x'];

    for (const weekNum in points){
        for(const user of Object.keys(points[weekNum])){
          if(!users.includes(user)){
            users.push(user);
          }
        }
    }
    lineData.push(users);
    let addZeroes = []
    for(let i = 0; i < users.length;i++){
      addZeroes.push(0);
    }
    lineData.push(addZeroes);

    const indexOfUsers = getIndexOfUsers(users);

    for (const weekNum in points){
      let tempArr = [];
      tempArr[0] = parseInt(weekNum);
      if(typeof points[weekNum] != 'undefined'){
        for(const name of Object.keys(points[weekNum])){
          tempArr[indexOfUsers[name]] = points[weekNum][name];
        }
      }
      lineData.push(tempArr);
    }



    return lineData;
    
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