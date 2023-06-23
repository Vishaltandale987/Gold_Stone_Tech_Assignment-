import React, { useEffect, useState } from "react";
import axios from "axios";
import All_card from "./All_card";
import { Button } from "@chakra-ui/react";
function Invenrty() {
  const [getdata, setgetdata] = useState();

  // console.log(getdata)
  const getPost = async () => {
    try {
      const res = await axios();
      // `http://localhost:8088/all`
      setgetdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const handle_download = async () => {
    try {
      const res = await axios.get(`http://localhost:8088/dataFile`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [csvData, setCsvData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8088/dataFile", {
          responseType: "blob", // Specify response type as blob to handle binary data
        });

        const blob = new Blob([response.data], { type: "text/csv" });
        const csvUrl = URL.createObjectURL(blob);

        setCsvData(csvUrl);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>

      <a href={csvData} download="DataFile.csv" className="download" >
        <b> Download CSV File </b>
      </a>
    <div className="inventry">

        

      {getdata?.map((el, index) => {
        return <All_card key={index} data={el} getPost={getPost} />;
      })}
    </div>
      </div>
  );
}

export default Invenrty;
