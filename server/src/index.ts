import app from "./app";
import {config} from "dotenv";

config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});