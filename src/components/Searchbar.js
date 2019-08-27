import React, { Component } from 'react';
import search from '../img/search.svg';

class Searchbar extends Component {
    state = {
        query: "",
        data: [this.props.botData],
        filteredData: []
      };
    

    render() {

        return (
            <div className="Searchbar">
                <img src={search} alt="search" className="searchicon" />
                <form>
                    <input type="text" className="searchInput" placeholder='Search'

                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                    
                </form>
            </div>
        );
    }
}
export default Searchbar;
