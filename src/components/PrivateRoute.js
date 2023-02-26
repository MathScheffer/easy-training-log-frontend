import React from "react"
import { Link, Navigate } from "react-router-dom"
import JWT from 'jsonwebtoken';
import Redireciona from "./redireciona";
const PrivateRoute = ({role,children}) => {
    

    const token = localStorage.getItem('token')


    const gerenciarRota = () => {
        if (token){
           return( 
                JWT.verify(token, 'encryptor', (err, payload) => {
                    console.log(err)
                    console.log(payload)
                    if(err || payload.role !== role){
                        console.log(err.name)
                        return <Redireciona />
                    }else{
                        return children
                    }
                })
           )

            
        }else{
            return <Navigate to='/login'/>
        }
    }
    
    return(
        gerenciarRota()
    )

}

export default PrivateRoute