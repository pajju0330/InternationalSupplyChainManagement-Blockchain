import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage"; // Assuming you have this component
import Messages from "./components/Messages";
import Input from "./components/Input"; // Assuming you have this component
import Header from "./components/Header"; // Assuming you have this component
import { GetChatbotResponse } from "./ChatbotAPI";

import "./styles.css";
import { Flex } from "@chakra-ui/react/dist/chakra-ui-react.cjs";

const MainChatBot = () => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		async function loadWelcomeMessage() {
			const welcomeText = await GetChatbotResponse("hi");
			setMessages([<BotMessage key='0' text={welcomeText} />]);
		}
		loadWelcomeMessage();
	}, []);

	const send = async (text) => {
		const newMessages = messages.concat(
			<UserMessage key={messages.length + 1} text={text} />,
			<BotMessage
				key={messages.length + 2}
				text={await GetChatbotResponse(text, messages)} // Pass conversation history
			/>
		);
		setMessages(newMessages);
	};

	return (
		<Flex pt={{ base: "180px", md: "80px", xl: "80px" }}>
			<div className='chatbot' style={{ width: "60%",height:"100%", margin: "auto" }}>
				<Header />
				<Messages messages={messages} />
				<Input onSend={send} />
			</div>
		</Flex>
	);
};

export default MainChatBot;
