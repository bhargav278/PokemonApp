import { Badge, Card, Image, Text, Title } from "@mantine/core";
function PokemonCard({pokemon}){
    return(
        <Card
          // shadow="sm"
          className="w-80 h-100 cursor-pointer hover:scale-105 duration-100 "
          radius="lg"
          m={20}
          sx={{
            '&:hover': {
               boxShadow: '0 10px 20px rgba(0, 0, 0, 0.8)'
            },
          }}
        >
          <Card.Section className="h-10/12 flex justify-center object-center">
            <img className="p-6 w-full h-full object-contain" src={pokemon?.sprites?.other?.dream_world?.front_default || pokemon?.sprites?.other?.home?.front_default} />
          </Card.Section>

          <Title my={15} className="flex justify-center" order={4}>{pokemon?.name}</Title>
          <Badge color="rgba(140, 145, 141, 1)" px={15} py={12} size="lg" className="mx-auto">{pokemon?.types[0]?.type?.name}</Badge>
        </Card>
    )
}

export default PokemonCard;