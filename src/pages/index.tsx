import React, { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { EpisodeType, EpisodeAPI } from "../types/Episode";
import { api } from "../services/api";
import { convertDateToISOString, convertDurationToTimeString } from "../utils/convertions";

import styles from "./home.module.scss";
import { usePlayer } from "../contexts/PlayerContexts";
import { Card, Col, Container, Row } from "react-bootstrap";
import useWindowDimensions from "../utils/WindowDimensions";
import SwitchSelector from "react-switch-selector";

import { BsListUl, BsTable } from "react-icons/bs";

type HomeProps = {
  latestEpisodes: EpisodeType[];
  allEpisodes: EpisodeType[];
}


export default function Home(props: HomeProps) {
  const { latestEpisodes, allEpisodes } = props
  const episodesList = [...latestEpisodes, ...allEpisodes];
  const {playList} = usePlayer();
  const { width } = useWindowDimensions();

  const [isListDisplay, setListDisplay ] = useState(true)

 //console.log(props.episodes);

const options = [
  {
      label: <BsTable />,
      value: "list",
      selectedBackgroundColor: "#b9b9b9",
  },
  {
      label: <BsListUl />,
      value: "table",
      selectedBackgroundColor: "#b9b9b9"
  }
];

const onChange = (newValue) => {
    setListDisplay(newValue === "list");
};

const initialSelectedIndex = options.findIndex(({value}) => value === "list");
  
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | Podcastr</title>
      </Head>
      <section className={styles.latestEps}>
        <h2>Últimos lançamentos</h2>

        <ul>
          <Row>
          {latestEpisodes.map((episodes, index) => {
            return (
              <Col xs={12} md={12} lg={12} xl={6}>
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
              </Col>
            )
          })}
          </Row>
        </ul>

      </section>

      <section className={styles.allEps}>
        <h2>Todos os episódios </h2>
        <SwitchSelector
          onChange={onChange}
          options={options}
          initialSelectedIndex={initialSelectedIndex}
        />
       {!isListDisplay ? <table>
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
        
      : 
      <Container fluid className={styles.allEpsCards}>
          <Row>
          {allEpisodes.map((ep, index) => {
            return (
              <Col key={ep.id} lg={4} md={6} sm={12}>
              <Card className={styles.card}>
                <Card.Img className={styles.cardImg} src={ep.thumbnail} />
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>
                    <Link href={`/episode/${ep.id}`}>
                      <a>{ep.title}</a>
                    </Link>
                  </Card.Title>
                  <div>
                  <Card.Text className={styles.cardText}>
                    <p style={{width: '60%'}}>{ep.members}</p>
                    <div className={styles.detailsCard}>
                      <p>{ep.publishedAt}</p>
                      <p>{ep.durationAtString}</p>
                    </div>

                  </Card.Text>
                  <button 
                      type="button" 
                      onClick={() => playList(episodesList, index + latestEpisodes.length)
                    }>
                      <img src="/play-green.svg" alt="tocar o podcast"/>
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            )
          })}
          </Row>
        </Container>
      }
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
  const { data } = await api.get('episode', 
  // {
  //   params: {
  //     _limit: 12,
  //     _sort: 'published_at',
  //     _order: 'desc'
  //   }
  // }
  )

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