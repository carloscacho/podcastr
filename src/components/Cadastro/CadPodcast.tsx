import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

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
    //cleanData()
    // if(addUserData(user)){
    //   console.log("Usuário Cadastrado");
    //   return;
    // }
  }


  return(
    <Container className={styles.cadContent}>
      <Card className={styles.cadCard}>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Titulo</Form.Label>
            <Form.Control 
              value={title} 
              onChange={(v) => setTitle(v.target.value)} 
              type="text" placeholder="Digite um titulo" />
          </Form.Group>

          <Form.Group controlId="formDescricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4}
              value={description} 
              onChange={(v) => setDescription(v.target.value)} 
              type="text" placeholder="Digite uma descrição do podcast" />
          </Form.Group>

          <Form.Group controlId="formMembros">
            <Form.Label>Membros</Form.Label>
            <Form.Control 
              value={members} 
              onChange={(v) => setMembers(v.target.value)} 
              type="text" placeholder="Digite os nomes dos membros" />
          </Form.Group>

          <Form.Group controlId="formImagem">
            <Form.Label>Imagem do Podcast</Form.Label>
            <Form.Control 
              value={thumbnail} 
              onChange={(v) => setThumbnail(v.target.value)} 
              type="file" placeholder="Digite Nome Completo" />
          </Form.Group>




          <Form.Group controlId="formURL">
            <Form.Label>URL</Form.Label>
            <Form.Control 
              value={url} 
              onChange={(v) => setUrl(v.target.value)} 
              type="text" placeholder="Digite URL do Posdcast" />
          </Form.Group>



          <Row>
            <Col sm={12} md={6}>
              <Form.Group controlId="formPublish">
                <Form.Label>published_at</Form.Label>
                <Form.Control 
                  value={published_at} 
                  onChange={(v) => setPublishedAt(v.target.value)} 
                  type="date" placeholder="Digite a data" />
              </Form.Group>
            </Col>

            <Col sm={12} md={6}>
              <Form.Group controlId="formDuracao">
                <Form.Label>Duração</Form.Label>
                <Form.Control 
                  value={duration}
                  onChange={(v) => setDuration(Number(v.target.value))} 
                  type="number" placeholder="Digite Nome Completo" />
              </Form.Group>
            </Col>
          </Row>



          <Button variant="primary" onClick={Cadastrar}>
            Cadastrar
          </Button>
        </Form>
      </Card>
    </Container>
  )
}