import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
export const EditarCompra = (props)=>{
    const [dat, setDat] = useState([]);
    const [id] = useState(props.match.params.id);
    const [data,setData]= useState('');
    const [ClienteId,setClienteId] = useState('');
    const [status, setStatus] = useState({
        formSave:false,
        type:"",
        message:""
    })
    const edtCompra=async e =>{
        e.preventDefault();
        console.log("EditarCompra");

        const headers={
            'Content-Type':'application/json'
        }
        await axios.put(api+"/atualizacompra",{id,data,ClienteId},{headers})
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
        const getCompra = async()=>{
            await axios.get(api+"/compra"+id)
            .then((response)=>{
                // console.log(response.data.servico);
                setData(response.data.compra.data);
                setClienteId(response.data.compra.ClienteId)
            })
            .catch(()=>{
                console.log ("Erro: Não foi possivel conectar a API.")
            })
        }
        getCompra();
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                    <h1>Editar Compras</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-produto"
                        className="btn btn-outline-primary btn-sm mr-1">Listar</Link>
                       <Link to={"/compra/"+id}
                       className="btn btn-outline-primary btn-sm mr-1">Consultar</Link>
                        </div>
                        </div>
                        <hr className="m-1" />
                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                <Form className="p-2" onSubmit={edtCompra}>
        <FormGroup className="p-2">
            <Label>Data</Label>
            <Input type="text" name="data"
            placeholder="Data da compra" value={data}
            onChange={e=> setData(e.target.value)}/>
        </FormGroup>
        <FormGroup className="p-2">
            <Label>Id do Cliente</Label>
            <Input type="text" name="ClientId"
            placeholder="ID do Cliente" value={ClienteId}
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