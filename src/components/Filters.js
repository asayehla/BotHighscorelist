import React, { useState } from 'react';
import search from '../img/search.svg';
import BotItem from './BotItem';

const Filters = props => {
    //const [categoryFilteredData, setCategoryFilteredData] = useState([]);
    const [activeFilter, setActiveFilter] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [showFilters, setShowFilter] = useState(true);

    //Searchbar
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e) => {
        let botData = props.botData;
        setSearchValue(e.target.value);

        if (e.target.value !== "") {
            setFilteredData(
                botData.filter((botData) => {
                    return botData.name.toLowerCase().match(e.target.value.toLowerCase())
                })
            )
            //set isFiltered for rending filteredlist
            setIsFiltered(true);
        } else {
            setIsFiltered(false);
        }


    }
    const resetInputField = () => {
        setSearchValue("");
    }

    const callSearchFunctionOnEnter = (e) => {
        e.preventDefault();
        resetInputField();
    }
    //end of Searchbar

    //Filter Categories
    const handleCategoryChange = (e) => {
        if (e.target.checked) {
            setActiveFilter([...activeFilter, e.target.value])
        }

    }

    //toogle ShowFilter
    const clickhidefilter = (e) => { setShowFilter(false) }
    const clickshowfilter = (e) => { setShowFilter(true) }


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


                <div className="categorybar ">
                    {showFilters ? (
                        <div>
                            <div className="filterbar" onClick={clickhidefilter}>
                                <p>Filter by:{' '}{activeFilter}</p><p>Hide filter{' '}
                                    <input type="checkbox" className="trianglelight" /></p>
                            </div>
                            <div className="categorybar">
                                <div className="category">
                                    <input type="checkbox" className="star" style={divStyle} value="star"
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
                            <div className="filterbar" onClick={clickshowfilter}>
                                <p>Active filter:{' '}{activeFilter}</p>
                                {/*  {activeFilter.map(c,idx)=><p>{activeFilter[idx]}</p>} */}
                                <p>Show filters{' '}
                                    <input type="checkbox" className="trianglelight" /></p>
                            </div>
                        )}
                </div>


                <div className="botbar">
                    <p
                    //onChange={handleSortName} 
                    >Name{' '}
                        <input type="checkbox" className="triangledark" /></p>
                    <p
                    //onChange={handleSortScore}
                    >Score{' '}
                        <input type="checkbox" className="triangledark" /></p>
                </div>

                <div className="BotList">
                    <section>
                        {isFiltered ?


                            /* filteredData.map((bot, idx) =>
                            <BotItem key={idx} filteredData={bot} idx={idx + 1} />
                           )   */

                            console.log(filteredData)

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
