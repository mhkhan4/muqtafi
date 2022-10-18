import axios from "axios";
import {useState, useEffect}  from "react";

function GetData(data) {

    const [datas, setDatas] = useState([]);

    useEffect(() =>{ 
    const fetchData = () => {
    axios.get(`http://localhost:8080/api/${data}`).then(res =>{
    console.log(res);
    setDatas(res.data);
        });
    };
        fetchData();
    }, []);
      
    return datas;
}

export default GetData