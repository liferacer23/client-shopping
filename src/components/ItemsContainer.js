import React, { useEffect, useState } from "react";
import Item from "./Item";
import styled from "styled-components";
const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin: 0rem auto;
  width: 95%;
  height: 85%;
`;
const Total = styled.div`
  padding: 1rem;
  display: flex;
  color: white;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin: 0rem auto;
  width: 65%;
  height: 5%;
`;
export default function ItemsContainer({ items, filter, searchItem }) {
  const [bought, setBought] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (items) {
      const addTotal = () => {
        return items.map((item) => {
          return setTotal((prev) => parseInt(prev, 10) + parseInt(item.Cost, 10));
        });
      };
      addTotal();
    }
  }, [items]);
  return (
    <>
      <Total>
        <p>Items Bought: ${bought}</p>
        <p>Total to be Bought: ${total?total:""}</p>
      </Total>
      <Wrapper>
        {items
          ? items
              .filter((item) => {
                if (searchItem === "") {
                  if (filter === "") {
                    return item;
                  } else if (filter === item.Name.toLowerCase()) {
                    return item;
                  }
                } else if (searchItem !== "" && filter === "") {
                  if (
                    item.Name.toLowerCase().includes(searchItem.toLowerCase())
                  ) {
                    return item;
                  }
                } else if (searchItem !== "" && filter !== "") {
                  if (
                    item.Name.toLowerCase().includes(
                      searchItem.toLowerCase()
                    ) &&
                    filter == item.Name.toLowerCase()
                  ) {
                    return item;
                  }
                }
              })
              .map((data, index) => {
                return (
                  <Item
                    key={index}
                    data={data}
                    bought={bought}
                    setBought={setBought}
                  />
                );
              })
          : "Loading.."}
      </Wrapper>
    </>
  );
}
