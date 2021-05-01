import { GetStaticPaths, GetStaticProps } from 'next';
import Head from "next/head";
import Link from 'next/link';
import { api } from '../../services/api';
import Image from "next/image";
import { EpisodeType } from '../../types/Episode'
import { convertDateToISOString, convertDurationToTimeString } from '../../utils/convertions';

import styles from './episode.module.scss';
import { usePlayer } from '../../contexts/PlayerContexts';

type EpisodeProps = {
  episode : EpisodeType;
}

export default function Episode( {episode}: EpisodeProps ) {
  
  const { play } = usePlayer();

  return (
    <div className={styles.contentDetails}>
      <div className={styles.episode}>
      <Head>
        <title>Ep: {episode.title}</title>
      </Head>
      <div className={styles.thumbnail}>
        <Link href='/'>
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>

        <Image 
          width={700} 
          height={350} 
          src={episode.thumbnail} 
          alt={episode.title}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar Episódio"/>
        </button>
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAtString}</span>
      </header>

      <div 
        className={styles.description} 
        dangerouslySetInnerHTML={{__html: episode.description}} 
      />
    </div>
    </div>
    

  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episode', 
  // {
  //   params: {
  //     _limit: 2,
  //     _sort: 'published_at',
  //     _order: 'desc'
  //   }
  // }
  )

  //construindo as duas primeira paginas
  const paths = data.map(ep => {
    return {
      params: {
        slug: ep.id
      }
    }
  });

  return {
    paths, 
    fallback: 'blocking' 
  }
}

export const getStaticProps : GetStaticProps = async (ctx) => {
  const {slug} = ctx.params;
  const { data } = await api.get(`/episode/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: convertDateToISOString(data.published_at),
    duration: Number(data.file.duration),
    durationAtString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24, //24 horas
  }


}