import React, { useEffect, useState } from "react";

import { EditIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
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
	const user = JSON.parse(localStorage.getItem("type"));
	console.log(user);
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
				if (user != "Warehouse manager") {
					const res = await axios.get("http://localhost:5000/api/RawMaterial");
					const data = res.data.map((item) => ({
						name: item.name,
						id: item.MateriaID,
						description: item.description,
						pricePerUnit: item.PricePerUnit,
						quantity: item.Quantity,
						supplierId: item.SupplierID,
						expiryDate: item.ExpiryDate.substring(0, 10), // Extract yyyy-mm-dd
					}));
					setTableData(data); // Update table data state with fetched data
				} else {
					const res = await axios.get("http://localhost:5000/api/Inventory/");
					const data = res.data.map((item) => ({
						name: item.productName,
						id: item.productID,
						description: item.description,
						pricePerUnit: Math.random() * 1000 + 1,
						quantity: item.quantity,
						supplierId: "SUP001",
						expiryDate: "01/12/2024", // Extract yyyy-mm-dd
					}));
					setTableData(data);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		getData();
	}, []);
  const checkoutHandler = async (amount) => {

    const { data: { key } } = await axios.get("http://www.localhost:5000/api/getkey")

    const { data: { order } } = await axios.post("http://localhost:5000/api/payment/checkout", {
        amount
    })

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Product Payment",
        description: "RazorPay payment for product purchase",
        image: "http://localhost:3000/Supply.png",
        order_id: order.id,
        callback_url: "http://localhost:5000/api/payment/paymentverification",
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
}
	const handleEditButtonClick = (e) => {
		e.preventDefault();
    checkoutHandler();
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

	const handleDeleteButtonClick = async (id) => {
		console.log("Deleting item with ID:", id);
		try {
		  await axios.delete(`http://localhost:5000/api/RawMaterial/delete/${id}`);
		  setTableData((prevData) => prevData.filter((item) => item.id !== id));
		  alert("Item deleted successfully")
		} catch (error) {
		  console.error("Error deleting item:", error);
		}
	  };
	async function submitData(data) {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/RawMaterial/create",
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
			name: formData.name,
			MateriaID: formData.id,
			description: formData.description,
			PricePerUnit: formData.pricePerUnit,
			Quantity: formData.quantity,
			SupplierID: formData.supplierId,
			ExpiryDate: formData.expiryDate.substring(0, 10), // Extract yyyy-mm-dd
		};
		submitData(data);
		setIsModalOpen(false);
	};

	return (
		<Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
			<Stack spacing={4} direction='row' align='center'>
				<Button
					size='md'
					backgroundColor={textColorBrand}
					color={"white"}
					onClick={handleCreateButtonClick}>
					Add Item
				</Button>
			</Stack>

			<Table variant='striped' color={textColor} size='md' mt={4}>
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>ID</Th>
						<Th>Description</Th>
						<Th>Price per Unit</Th>
						<Th>Quantity</Th>
						{user == "Warehouse manager" && <Th>Supplier ID</Th>}
						<Th>Expiry Date</Th>
						<Th>Pay</Th>
						{user !== "Warehouse manager" && <Td>Delete</Td>}
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
							{user == "Warehouse manager" && <Td>{item.supplierId}</Td>}
							<Td>{item.expiryDate}</Td>
							<Td>
								<ExternalLinkIcon
									color='blue.500'
									cursor='pointer'
									onClick={handleEditButtonClick}
								/>
							</Td>
							{user !== "Warehouse manager" && <Td>
								<DeleteIcon
									color='red.500'
									cursor='pointer'
									onClick={() => handleDeleteButtonClick(item.id)}
								/>
							</Td>}
							
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
						<FormControl isRequired>
							<FormLabel>Name</FormLabel>
							<Input
								placeholder='Enter name'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl isRequired mt={4}>
							<FormLabel>ID</FormLabel>
							<Input
								placeholder='Enter ID'
								name='id'
								value={formData.id}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Description</FormLabel>
							<Textarea
								placeholder='Enter description'
								name='description'
								value={formData.description}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl isRequired mt={4}>
							<FormLabel>Price per Unit</FormLabel>
							<NumberInput defaultValue={0}>
								<NumberInputField
									placeholder='Enter price per unit'
									name='pricePerUnit'
									value={formData.pricePerUnit}
									onChange={handleInputChange}
								/>
							</NumberInput>
						</FormControl>
						<FormControl isRequired mt={4}>
							<FormLabel>Quantity</FormLabel>
							<NumberInput defaultValue={0}>
								<NumberInputField
									placeholder='Enter quantity'
									name='quantity'
									value={formData.quantity}
									onChange={handleInputChange}
								/>
							</NumberInput>
						</FormControl>
						<FormControl isRequired mt={4}>
							<FormLabel>Supplier ID</FormLabel>
							<Input
								placeholder='Enter supplier ID'
								name='supplierId'
								value={formData.supplierId}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Expiry Date</FormLabel>
							<Input
								type='date'
								name='expiryDate'
								value={formData.expiryDate}
								onChange={handleInputChange}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button variant='ghost' onClick={handleSaveButtonClick}>
							Save
						</Button>
						<Button colorScheme='blue' mr={3} onClick={handleCloseModal}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}
