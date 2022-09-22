import Image from "next/image";
import { pokemonApi } from "../../api";
import styles from "../../styles/Pokemon.module.css";

export default function Pokemon({ pokemon }) {
  return (
    <div className={styles.container}>
      <h1>{pokemon.name}</h1>
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width="200px"
        height="200px"
      />
      <Image
        src={pokemon.imageFrontSprite}
        alt={pokemon.name}
        width="200px"
        height="200px"
      />
      <Image
        src={pokemon.imageBackSprite}
        alt={pokemon.name}
        width="200px"
        height="200px"
      />
      <p>
        {pokemon.date} {pokemon.time}
      </p>
    </div>
  );
}

export const getStaticPaths = async (context) => {
  console.log("EN getStaticPaths");
  /* const { data } = await pokemonApi.get(`/pokemon?limit=151`);
  const pokemons151Names = data.results.map((pokemon) => pokemon.name); */

  /* const paths = pokemons151Names.map((name) => ({ params: { name } })); */

  return {
    paths: [{ params: { name: "bulbasaur" } }],
    // fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const { name } = params;
  console.log("EN getStaticProps de " + name);

  const { data } = await pokemonApi.get(`/pokemon/${name}`);

  const d = new Date();

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const dataOptimized = {
    name: data.name,
    id: data.id,
    image: data.sprites.other?.dream_world.front_default,
    imageFrontSprite: data.sprites.front_default,
    imageBackSprite: data.sprites.back_default,
    date: d.toLocaleDateString(),
    time: d.toLocaleTimeString(),
  };

  return {
    props: {
      pokemon: dataOptimized,
    },
    /* revalidate: 86400, */ // 60 * 60 * 24 = 1 day
    revalidate: 30,
  };
};
