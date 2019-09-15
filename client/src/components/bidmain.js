import React , {Component} from 'react';
import Bid from './bid.js';


class BidMain extends Component{

  render()
  {
      
    return(

      <div id="content">
          {this.props.cidd}
            <form onSubmit={(event) => {
                event.preventDefault()
                const checkid =this.props.cidd
                const name = this.bidderName.value
                const message  = this.bidderMessage.value
                const time = window.web3.utils.hexToNumber(this.bidderTime.value)
                const price = window.web3.utils.toWei(this.bidderPrice.value.toString(), 'Ether')
  
                  this.props.createBid(checkid,name,message,time,price)
             }}>
                  <div className="form-group mr-sm-2">
                     <input
                        id="bidderName"
                        type="text"
                        ref={(input) => { this.bidderName = input }}
                        className="form-control"
                        placeholder="Name"
                        required />
                        <input
                        id="bidderDes"
                        type="text"
                        ref={(input) => { this.bidderMessage = input }}
                        className="form-control"
                        placeholder="Description"
                        required />
                        <input
                        id="bidderTime"
                        type="number"
                        ref={(input) => { this.bidderTime = input }}
                        className="form-control"
                        placeholder="Time in days"
                        required />
                        <input
                        id="bidderPrice"
                        type="text"
                        ref={(input) => { this.bidderPrice = input }}
                        className="form-control"
                        placeholder="Price"
                        required />
                  </div>          
                  <button type="submit" className="btn btn-primary">Bid</button>
            </form>
            <p>&nbsp;</p>
            <h2>Bid List</h2>
            <table className="table">
                <thead>
                  <tr>    
                  <th scope="col">#</th>
                  <th scope="col">CheckId</th>
                   <th scope="col">Name</th>
                   <th scope="col">Message</th>
                   <th scope="col">Price</th>
                   <th scope="col">Time(days)</th>
                   <th scope="col">Bidder</th>
                   </tr>
                </thead>
                            
            <tbody id="bidList">
        
                  {this.props.bids.map((bid,key1)=>{

                  if(this.props.cidd==bid.checkid.toString()){
                    return(
                      <tr key={key1}>
                       <td scope="row">{bid.bid_id.toString()}</td>
                        <td>{bid.checkid.toString()}</td>
                        <td>{bid.name}</td>
                        <td>{bid.message}</td>
                        <td>{window.web3.utils.fromWei(bid.price.toString(),'Ether')}</td>
                        <td>{window.web3.utils.hexToNumber(bid.time)}</td>
                        <td>{bid.bidder}</td>
                        <td> <button
                             name={bid.bid_id}
                             value={bid.price}
                             onClick={(event)=>{
                               console.log("clicked")
                               
                               this.props.purchaseBid(event.target.name,event.target.value)
                              }}>
                             Buy
                             </button>
                       </td>
                      </tr>

                     );
                  }
                   })}
               </tbody>

          </table>
         
         </div>
    );
  }
}

export default BidMain;