import React, { useState } from "react";
import "./styel.css";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    useToast,
  } from "@chakra-ui/react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
import Edit from "./Edit";

function All_card({ data ,getPost}) {

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [post, setPost] = useState({});
    const handle_book_delete = async () => {
     
        try {
          const res = await axios.delete(`http://localhost:8088/delete/${data?._id}`);
         console.log(res)
          toast({
            title: `${res.data}`,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: "top",
          })
          getPost()
        } catch (error) {
          console.log(error);
        }
        setTimeout(() => {
          onClose();
        }, 100);
      };

  return (
    <div className="card">
        
     

      <p>
        <b>Name - </b> {data.name}
      </p>
      <p>
        <b>Email - </b> {data.email}
      </p>
      <p>
        <b>Gender - </b> {data.gender}
      </p>
      <p>
        <b>Status - </b> {data.status}
      </p>

      <div className="button">
        <IconButton
          variant="outline"
          colorScheme="biue"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<Edit  get_data_by_id={data._id} getPost={getPost} />}
        />

        <IconButton
          variant="outline"
          colorScheme="pink"
          aria-label="Call Sage"
          fontSize="20px"
          onClick={onOpen}
          ml={5}
          icon={<DeleteIcon />}
        />
      </div>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <p>
              {" "}
              <b> Are you sure you want to delete user post. </b>
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handle_book_delete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  );
}

export default All_card;
