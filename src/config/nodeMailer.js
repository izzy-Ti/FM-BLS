/*import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import {google} from 'googleapis'

dotenv.config()

const client_id = process.env.CLIENT_ID
const client_secreate = process.env.CLIENT_SECRET 
const redirect_url = process.env.REDIRECT_URL 
const refresh_token = process.env.REFRESH_TOKEN 


const oauth2client = new google.auth.OAuth2(client_id, client_secreate, redirect_url)


oauth2client.setCredentials({refresh_token: refresh_token})
const accessToken = await oauth2client.getAccessToken()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: client_id,
        clientSecret: client_secreate,
        refreshToken : refresh_token,
        accessToken: accessToken
    }
})

export default transporter */


import sib from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();  // Ensure environment variables are loaded

// Initialize the API client
const client = sib.ApiClient.instance;

// Access the 'api-key' authentication object (note the hyphen)
const apiKey = client.authentications['api-key'];

if (!apiKey) {
    throw new Error('API key authentication object not found.');
}

// Set the API key from the environment variable
apiKey.apiKey = process.env.API_BERVO;  // Ensure .env contains the correct API key

// Initialize the transactional emails API for sending emails
const transporter = new sib.TransactionalEmailsApi();

export default transporter;





