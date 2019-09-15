pragma solidity ^0.5.1;
contract freelancer{

    struct work{
        uint id;
        string name;
        address payable owner;
        bool purchased;
    }

    struct bid{
        uint checkid;
        uint bid_id;
        string name;
        string message;
        uint time;
        uint price;
        address payable bidder;
    }

    
    uint public workCount=0;
    uint public bidCount=0;
    uint public linkCount=0;
    
    mapping (uint=>work) public works;
    mapping (uint=>bid) public bids;
    mapping (uint=>bid) public links;
    
    
    event workCreated(
        uint id,
        string name,
        address payable owner,
        bool purchased
    );

    event bidCreated(
        uint checkid,
        uint bid_id,
        string name,
        string message,
        uint time,
        uint price,
        address payable bidder

        );
    event bidPurchased(
        uint bid_id,
        string name,
        string message,
        uint time,
        uint price,
        address payable bidder
        );
    
    function createWork(string memory _name)public{
        works[workCount]=work(workCount,_name,msg.sender,false);
        workCount++;
        emit workCreated(workCount,_name,msg.sender,false);
    }

    function createBid( uint _checkid,string memory _name, string memory _message, uint _time, uint _price) public{
        bids[bidCount]=bid(_checkid,bidCount,_name,_message,_time,_price, msg.sender);
        bidCount++;
        //links[_checkid]=bid(bidCount,_name,_message,_time,_price, msg.sender);
        //linkCount++;
        emit bidCreated(_checkid,bidCount,_name,_message,_time,_price, msg.sender);
        
    }

     function purchaseBid(uint _id) public payable  {
        //fetch the bid
        bid memory _bid = bids[_id];
        //fetch the owner 
        address payable _seller =_bid.bidder;
        // Make sure the product id is valid
        require (_bid.bid_id >0 && _bid.bid_id< bidCount);
        // enough ether
        require (msg.value >= _bid.price);
        
        //fetch the work
        uint  work_id =_bid.checkid;
        work memory _work = works[work_id];
         //work is not purchased
         require (!_work.purchased);

         //seller is not buyer
         require (_seller!=msg.sender);
         
         
        //transfer ownership to the buyer
        _bid.bidder= msg.sender;
         //mark as purchased
         _work.purchased = true;
         //update the product
         bids[_id]=_bid;
         //pay the seller through ether
         address(_seller).transfer(msg.value);
         //trigger an event

         emit bidPurchased(bidCount,_bid.name,_bid.message,_bid.time,_bid.price, msg.sender);

    }    

}