import React from "react";
import { Box, Text } from "@chakra-ui/react/dist/chakra-ui-react.cjs";

const BotMessage = ({ text }) => {
  return (
    <Box bg="gray.100" p={3} borderRadius="md" mb={2}>
      <Text className="bot-message">{text}</Text>
    </Box>
  );
};

export default BotMessage;
