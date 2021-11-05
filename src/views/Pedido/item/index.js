import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const PItem = (props) => {

    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api + "/pedido/"+id+"/servicos")
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

    return (
        <div>
            <Container>
                <div>
                    <h1>Pedidos do serviço</h1>
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
                            <tr key={pedidos.PedidoId}>
                                <td>{pedidos.PedidoId}</td>
                                <td>{pedidos.quantidade}</td>
                                <td>{pedidos.valor}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    );
};