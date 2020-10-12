export interface connection{
    port:number,
    host:string
}

export interface customer{
    name:string,
    email:string,
    phone:string
}

export interface charge{
    amount:number,
    currency:string,
    source:string,
    description:string,
    customer:string
}