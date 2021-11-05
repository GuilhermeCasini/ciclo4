import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async () => {
        await axios.get(api + "/listacompras")
            .then((response) => {
                console.log(response.data.compra);
                setData(response.data.compra);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro:sem conexão com a API.'
                })
             
            })
    }
    const apagarCompra = async(idCompra)=>{
        console.log(idCompra);

        const headers = {
            "Content-Type": "application/json"
        }
        await axios.get(api+"/excluircompra/"+idCompra,{headers})
        .then((response)=>{
            console.log(response.data.error);
            getCompras();
        })
        .catch(()=>{
            setStatus({
                type:"error",
                message:"Não foi possivel conectar a API."
            });
        });

    
    }

    useEffect(() => {
        getCompras();
    }, []);

    return (
        <div>
            <Container>
                
                <div className="d-flex">
                <div>
                    <h1>Lista de Compras</h1>
                </div>
                <div className="m-auto p-2">
                    <Link to="/cadastrarcompra"
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
                            <th>Data da Compra</th>
                            <th>Id Cliente</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(compra => (
                            <tr key={compra.id}>
                                <td>{compra.id}</td>
                                <td>{compra.data}</td>
                                <td>{compra.ClienteId}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-produtos/"+compra.id}
                                    className="btn btn-outline-primary btn-sm">
                                    Consultar
                                    </Link>
                                    <Link to ={"/editarcompra/"+compra.id}
                                    className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr1" 
                                    onClick={()=>apagarCompra(compra.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    );
};