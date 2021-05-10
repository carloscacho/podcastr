import crypto from 'crypto';
import { api } from '../services/api';


const algorithm = 'aes-256-ctr';
let secretKeyTransfer = process.env.SECRET_KEY_TRANSFER || 'RtaW4iOnRydWUsImeyJhbGciOiJFUbn25GoGRjOPuzUxMiIsInRlhdCI6M';
const iv = crypto.randomBytes(16);
secretKeyTransfer = crypto.createHash('sha256').update(String(secretKeyTransfer)).digest('base64').substr(0, 32);

type User = {
  name: string,
  email: string,
  password: string
}

export function Login(user) {
  const assign = generateAccess(user);
  api.post("/user/login", {
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

export function addUserData(user: User, token: string) {
  const passwordTransfer = encrypt(user.password);
  //verificar se email já existe
  const verify = api.get("/user", { params: {email: user.email}})

  if(!verify){
    api.post("/user", {
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
  } else {
    return {erros: true, data: "Email já cadastrado no sistema"};
  }
  
}

export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)  
  }
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null;
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

export function generateAccess(user) {
    const header = JSON.stringify({
      'alg': 'HS256',
      'typ': 'JWT'
    });

    const payload = JSON.stringify(user);

    const base64Header = Buffer.from(header).toString('base64').replace(/=/g, '');
    const base64Payload = Buffer.from(payload).toString('base64').replace(/=/g, '');
    let secret = process.env.SECRET_KEY || '5cCI6IkpXGtso1I3VXGkSjH5J0Rk6809VCIsImtpZCI6InWJFfMz13X76PGWF0XFuhjJU';
    
    
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

