import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import axios from "axios";
import { api } from "../../../config";
import moment from "moment";

const dataNascimento = moment("");

export const CadCliente = () => {

    const [cliente, setCliente] = useState({
        formSave: false,
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: ''
    });

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const valorInput = e => setCliente({
        ...cliente, [e.target.name]: e.target.value
    })

    const CadCliente = async e => {
        e.preventDefault();
        console.log(cliente);
        setStatus({
            formSave: true
        })

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/clientes", cliente, { headers })
            .then((response) => {
                // console.log(response.data.message);
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    })

                } else {
                    setStatus({
                        type: "success",
                        message: response.data.message
                    })
                }
            })
            .catch(() => {
                console.log("Erro:Sem conexão com a API.")
            })
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente"
                        className="btn btn-outline-success btn-sm">Clientes</Link>
                </div>
            </div>
            <hr className="m-1" />
            <Form className="p-2" onSubmit={CadCliente}>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do Cliente"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Endereço</Label>
                    <Input type="text" name="endereco" placeholder="Seu Endereço"
                        onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Cidade</Label>
                    <Input type="text" name="cidade" placeholder="Sua Cidade"
                        onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>UF</Label>
                    <Input type="text" name="uf" placeholder="Seu Estado"
                        onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Data de Nascimento </Label>
                    <Input
                        name="nascimento"
                        placeholder="Data de Nascimento: Ano-Mes-Dia"
                        type="text"
                        onChange={valorInput}
                    />

                </FormGroup>

                <Button type="submit" outline color="success">Cadastrar</Button>
                <Button type="reset" outline color="success">Resetar</Button>
            </Form>

        </Container>
    )
}