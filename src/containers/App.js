import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

// State >> Props
// Smart Component
class App extends Component {
    constructor() {
        super() // call the constructor of Component
        this.state = {
            robots: [],
            searchfiled: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => this.setState({ robots: users}))    
    }

    // if we don't use arrow syntax, 'this' will refer to the input instead
    // of values from constructor
    onSearchChange = (event) => {
        this.setState({ searchfiled: event.target.value })
    }

    render() {
        const { robots, searchfiled} = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfiled.toLowerCase());
        })
        if (!robots.length) {
            return <h1>Loading</h1>
        } else {
            return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </div>
            );
        }   
    }
}

export default App