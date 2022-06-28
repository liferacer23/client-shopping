import { useState } from "react";
import styled from "styled-components";
import EditItemModal from "./EditItemModal";

import { useDispatch } from "react-redux";
import { getItems } from "../redux/ducks/Items";
import axios from "axios";
const Card = styled.div`
  
  background: linear-gradient(
    rgba(256, 256, 256, 0.6),
    rgba(256, 256, 256, 0.2)
  );
  border-radius: 1rem;
  height: 22rem;
  width: 22rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.8s ease-in-out;
  &:hover {
    transform: translateX(0px) translateY(-5px);
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;

`;
/* const Image = styled.img`
  width: 10rem;
  height: 10rem;
  margin: 1rem auto;
  border-radius: 50%;
  
`; */
const InfoContainer = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: darnkgray;
  font-weight: 300;
`;
const EditButton = styled.button`
  margin-top: 0.5rem;
  width: 4rem;
  height: 2rem;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  border: none;
  background-color: #4287f5;
  color: white;
  border-radius: 0.5rem;
`;
const DeleteButton = styled.button`
  margin-top: 0.5rem;
  width: 4rem;
  height: 2rem;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  border: none;
  background-color: #f54242;
  color: white;
  border-radius: 0.5rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-around;
`;

const CheckboxContainer = styled.div`
width:100%;
display:flex;
align-items:center;
gap:0.5rem;
cursor:pointer;
`;
export default function Item({ data,bought,setBought }) {

  const dispatch = useDispatch();
  const [hideEdit, setHideEdit] = useState(false);
  const [fade, setFade] = useState(false);
  
 
  var d = new Date(data.TimeToBuy);

  var date = d.getDate();
  var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  var year = d.getFullYear();
  var newDate = date + "/" + month + "/" + year;


 const Handler =(e,data)=>{
  if (e.target.checked) {
 setBought(prev=>parseInt(prev,10)+parseInt(data,10));
  } else{
    setBought(prev=>parseInt(prev,10)-parseInt(data,10));
  }
 }


 
  const handleItemDelete = async () => {
    try {
      await axios.delete(`https://shoppingitems2.herokuapp.com/api/checklist/${data._id}`);
    } catch (err) {
      console.log(err);
    }
    dispatch(getItems());
  };
 
  return (
    <>
      <Card>
        <Wrapper>
          <CheckboxContainer>
            <input type="checkbox" value={data.Cost} onChange={(e)=>{Handler(e,data.Cost)}} />
            <label >Bought</label>

          </CheckboxContainer>
          <InfoContainer>
            <span>Name: {data.Name}</span>
            <span>Cost: ${data.Cost}</span>
            <span>Description:{data.Description}</span>
            <span>Time To Buy:{newDate}</span>
          </InfoContainer>
          <ButtonContainer>
            <EditButton
              onClick={() => {
                setHideEdit((prev) => !prev);
              }}
            >
              Edit
            </EditButton>
            <DeleteButton
              onClick={() => {
                handleItemDelete();
              }}
            >
              Delete
            </DeleteButton>
          </ButtonContainer>
        </Wrapper>
      </Card>
      {hideEdit ? <EditItemModal data={data} setHideEdit={setHideEdit} /> : ""}
    </>
  );
}
