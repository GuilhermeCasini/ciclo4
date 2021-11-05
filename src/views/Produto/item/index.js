import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ItemCompra = (props) => {

    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItemCompra = async () => {
        await axios.get(api + "/produto/"+id+"/compras")
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
        getItemCompra();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Compras do Produto</h1>
                </div>
                <div className="p-2">
                        <Link to ="/listar-produto" className="btn btn-outline-success btn-sm">Produtos</Link>
                        </div>
                        <div className="p-2">
                        <Link to ="/listar-compra" className="btn btn-outline-success btn-sm">Compras</Link>
                        </div>
                        </div>
                {status.type === 'error' ? 
                <Alert color="danger">
                   {status.message}
                </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Compra</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(compras=> (
                            <tr key={compras.ProdutoId}>
                                <td>{compras.CompraId}</td>
                                <td>{compras.quantidade}</td>
                                <td>{compras.valor}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    );
};