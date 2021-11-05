import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";
export const EditarProduto = (props)=>{
    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);
    const [nome,setNome]= useState('');
    const [descricao,setDescricao] = useState('');
    const [status, setStatus] = useState({
        formSave:false,
        type:"",
        message:""
    })
    const edtProduto=async e =>{
        e.preventDefault();
        console.log("EditarProduto");

        const headers={
            'Content-Type':'application/json'
        }
        await axios.put(api+"/atualizaproduto",{id,nome,descricao},{headers})
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
        const getProduto = async()=>{
            await axios.get(api+"/produto"+id)
            .then((response)=>{
                // console.log(response.data.servico);
                setNome(response.data.produto.nome);
                setDescricao(response.data.produto.descricao)
            })
            .catch(()=>{
                console.log ("Erro: Não foi possivel conectar a API.")
            })
        }
        getProduto();
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                    <h1>Editar Produto</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-produto"
                        className="btn btn-outline-primary btn-sm mr-1">Listar</Link>
                       <Link to={"/produto/"+id}
                       className="btn btn-outline-primary btn-sm mr-1">Consultar</Link>
                        </div>
                        </div>
                        <hr className="m-1" />
                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                <Form className="p-2" onSubmit={edtProduto}>
        <FormGroup className="p-2">
            <Label>Nome</Label>
            <Input type="text" name="nome"
            placeholder="Nome do Produto" value={nome}
            onChange={e=> setNome(e.target.value)}/>
        </FormGroup>
        <FormGroup className="p-2">
            <Label>Descrição</Label>
            <Input type="text" name="descricao"
            placeholder="Descrição do Produto" value={descricao}
            onChange={e=> setDescricao(e.target.value)}/>

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