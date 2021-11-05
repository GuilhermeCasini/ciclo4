import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";


export const ListarPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedido = async () => {
        await axios.get(api + "/listapedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro:sem conexão com a API.'
                })
               
            })
    }
    const apagarPedido = async(Id)=>{
        console.log(Id);

        const headers = {
            "Content-Type": "application/json"
        }
        await axios.get(api+"/excluirpedido/"+Id,{headers})
        .then((response)=>{
            console.log(response.data.error);
            getPedido();
        })
        .catch(()=>{
            setStatus({
                type:"error",
                message:"Não foi possivel conectar a API."
            });
        });

    
    }
    useEffect(() => {
        getPedido();
    }, []);

    return (
        <div>
            <Container>
                
                <div className="d-flex">
                <div>
                    <h1>Pedidos Cadastrados</h1>
                </div>
                <div className="m-auto p-2">
                    <Link to="/cadastrarpedido"
                    className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                </div>
                {status.type === 'error' ? 
                <Alert color="danger">
                   {status.message}
                </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Id Cliente</th>
                            <th>Data Do Pedido</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.ClienteId}</td>
                                <td>{item.createdAt}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-pedidos/"+item.id}
                                    className="btn btn-outline-primary btn-sm">
                                    Consultar
                                    </Link>
                                    <Link to ={"/editarpedido/"+item.id}
                                    className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr1" 
                                    onClick={()=>apagarPedido(item.id)}>Excluir</span>                            
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    );
};