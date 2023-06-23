import React, { useEffect, useRef, useState } from "react";
import { Button, FormLabel, Input, Select, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const initState = {
  name: "",
  email: "",
  gender: "",
  status: "",
};

function EditForm({ get_data_by_id, onClose , getPost}) {
  const [formData, setFormData] = useState(initState);
  const toast = useToast();
  // edit

  let result = Object.entries(formData)
    .filter(([key, value]) => value !== "")
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});



  const Edit_from = async () => {
    try {
      let res = await axios.put(
        `https://gold-stone-tech-second-microservices-api.vercel.app/update/${get_data_by_id}`,
        result
      );

    
      toast({
        title: `${res.data}`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      getPost()
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper" style={{
        padding:"1em",
       
      }}>
        <hr className="shareHr" />

        <div className="input_form" style={{
            gap:"1.5em",
            display:"flex",
            flexDirection:"column",


        }}>
          <Input
            placeholder={"Update Name"}
            type="text"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            border='2px' borderColor='gray.800'
          />

          <Input
            placeholder={"Update Email"}
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            border='2px' borderColor='gray.800'

          />

          <Input
            placeholder={"Update Gender"}
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            border='2px' borderColor='gray.800'

          />

          <Input
            placeholder="Update Status"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            border='2px' borderColor='gray.800'

          />

         

          <Button colorScheme='facebook' onClick={Edit_from}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
