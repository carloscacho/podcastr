import axios from "axios";

export const api = axios.create({
  // baseURL: 'https://backendpodcastr.herokuapp.com'
  baseURL: 'http://localhost:3003'
})