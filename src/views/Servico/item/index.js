import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const Item = (props) => {

    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api + "/servico/"+id+"/pedidos")
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro:sem conexão com a API.'
                })

            })
    }

    useEffect(() => {
        getItens();
    }, [id]);

    const getIte = async () => {
        await axios.get(api + "/listaitenspedidos")
            .then((response) => {
                console.log(response.data.itempedido);
                
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro:sem conexão com a API.'
                })
                //console.log("Erro:sem conexão com a API.")
            })
    }
    const apagarItem = async(PedidoId)=>{
        console.log(PedidoId);

        const headers = {
            "Content-Type": "application/json"
        }
        await axios.get(api+"/excluirintpedido/"+PedidoId,{headers})
        .then((response)=>{
            console.log(response.data.error);
            getItens();
        })
        .catch(()=>{
            setStatus({
                type:"error",
                message:"Não foi possivel conectar a API."
            });
        });

    
    }
    useEffect(() => {
        getIte();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Pedidos do serviço</h1>
                </div>
                <div className="p-2">
                        <Link to ="/listar-servico" className="btn btn-outline-success btn-sm">Serviços</Link>
                        </div>
                        <div className="p-2">
                        <Link to ="/listar-pedido" className="btn btn-outline-success btn-sm">Pedidos</Link>
                        </div>

                </div>
                {status.type === 'error' ? 
                <Alert color="danger">
                   {status.message}
                </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(pedidos => (
                            <tr key={pedidos.ServicoId}>
                                <td>{pedidos.PedidoId}</td>
                                <td>{pedidos.quantidade}</td>
                                <td>{pedidos.valor}</td>
                                <td className="text-center/">
                                <Link to ={"/editaritempedido/"+pedidos.id}
                                    className="btn btn-outline-warning btn-sm">Editar</Link>
                          <span className="btn btn-outline-danger btn-sm mr1" 
                                    onClick={()=>apagarItem(pedidos.id)}>Excluir</span>
                           </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    );
};