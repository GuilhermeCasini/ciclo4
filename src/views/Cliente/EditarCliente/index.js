import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";
export const EditarCliente = (props) => {
    const [dados, setDados] = useState([]);
    const [idCliente, setIdCliente] = useState(props.match.params.idCliente);
    const[id, setId] = useState('');
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');
    const [status, setStatus] = useState({
        type: "",
        message: ""
    })

    const edtPedido = async e => {
        e.preventDefault();
    }

    useEffect(() => {
        const getPedido = async () => {
            await axios.put(api + "/cliente/" + idCliente + "/pedido")
                .then((response) => {
                    setData(response.dados.pedido.data);
                })
                .catch(() => {
                    console.log('Erro:não foi possivel se conectar a API.')

                })
        }
        getPedido();
    }, [idCliente])
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>
                        Editar Pedido
                    </h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente" className="btn btn-outline-success btn-sm">
                        Clientes</Link>
                </div>
                <hr className="m-1" />
                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                <Form className="p-2" onSubmit={edtPedido}>
                    <FormGroup className="p-2">
                        <Label >
                            Id
                        </Label>
                        <Input
                            name="id"
                            placeholder="id do pedido"
                            type="text"
                            value={id}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label >
                            Data
                        </Label>
                        <Input
                            name="data"
                            placeholder="data do pedido"
                            type="text"
                            value={data}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label >
                            ClienteId
                        </Label>
                        <Input
                            name="ClienteId"
                            placeholder="id do cliente"
                            type="text"
                            value={ClienteId}
                        />
                    </FormGroup>

                    <Button type="submit" outline color='warning'>
                        Salvar
                    </Button>
                </Form>
            </Container>

        </div>
    )
}