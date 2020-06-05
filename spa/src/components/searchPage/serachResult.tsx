import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { foursquare, params } from '../../foursquare';
import { IFtech } from '../../interface';
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import './searchResult.css';

const { Search }  = Input;

const SearchData = () => {
    const [fetch, setFetch] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);



    async function fetchData(searchOption?: any) {

        try {
            const data = await foursquare.venues.getVenues({...params, "query": searchOption});
            
            if (data.response.venues.length > 0) {
                setFetch(data.response.venues);
            } else {
                const ssss: any = ["No data available"];
                setFetch(ssss);
            }

        } catch(error) {
            console.log(error);
            const ssss: any = ["Network Error"];
            setFetch(ssss);
        }
    };
    
  useEffect(() => {

    if (query.length > 0) {
        fetchData(query);
        setQuery('');
    } 

    if (fetch && fetch.length > 0) {
        setLoading(false);
        const data: any = renderData(fetch);
        setSearchResult(data);
    };

  }, [query, fetch]);


  const renderData = (data: (Array<IFtech> | any)) => {

    const msg = 'No data available';
    const error = 'Network Error';
    // eslint-disable-next-line
    if (data.length === 1 && data[0] === msg || data[0] === error) {
        console.log(data[0]);
        return <div className="h3 text-center">{data[0] === msg ? msg : error}</div>
    }

    return (
        <div>
            <h3 className="text-center m-0 p-0">{`${data.length} results found`}</h3>
            <div className="row">
                {
                    data.map((item: IFtech, index: number) => {
                        return (
                            <div className="col-lg-4 col-md-4 col-sm-12 m-3 p-3 mt-1  bg-light rounded" key={index}>
                                <h4>{`Name: ${item.name}`}</h4>
                                <h5>{`Address: ${item.location.address || 'Not Available'}`}</h5>
                                <h5>{`Lattitude: ${item.location.lat || 'Not Available'}`}</h5>
                                <h5>{`Longitude: ${item.location.lng || 'Not Available'}`}</h5>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
  };


  const handleSearch = (value: any) => {
    setQuery(value);
    setLoading(true);
  };


  return (
    <div className="" style={{minHeight: '100vh'}}>
        <div className="page-style w-100 mx-auto">
            <header className="h3 text-capitalize text-center pb-2 mt-5">Search for the nearest facility around you</header>
            <div className="search-width">
                <Search
                    className=""
                    placeholder="e.g: hospital"
                    enterButton="Search"
                    size="large"
                    onSearch={handleSearch}
                />
            </div>
            <hr/>
            <br/>
        </div>
        <div className="h1 text-center m-0 p-0 blue-text font-weignt-bold">{loading ? 'Loading...': ''}</div>
        <div className="w-100 mx-auto">{searchResult}</div>
    </div>
  );

};

export default SearchData;