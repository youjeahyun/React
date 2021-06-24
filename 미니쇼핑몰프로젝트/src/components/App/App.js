import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//Switch와 Route 내장 Component를 불러온다. 
//Switch로 Component를 감싸게 되면 처음 매칭되는 Component만을 렌더링하게 된다. 
//Route는 임의의 url로 이동할 경우 어떤 Component를 렌더링할지 정해준다.
import Nav from "components/Nav/Nav";
import Cart from "components/Cart/Cart";
import Main from "components/Main/Main";
import Item from "components/Item/Item";
import data from "MOCK_DATA.json"; //더미데이터 불러오기.
//렌더링하기 원하는 Component를 불러온다. NODE_PATH를 지정하였기 때문에 절대경로로 import 하였다.

class App extends Component {////state를 다루기 위해서는 class 형태의 component가 필요하다. constructor(생성자)안에서 state를 지정할 수 있다.
  constructor() {
    super();
    this.state = { //dummy data를 App.js의 state로 지정하였다. 
      //state의 초기 값을 설정 할 때는 constructor(생성자) 메소드에서 this.state= { } 를 통하여 설정하도록 한다.
      products: data, // cart state를 최상단 Component에서 작성하여, 하위 컴포넌트에서 이를 조작할 수 있게 한다
      cart: [],
      quantity: 1,// quantity state는 각 제품의 수량을 위해 만들었다. 

    };
    this.renderFoodDetail = this.renderFoodDetail.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    //onstructor 안에서 이벤트를 bind(바인드)하고 있다. 이렇게 bind하지 않을경우 render 안에서 우리가 생성한 이벤트가 Component를 가르키지 않고 오류가 발생하게 된다.
  };

  //장바구니에 선택한 물품을 추가하는 method
  handleAddToCart(selectedProducts) { //실제로 제품을 cart state, 즉 장바구니에 담는 method다. 
    // Item Component에 이를 props로 전달하고 있다.
    // 상위 Component에서 생선된 state를 이런 방식으로 하위 Component에서 조작할 수 있다. 
    //handleAddToCart함수는 하위 Component에서 매개변수로 selectedProducts를 받고, 이를 통해 최상단 cart state를 조작하게 된다.
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    if (this.checkProduct(productID)) {
      let index = cartItem.findIndex(item => {
        return item.id === productID;
      });
      cartItem[index].quantity += 1;
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
      this.setState({
        cart: cartItem,
        quantity: 1
      });
    }
  }

  //제품을 map함수를 이용해 렌더링한다. renderFoodDetail이라는 method를 만들어서 products state를 map함수를 통해 렌더링
  // 그리고 각각 제품의 url을 생성하고 있다. 
  renderFoodDetail() {
    return this.state.products.map(product => {
      return (
        <Route
          exact
          path={`/item/${product.id}`}
          render={props => { //Route 안에서 Component의 렌더링과 props전달 방법이다.
            //map함수를 통해 전체 제품갯수의 url이 생성되고, 각 제품 component에 props를 전달한다.
            return (
              <Item
                addToCart={this.handleAddToCart}
                productQuantity={this.state.quantity}
                image={product.image}
                name={product.name}
                price={product.price}
                id={product.id}
                key={product.id}
              />
            );
          }}
        />
      );
    });
  }

  //장바구니에 이미 제품이 있는지 확인하는 method
  checkProduct(id) {//내가 선택한 제품이 이미 cart state에 포함되어 있다면 다시 cart에 담지않고 제품의 개수만을 올려준다.
    let cart = this.state.cart;
    return cart.some(item => {
      return item.id === id;
    });
  };

  componentDidMount() { //
    //cart state가 local storage에 있으면 불러오기
    let cart = localStorage.cart; //localStorage라는 속성이 새로 나타났다. 사용자 로컬에 있는 storage객체에 접근하게 해준다. 
    //이를 통해 React를 새로고침하여도 localStorage에 있는 값을 읽어들어 state를 유지할 수 있게 되었다. 
    if (cart) {
      this.setState(prevState => ({ //prevState라는 값이 새로 나타났다. this.state와는 조금 다르게 이전 state값이라는 뜻이다
        cart: JSON.parse(cart)
      }))
    }
  };

  componentDidUpdate(prevProps, prevState) { //componentDidUpdate method는 prevProps, prevState매개변수를 사용하는 대표적 예이다
    //참고로 componentDidUpdate는 사용할 때 반드시 이 두개의 매개변수를 사용한다. 
    //Component의 Updation단계의 마지막에 실행되는 method로, Component가 리렌더링 된 후 실행되는 method이다. 
    //여기에서는 리렌더링되기 이전 cart state와 현재 cart state를 비교한 후, 달라진 점이 있을 때 localStore에 cart state를 저장하고 있다.
    if (prevState.cart !== this.state.cart) {
      localStorage.cart = JSON.stringify(this.state.cart);

    }
  }

  render() {//기존 Routes Component에서 switch를 다시 div element로 감쌌다.
    // 이유는 Nav Component는 항상 routing 되지 않고 항상 고정시키기 위함이다.
    return (
      <div>
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return (
                <Main
                  products={this.state.products}
                />
              );
            }}
          />
          <Route
            exact
            path="/cart"
            render={props => {
              return (
                <Cart
                  cart={this.state.cart}
                />
              );
            }}
          />
          {this.renderFoodDetail()}
        </Switch>
      </div>
    );
  };
};


export default App;