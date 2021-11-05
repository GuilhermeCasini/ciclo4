import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const Pedidos = (props) => {
    const [data,setData]=useState([]);

    const[id,setId]= useState(props.match.params.id);

    useEffect(()=>{
        const getPedidos= async()=>{
            await axios.get(api+"/cliente/"+id+"/pedidos")
            .then((response)=>{
                setData(response.data.ped);
            })
            .catch(()=>{
                console.log("Erro: Sem conexão com a API.")
            })
        }
        getPedidos();
    },[id]);


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Pedidos do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to ="/listar-cliente" className="btn btn-outline-success btn-sm">Clientes</Link>
                        </div>
                        <div className="p-2">
                        <Link to ="/listar-pedido" className="btn btn-outline-success btn-sm">Pedidos</Link>
                        </div>

                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data do Pedido</th>
                            <th>Id Cliente</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ped => (
                            <tr key={ped.id}>
                                <td>{ped.id}</td>
                                <td>{ped.data}</td>
                                <td >{ped.ClienteId}</td>
                                <td className="text-center/">
                                    <Link to={"/pedidos-cliente/"+ped.id}
                                    className="btn btn-outline-primary btn-sm">
                                    Consultar
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