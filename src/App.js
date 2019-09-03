import React, { useState, useEffect } from 'react';
//import './App.css';

import './scss/main.css';
import Header from './components/layout/Header';
import Filters from './components/Filters';

const App = props => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [categories, setCategories] = useState([]);

  async function fetchData() {
    const res = await fetch(`https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/bots.json`);
    const data = await res
      .json()
      .then(res => {
        setData(res);
        setLoading(false);
        sortOutCategories(res);
        setErrors(null);

      })
      .catch(err => {
        setErrors(err)
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  //Sort out categories and sort them
  var catTemp = [];
  function sortOutCategories(res) {
    if (res) {
      res.map((bot, idx) => {
        for (var i = 0; i < res[idx].categories.length; i++) {
          catTemp.push(res[idx].categories[i]);
        }
      })
      catTemp.sort();
      setCategories([...new Set(catTemp)])
      return
    } else { return null; }
  }




  return (
    <div className="App">
      <Header />
      <Filters
        botData={data} 
        isLoading={isLoading}
        categories={categories}
      />
      {isLoading ? <p className="loading">...loading</p> : <div>{data.id}</div>}

     {/*  {hasError ? console.log({ hasError }) : console.log(hasError)} */}
    </div>

  )
}

export default App;
