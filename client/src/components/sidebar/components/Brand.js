import React from "react";
// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("purple.700", "white");

  // CSS for the logo text
  const logoTextStyle = {
    fontFamily: "Arial, sans-serif",
    fontSize: "24px",
    fontWeight: "bold",
    color: logoColor,
    marginBottom: "20px",
  };

  return (
    <Flex align='center' direction='column'>
      <div style={logoTextStyle}>SoftChain</div>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
