import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import axios from "axios";
import { api } from "../../../config";


export const CadastroCompra= () => {

    const [compra, setCompra]= useState({
        data:''
    });
    
    const[status,setStatus]=useState({
        type:'',
        message:''
    });

    const valorInput = e => setCompra({
        ...compra,[e.target.name]: e.target.value
    })

    const CadCompra = async e  =>{
        e.preventDefault();
        console.log(compra);

        const headers ={
            'Content-Type':'application/json'
        }

        await axios.post(api+"/compras",compra,{headers})
        .then((response)=> {
            if(response.data.error){
                setStatus({
                    type:'error',
                    message: response.data.message
                })

            }else{
                setStatus({
                    type:"success",
                    message:response.data.message
                })
            }
        })
        .catch(()=>{
            console.log("Erro:Sem conexão com a API.")
        })
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Compras</h1>
                </div>
            </div>
            <hr className="m-1" />
            <Form className="p-2" onSubmit={CadCompra}>
               
               {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>:""}

               {status.type === 'success'? <Alert color="success">{status.message}</Alert>:""}

                <FormGroup className="p-2">
                    <Label>Data</Label>
                    <Input type="text" name="data" placeholder="Data da Compra" 
                    onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Id do Cliente</Label>
                    <Input type="text" name="clienteid" placeholder="Numero Id do Cliente" 
                    onChange={valorInput}/>
                </FormGroup>
                
                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>

        </Container>
    )
}