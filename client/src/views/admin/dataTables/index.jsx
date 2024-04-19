import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Thead,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { Checkbox } from "@chakra-ui/react/dist/chakra-ui-react.cjs";

export default function Marketplace() {
  const user = JSON.parse(localStorage.getItem("type"));
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.400", "white");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    sender: "",
    receiver: "",
    Date: "",
    MaterialID: "",
    Quantity: 0,
    updatedAt: "",
    status: "", // Include status in formData
  });
  const [tableData, setTableData] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [readMessages, setReadMessages] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/RawMaterial/messages"
        );
        const data = res.data.map((item) => ({
          _id: item._id,
          message: item.message,
          sender: item.sender,
          receiver: item.receiver,
          Date: item.Date.substring(0, 10), // Extract yyyy-mm-dd
          MaterialID: item.MaterialID,
          Quantity: item.Quantity,
          updatedAt: item.updatedAt.substring(0, 10), // Extract yyyy-mm-dd
          status: item.status,
        }));
        setTableData(data);
        
        // Filter messages based on status
        const unread = data.filter((item) => item.status === "unread");
        const read = data.filter((item) => item.status === "read");
        setUnreadMessages(unread);
        setReadMessages(read);
        
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  const handleEditButtonClick = (index) => {
    // Logic to handle edit action for the item at the specified index
  };

  const handleDeleteButtonClick = (index) => {
    // Logic to handle delete action for the item at the specified index
  };

  const handleCreateButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function submitData(data) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/Inventory/createMessage",
        data
      );
      console.log("Data submitted successfully:", res.data);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  }
  
  const handleSaveButtonClick = (e) => {
    e.preventDefault();
    setTableData((prevData) => [...prevData, formData]);
    const data = {
      message: formData.message,
      sender: formData.sender,
      receiver: formData.receiver,
      Date: formData.Date.substring(0, 10), // Extract yyyy-mm-dd
      MaterialID: formData.MaterialID,
      Quantity: formData.Quantity,
      updatedAt: formData.updatedAt.substring(0, 10), // Extract yyyy-mm-dd
      status: formData.status,
    };
    submitData(data);
    setIsModalOpen(false);
  };
  const setStatus = async (id, status) => {
    try {
      const data = {status};
      const res = await axios.post(`http://localhost:5000/api/Inventory/updatestatus/${id}`,data);
      console.log("Data submitted successfully:", res.data);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  }

  const handleMarkMessage = (e, id, status) => {
    e.preventDefault();
    setStatus(id, status);
  }
  return (
    <Flex pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Box w="100%">
        <Stack spacing={4} direction="row" align="center">
          {user !== "Supplier" && (
            <Button
              size="md"
              backgroundColor={textColorBrand}
              color={"white"}
              onClick={handleCreateButtonClick}
            >
              Add Request
            </Button>
          )}
        </Stack>
        <Text color={textColorBrand} style={{marginTop:'10px',fontSize:'28px' , fontWeight:'bold'}}>Pending</Text>
    
        <Table variant="striped" color={textColor} size="md" mt={4} >
          <Thead>
            <Tr>
              <Th>Mark as Read</Th>
              <Th>Message</Th>
              <Th>Sender</Th>
              <Th>Receiver</Th>
              <Th>Date</Th>
              <Th>Material ID</Th>
              <Th>Quantity</Th>
              <Th>Updated At</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {unreadMessages.map((item, index) => (
              <Tr key={index}>
                <Td> <Checkbox style={{border:'1px solid black', borderRadius:'5px'}} onChange={(e)=>{
                  console.log("hello");
                  handleMarkMessage(e, item._id, 'read');
                }}/> </Td> 
                <Td>{item.message}</Td>
                <Td>{item.sender}</Td>
                <Td>{item.receiver}</Td>
                <Td>{item.Date}</Td>
                <Td>{item.MaterialID}</Td>
                <Td>{item.Quantity}</Td>
                <Td>{item.updatedAt}</Td>
                <Td>
                  <DeleteIcon
                    color="red.500"
                    cursor="pointer"
                    onClick={() => handleDeleteButtonClick(index)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        
        <Text color={textColorBrand} style={{marginTop:'80px',fontSize:'28px' , fontWeight:'bold'}}>Approved</Text>
        <Table variant="striped" color={textColor} size="md" style={{marginTop:'10px'}}>
          <Thead>
            <Tr>
              <Th>Message</Th>
              <Th>Sender</Th>
              <Th>Receiver</Th>
              <Th>Date</Th>
              <Th>Material ID</Th>
              <Th>Quantity</Th>
              <Th>Updated At</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {readMessages.map((item, index) => (
              <Tr key={index}>
                <Td>{item.message}</Td>
                <Td>{item.sender}</Td>
                <Td>{item.receiver}</Td>
                <Td>{item.Date}</Td>
                <Td>{item.MaterialID}</Td>
                <Td>{item.Quantity}</Td>
                <Td>{item.updatedAt}</Td>
                <Td>
                  <DeleteIcon
                    color="red.500"
                    cursor="pointer"
                    onClick={() => handleDeleteButtonClick(index)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Input
                placeholder="Enter message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Sender</FormLabel>
              <Input
                placeholder="Enter sender"
                name="sender"
                value={formData.sender}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Receiver</FormLabel>
              <Input
                placeholder="Enter receiver"
                name="receiver"
                value={formData.receiver}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="Date"
                value={formData.Date}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Material ID</FormLabel>
              <Input
                placeholder="Enter material ID"
                name="MaterialID"
                value={formData.MaterialID}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput defaultValue={0}>
                <NumberInputField
                  placeholder="Enter quantity"
                  name="Quantity"
                  value={formData.Quantity}
                  onChange={handleInputChange}
                />
              </NumberInput>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Updated At</FormLabel>
              <Input
                type="date"
                name="updatedAt"
                value={formData.updatedAt}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Select status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={handleSaveButtonClick}>
              Save
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
