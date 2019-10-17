import React, { useState, useReducer } from 'react';
import search from '../img/search.svg';
import BotItem from './BotItem';
import { useLocalState } from './hooks';
import triangleDark from '../img/triangle-dark.svg'

const Filters = props => {
    let content = <p className="loading">Loading bots...</p>;
    let botData = props.botData;

    ////Searchbar
    const [searchValue, setSearchValue] = useState("");
    function handleSearchInputChanges(e) { setSearchValue(e.target.value); }

    //toggle to show categorys or not
    const [showFilter, setShowFilter] = useState(true);
    const toggleFilter = (e) => { setShowFilter(!showFilter) }

    //toogle check/uncheck category
    const categoryToggle = (e) => {
        if (e.target.checked) { dispatch({ type: "add", value: e.target.value }) }
        else if (!e.target.checked) { dispatch({ type: "remove", value: e.target.value }) }
    }

    //Creating array with the activeCategories
    const [myActiveFilter, dispatch] = useReducer((myActiveFilter, { type, value }) => {
        switch (type) {
            case "add":
                return [...myActiveFilter, value]
            case "remove":
                return myActiveFilter.filter((index) => index !== value);
            default:
                return myActiveFilter;
        }
    }, []);

    function handleCategoryChange(e) {
        categoryToggle(e);
    }

    const [isFavorite, setFavoriteList] = useLocalState([]);

    //sort botScore
    const [filteredByScore, setFilteredByScore] = useState(true);
    const handleSortScore = (e) => { setFilteredByScore(!filteredByScore) }

    //renders if serchvalue is true.
    const listBotsThatRenders = botData.filter((bot) => {
        return searchValue ? bot.name.toLowerCase().match(searchValue) : true
    })

        //filter categories
        .filter((bot) => {
            return myActiveFilter.length !== 0 ?
                bot.categories.some(value => {
                    return myActiveFilter.includes(value)
                }) : true
        })

    //sort botName
    const [filteredbyName, setFilteredByName] = useState(false);
    const handleSortName = (e) => {
        listBotsThatRenders.sort((a, b) => a.name.localeCompare(b.name));
        setFilteredByName(!filteredbyName)
        console.log(filteredbyName);

    }

    //a-z 

    //z-a
    //filteredbyName  botData.sort((a,b) => b.name.localeCompare(a.name))  

    //topscore 
    //filteredByScore ? botData.sort((a, b) => b.score - a.score)

    //lowscore
    //!filteredByScore ? botData.sort((a,b) => a.score - b.score)  

    //filterbyfavorite
    // ****** ?       

    if (!props.isLoading) {
        content = (
            <div className="container">
                <div className="searchbar">
                    <img src={search} alt="search" className="searchicon" />
                    <form>
                        <input type="text" className="searchInput"
                            value={searchValue}
                            onChange={handleSearchInputChanges}
                            placeholder="Search"
                        />
                    </form>
                </div>

                <div className="category1">
                    {showFilter ? (
                        <div className="category2">
                            <div className="filterbar" onClick={toggleFilter}>
                                <p className="activef">Filter by:{' '} {myActiveFilter.join(' , ')}</p>
                                <p className="hidef">Hide filter <input type="checkbox" className="trianglelight" /></p>
                            </div>
                            <div className="category3">
                                <label onChange={handleCategoryChange}>
                                    <input type="checkbox" className="star" value="Favorites" />
                                    <p className="favorite">Favorites</p>
                                </label>
                                {props.categories.map((c, idx) =>
                                    <label key={idx} onChange={handleCategoryChange}>
                                        <input type="checkbox" className="categoryCheck" value={c} />
                                        <p>{c}</p>
                                    </label>
                                )}

                            </div>
                        </div>
                    ) : (
                            <div className="category2">
                                <div className="filterbar" onClick={toggleFilter}>
                                    <label className="activef"> Active filter:
                                        {myActiveFilter.join(' , ')}
                                    </label>
                                    <label className="hidef"> Show filters {' '}
                                        <input type="checkbox" className="trianglelight" />
                                    </label>
                                </div>
                            </div>
                        )}
                </div>

                <div className="botwhite">
                    <div className="botbar">
                        <label onClick={handleSortName}>Name {' '}
                            <img src={triangleDark} alt="Name" />
                        </label>
                        <label onClick={handleSortScore}>Score {' '}
                            <img src={triangleDark} alt="Score" />
                        </label>
                    </div>

                    <div className="botList">
                        <section>
                            {
                                listBotsThatRenders.map((bot, idx) =>
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

