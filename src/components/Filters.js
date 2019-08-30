import React, { useState, useReducer } from 'react';
import search from '../img/search.svg';
import BotItem from './BotItem';

const Filters = props => {
    let content = <p className="loading">Loading bots...</p>;
    let botData = props.botData;

    const [filteredSearchData, setFilteredSearchData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [showFilter, setShowFilter] = useState(true);
    const [theChosenFilter, setTheChosenFilter] = useState(props.botData);

    //////////////////Searchbar
    const [searchValue, setSearchValue] = useState("");
    async function handleSearchInputChanges(e) {
        setSearchValue(e.target.value);
        if (e.target.value !== "") {
            await setFilteredSearchData(
                botData.filter((botData) => {
                    return botData.name.toLowerCase().match(e.target.value.toLowerCase())
                })
            )
            if (filteredSearchData !== 0) {
                setIsFiltered(true);
                setTheChosenFilter(filteredSearchData);
            } else {
                return
            }
        }
    }
    /////////////////Filter Categories///
    //toggle ShowFilter
    const toggleFilter = (e) => { setShowFilter(!showFilter) }
    const [categoryFilteredData, setCategoryFilteredData] = useState([]);

    //toogle check/uncheck category
    const categoryToggle = (e) => {
        if (e.target.checked) {
            dispatch({ type: "add", value: e.target.value })
        }
        else if (!e.target.checked) {
            dispatch({ type: "remove", value: e.target.value })
        }
    }
    
    //Creating array with the activeFilters
    const [myActiveFilter, dispatch] = useReducer((myActiveFilter, { type, value }) => {
        switch (type) {
            case "add": return [...myActiveFilter, value]
            case "remove": return myActiveFilter.filter((index) => index !== value);
            default: return myActiveFilter;
        }
    }, []);
    
    function handleCategoryChange(e) {
        categoryToggle(e);
        setIsFiltered(true);
        sortCategory(myActiveFilter);
        console.log(myActiveFilter);
        
    }
    
    //Filter the bot with categories
    
    const sortCategory = (myActiveFilter) => {

           /*  setCategoryFilteredData(
             botData.categories.map(x => x)
            ) */
                console.log(myActiveFilter);
                
        
    } 
    
    //let theBotsThatNeedToBeDisplayed = botData.categories.map().filter()
    ////////////////Favorites

    //sort botName
    const [filteredbyName, setFilteredByName] = useState([]);
    const handleSortName = (e) => {
        setFilteredByName(botData.sort((a, b) => a.name.localeCompare(b.name)))
        setTheChosenFilter(filteredbyName);
        setIsFiltered(true);
    }
    //sort botScore
    const [filteredByScore, setFilteredByScore] = useState([]);
    const handleSortScore = (e) => {
        setFilteredByScore(botData.sort((a, b) => b.score - a.score));
        setTheChosenFilter(filteredByScore);
        setIsFiltered(true);
    }

    if (!props.isLoading) {
        content = (
            <div className="container">
                <div className="Searchbar">
                    <img src={search} alt="search" className="searchicon" />
                    <form>
                        <input type="text" className="searchInput"
                            value={searchValue}
                            onChange={handleSearchInputChanges}
                            placeholder="Search"
                        />
                    </form>
                </div>

                <div className="categorybarlvl1">
                    {showFilter ? (
                        <div className="categorybarlvl2">
                            <div className="filterbar" onClick={toggleFilter}>
                                <p className="filterbarM">Filter by:{' '} {myActiveFilter.join(' , ')}</p>
                                <p>Hide filter <input type="checkbox" className="trianglelight" /></p>
                            </div>
                            <div className="categorybarlvl3">
                                <div className="categorylvl4">
                                    <input type="checkbox" className="star" value="Favorites"
                                        onChange={handleCategoryChange} />
                                    <label htmlFor="star">Favorites</label>
                                </div>
                                {props.categories.map((c, idx) =>
                                    <div className="categorylvl4" key={idx} onChange={handleCategoryChange}>
                                        <input type="checkbox" className="categoryCheck"
                                            value={c} />
                                        <label htmlFor="categoryCheck">{c}</label>
                                    </div>)}
                            </div>
                        </div>
                    ) : (
                            <div className="filterbar" onClick={toggleFilter}>
                                <p className="filterbarM">Active filter: {myActiveFilter.join(' , ')} </p>
                                <p>Show filters{' '}
                                    <input type="checkbox" className="trianglelight" /></p>
                            </div>
                        )}
                </div>

                <div className="botwhite">
                    <div className="botbar">
                        <p onChange={handleSortName}>Name{' '}
                            <input type="checkbox" className="triangledark" /></p>
                        <p onChange={handleSortScore}>Score{' '}
                            <input type="checkbox" className="triangledark" /></p>
                    </div>

                    <div className="BotList">
                        <section>
                            {
                                isFiltered ?
                                    console.log(myActiveFilter)
                                    /* 
                                    {theChosenFilter}.map((bot, idx) =>
                                    <BotItem key={idx} botData={bot} idx={idx + 1} />)
                                     */
                                    : botData.map((bot, idx) =>
                                        <BotItem key={idx} botData={bot} idx={idx + 1} />
                                    )
                            }
                        </section>
                    </div>
                </div>
            </div>
        );

    } else if (!props.isLoading && !props.botData.length === 0) {
        content = <p>Could not load.</p>
    }
    return content;
}
export default Filters;
