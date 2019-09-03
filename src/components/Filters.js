import React, { useState, useReducer } from 'react';
import search from '../img/search.svg';
import BotItem from './BotItem';

const Filters = props => {
    let content = <p className="loading">Loading bots...</p>;
    let botData = props.botData;

    ////Searchbar
    const [searchValue, setSearchValue] = useState("");
    async function handleSearchInputChanges(e) {
        setSearchValue(e.target.value);
    }

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
            case "add": return [...myActiveFilter, value]
            case "remove": return myActiveFilter.filter((index) => index !== value);
            default: return myActiveFilter;
        }
    }, []);

    function handleCategoryChange(e) {
        categoryToggle(e);
    }

    //sort botName
    const [filteredbyName, setFilteredByName] = useState(false);
    const handleSortName = (e) => { setFilteredByName(!filteredbyName) }
    //console.log(filteredbyName)
    //sort botScore
    const [filteredByScore, setFilteredByScore] = useState(false);
    const handleSortScore = (e) => { setFilteredByScore(!filteredByScore) }

    //renders if serchvalue is true.
    const listBotsThatRenders = botData.filter((bot) => {
        return searchValue ? bot.name.toLowerCase().match(searchValue) : true
    })
        .filter((bot) => {
            const isItInMyActiveFilter = (el) => {
                /*  for (var i = 0; i < myActiveFilter.length; i++) { 
                    return bot.includes(myActiveFilter[i]) 
                }  */ 
                
                //work with one category   
                return el.includes(myActiveFilter) 
                         
            }

            return myActiveFilter ? 
                                
                bot.categories.some(isItInMyActiveFilter) 
                :
                //true
                console.log('här är du aldrig');
        })

        //topscore 
        .filter((bot) => {
            return filteredByScore ? botData.sort((a, b) => b.score - a.score) : true
        })

        //lowscore
        //.filter((bot) => { ****** ? botData.sort((a,b) => a.score - b.score):true    })

        //a-z 
        .filter((bot) => {
            return filteredbyName ? botData.sort((a, b) => a.name.localeCompare(b.name)) : true
        })

        //z-a
        //.filter((bot) => { ****** ? botData.sort((a,b) => b.name.localeCompare(a.name))  :true    })

    //filterbyfavorite
    //.filter((bot) => { ****** ?                     }) 


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
                                <div className="category4">
                                    <input type="checkbox" className="star" value="Favorites"
                                        onChange={handleCategoryChange} />
                                    <label htmlFor="star">Favorites</label>
                                </div>
                                {props.categories.map((c, idx) =>
                                    <div className="category4" key={idx} onChange={handleCategoryChange}>
                                        <input type="checkbox" className="categoryCheck"
                                            value={c} />
                                        <label htmlFor="categoryCheck">{c}</label>
                                    </div>)}
                            </div>
                        </div>
                    ) : (
                            <div className="category2">
                                <div className="filterbar" onClick={toggleFilter}>
                                    <p className="activef">Active filter: {myActiveFilter.join(' , ')} </p>
                                    <p className="hidef">Show filters{' '}
                                        <input type="checkbox" className="trianglelight" /></p>
                                </div>
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

