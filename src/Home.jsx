
import { Button, Flex, Group, Input, Loader, NumberInput, Pagination, Title } from "@mantine/core";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import { Link } from "react-router-dom";



function Home() {

  const [allPokemonData, setAllPokemonData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [jumpTo,setJumpTo] = useState(1);


  async function fetchData(activePage) {
    setAllPokemonData([]);
    setLoader(true);
    let data = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${(activePage - 1) * 50}`);
    data = data?.data?.results;
    let allData = data.map((item) => axios.get(item.url));
    axios.all(allData)
      .then((res) => {
        let tempData = res.map((item) => item?.data)
        setAllPokemonData(tempData);
      })
    setTimeout(() => {
      setLoader(false);
    }, [500])

  }


  useEffect(() => {
    fetchData(activePage);
  }, [activePage]);

  return (

    <div className={`bg-gray-100 m-0 ${(loader) ? "h-screen" : ""}`}>
      <Title className="flex justify-center" pt={30} mb={30} order={1}>Lets Catch Pokemon</Title>
      <Group justify="center">
        <Input className="max-w-xl w-1/2" value={searchPokemon} onChange={(e) => { setSearchPokemon(e.target.value) }} placeholder="Search Pokemon" />
        <Link to={`/${searchPokemon}`}><Button>Search</Button></Link>
      </Group>
      {
        (loader) ?
          <div className="w-screen flex justify-center">
            <Loader className="mt-30" color="blue" />
          </div>
          :
          (allPokemonData.length) ?
            <>

              <Pagination
                my={30}
                total={26}
                siblings={1}
                defaultValue={1}
                value={activePage}
                onChange={(page) => setActivePage(page)}
                onPreviousPage={() => { setActivePage(prev => prev - 1) }}
                onNextPage={() => { setActivePage(prev => prev + 1) }}
                className="flex justify-center"
              />
              <Group justify="center">
              <NumberInput className="w-[100px]" defaultValue={jumpTo}  onChange={(val)=>setJumpTo(val)} placeholder="jump to..." max={26} min={1} />
              <Button onClick={()=>setActivePage(jumpTo)}>Jump</Button>
              </Group>




            </>

            : <></>

      }
      <Flex
        m={40}
        wrap="wrap"
        justify="center"
      >
        {
          (!loader && allPokemonData.length) ?
            allPokemonData.map((pokemon) => <Link key={pokemon.id} to={`/${pokemon.name}`}><PokemonCard pokemon={pokemon} /></Link>)
            : <></>
        }
      </Flex>



    </div>
  )
}

export default Home
