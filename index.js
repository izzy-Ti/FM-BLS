import app from "./src/app.js"
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(chalk.green.bold(`Server running on port ${PORT}`)))
process.on("SIGINT", () => { console.log("Received SIGINT, shutting down gracefully..."); process.exit(0); });
