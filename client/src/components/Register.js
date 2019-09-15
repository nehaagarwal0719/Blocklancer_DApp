import React, { Component } from 'react'
import { register } from './UserFunctions'
import Web3 from 'web3';


class Register extends Component {
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


  constructor() {
    super()
    this.state = {
      //account:'',
      fname: '',
      lname: '',
      email: '',
      password: '',
      address:'',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      address:this.state.account
    }

    register(newUser).then(res => {
      this.props.history.push(`/login`)
    })
  }

  render() {
    return (
      <div className="container">
      {this.state.account}
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fname"
                  placeholder="Enter your first name"
                  value={this.state.fname}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lname"
                  placeholder="Enter your lastname name"
                  value={this.state.lname}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register