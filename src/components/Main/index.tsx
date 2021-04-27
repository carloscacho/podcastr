import { ReactNode } from "react";
import { usePlayer } from "../../contexts/PlayerContexts";
import { Header } from "../Header";


import styles  from "./style.module.scss"
 
type MainProps = {
  children: ReactNode
}

export function Main(props : MainProps){

  const { isOpenPlayer } = usePlayer();

  return (
    <main id="main" className={isOpenPlayer? styles.openPlayer : styles.closePlayer}>
      <Header />
      {props.children}
    </main>
  )

}