import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddItemModal from "./components/AddItemModal";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "./redux/ducks/Items";
import ItemsContainer from "./components/ItemsContainer";

const Container = styled.div`
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  width: 100vw;
  height: 95vh;
  padding: 1rem;
  inset: 0;
  overflow: auto;
`;
const Search = styled.input`
  width: 30%;
  height: 70%;
  padding-left: 1rem;
  border: none;
  font-size: 1.2rem;
  outline: none;
  border-bottom: 2px solid gray;
  background-color: transparent;
  color: white;
`;
const SearchContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  width: 10rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: green;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
`;
const HeaderContainer = styled.div`
  width: 90%;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  @media screen and (max-width: 988px) {
    flex-direction: column;
  }
`;
const FilterContainer = styled.div`
  width: 20%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
`;
const SortContainer = styled.div`
  width: 18%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
`;
function App() {
  const items = useSelector((state) => state.items.items);
  const [searchItem, setSearchItem] = useState("");
  /* const [items, setItems] = useState([]); */
  const [hideAdd, setHideAdd] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());

  }, []);
  //console.log(employees);
  return (
    <Container>
      <SearchContainer>
        <Search
          placeholder="Search.."
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
      </SearchContainer>
      <HeaderContainer>
        <Button
          onClick={() => {
            setHideAdd((prev) => !prev);
          }}
        >
          Add New Item
        </Button>
        <SortContainer>
          <h4>Sort:</h4>
          <input
            onChange={(e) => {
              setSort(e.target.value);
            }}
            value="TimeToBuy"
            type="radio"
            name="sort"
            id="TimeToBuy"
          />
          <label htmlFor="TimeToBuy">Time To Buy</label>
          <input
            onChange={(e) => {
              setSort(e.target.value);
            }}
            value="Cost"
            type="radio"
            name="sort"
            id="Cost"
          />
          <label htmlFor="Cost">Cost</label>
        </SortContainer>
      </HeaderContainer>

      <ItemsContainer
        searchItem={searchItem}
        filter={filter}
        items={
          sort === "TimeToBuy"
            ? items.sort((a, b) => (a.TimeToBuy > b.TimeToBuy ? 1 : -1))
            : sort === "Cost"
            ? items.sort((a, b) => (a.Cost > b.Cost ? 1 : -1))
            : items
        }
      />

      {hideAdd ? <AddItemModal setHideAdd={setHideAdd} /> : ""}
    </Container>
  );
}

export default App;
