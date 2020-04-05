import React,{ Component } from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import { setSearchField } from '../actions';

const mapStateToProps = state => {
  return  {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error 
  }
}
const mapDispatchToprops = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    onRequestRobots: () =>requestRobots(dispatch)
  }
}


class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: []
    }
  }

componentDidMount(){
  console.log(this.props.store.getState())
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {this.setState({robots:users})});
}


  render() {
    const { searchField,onSearchChange } = this.props;
    const filteredRobots = this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })

    /*上面还可以写成
      const filteredRobots = this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
     */
    /*下面还能写成 if(!robots.length) */
    if (this.state.robots.length === 0) {
      return <h1>Loading</h1>
    } else{
      return (
        <div className="tc">
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
    );
  }
}
}

export default connect(mapStateToProps, mapDispatchToprops)(App); 