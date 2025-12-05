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