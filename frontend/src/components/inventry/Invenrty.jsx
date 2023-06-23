import React, { useEffect, useState } from 'react'
import axios from "axios";
import All_card from './All_card';
function Invenrty() {

    const [getdata, setgetdata] = useState()

    // console.log(getdata)
    const getPost = async () => {
        try {
          const res = await axios(
            `http://localhost:8088/all`
          );
          setgetdata(res.data)
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getPost()
      }, [])
      
  return (
    <div className='inventry'>
         {getdata?.map((el, index) => {
              return <All_card key={index} data={el} getPost={getPost} />;
            })}
    </div>
  )
}

export default Invenrty
