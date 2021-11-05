import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
export const EditarItemC = (props)=>{
    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);
    const [quantidade,setQuantidade]= useState('');
    const [valor,setValor] = useState('');
    const [status, setStatus] = useState({
        formSave:false,
        type:"",
        message:""
    })
    const edtItemCom=async e =>{
        e.preventDefault();
        console.log("EditarItemC");

        const headers={
            'Content-Type':'application/json'
        }
        await axios.put(api+"/atualizaitemcompra",{id,quantidade,valor},{headers})
        .then((response)=>{
            if(response.data.error){
                setStatus({
                    formSave:false,
                    type:'error',
                    message: response.data.message
                })
            }else{
                setStatus({
                    formSave:false,
                    type:'success',
                    message: response.data.message
                })
            }
            
        })
        .catch(()=>{
            setStatus({
                type:'error',
                message:'Erro:Não foi possivel conectar a API.'
            })
        })
    }
    useEffect(()=>{
        const getItemCom = async()=>{
            await axios.get(api+"/itemcompras"+id)
            .then((response)=>{
                setQuantidade(response.data.itemcompra.quantidade);
                setValor(response.data.itemcompra.valor)
            })
            .catch(()=>{
                console.log ("Erro: Não foi possivel conectar a API.")
            })
        }
        getItemCom();
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                    <h1>Editar Item Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-produto"
                        className="btn btn-outline-primary btn-sm mr-1">Produtos</Link>
                        <Link to="/listar-compra"
                        className="btn btn-outline-primary btn-sm mr-1">Compras</Link>
                       
                        </div>
                        </div>
                        <hr className="m-1" />
                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                <Form className="p-2" onSubmit={edtItemCom}>
        <FormGroup className="p-2">
            <Label>Quantidade</Label>
            <Input type="text" name="quantidade"
            placeholder="Quantidade de Item Comprado" value={quantidade}
            onChange={e=> setQuantidade(e.target.value)}/>
        </FormGroup>
        <FormGroup className="p-2">
            <Label>Valor</Label>
            <Input type="text" name="valor"
            placeholder="Valor do Item Comprado" value={valor}
            onChange={e=> setValor(e.target.value)}/>

        </FormGroup>

        {status.formSave ?
        <Button type="submit" outline color="warning"disabled>Salvando...
        <Spinner size="sm" color="warning"/></Button>:
        <Button type="submit" outline color = "warning">Salvar</Button>}

                </Form>
                
            </Container>
        </div>
    )
}