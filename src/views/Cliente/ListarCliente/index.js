import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";


export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCliente = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro:sem conexão com a API.'
                })
                //console.log("Erro:sem conexão com a API.")
            })
    }
    const apagarCliente = async(id)=>{
        console.log(id);

        const headers = {
            "Content-Type": "application/json"
        }
        await axios.get(api+"/excluircliente/"+id,{headers})
        .then((response)=>{
            console.log(response.data.error);
            getCliente();
        })
        .catch(()=>{
            setStatus({
                type:"error",
                message:"Não foi possivel conectar a API."
            });
        });

    
    }

    useEffect(() => {
        getCliente();
    }, []);

    return (
        <div>
            <Container>
                
                <div className="d-flex">
                <div>
                    <h1>Clientes Cadastrados</h1>
                </div>
                <div className="m-auto p-2">
                    <Link to="/cadastrarcliente"
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
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                            <th>Cliente Desde</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(clientes => (
                            <tr key={clientes.id}>
                                <td>{clientes.id}</td>
                                <td>{clientes.nome}</td>
                                <td>{clientes.endereco}</td>
                                <td>{clientes.cidade}</td>
                                <td>{clientes.uf}</td>
                                <td>{clientes.nascimento}</td>
                                <td>{clientes.createdAt}</td>
                                <td className="text-center/">
                                    <Link to={"/pedidos-cliente/"+clientes.id}
                                    className="btn btn-outline-primary btn-sm">
                                    Pedidos
                                    </Link> 
                                    <Link to={"/compra-cliente/"+clientes.id}
                                    className="btn btn-outline-primary btn-sm">
                                    Compras
                                    </Link>
                                    <Link to= {"/editar-cliente/"+clientes.id}
                                    className="btn btn-outline-warning btn-sm"> Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr1" 
                                    onClick={()=>apagarCliente(clientes.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    );
};