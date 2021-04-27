import React from 'react';
import format from 'date-fns/format';
import ptBR from  'date-fns/locale/pt-BR';
import Link from 'next/link';
import SwitchSelector from 'react-switch-selector';
import { BiMoon } from "react-icons/bi";
import { BsBrightnessHigh } from "react-icons/bs"
import { AiOutlinePlayCircle, AiFillPlayCircle } from "react-icons/ai"


import styles from './style.module.scss';
import { useTheme } from 'next-themes';
import { usePlayer } from '../../contexts/PlayerContexts';
import useWindowDimensions from '../../utils/WindowDimensions';

const options = [
  {
      label: <span><BiMoon /></span>,
      value: "dark",
      selectedBackgroundColor: "#8257E5",
  },
  {
      label: <span><BsBrightnessHigh /></span>,
      value: "light",
      selectedBackgroundColor: "#fce300"
  }
];

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM',  {
    locale: ptBR,
  })

  const { theme, setTheme } = useTheme()

  const { isOpenPlayer, toggleOpenPlay }  = usePlayer()

  const initialSelectedIndex = options.findIndex(({value}) => value === "light");

  const onChange = (mode) => {
      setTheme(mode)
  };

  const { width } = useWindowDimensions();

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <a>
        {theme === 'light' ? 
        <img src={width < 1088 ? "/logo-small.svg" : "/logo.svg" }  alt="Logo podcastr, imagem de um fone de ouvido"/> :
        <img src={width < 1088 ? "/logo-small-white.svg" : "/logo-white.svg"} alt="Logo podcastr, imagem de um fone de ouvido"/>
        }
        </a>
      </Link>
      {width < 720 ? "": <p>O Melhor para você ouvir, sempre</p>}

      <div className="rightHeader">
        <div className="darkMode">
        <SwitchSelector
            onChange={onChange}
            options={options}
            initialSelectedIndex={initialSelectedIndex}
            backgroundColor={"#f5f6fa"}
            fontColor={"#000"}
        />
        </div>
        
      </div>
      <span>{currentDate}</span>
      <button type="button" className={styles.openPlayer} onClick={toggleOpenPlay}>
        {isOpenPlayer ?  
          <AiFillPlayCircle color={"84D361"}  className={styles.closeButton} /> :
          <AiOutlinePlayCircle color={"84D361"} className={styles.openButton} />
        }  
        
      </button>
    </header>
  );
}