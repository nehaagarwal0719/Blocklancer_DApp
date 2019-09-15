import React, { Component } from 'react';
//import './App.css';
import Web3 from 'web3';
import freelancer from '../abis/freelancer.json';
import Main from './main.js';
import Bid from './bid.js';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


class Home extends Component {

async componentWillMount(){
   document.title = "Blocklancer"
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
    const networkId = await web3.eth.net.getId()
    const networkData = freelancer.networks[networkId]
    if(networkData){ 
     const Freelancer = new web3.eth.Contract(freelancer.abi,networkData.address)
     this.setState({Freelancer})
     const workCount = await Freelancer.methods.workCount().call()
     this.setState({workCount})
     for(var i=1;i<=workCount;i++){
      const work = await Freelancer.methods.works(i).call()
      this.setState({
        works:[...this.state.works,work]
      })      
     }


     this.setState({loading:false})
     console.log(this.state.works)
      }
    else{
    window.alert("Contract not deployed to the detected network");
  }
}

  constructor (props){
    super(props)
    this.state ={
      account: '',
      workCount :0,
      works :[],
      loading : true
    }
  this.createWork = this.createWork.bind(this)
  
  //this.purchaseProduct = this.purchaseProduct.bind(this)
  }

createWork(name,des) {
    this.setState({ loading: true })
    this.state.Freelancer.methods.createWork(name,des).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  
  render() {
    return (
    <div class ="container">
      <div class="row">
        <Main works ={this.state.works} 
        createWork={this.createWork}
        />
        </div>
    </div>
    );
  }
}

export default Home;