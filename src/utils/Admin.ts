import crypto from 'crypto';
import { api } from '../services/api';


const algorithm = 'aes-256-ctr';
const secretKeyTransfer = process.env.SECRET_KEY_TRANSFER;
const iv = crypto.randomBytes(16);


type User = {
  name: string,
  email: string,
  password: string
}

export function Login(user) {
  const assign = generateAccess(user);
  api.post("/login", {
    params: {
      email: user.email,
      assign: assign
    }
  }).then(response => {
    saveToken(response.data.token)
    return response.data
  }).catch(err => {
    console.log(err);
    return null;
  })
}

export function addUserData(user: User, token: string): any {
  const passwordTransfer = encrypt(user.password);
  //verificar se email já existe
  const verify = api.get("/user", { params: {email: user.email}})

  if(!verify){
    api.post("/user/login", {
      params: {
        name: user.name,
        email: user.email,
        content: passwordTransfer.content,
        iv: passwordTransfer.iv,
      },
      headers: {
        'x-access-token': token,
        "content-type": "application/json"
      }
    }).then(response => {
      return {erros: false, data: response.data}
    }).catch(err => {
      console.log(err);
      return {erros: true, data: err};
    })
  }
  return {erros: true, data: "Email já cadastrado no sistema"};
}

function saveToken(token: string) {
  localStorage.setItem("token", token)  
}

export function removeToken() {
  localStorage.removeItem("token")
}

export function getToken() {
  return localStorage.getItem("token")
}

export function validadeToken() {
  const token = getToken();
}

const encrypt = (text) => {

  const cipher = crypto.createCipheriv(algorithm, secretKeyTransfer, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex')
  };
};

function generateAccess(user: User) {
    const header = JSON.stringify({
      'alg': 'HS256',
      'typ': 'JWT'
    });

    const payload = JSON.stringify(user);

    const base64Header = Buffer.from(header).toString('base64').replace(/=/g, '');
    const base64Payload = Buffer.from(payload).toString('base64').replace(/=/g, '');
    const secret = process.env.SECRET_KEY

    const data = base64Header + '.' + base64Payload;

    const signature = crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('base64');

    const signatureUrl = signature
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')

    return signatureUrl;
}

