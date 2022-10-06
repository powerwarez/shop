import { useParams } from "react-router-dom";

function Detail(props) {
  let { id } = useParams();
  let shoes = props.shoes.filter((x) => x.id == id);

  console.log(props.shoes);
  console.log(shoes);
  return (
    <div className="container">
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
    </div>
  );
}

export default Detail;
