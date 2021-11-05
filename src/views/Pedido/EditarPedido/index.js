import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
export const EditarPedido = (props)=>{
    const [dat, setDat] = useState([]);
    const [id] = useState(props.match.params.id);
    const [data,setData]= useState('');
    const [ClienteId,setClienteId] = useState('');
    const [status, setStatus] = useState({
        formSave:false,
        type:"",
        message:""
    })
    const edtPedido=async e =>{
        e.preventDefault();
        console.log("EditarPedido");

        const headers={
            'Content-Type':'application/json'
        }
        await axios.put(api+"/atualizapedido",{id,data,ClienteId},{headers})
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
        const getPedido = async()=>{
            await axios.get(api+"/pedido"+id)
            .then((response)=>{
                // console.log(response.data.servico);
                setData(response.data.pedido.data);
                setClienteId(response.data.pedido.ClienteId)
            })
            .catch(()=>{
                console.log ("Erro: Não foi possivel conectar a API.")
            })
        }
        getPedido();
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                    <h1>Editar Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-pedido"
                        className="btn btn-outline-primary btn-sm mr-1">Listar</Link>
                       <Link to={"/pedido/"+id}
                       className="btn btn-outline-primary btn-sm mr-1">Consultar</Link>
                        </div>
                        </div>
                        <hr className="m-1" />
                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                <Form className="p-2" onSubmit={edtPedido}>
        <FormGroup className="p-2">
            <Label>Data</Label>
            <Input type="text" name="data"
            placeholder="Data do Pedido" value={data}
            onChange={e=> setData(e.target.value)}/>
        </FormGroup>
        <FormGroup className="p-2">
            <Label>ClienteId</Label>
            <Input type="text" name="ClienteId"
            placeholder="Id do Cliente" value={ClienteId}
            onChange={e=> setClienteId(e.target.value)}/>

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