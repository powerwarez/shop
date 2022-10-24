import { InputGroup, Form, Button, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {
  let [visible, setVisible] = useState(true);
  let [visibleInputAlert, setVisibleInputAlert] = useState(false);
  let [num, setNum] = useState(true);
  let [tapValue, SetTapValue] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    isNaN(num) == true
      ? setVisibleInputAlert(true)
      : setVisibleInputAlert(false);
  }, [num]);

  let { id } = useParams();
  let shoes = props.shoes.filter((x) => x.id == id);

  return (
    <div className="container">
      {visible == true ? (
        <div className="alert alert-warning">2초 후에 사라짐</div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (Number(id) + 1) +
              ".jpg"
            }
            width="100%"
            alt="profile"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoes[0].title}</h4>
          <p>{shoes[0].content}</p>
          <p>{shoes[0].price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
      {visibleInputAlert == true ? (
        <div className="alert alert-warning">숫자를 입력해주세요</div>
      ) : null}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="숫자를 입력하세요"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => {
            setNum(e.target.value);
          }}
        />
        <Button variant="outline-secondary" id="button-addon2">
          보내기
        </Button>
      </InputGroup>

      <Nav activeKey="/home" variant="taps" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              SetTapValue(0);
            }}
          >
            Link
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              SetTapValue(1);
            }}
          >
            Link
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              SetTapValue(2);
            }}
          >
            Link
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TapContent tapValue={tapValue} />
    </div>
  );
}

function TapContent({ tapValue }) {
  // if (props.tapValue == 0) {
  //   return <div>Con1</div>;
  // }
  // if (props.tapValue == 1) {
  //   return <div>Con2</div>;
  // }
  // if (props.tapValue == 2) {
  //   return <div>Con3</div>;
  // }
  return [<div>Con1</div>, <div>Con2</div>, <div>Con3</div>][tapValue];
}

export default Detail;
