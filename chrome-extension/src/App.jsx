import React, { useEffect, useState } from "react";
import { Chrono } from "react-chrono";
import axios from "axios";

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
	function handleSubmit(event){
		event.preventDefault();
		const myInput = document.getElementById("myInput");
		setMaterialID(myInput.value);
	};
	if (!materialID) {
		return (
			<div style={{ margin: '20px', width: '500px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor='myInput' style={{ marginBottom: '10px' }}>Enter something:</label>
                <input type='text' id='myInput' name='myInput' style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '10px' }} />
                <button type='submit' style={{ padding: '8px 12px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Submit</button>
            </form>
        </div>
		);
	} else {
		return (
			<div style={{ width: "500px", height: "500px" }}>
				{items.length > 0 && ( // Only render if items have loaded
					<Chrono cardWidth='250' items={items} mode='VERTICAL_ALTERNATING' />
				)}
			</div>
		);
	}
};

export default App;
