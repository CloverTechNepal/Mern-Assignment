import app from "./index.js";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT || 6000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    
});