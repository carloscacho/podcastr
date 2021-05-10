import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { BsPlay, BsPersonPlus } from 'react-icons/bs';
import SwitchSelector from 'react-switch-selector';
import { CadPodcast } from '../../components/Cadastro/CadPodcast';
import { CadUsuario } from '../../components/Cadastro/CadUsuario';
import { api } from '../../services/api';
import { generateAccess, getToken, removeToken, saveToken } from '../../utils/Admin';
import { alertShow } from '../../utils/Alerts';

import styles from './admin.module.scss';

const options = [
  {
      label: <span><BsPlay />Cadastro de Podcast</span>,
      value: "cadPodcast",
      selectedBackgroundColor: "#b9b9b9",
  },
  {
      label: <span><BsPersonPlus />Cadastro de Usuário</span>,
      value: "cadUsuario",
      selectedBackgroundColor: "#b9b9b9"
  }
];


export default function AdminPage() {

  const [isLogged, setIsLogged] = useState(false);
  const [inLogin, setInLogin] = useState(false);
  const [isCadUser, setIsCadUser] = useState(false);
  const [showError, setShowError] = useState(false);
  const { theme } = useTheme()

  const [email , setEmail] = useState("")
  const [password, setPassword] = useState("")

  function cleanData(){
    setEmail("");
    setPassword("");
  }

  function onChangeCad(select){
    setIsCadUser(select == "cadUsuario");
  }

  useEffect(() => {
    async function onLogin(){
      const user = {email, password}
      const assign = generateAccess(user);
      try{
        const { data } = await api.post("/user/login", {
          params: {
            email: user.email,
            assign: assign
          }
        })

        if(data?.auth) {
          saveToken(data.token)
          setIsLogged(true)
        } else {
          setShowError(true);
          setInLogin(false)
          cleanData()
        }
      } catch (error) {
        console.log(error);
        setShowError(true);
        setInLogin(false)
        cleanData()
      }
      
    }
    inLogin && onLogin();
  }, [inLogin]);

  useEffect(() => {
    const tk = getToken();
    if(tk != null){
      setIsLogged(true)
    }
  },[])

  useEffect(() => {
    function showErrorMsg(){
      setTimeout(() => setShowError(false), 3000)
    }
    showError && showErrorMsg();
  },[showError])

  function logout(){
    removeToken();
    setIsLogged(false);
  }

  return(
    <div className={styles.container}>
      {!isLogged ? 
        <Container className={styles.content}>
          <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>
              {theme === "dark" ? 
                <img src="/logo-white.svg"  alt="Logo podcastr, imagem de um fone de ouvido"/> :
                <img src="/logo.svg" alt="Logo podcastr, imagem de um fone de ouvido"/>
              }
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  value={email}
                  onChange={(v) => setEmail(v.target.value)} 
                  type="email" placeholder="Digite o email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                  value={password}
                  onChange={(v) => setPassword(v.target.value)} 
                  type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" onClick={() => setInLogin(true)}>
                  Entrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
          {showError && alertShow("danger", "email ou senha incorretos")}
        </Container>
      : 
      <div>
        <div className={styles.adminHeader}>
          <h2 className={styles.header}>Admin Page</h2>
          <button onClick={() => logout()}>
            Sair
          </button>
        </div>
        
        <div className={styles.selector}> 
          <SwitchSelector 
            onChange={onChangeCad}
            options={options}
          />
        </div>
        {!isCadUser ? <CadPodcast />: <CadUsuario />}
      </div>

      }
    </div>
  )
}