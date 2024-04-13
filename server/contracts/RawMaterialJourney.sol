// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RawMaterialJourney {
    struct JourneyStep {
        uint timestamp;
        string location;
        string description;
    }
    string[] public materialIDs;
    mapping(string => JourneyStep[]) public rawMaterialJourney;
    event JourneyStepAdded(string indexed materialID, uint indexed stepIndex, uint timestamp, string location, string description);

    function addJourneyStep(string memory materialID, string memory location, string memory description) public {
        JourneyStep[] storage journeySteps = rawMaterialJourney[materialID];
        JourneyStep memory newStep = JourneyStep({
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
        uint256 materialCount = 0;
        for (uint256 i = 0; i < materialIDs.length; i++) {
            materialCount += rawMaterialJourney[materialIDs[i]].length;
        }

        string[] memory allMaterialIDs = new string[](materialCount);
        uint256 index = 0;
        for (uint256 i = 0; i < materialIDs.length; i++) {
            for (uint256 j = 0; j < rawMaterialJourney[materialIDs[i]].length; j++) {
                allMaterialIDs[index] = materialIDs[i];
                index++;
            }
        }

        return allMaterialIDs;
    }
    function getJourneyStepCount(string memory materialID) public view returns (uint) {
        return rawMaterialJourney[materialID].length;
    }
    function getJourneyStep(string memory materialID, uint stepIndex) public view returns (uint, string memory, string memory) {
        JourneyStep memory step = rawMaterialJourney[materialID][stepIndex];
        return (step.timestamp, step.location, step.description);
    }
}
