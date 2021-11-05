import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import axios from "axios";
import { api } from "../../../config";


export const CadPedido = () => {

    const [pedido, setPedido]= useState({
        data:''
    });
    const[status,setStatus]=useState({
        type:'',
        message:''
    });

    const valorInput = e => setPedido({
        ...pedido,[e.target.name]: e.target.value
    })

    const CadPedido = async e  =>{
        e.preventDefault();
        console.log(pedido);

        const headers ={
            'Content-Type':'application/json'
        }

        await axios.post(api+"/pedidos",pedido,{headers})
        .then((response)=> {
            // console.log(response.data.message);
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
                    <h1>Cadastrar Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-pedido"
                        className="btn btn-outline-success btn-sm">Pedidos</Link>
                </div>
            </div>
            <hr className="m-1" />
            <Form className="p-2" onSubmit={CadPedido}>
               
               {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>:""}

               {status.type === 'success'? <Alert color="success">{status.message}</Alert>:""}

                <FormGroup className="p-2">
                    <Label>Numero Pedido</Label>
                    <Input type="text" name="data" placeholder="Data do Pedido" 
                    onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Data</Label>
                    <Input type="text" name="data" placeholder="Data do Pedido" 
                    onChange={valorInput}/>
                </FormGroup>
                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>

        </Container>
    )
}