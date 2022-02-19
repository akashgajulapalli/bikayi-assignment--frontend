import React, { useEffect, useState } from 'react';
import './App.css';
import TableComponent from './components/table';

const App = () => {
  const [prizesData, setprizesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [popularLaureates, setPopularLaureates] = useState([]);

  useEffect(() => {
    getPrizesData();
  }, []);

  const getPrizesData = async () => {
    const apiEndPoint = 'https://api.nobelprize.org/v1/prize.json';
    const response = await fetch(apiEndPoint).then(res => res.json());
    const prizes = response?.prizes
      ?.map(prize => {
        if (prize?.laureates && prize?.laureates?.length > 0) {
          return {
            category: prize?.category,
            year: prize?.year,
            name: prize?.laureates?.reduce((acc, curr) => `${acc} ${curr?.firstname} ${curr?.surname} ,`, '').slice(0, -1),
          }
        }
        return [];
      })
      ?.filter(item => item?.category !== undefined)
    const tempArray = response?.prizes
      ?.map(item => {
        if (item?.laureates && item?.laureates?.length > 0) {
          return item?.laureates?.map(ele => {
            return {
              id: ele.id,
              name: ele?.surname ? `${ele?.firstname} ${ele?.surname}` : '',
              motivation: ele.motivation,
              noOfPrizes: 1
            }
          })
        }
        return []
      })
      ?.flat()
      ?.filter(item => item !== undefined);
    let uniqueLauretesData = new Map();
    tempArray.forEach((item) => {
      let obj = item;
      if (uniqueLauretesData.has(item.id)) {
        obj = uniqueLauretesData.get(item.id);
        obj.noOfPrizes = obj.noOfPrizes + 1;
      }
      uniqueLauretesData.set(item.id, obj);
    });
    const laureates = Array.from(uniqueLauretesData.values()).filter(item => item.noOfPrizes > 1).filter(item => item.name);
    const categories = ['All', ...new Set(prizes.map(item => item?.category))];
    const years = ['All', ...new Set(prizes.map(item => item?.year))];
    setCategories(categories);
    setYears(years);
    setPopularLaureates(laureates);
    setprizesData(prizes);
  }

  return (
    <div className="App">
      {
        prizesData && prizesData.length > 0 &&
        <TableComponent
          tableData={prizesData}
          categoryData={categories}
          yearsData={years}
          modalData={popularLaureates}
        />
      }
    </div>
  );
}

export default App;