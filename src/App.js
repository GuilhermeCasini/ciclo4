import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home} from './views/Home';
import {ListarCliente} from './views/Cliente/ListarCliente/index';
// import {ListarPedido } from './views/Pedido/ListarPedido';
import {ListarServico } from './views/Servico/ListarServico';
import {Menu} from './components/Menu';
import {Item} from './views/Servico/item';
import { Cadastrar } from './views/Servico/Cadastrar';
import { CadCliente } from './views/Cliente/Cadastrar';
import { ListarPedido } from './views/Pedido/ListarPedido';
import { CadPedido } from './views/Pedido/Cadastrar';
import { Pedidos } from './views/Cliente/Pedidos';
import{CadastroProd} from './views/Produto/Cadastrar';
import { ListarProduto } from './views/Produto/ListaPorduto';
import { ListarCompra } from './views/Compra/ListarCompra';
import { CadastroCompra } from './views/Compra/Cadastrar';
import { PItem } from './views/Pedido/item';
import { EditarCliente } from './views/Cliente/EditarCliente';
import { Editar } from './views/Servico/Editar';
import { EditarCompra } from './views/Compra/EditarCompra';
import { EditarProduto } from './views/Produto/EditarProduto';
import { EditarPedido } from './views/Pedido/EditarPedido';
import { Compras } from './views/Cliente/Compra';
import { ItemCompra } from './views/Produto/item';
import { EditarItemPed } from './views/Servico/editaritem';
import { EditarItemC } from './views/Compra/EditarItemCompra';



function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path = "/" component={Home}/>
          <Route path = "/listar-cliente" component={ListarCliente}/>
          <Route path = "/listar-pedido" component={ListarPedido}/>  
          <Route path = "/listar-servico" component ={ListarServico}/>
          <Route path = "/listar-compra" component ={ListarCompra}/>
          <Route path = "/pedidos-cliente/:id" component={Pedidos}/>
          <Route path = "/compra-cliente/:id" component={Compras}/>
          <Route path = "/cadastrarservico" component={Cadastrar}/>
          <Route path = "/cadastrarcliente" component={CadCliente}/>
          <Route path = "/cadastrarpedido" component={CadPedido}/>
          <Route path = "/listar-pedidos/:id" component={Item}/> 
          <Route path = "/listar-produtos/:id" component={ItemCompra}/> 
          <Route path = "/listar-pedido/:id" component={PItem}/> 
          <Route path = "/cadastrarproduto" component={CadastroProd}/> 
          <Route path = "/listar-produto" component ={ListarProduto}/>
          <Route path = "/cadastrarcompra" component ={CadastroCompra}/>
          <Route path = "/editar-cliente/:id" component ={EditarCliente}/>
          <Route path = "/editarservico/:id" component ={Editar}/>
          <Route path = "/editarcompra/:id" component ={EditarCompra}/>
          <Route path = "/editarproduto/:id" component ={EditarProduto}/>
          <Route path = "/editarpedido/:id" component ={EditarPedido}/>
          <Route path = "/editaritempedido/:id" component ={EditarItemPed}/>
          <Route path = "/editaritemcompra/:id" component ={EditarItemC}/>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
