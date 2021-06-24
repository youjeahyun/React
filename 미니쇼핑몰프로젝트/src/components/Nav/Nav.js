import React from "react"; // 리액트의 컴포넌트를 생성하기 위해 라이브러르 불러오기
import { Link } from "react-router-dom"; //라우팅 기능을 생성하기 위해
//내장 컴포넌트 Link 컴포넌트를 불러옴
import "./Nav.css"; // css파일불러옴

const Navigation = (props, context) => (//es6의 형태로 작성된 stateless functional component, 혹은 dumb component라고 한다.
    <div className="navigation">
        <div className="inner">
            <Link to="/">Shopping Mall</Link>
            <Link to="/cart">Cart</Link> .
        </div>
    </div> //Link to코드 이후, 이동을 원하는 url을 작성하면 된다.
);

export default Navigation;