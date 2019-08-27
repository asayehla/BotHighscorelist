import React, { useState } from 'react';
import search from '../img/search.svg';
import BotItem from './BotItem';

const Filters = props => {
    //const [botList, setbotList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [showFilters, setshowFilter] = useState(true);
    var botData = props.botData;

    //Searchbar
    const [searchValue, setSearchValue] = useState("");
    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
        //filter
        return (
            setFilteredData(
                botData.filter((botData) => {
                    return botData.name.toLowerCase().match(searchValue.toLowerCase())
                })
            )
        )
    }
    const resetInputField = () => {
        setSearchValue("");
    }
    const callSearchFunctionOnEnter = (e) => {
        e.preventDefault();
        handleSearchInputChanges();
        resetInputField();
    }
    //end of searchbar


    function toogleShowFilter(e) {
        //setshowFilter=!setshowFilter;
    }
    const divStyle = { margin: '10px' };
    let content = <p>Loading bots...</p>;
    if (!props.isLoading) {

        content = (

            <div>
                <div className="Searchbar">
                    <img src={search} alt="search" className="searchicon" />
                    <form onSubmit={callSearchFunctionOnEnter}>
                        <input type="text" className="searchInput"
                            value={searchValue}
                            onChange={handleSearchInputChanges}
                            placeholder="Search"
                        />
                    </form>
                </div>

                <div className="categorybar"
                    onClick={toogleShowFilter}>
                    {/* if true showFilters true */}
                    {showFilters ? (
                        <div>
                            <div className="filterbar">
                                <p>Filter by:</p><p>Hide filter{' '}
                                    <input type="checkbox" className="trianglelight" /></p>
                            </div>
                            <div className="categorybar">
                                <div className="category">
                                    <input type="checkbox" className="star" style={divStyle} /><label htmlFor="star">Favorites</label>
                                </div>
                                {props.categories.map((c, idx) => <div className="category" key={idx}>
                                    <input type="checkbox" className="categoryCheck" />
                                    <label htmlFor="categryCheck">{c}</label></div>)}
                            </div>
                        </div>
                    ) : (
                            <div className="filterbar">
                                <p>Active filter:{' '}{'activeFilter'}</p>
                                <p>Show filters{' '}
                                    <input type="checkbox" className="trianglelight" /></p>
                            </div>
                        )}
                </div>

                <div className="botbar">
                    <p>Name{' '}
                        <input type="checkbox" className="triangledark"
                        //onChange={props.eventSortName} 
                        /></p>
                    <p>Score{' '}
                        <input type="checkbox" className="triangledark"
                        //onChange={props.eventSortScore}
                        /></p>
                </div>
                <div className="BotList">
                    <section>

                        {botData.map((bot, idx) =>
                            <BotItem key={idx} botData={bot} idx={idx + 1} />
                        )}

                    </section>
                </div>
            </div>
        );

    } else if (!props.isLoading && !props.botData.length === 0) {
        content = <p>Could not load.</p>
    }
    return content;
}
export default Filters;
