import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { EpisodeType, EpisodeAPI } from "../types/Episode";
import { api } from "../services/api";
import { convertDateToISOString, convertDurationToTimeString } from "../utils/convertions";

import styles from "./home.module.scss";
import { usePlayer } from "../contexts/PlayerContexts";

type HomeProps = {
  latestEpisodes: EpisodeType[];
  allEpisodes: EpisodeType[];
}


export default function Home(props: HomeProps) {
  const { latestEpisodes, allEpisodes } = props
  const episodesList = [...latestEpisodes, ...allEpisodes];
  const {playList} = usePlayer();

 //console.log(props.episodes);
  
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | Podcastr</title>
      </Head>
      <section className={styles.latestEps}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episodes, index) => {
            return (
              <li key={episodes.id}>
                <Image 
                  width={192} 
                  height={192} 
                  src={episodes.thumbnail} 
                  alt={episodes.title}
                  objectFit="cover"
                />

                <div className={styles.epDetails}>
                  <Link href={`/episode/${episodes.id}`}>
                    <a>{episodes.title}</a>
                  </Link>
                  <p>{episodes.members}</p>
                  <span>{episodes.publishedAt}</span>
                  <span>{episodes.durationAtString}</span>
                </div>

                <button type="button" onClick={() => playList(episodesList, index)}>
                  <img src="/play-green.svg" alt="tocar o podcast"/>
                </button>
              </li>
            )
          })}
        </ul>

      </section>

      <section className={styles.allEps}>
        <h2>Todos os episódios </h2>
        
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((ep, index) => {
              return(
                <tr key={ep.id}>
                  <td style={{width: 72}}>
                    <Image 
                      width={120} 
                      height={120} 
                      src={ep.thumbnail} 
                      alt={ep.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episode/${ep.id}`}>
                      <a>{ep.title}</a>
                    </Link>
                  </td>
                  <td>{ep.members}</td>
                  <td style={{width: 100}}>{ep.publishedAt}</td>
                  <td>{ep.durationAtString}</td>
                  <td>
                    <button 
                      type="button" 
                      onClick={() => playList(episodesList, index + latestEpisodes.length)
                    }>
                      <img src="/play-green.svg" alt="tocar o podcast"/>
                    </button>
                </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

//Server Side Render 
// export async function getServerSideProps(){
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json();
//   return { 
//     props: {
//       episodes: data,
//     }
//   }
// }

//SSG
export const getStaticProps : GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map((episode: EpisodeAPI) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: convertDateToISOString(episode.published_at),
      duration: Number(episode.file.duration),
      durationAtString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
    
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);
  
  return { 
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60  *  60 * 8, //8 horas
  }
}