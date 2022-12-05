import axios from "axios";
import {useState, useEffect}  from "react";

function GetDataWithoutValue(data) {

    const [datas, setDatas] = useState([]);

    const fetchData = () => {
        axios.get(`http://localhost:8080/api/${data}`).then(res =>{
        console.log(res);
        setDatas(res.data);
            });
    };
    useEffect(() =>{
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
      
    return datas;
}

export default GetDataWithoutValue