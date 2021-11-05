import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const Compras = (props) => {
    const [data,setData]=useState([]);

    const[id,setId]= useState(props.match.params.id);

    useEffect(()=>{
        const getCompras= async()=>{
            await axios.get(api+"/cliente/"+id+"/compras")
            .then((response)=>{
                setData(response.data.item);
            })
            .catch(()=>{
                console.log("Erro: Sem conexão com a API.")
            })
        }
        getCompras();
    },[id]);


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Compras do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to ="/listar-cliente" className="btn btn-outline-success btn-sm">Clientes</Link>
                        </div>
                        <div className="p-2">
                        <Link to ="/listar-compra" className="btn btn-outline-success btn-sm">Pedidos</Link>
                        </div>

                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id Produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Id Compra</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ProdutoId}>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td >{item.CompraId}</td>
                                <td className="text-center/">
                                    <Link to={"/compra-cliente/"+item.id}
                                    className="btn btn-outline-primary btn-sm">
                                    Compras
                                    </Link>
                        
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    )
}