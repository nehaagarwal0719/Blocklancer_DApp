import React  , {Component} from 'react';
import Web3 from 'web3';
import jwt_decode from 'jwt-decode'

class Profile1 extends Component{

	 async componentWillMount(){
  await this.loadweb3()
  console.log(window.web3)
  await this.loadBlockchainData()
}


 async loadweb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
}

	render(){
		return(
		<div className="container">
        <div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td id>Works Added</td>
                <td id ="workList">
                   {this.props.works.map((work,key)=>{
                  	if(this.state.account==work.owner){
                    return(
                      <tr key={key}>
                        <td>{work.name}</td>
                      </tr>
                     );
                 }
                   })}

                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
			);
		
	}
}

export default Profile1