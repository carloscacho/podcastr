import { Alert } from "react-bootstrap";

export function alertShow(variant: string, msg: string){
  return (
    <Alert variant={variant}>
      {msg}
    </Alert>
  )
}