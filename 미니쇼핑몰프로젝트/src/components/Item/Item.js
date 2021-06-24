import React, { Component } from "react";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: {}
        };
    };

    addToCart(image, name, price, id, quantity, checked) {
        //11 line: addToCart라는 method를 Item에서 새로이 만들고 있다. App.js의 addToCart와는 다른 method이지만,
        // 이름을 같게 한 이유는 두 method가 연동하기 때문이다. 매개변수로 props로 만든 제품의 id, name, price, 
        //그리고 App.js의 quantity state를 제품의 수량을 정하는 용도로 사용하고 있다. 
        //이러한 방식으로 제품의 내용들과 수량들을 selectedProduct state의 내용으로 지정한 뒤, 
        //최상단 App.js의 state를 변경할 수 있게 26번째 줄에서 props로 받은addToCart Method를 이용하는 것이다.
        // 최종적으로 상단 Component의 state를 하위 Component에서 변경하게 된다.
        this.setState({
            selectedProduct: {
                image: image,
                name: name,
                price: price,
                id: id,
                quantity: quantity,
                checked: checked
            }
        }, function () {
            this.props.addToCart(this.state.selectedProduct);
        })
    };

    render() {
        let image = this.props.image;
        let name = this.props.name;
        let price = this.props.price;
        let id = this.props.id;
        let quantity = this.props.productQuantity;
        return (
            <div className="container">
                <img
                    className="itemImage"
                    src={this.props.image}
                    alt={this.props.name}
                />
                {this.props.name}
                <div className="itemPrice">{this.props.price}</div>
                <button color="primary" onClick={this.addToCart.bind(this, image, name, price, id, quantity)}>장바구니에 담기</button>

            </div>//method의 binding을 constructor이 아닌 render 안에서 실행하고 있다. 최종적으로 새로 만든 button 을 통해 간단한 장바구니 기능이 완성되었다.
        );
    };
}

export default Item;