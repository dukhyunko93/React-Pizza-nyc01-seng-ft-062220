import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  
  state = {
    pizzaArray: [],
    editPizza: {}
  }

  componentDidMount() {
    this.getPizza()
  }

  getPizza = () => {
    fetch("http://localhost:3000/pizzas")
    .then(resp => resp.json())
    .then(pizzas => this.setState({pizzaArray: pizzas}))
  }

  submitPizza = (pizzaObj) => {
    if (this.state.pizzaArray.find(pizza => pizza.id === pizzaObj.id)){
    let filteredArray = this.state.pizzaArray.filter(pizza => pizza.id !== pizzaObj.id)
    this.setState({pizzaArray: [...filteredArray, pizzaObj].sort((a,b) => a.id - b.id)})
    } else {
      this.setState({pizzaArray: [...this.state.pizzaArray, pizzaObj]})
    }
  }

  editPizza = (pizzaObj) => {
    this.setState({editPizza: pizzaObj})
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm submitPizza={this.submitPizza} lastPizzaId={this.state.pizzaArray.length} editPizza={this.state.editPizza} />
        <PizzaList pizzaArray={this.state.pizzaArray} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
