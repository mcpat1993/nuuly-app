import React, { useState, useEffect }  from 'react';
import { MDBInput, MDBCol } from "mdbreact";
import styled from 'styled-components'; 

const BreweryTitle = styled.li`
  list-style-type: none;
  &:hover{
    cursor: pointer;
    color: #edb000;
  }
`

const BreweriesContainer = styled.div`
  background: #f2f2f2;
  border-radius: 10px;
  padding: 10px;
  max-height: 400px;
  overflow: scroll;
`

const BreweryList = styled.ul`
  margin: 0px;
`

const BreweryContainer = styled.div`
  background: #f2f2f2;
  border-radius: 10px;
  padding: 10px;
  max-height: 200px;
  overflow: scroll;
`

const Home = () => {
const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [breweries, setBreweries] = useState([]);
    const [search, setSearch] = useState('');
    const [breweryView, setBreweryView] = useState('none');

    useEffect(()=>{
      console.log('breweries');
      console.log(breweries);
    }, [breweries])

    useEffect(() => {
        fetch("https://api.openbrewerydb.org/breweries/search?query=")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setBreweries(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [])
    const searchBreweries = () =>{
      // fetch the value in the search bar state to complete the query to the api
      fetch("https://api.openbrewerydb.org/breweries/search?query="+search)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setBreweries(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }
if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
          <div>
            <MDBCol md="6">
              <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={e => setSearch(e.currentTarget.value)} onKeyDown={e=>{
                if (e.key === 'Enter') {
                  // We only perform an inquiry on the API when enter is pressed
                  // because we dont want to overwhelm it with queries. It could
                  // happen on a change event but that would significantly increase 
                  // the number of queries
                  searchBreweries()
                }
              }}/>
            </MDBCol>
            {breweryView === 'none' && (
              <BreweriesContainer>
                <BreweryList>
                    {breweries.map((brewery, index) => (
                    <BreweryTitle key={brewery.id} onClick={()=>setBreweryView(index)}>
                        {brewery.name} 
                    </BreweryTitle>
                    ))}
                </BreweryList>
                {breweries.length === 0 && 'There were no breweries that match your search'}
              </BreweriesContainer>
            )}

            {breweryView !== 'none' && (
              <BreweryContainer>
                {breweries[breweryView]?.name}
              </BreweryContainer>
            )}
          </div>
        );
    }
}
export default Home;