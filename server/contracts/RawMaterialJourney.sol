// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RawMaterialJourney {
    struct JourneyStep {
        string materialID; // Include materialID in JourneyStep struct
        uint256 timestamp;
        string location;
        string description;
    }
    mapping(string => JourneyStep[]) public rawMaterialJourney;
    string[] public materialIDs;
    event JourneyStepAdded(string indexed materialID, uint indexed stepIndex, uint256 timestamp, string location, string description);

    function addJourneyStep(string memory materialID, string memory location, string memory description) public {
        JourneyStep[] storage journeySteps = rawMaterialJourney[materialID];
        JourneyStep memory newStep = JourneyStep({
            materialID: materialID,
            timestamp: block.timestamp,
            location: location,
            description: description
        });
        journeySteps.push(newStep);
        if (journeySteps.length == 1) {
            materialIDs.push(materialID);
        }
        emit JourneyStepAdded(materialID, journeySteps.length - 1, newStep.timestamp, newStep.location, newStep.description);
    }
    
    function getAllMaterialIDs() public view returns (string[] memory) {
        return materialIDs;
    }
    
function getAllJourneyDetailsForMaterial(string memory materialID) public view returns (JourneyStep[] memory) {
    uint256 totalSteps = rawMaterialJourney[materialID].length;
    
    JourneyStep[] memory allJourneyDetails = new JourneyStep[](totalSteps);
    for(uint256 i = 0; i < totalSteps; i++) {
        allJourneyDetails[i] = JourneyStep({
            materialID: materialID,
            timestamp: rawMaterialJourney[materialID][i].timestamp,
            location: rawMaterialJourney[materialID][i].location,
            description: rawMaterialJourney[materialID][i].description
        });
    }
    
    return allJourneyDetails;
}
    
    function getJourneyStepCount(string memory materialID) public view returns (uint) {
        return rawMaterialJourney[materialID].length;
    }
    
    function getJourneyStep(string memory materialID, uint stepIndex) public view returns (uint, string memory, string memory) {
        require(stepIndex < rawMaterialJourney[materialID].length, "Step index out of bounds");
        JourneyStep memory step = rawMaterialJourney[materialID][stepIndex];
        return (step.timestamp, step.location, step.description);
    }
}
