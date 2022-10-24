import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useState } from "react";
import data from "./data.js";
import Detail from "./routes/Detail.js";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
// import styled from "styled-components";

// let StyledBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: black;
//   padding: 10px;
// `;

function App() {
  let [shoes, setShoes] = useState(data);
  let [viewCounter, setViewCounter] = useState(1);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link href="/event">Evnet</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Mainpage shoes={shoes} />} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<Member />} />
          <Route path="location" element={<Location />} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추 서비스</div>} />
          <Route path="two" element={<div>생일 기념 쿠폰 받기</div>} />
        </Route>
        <Route path="*" element={<div>없는페이지요</div>} />
      </Routes>
      {viewCounter < 3 ? (
        <button
          onClick={() => {
            setViewCounter(viewCounter + 1);
            axios
              .get(
                "https://codingapple1.github.io/shop/data" +
                  (viewCounter + 1) +
                  ".json"
              )
              .then((result) => {
                let copy = [...shoes, ...result.data];
                setShoes(copy);
              })
              .catch(() => {
                console.log("실패함ㅅㄱ");
              });
            // Promise.all([ axios.get('url1') , axios.get('url2')]).then(()=>{
            //   '두 개 다 성공하면 이거 실행해주세요'
            // })
          }}
        >
          더보기
        </button>
      ) : null}
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Member() {
  return <div>멤버정보임</div>;
}

function Location() {
  return <div>회사위치임</div>;
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        alt="profile"
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

function Mainpage(props) {
  return (
    <>
      <div className="main-bg"></div>
      <div className="container">
        <div className="row">
          {props.shoes.map((a, i) => {
            return <Card shoes={props.shoes[i]} i={i}></Card>;
          })}
        </div>
      </div>
    </>
  );
}
export default App;
