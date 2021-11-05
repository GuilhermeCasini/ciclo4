import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarProduto = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        await axios.get(api + "/listaprodutos")
            .then((response) => {
                console.log(response.data.produto);
                setData(response.data.produto);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro:sem conexão com a API.'
                })
             
            })
    }
    const apagarProduto = async(id)=>{
        console.log(id);

        const headers = {
            "Content-Type": "application/json"
        }
        await axios.get(api+"/excluirproduto/"+id,{headers})
        .then((response)=>{
            console.log(response.data.error);
            getProdutos();
        })
        .catch(()=>{
            setStatus({
                type:"error",
                message:"Não foi possivel conectar a API."
            });
        });

    
    }
    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <div>
            <Container>
                
                <div className="d-flex">
                <div>
                    <h1>Lista de Produtos</h1>
                </div>
                <div className="m-auto p-2">
                    <Link to="/cadastrarproduto"
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
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(prod => (
                            <tr key={prod.id}>
                                <td>{prod.id}</td>
                                <td>{prod.nome}</td>
                                <td>{prod.descricao}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-produtos/"+prod.id}
                                    className="btn btn-outline-primary btn-sm">
                                    Consultar
                                    </Link>
                                    <Link to ={"/editarproduto/"+prod.id}
                                    className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr1" 
                                    onClick={()=>apagarProduto(prod.id)}>Excluir</span>
                               
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    );
};