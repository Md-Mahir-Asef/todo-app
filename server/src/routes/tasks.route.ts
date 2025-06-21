import { Router } from "express";

const tasksRoute = Router();

tasksRoute.get("/", (req, res)=> {
    res.json({
        "data": "data"
    });
});

export default tasksRoute;