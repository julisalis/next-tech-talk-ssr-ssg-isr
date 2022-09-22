import Image from "next/image";
import Link from "next/link";
import { pokemonApi } from "../api";
import styles from "../styles/Home.module.css";

export default function Home({ pokemons }) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {pokemons.map((p) => (
          <li key={p.id} className={styles.pokemon}>
            <Link href={`/pokemon/${p.name}`}>
              <div className={styles.pokemonLink}>
                <Image
                  src={p.img}
                  alt={p.name}
                  width="100px"
                  height="100px"
                  priority={false}
                />
                {p.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { data } = await pokemonApi.get("/pokemon?limit=151");

  console.log("EN getServerSideProps de la home");

  const pokemons = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};
