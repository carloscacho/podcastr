import { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { addUserData, getToken } from "../../utils/Admin";
import { alertShow } from "../../utils/Alerts";

import styles from "./style.module.scss";

export function CadUsuario(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  function cleanData(){
    setName("");
    setEmail("");
    setPassword("");
  }

  function Cadastrar() {
    const user = {
      name,
      email,
      password,
    }
    cleanData()
    const token = getToken()
    const response = addUserData(user, token);
    if(!response?.erros){
      setShowSuccess(true)
      console.log(response?.data);
      setTimeout(() => setShowSuccess(false), 3000)
      return;
    }
    console.log(response?.data);
    setErrorMsg(response.data)
    setShowError(true)
    setTimeout(() => {setShowError(false); setErrorMsg("")}, 3000);
    return;
  
  }


  return(
    <Container className={styles.cadContent}>
      <Card className={styles.cadCard}>
        <Form>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control 
              value={name} 
              onChange={(v) => setName(v.target.value)} 
              type="text" placeholder="Digite Nome Completo" />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email} 
              onChange={(v) => setEmail(v.target.value)} 
              type="email" placeholder="Digite email" />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control 
              value={password} 
              onChange={(v) => setPassword(v.target.value)}  
              type="password" placeholder="Digite uma Senha" />
          </Form.Group>
          <Button variant="primary" onClick={() => Cadastrar()}>
            Cadastrar
          </Button>
        </Form>
      </Card>
      {showError && alertShow("error", errorMsg)}
      {showSuccess && alertShow("success", "Usuário cadastrado com sucesso")}
    </Container>
  )
}