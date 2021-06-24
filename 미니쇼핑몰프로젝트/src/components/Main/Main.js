import React from "react";
import { Link } from 'react-router-dom';

const Main = props => {
    if (props.products) { // project에서는 fetch로 불러온 product는 길이가 0이하이거나, 어떠한 오류로 아무것도 렌더링 하지 않을수도 있다. 
        //이런 경우 Component는 렌더링 할 것이 없이때문에 오류가 날 수 있다.if문을 사용하여 product가 있는 경우와 없는 경우로 나뉘어 작성하면 된다.
        return <RenderProducts products={props.products} />
    } else {
        return <RenderLoading />
    }
}

const RenderProducts = props => {
    return props.products.map((product) => {
        return (
            <div className="product">
                <Link className="productImg" to={`/item/${product.id}`}><img src={product.image} alt="food" /></Link>
                <div className="productName">
                    <p className="productTitle">{product.name}</p>
                </div>
                <hr />
                <p className="productPrice">{product.price.toLocaleString()} 원</p>
            </div>
        );
    })
};

const RenderLoading = props => (
    <div>Loading...</div>
);

export default Main;