import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { addUserData } from "../../utils/Admin";

import styles from "./style.module.scss";

export function CadPodcast(){
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState("");
  const [published_at, setPublishedAt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState(0);

  function cleanData(){
    setId("");
    setTitle("");
    setMembers("");
    setPublishedAt("");
    setThumbnail("");
    setDescription("");
    setUrl("");
    setDuration(0);

  }

  function Cadastrar() {
    const episode = {
     id,
     title,
     members,
     published_at,
     thumbnail,
     description,
     url,
     duration
    }
    cleanData()
    // if(addUserData(user)){
    //   console.log("Usuário Cadastrado");
    //   return;
    // }
  }


  return(
    <Container className={styles.cadContent}>
      <Card className={styles.cadCard}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              value={title} 
              onChange={(v) => setTitle(v.target.value)} 
              type="text" placeholder="Digite um titulo" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Membros</Form.Label>
            <Form.Control 
              value={members} 
              onChange={(v) => setMembers(v.target.value)} 
              type="text" placeholder="Digite os nomes dos membros" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>published_at</Form.Label>
            <Form.Control 
              value={published_at} 
              onChange={(v) => setPublishedAt(v.target.value)} 
              type="date" placeholder="Digite a data" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Imagem do Podcast</Form.Label>
            <Form.Control 
              value={thumbnail} 
              onChange={(v) => setThumbnail(v.target.value)} 
              type="text" placeholder="Digite Nome Completo" />
          </Form.Group>


          <Form.Group controlId="formBasicEmail">
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4}
              value={description} 
              onChange={(v) => setDescription(v.target.value)} 
              type="text" placeholder="Digite uma descrição do podcast" />
          </Form.Group>


          <Form.Group controlId="formBasicEmail">
            <Form.Label>URL</Form.Label>
            <Form.Control 
              value={url} 
              onChange={(v) => setUrl(v.target.value)} 
              type="text" placeholder="Digite URL do Posdcast" />
          </Form.Group>


          <Form.Group controlId="formBasicEmail">
            <Form.Label>Duração</Form.Label>
            <Form.Control 
              value={duration}
              onChange={(v) => setDuration(Number(v.target.value))} 
              type="number" placeholder="Digite Nome Completo" />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={Cadastrar}>
            Cadastrar
          </Button>
        </Form>
      </Card>
    </Container>
  )
}