import React, { useEffect, useState } from "react";
import { Chrono } from "react-chrono";
import axios from "axios";
import { Box, Card } from "@chakra-ui/react"; // Import Card from Chakra UI

// Define CSS styles as variables
const formContainerStyles = {
  margin: "auto",
 
  width: "500px",	
};
const ContainerStyles = {
	margin:"auto",
	marginTop: "-200px",
   
  };
  const ImageContainerStyles = {
	margin:"auto",   
  };

const myInputStyles = {
  marginBottom: "10px",
  fontSize: "18px",
  fontFamily: "Sedan",
  fontWeight: "800",
  fontStyle: "normal",	
};

const formStyles = {
  display: "flex",
  flexDirection: "column",
};

const inputStyles = {
  padding: "8px",
  borderRadius: "4px",
  border: "2px solid #ccc",
  marginBottom: "10px",
  fontFamily: "times new roman",
  fontSize: "16px",
  
  
};

const buttonStyles = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "14px",
  backgroundColor: "#5467f7",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  fontFamily: "Sedan",
  fontWeight: "600",
  letterSpacing: "1px",
  fontStyle: "normal",
  height: "40px",
};

const App = () => {
  const [items, setItems] = useState([]);
  const [materialID, setMaterialID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/RawMaterial/journey/${materialID}`
        );
        console.log("API response:", res.data);

        const transformedData = res.data.map((item) => ({
          title: item.materialID || "No material ID", // Handle missing data
          cardTitle: item.location || "No location", // Handle missing data
          cardDetailedText: item.description,
          cardSubtitle: item.description,
        }));
        console.log("Transformed data:", transformedData);
        setItems(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (materialID) {
      fetchData();
    }
  }, [materialID]);

  function handleSubmit(event) {
    event.preventDefault();
    const myInput = document.getElementById("myInput");
    setMaterialID(myInput.value);
  }

  return (
	<>
	 
 <Box pt="180px" style={ContainerStyles} textAlign="center"> 
	{/* Adjust positioning */}
	   {!materialID && <Card style={formContainerStyles}> {
	   <img src="/Supply.png" alt="Supply" height={200} width={400} style={ImageContainerStyles} />
	   /* Wrap the form in a Card component */}
        <form onSubmit={handleSubmit} style={formStyles}>
          <label htmlFor="myInput" style={myInputStyles}>
            Enter Your Product ID:
          </label>
          <input type="text" id="myInput" name="myInput" style={inputStyles} />
          <button type="submit" style={buttonStyles}>
            Submit
          </button>
        </form>
      </Card>}
      {materialID && ( // Render the Chrono component only if materialID is set
        <Box mt="20px" width="500px" mx="auto"> {/* Adjust margin and width */}
          {items.length > 0 && (
            <Chrono
			items={items}
			mode="VERTICAL_ALTERNATING"
			cardWidth={300} // Set the width of each card
			cardHeight={150} // Set the height of each card
			useReadMore // Enable the "Read More" feature
			theme={{
			  primary: "#5467f7", // Customize primary color
			  secondary: "#ffffff", // Customize secondary color
			  cardBgColor: "#f3f3f3", // Customize card background color
			  cardForeColor: "#333", // Customize card text color
			  cardBorderColor: "#ccc", // Customize card border color
			}}
		  />
		  
          )}
        </Box>
      )}
    </Box>
	</>
  );
};

export default App;
