import {  Badge, Box, Button, Card, Group, Image, Loader, Text, Title } from "@mantine/core"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


function PokemonDetailPage() {

    const { name } = useParams();
    console.log(name);

    const [pokemonData, setPokemonData] = useState([]);
    const [loader,setLoader] = useState(true);


    async function fetchData(name) {
        setLoader(true);
        const pokemonTempDeta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemonData(pokemonTempDeta?.data);
        setTimeout(()=>{
            setLoader(false);
        },[500]);
    }


    useEffect(() => {
        fetchData(name);
    }, [name]);

    console.log(pokemonData);
    return (
        (loader)?  
        <div className="h-screen w-screen flex justify-center ">
            <Loader className="mt-30" color="blue"/> 
        </div>:
        (pokemonData)?
        <>
            <Box className=" w-10/12 mx-auto flex justify-center items-center">
                <Card  padding="lg"radius="md"   className="w-8/12">
                    <Card.Section className="w-8/12 h-[500px]" mx="auto" py={10}>
                        <img
                        className="h-full object-contain  mx-auto"
                            src={pokemonData?.sprites?.other?.dream_world?.front_default || pokemonData?.sprites?.other?.home?.front_default}
                            height={50}
                            alt="Norway"
                        />
                    </Card.Section>
                    <Title mt={20} className="flex justify-center border bg-green-300" order={1}>{pokemonData?.name}</Title>
                    <Group justify="space-around" mt="md" mb="xs">
                        <Text size="1.5rem">Height</Text>
                        <Badge color="gray" size="xl">{pokemonData?.height}</Badge>
                    </Group>
                    <Group justify="space-around" mt="md" mb="xs">
                        <Text size="1.5rem">Weight</Text>
                        <Badge color="gray" size="xl">{pokemonData?.weight}</Badge>
                    </Group>
                    <Group justify="space-around" mt="md" mb="xs">
                        <Text size="1.5rem">Speed</Text>
                        <Badge color="gray" size="xl">{(pokemonData?.stats)? pokemonData?.stats[5]?.base_stat : ""}</Badge>
                    </Group>
                    <Group justify="space-around" mt="md" mb="xs">
                        <Text size="1.5rem">Experience</Text>
                        <Badge color="gray" size="xl">{pokemonData?.base_experience}</Badge>
                    </Group>
                    <Group justify="space-around" mt="md" mb="xs">
                        <Text size="1.5rem">Attack</Text>
                        <Badge color="gray" size="xl">{(pokemonData?.stats)? pokemonData?.stats[1]?.base_stat : ""}</Badge>
                    </Group>
                    <Group justify="space-around"  mt="md" mb="xs">
                        <Text size="1.5rem">Abilities</Text>
                        <Badge color="gray" size="xl">{(pokemonData?.abilities)?  pokemonData?.abilities[0]?.ability?.name : ""}</Badge>
                    </Group>
                    

                </Card>
            </Box>
        </> :
        <></>
    )
}

export default PokemonDetailPage 