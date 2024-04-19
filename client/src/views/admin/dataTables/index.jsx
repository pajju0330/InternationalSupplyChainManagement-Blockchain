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

export default function Marketplace() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.400", "white");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    description: "",
    pricePerUnit: 0,
    quantity: 0,
    supplierId: "",
    expiryDate: "",
  });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get('http://localhost:5000/api/RawMaterial');
        const data = res.data.map(item => ({
          name: item.name,
          id: item.MateriaID,
          description: item.description,
          pricePerUnit: item.PricePerUnit,
          quantity: item.Quantity,
          supplierId: item.SupplierID,
          expiryDate: item.ExpiryDate.substring(0, 10), // Extract yyyy-mm-dd
        }));
        setTableData(data); // Update table data state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
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

  async function submitData(data){
    try{
      const res = await axios.post('http://localhost:5000/api/RawMaterial/create', data);
      console.log("Data submitted successfully:", res.data); 
    }catch(error){
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  }
  const handleSaveButtonClick = (e) => {
    e.preventDefault();
    setTableData((prevData) => [...prevData, formData]);
    const data = {
      name: formData.name,
      MateriaID: formData.id,
      description: formData.description,
      PricePerUnit: formData.pricePerUnit,
      Quantity: formData.quantity,
      SupplierID: formData.supplierId,
      ExpiryDate: formData.expiryDate.substring(0, 10), // Extract yyyy-mm-dd
    }
    submitData(data);
    setIsModalOpen(false);
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Stack spacing={4} direction="row" align="center">
        <Button size="md" backgroundColor={textColorBrand} color={"white"} onClick={handleCreateButtonClick}>Add Item</Button>
      </Stack>

      <Table variant="striped" color={textColor} size="md" mt={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>ID</Th>
            <Th>Description</Th>
            <Th>Price per Unit</Th>
            <Th>Quantity</Th>
            <Th>Supplier ID</Th>
            <Th>Expiry Date</Th>
            <Th>Update</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>{item.id}</Td>
              <Td>{item.description}</Td>
              <Td>{item.pricePerUnit}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.supplierId}</Td>
              <Td>{item.expiryDate}</Td>
              <Td>
                <EditIcon
                  color="blue.500"
                  cursor="pointer"
                  onClick={() => handleEditButtonClick(index)}
                />
              </Td>
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl  isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>ID</FormLabel>
              <Input
                placeholder="Enter ID"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Price per Unit</FormLabel>
              <NumberInput defaultValue={0}>
                <NumberInputField
                  placeholder="Enter price per unit"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                />
              </NumberInput>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput defaultValue={0}>
                <NumberInputField
                  placeholder="Enter quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </NumberInput>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Supplier ID</FormLabel>
              <Input
                placeholder="Enter supplier ID"
                name="supplierId"
                value={formData.supplierId}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Expiry Date</FormLabel>
              <Input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
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
    </Box>
  );
}
