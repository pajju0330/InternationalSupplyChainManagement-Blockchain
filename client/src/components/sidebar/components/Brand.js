import React from "react";
// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

// Import your logo image
// import logo from "./Supply.png";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("purple.700", "white");

  // CSS for the logo text
  const logoTextStyle = {
    fontSize: "29px",
    fontWeight: "bold",
    color: logoColor,
    marginBottom: "20px",
    display: "flex", // Ensure the logo and text are displayed in a row
    alignItems: "center", // Align items vertically in the center
  };
  const logoChainStyle = {
    fontSize: "29px",
    fontWeight: "bold",
    color: logoColor,
    color:" #422afbc6",
    display: "flex", // Ensure the logo and text are displayed in a row
    alignItems: "center", // Align items vertically in the center
  };

  // CSS for the logo image
  const logoImageStyle = {
   // Add some spacing between the logo and text
    width: "80px", // Adjust the width of the logo image as needed
    height: "80px", // Adjust the height of the logo image as needed
  };

  return (
    <Flex align='center' direction='column'>
      <div style={logoTextStyle}>
        {/* <img src={logo} alt="SoftChain Logo" style={logoImageStyle} /> */}
         Soft<span style={logoChainStyle}>Chain</span>
      </div>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;