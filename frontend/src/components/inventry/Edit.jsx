import { EditIcon } from "@chakra-ui/icons";
import {
  ModalOverlay,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import EditForm from "./EditForm";


function Edit({get_data_by_id , getPost}) {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <div>
      <EditIcon
        onClick={onOpen}

      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Edit form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditForm  get_data_by_id={get_data_by_id} getPost={getPost} onClose={onClose}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Edit;