import { Alert } from "react-bootstrap";

export function alertShow(variant: string, msg: string){
  console.log(msg);
  
  return (
    <Alert 
      variant={variant} 
      style={{position: 'absolute', top: '8rem', right: '1rem'}}
    >
      {msg.toString()}
    </Alert>
  )
}