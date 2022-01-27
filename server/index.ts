import dotenv from "dotenv"
dotenv.config()

import express from "express"

const app = express()

import apiRouter from "../api"

app.use("/api", apiRouter)

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`)
})