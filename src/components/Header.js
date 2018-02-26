import React, { Component } from "react";
import { Link } from "react-router-dom";



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      recipeID: this.props.recipeID, // Change back to this later after testing: this.props.recipeID
      recipeObject: {},
      // creatorObject: {}
      itemsFound: [],
      searchInput: ""
    };
  }


  getHeaderContentLogguedIn = () => {
    return (
      <div>
        <Link to="/edit" className="newRecipeBtn">
          <i className="icon add i24" />
          New recipe
        </Link>
        <div className="accountLinks">
          <p>Welcome {this.state.username}</p>
          <a onClick={this.logout}>Logout</a>
        </div>
      </div>
    );
  };

  getHeaderContentLogguedOut = () => {
    return (
      <div>
        <Link to="/login">Login</Link>
      </div>
    );
  };

  render() {
    // console.log(this.state.itemsFound, this.state.recipeID, this.state.username);
    return (
      <header>
        <Link to="/" className="logo">
          Pistach.io
        </Link>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Search"
            ref={r => (this.searchInput = r)}
            value={this.state.searchInput}
            onChange={e => this.setState({ searchInput: e.target.value })}
          />

          <Link to={"/search?searchTerm=" + this.state.searchInput}
            className="searchbar"
            onClick={this.performSearch}
          >
            <i className="icon search i24" />
          </Link>
        </form>
        {this.state.username
          ? this.getHeaderContentLogguedIn()
          : this.getHeaderContentLogguedOut()}
      </header>
    );
  }
}

export default Header;
