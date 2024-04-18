// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InventoryContract {
    struct InventoryItem {
        string productID;
        string productName;
        string description;
        uint quantity;
        string unit;
        string location;
        uint lastUpdated;
    }
    mapping(string => InventoryItem) private inventory;
    string[] private productIDs; // Array to store product IDs
    event InventoryUpdated(string productID, uint quantity, uint lastUpdated);

    function createInventoryItem(
        string memory _productID,
        string memory _productName,
        string memory _description,
        uint _quantity,
        string memory _unit,
        string memory _location
    ) public {
        require(bytes(_productID).length > 0, "Product ID must not be empty");
        require(bytes(_productName).length > 0, "Product name must not be empty");
        require(_quantity > 0, "Quantity must be greater than zero");
        require(bytes(inventory[_productID].productID).length == 0, "Inventory item already exists");

        InventoryItem storage newItem = inventory[_productID];
        newItem.productID = _productID;
        newItem.productName = _productName;
        newItem.description = _description;
        newItem.quantity = _quantity;
        newItem.unit = _unit;
        newItem.location = _location;
        newItem.lastUpdated = block.timestamp;

        productIDs.push(_productID); // Add new product ID to the array

        emit InventoryUpdated(_productID, _quantity, block.timestamp);
    }

    function updateInventoryItem(
        string memory _productID,
        uint _quantity,
        string memory _location
    ) public {
        require(bytes(_productID).length > 0, "Product ID must not be empty");
        require(_quantity > 0, "Quantity must be greater than zero");
        require(bytes(inventory[_productID].productID).length > 0, "Inventory item does not exist");

        InventoryItem storage item = inventory[_productID];
        item.quantity = _quantity;
        item.location = _location;
        item.lastUpdated = block.timestamp;

        emit InventoryUpdated(_productID, _quantity, block.timestamp);
    }

    function getInventoryItem(string memory _productID) public view returns (
        string memory,
        string memory,
        string memory,
        uint,
        string memory,
        string memory,
        uint
    ) {
        require(bytes(_productID).length > 0, "Product ID must not be empty");

        InventoryItem memory item = inventory[_productID];
        return (
            item.productID,
            item.productName,
            item.description,
            item.quantity,
            item.unit,
            item.location,
            item.lastUpdated
        );
    }

    function getAllInventoryItems() public view returns (InventoryItem[] memory) {
        uint itemCount = productIDs.length;
        InventoryItem[] memory items = new InventoryItem[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            string memory productID = productIDs[i];
            items[i] = inventory[productID];
        }
        return items;
    }
}
