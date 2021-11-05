import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import axios from "axios";
import { api } from "../../../config";


export const CadastroProd = () => {

    const [produto, setProduto]= useState({
        nome:'',
        descricao:''
    });
    
    const[status,setStatus]=useState({
        type:'',
        message:''
    });

    const valorInput = e => setProduto({
        ...produto,[e.target.name]: e.target.value
    })

    const CadProduto = async e  =>{
        e.preventDefault();
        console.log(produto);

        const headers ={
            'Content-Type':'application/json'
        }

        await axios.post(api+"/produtos",produto,{headers})
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
                    <h1>Cadastrar Produtos</h1>
                </div>
            </div>
            <hr className="m-1" />
            <Form className="p-2" onSubmit={CadProduto}>
               
               {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>:""}

               {status.type === 'success'? <Alert color="success">{status.message}</Alert>:""}

                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do Produto" 
                    onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Descrição</Label>
                    <Input type="text" name="descricao" placeholder="Descrição do Produto" 
                    onChange={valorInput}/>
                </FormGroup>
                
                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>

        </Container>
    )
}