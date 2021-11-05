import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
export const EditarItemPed = (props)=>{
    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);
    const [quantidade,setQuantidade]= useState('');
    const [valor,setValor] = useState('');
    const [status, setStatus] = useState({
        formSave:false,
        type:"",
        message:""
    })
    const edtItemped=async e =>{
        e.preventDefault();
        console.log("EditarItemPed");

        const headers={
            'Content-Type':'application/json'
        }
        await axios.put(api+"/atualizintempedido",{id,quantidade,valor},{headers})
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
        const getItemPed = async()=>{
            await axios.get(api+"/itenspedido"+id)
            .then((response)=>{
                setQuantidade(response.data.itempedido.quantidade);
                setValor(response.data.itempedido.valor)
            })
            .catch(()=>{
                console.log ("Erro: Não foi possivel conectar a API.")
            })
        }
        getItemPed();
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                    <h1>Editar Item Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-servico"
                        className="btn btn-outline-primary btn-sm mr-1">Serviços</Link>
                        <Link to="/listar-pedido"
                        className="btn btn-outline-primary btn-sm mr-1">Pedidos</Link>
                       
                        </div>
                        </div>
                        <hr className="m-1" />
                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                <Form className="p-2" onSubmit={edtItemped}>
        <FormGroup className="p-2">
            <Label>Quantidade</Label>
            <Input type="text" name="quantidade"
            placeholder="Quantidade de Item Pedido" value={quantidade}
            onChange={e=> setQuantidade(e.target.value)}/>
        </FormGroup>
        <FormGroup className="p-2">
            <Label>Valor</Label>
            <Input type="text" name="valor"
            placeholder="Valor do Item Pedido" value={valor}
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