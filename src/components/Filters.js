import React, { useState, useReducer } from 'react';
import search from '../img/search.svg';
import BotItem from './BotItem';
import { async } from 'q';

const Filters = props => {

    const [filteredSearchData, setFilteredSearchData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [showFilter, setShowFilter] = useState(true);

    //////////////////Searchbar
    const [searchValue, setSearchValue] = useState("");

    async function handleSearchInputChanges(e) {
        let botData = props.botData;
        setSearchValue(e.target.value);

        if (e.target.value !== "") {
            await setFilteredSearchData(
                botData.filter((botData) => {
                    return botData.name.toLowerCase().match(e.target.value.toLowerCase())
                })
            )
            //set isFiltered for rending filteredlist
            await setIsFiltered(true);
        } else {
            setIsFiltered(false);
        }
    }

    //when you press enter 
    const callSearchFunctionOnEnter = (e) => {
        e.preventDefault();
        resetInputField();
    }
    const resetInputField = () => {
        setSearchValue("");
    }
    /////////////////Filter Categories///

    //toggle ShowFilter
    const toggleFilter = (e) => { setShowFilter(!showFilter) }

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

    //Filter the bot with categories
    const [categoryFilteredData, setCategoryFilteredData] = useState([]);
    async function handleCategoryChange(e) {
        await categoryToggle(e);

        let botData = props.botData;

        //Think a bit more here
        if (myActiveFilter.length !== 0) {
            // if (myActiveFilter.length <1) {

            console.log(myActiveFilter);

            await setCategoryFilteredData(
                botData.filter((botData) => {
                    //  return botData.categories.toLowerCase().match(myActiveFilter.toLowerCase())
                })
            )

            await setIsFiltered(true);
        }
        else {
            setIsFiltered(false);
        }
    }

    //sort botName
    const handleSortName = (e) => {

    }
    //sort botName
    const handleSortScore = (e) => {

    }

    let content = <p>Loading bots...</p>;
    if (!props.isLoading) {

        content = (

            <div className="container">
                <div className="Searchbar">
                    <img src={search} alt="search" className="searchicon" />
                    <form
                        onSubmit={callSearchFunctionOnEnter}
                    >
                        <input type="text" className="searchInput"
                            value={searchValue}
                            onChange={handleSearchInputChanges}
                            placeholder="Search"
                        />
                    </form>
                </div>


                <div className="categorybar ">
                    {showFilter ? (
                        <div>
                            <div className="filterbar" onClick={toggleFilter}>
                                <p>Filter by:{' '} {myActiveFilter.join(' , ')}
                                </p><p>Hide filter
                                    <input type="checkbox" className="trianglelight" /></p>
                            </div>
                            <div className="categorybar">
                                <div className="category">
                                    <input type="checkbox" className="star" value="Favorites"
                                        onChange={handleCategoryChange} />
                                    <label htmlFor="star">Favorites</label>
                                </div>
                                {props.categories.map((c, idx) =>
                                    <div className="category" key={idx} onChange={handleCategoryChange}>
                                        <input type="checkbox" className="categoryCheck"
                                            value={c} />
                                        <label htmlFor="categoryCheck">{c}</label></div>)}
                            </div>
                        </div>
                    ) : (
                            <div className="filterbar" onClick={toggleFilter}>
                                <p>Active filter: {myActiveFilter.join(' , ')} </p>
                                <p>Show filters{' '}
                                    <input type="checkbox" className="trianglelight" /></p>
                            </div>
                        )}
                </div>


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
                                /* 
                                filteredSearchData.map((bot, idx) =>
                                <BotItem key={idx} filteredSearchData={bot} idx={idx + 1} />)
                                */
                               
                                //console.log(filteredSearchData[0].categories)
                                console.log(myActiveFilter)

                                : props.botData.map((bot, idx) =>
                                    <BotItem key={idx} botData={bot} idx={idx + 1} />
                                )
                        }
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
