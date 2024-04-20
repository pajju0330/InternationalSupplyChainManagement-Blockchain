// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import PieCard from "views/admin/default/components/PieCard";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  
  const [tableDatalen, setTableDatalen] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  
  useEffect(() => {
    async function getData(){
      try {
        const res = await axios.get('http://localhost:5000/api/RawMaterial');
        const data = res.data;
        setTableDatalen(data.length) // Update table data state with fetched data
        const totalPrices = data.map((item) => item.PricePerUnit);
        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
        const avgPrice = totalPrice / data.length;
        setAveragePrice(avgPrice);
        setTotalPrice(totalPrice);
        const totalQuantities = data.map((item) => item.Quantity);
        const totalQuantity = totalQuantities.reduce((a, b) => a + b, 0);
        setTotalQuantity(totalQuantity);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();  
  },[]);

  const brandColor = useColorModeValue("", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Total SKU'
          value={tableDatalen}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Total Quqntity'
          value={totalQuantity}
        />
        {/* s */}
              
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAttachMoney} color='white' />}
            />
          }
          name='Average Price'
          value={averagePrice.toFixed(2)}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Cost'
          value={totalPrice.toFixed(2)}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        {/* <TotalSpent />
        <WeeklyRevenue /> */}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
    <Box w="100%"> {/* Set width here */}
      <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
    </Box>
    <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
      {/* MiniCalendar and PieCard components */}
      <PieCard/>
      <MiniCalendar />
    </SimpleGrid>
  </SimpleGrid>
    </Box>
  );
}
