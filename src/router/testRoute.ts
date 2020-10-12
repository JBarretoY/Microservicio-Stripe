import {Request, Router,Response} from "express";

const route:Router = Router()

route.get('/',(req:Request,res:Response)=>{
    res.json('api Running').status(200)
})

export const WebController:Router = route