import { Orders, OrderType } from "../../../types/DTOs";
import styled from "styled-components";
import { useState } from "react";
import { filterOrders } from "../../../utils/functions/filterOrders";
import moment from "moment";
import { Button } from "../../../styledComponents/styledComponents";
import { orderTypes } from "../../../utils/constants";

const Container = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 16px;
`;

const InputField = styled.input`
  border-radius: 15px;
  border: 1px solid lightgray;
  padding: 8px;
`;

const InputLabel = styled.label`
  margin-bottom: 8px;
`;

const DateInputContainer = styled.label`
  display: flex;
  flex-direction: row;
`;

const Select = styled.select`
  border-radius: 15px;
  border: 1px solid lightgray;
  padding: 8px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 8px;
`;

type FilterBarProps = {
  orders: Orders;
  setFilteredOrders: (filteredOrders: Orders) => void;
};

export const FilterBar = (p: FilterBarProps) => {
  const [titleFilter, setTitleFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<OrderType | "">("");
  const [dateFilter, setDateFilter] = useState({ to: "", from: "" });

  const handleFilterClick = () => {
    const ordersFilteredByDate = filterOrders({
      orders: p.orders,
      config: {
        by: "date",
        from: dateFilter.from ? moment(dateFilter.from).valueOf() : 0,
        to: dateFilter.to
          ? moment(dateFilter.to).valueOf()
          : Number.MAX_SAFE_INTEGER,
      },
    });
    const ordersFilteredByDateAndType = filterOrders({
      orders: ordersFilteredByDate,
      config: { by: "type", filter: typeFilter },
    });
    const ordersFilteredByAll = typeFilter
      ? filterOrders({
          orders: ordersFilteredByDateAndType,
          config: { by: "title", filter: titleFilter },
        })
      : ordersFilteredByDateAndType;
    p.setFilteredOrders(ordersFilteredByAll);
  };

  const handleClearClick = () => {
    setTitleFilter("");
    setTypeFilter("");
    setDateFilter({ to: "", from: "" });
    p.setFilteredOrders(p.orders);
  };

  const generateSelect = () => (
    <Select onChange={(e) => setTypeFilter(e.target.value as OrderType)}>
      {orderTypes.map((type) => (
        <option value={type}>{type}</option>
      ))}
    </Select>
  );

  return (
    <>
      <Container>
        <Section>
          <InputLabel>Filtruj po tytule</InputLabel>
          <InputField
            placeholder="Wpisz tytuł"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
        </Section>
        <Section>
          <InputLabel>Filtruj po typie</InputLabel>
          {generateSelect()}
        </Section>
        <Section>
          <InputLabel>Filtruj po dacie</InputLabel>
          <DateInputContainer>
            <InputField
              style={{ width: 80, marginRight: 8 }}
              placeholder="od"
              onChange={(e) =>
                setDateFilter({ ...dateFilter, from: e.target.value })
              }
            />
            <InputField
              style={{ width: 80 }}
              placeholder="do"
              onChange={(e) =>
                setDateFilter({ ...dateFilter, to: e.target.value })
              }
            />
          </DateInputContainer>
        </Section>
      </Container>
      <ButtonsContainer>
        <Button onClick={handleFilterClick}>Filtruj</Button>
        <Button onClick={handleClearClick}>Wyczyść filtry</Button>
      </ButtonsContainer>
    </>
  );
};
