import React  , {Component} from 'react';
import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import Bid from './bid.js';

class Main extends Component{
  render()
  {
    return(
      <Router>
      <div>
      <Route path="/bid"  component={Bid}/>
      </div>
       <div id="content">
          <form onSubmit={(event) => {
            event.preventDefault()
            const name = this.workName.value
            
            this.props.createWork(name)
           }}>
          <div className="form-group mr-sm-2">
            <input
              id="workName"
              type="text"
              ref={(input) => { this.workName = input }}
              className="form-control"
              placeholder="Work Name"
            required />
          </div>
          <button type="submit" className="btn btn-primary">Add Work</button>
            </form>
            <p>&nbsp;</p>
            <h2>Work List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Owner</th>
                  <th scope="col">purchased</th>
                  <th scope="col"></th>
               </tr>             

               </thead>
               <tbody id="workList">
                  {this.props.works.map((work,key)=>{
                    return(

                      <tr key={key}>
                        <th scope="row">{work.id.toString()}</th>
                         
                        <td>{work.name}</td>
                        <td>{work.owner}</td>
                        <td>{work.purchased.toString()}</td>
                        <td>
                        { !work.purchased
                          ? <button>
                           <Link to={'/bid/'+work.id} >
                          Click to bid 
                          </Link>
                         </button>
                         :null
                       }
                        </td> 
                      </tr>
                     );
                   })}

               </tbody>
          </table>
        </div>
      </Router>
    );
  }
}

export default Main;
