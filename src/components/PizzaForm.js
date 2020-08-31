import React from "react"

class PizzaForm extends React.Component {

  state = {
    topping: "",
    size: "",
    vegetarian: null
  }
  
  toppingHandler = (e) => {
    this.setState({topping: e.target.value}) 
  }

  sizeHandler = (e) => {
    this.setState({size: e.target.value}) 
  }

  radioHandler = (e) => {
    e.target.value === "Vegetarian" ?
    this.setState({vegetarian: true})
    :
    this.setState({vegetarian: false})
  }
  
  submitHandler = () => {
    if (this.state.id){
      this.patchPizza(this.state)
      this.props.submitPizza(this.state)
    } else {
      this.postPizza(this.state)
      this.setState({id: this.props.lastPizzaId + 1}, () => this.props.submitPizza(this.state))
    }
  }
  patchPizza = (pizzaObj) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pizzaObj)
    }

    fetch(`http://localhost:3000/pizzas/${pizzaObj.id}`, options)
  }

  postPizza = (pizzaObj) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pizzaObj)
    }

    fetch("http://localhost:3000/pizzas", options)
  }

  componentDidUpdate(previouObj){
    if (previouObj.editPizza !== this.props.editPizza){
      this.setState({
        id: this.props.editPizza.id,
        topping: this.props.editPizza.topping,
        size: this.props.editPizza.size,
        vegetarian: this.props.editPizza.vegetarian
      })
    }
  }

  render(){
    return(
        <div className="form-row">
          <div className="col-5">
              <input type="text" className="form-control" placeholder="Pizza Topping" value={this.state.topping} onChange={this.toppingHandler} />
          </div>
          <div className="col">
            <select value={this.state.size} className="form-control" onChange={this.sizeHandler} >
            <option>Choose Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Vegetarian" checked={this.state.vegetarian} onChange={this.radioHandler} />
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Not Vegetarian" checked={this.state.vegetarian === null ? null: !this.state.vegetarian} onChange={this.radioHandler}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success" onClick={this.submitHandler}> Submit</button>
          </div>
        </div>
    )
  } 
}

export default PizzaForm
