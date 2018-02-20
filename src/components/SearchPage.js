import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';


class SearchPage extends Component {
    render() {
      return (
        <div className="flexContain">
          <Sidebar/>
          <div id="main" className="Search cardContain">
              <div className="card">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies felis consequat pulvinar varius. Nunc blandit est lectus, sed gravida neque sollicitudin ac. Quisque efficitur imperdiet porta.</p>
              </div>
              <div className="card">
                <p>Mauris quis porttitor ex. Pellentesque vel lorem a quam tincidunt accumsan. Quisque elit augue, iaculis quis maximus at, euismod sit amet erat. Morbi a est eget nulla malesuada ultrices. Vestibulum eget augue vitae metus finibus fringilla.</p>
              </div>
              <div className="card">
                <p> Nunc blandit est lectus, sed gravida neque sollicitudin ac. Quisque efficitur imperdiet porta. Mauris quis porttitor ex. Vestibulum eget augue vitae metus finibus fringilla.</p>
              </div>
              <div className="card">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies felis consequat pulvinar varius. Nunc blandit est lectus, sed gravida neque sollicitudin ac.</p>
              </div>
              <div className="card">
                <p>Vestibulum eget augue vitae metus finibus fringilla.</p>
              </div>
              <div className="card">
                <p>Pellentesque vel lorem a quam tincidunt accumsan. Quisque elit augue, iaculis quis maximus at, euismod sit amet erat. Morbi a est eget nulla malesuada ultrices. Vestibulum eget augue vitae metus finibus fringilla.</p>
              </div>
              <div className="card">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies felis consequat pulvinar varius. </p>
              </div>
              <div className="card">
                <p>Quisque elit augue, iaculis quis maximus at, euismod sit amet erat. Morbi a est eget nulla malesuada ultrices. Vestibulum eget augue vitae metus finibus fringilla.</p>
              </div>
          </div>
        </div>
      )
    }
  }

  export default SearchPage;
