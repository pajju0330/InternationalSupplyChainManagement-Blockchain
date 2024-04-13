// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RawMaterialJourney {
    struct JourneyStep {
        uint timestamp;
        string location;
        string description;
    }

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

        emit JourneyStepAdded(materialID, journeySteps.length - 1, newStep.timestamp, newStep.location, newStep.description);
    }

    function getJourneyStepCount(string memory materialID) public view returns (uint) {
        return rawMaterialJourney[materialID].length;
    }
    function getJourneyStep(string memory materialID, uint stepIndex) public view returns (uint, string memory, string memory) {
        JourneyStep memory step = rawMaterialJourney[materialID][stepIndex];
        return (step.timestamp, step.location, step.description);
    }
}
