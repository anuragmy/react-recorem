import React from "react";
import { Grid, Container } from "@material-ui/core";
import Filter from "./Filter";
import { Table, Card, Button } from "antd";

const Tables = () => {
  const [list, setList] = React.useState([]);
  // const [prevState, setPrevState] = React.useState([]);
  const [data, setData] = React.useState([
    {
      name: "name1",
      screen_name: "screen_name1",
      followers_count: 2,
      following_count: 7,
      location: "delhi",
      id: 1,
      verified: "yes"
    },
    {
      name: "name2",
      screen_name: "screen_name2",
      followers_count: 5,
      following_count: 5,
      location: "chennai",
      id: 3,
      verified: "no"
    },
    {
      name: "name1",
      screen_name: "screen_name1",
      followers_count: 10,
      following_count: 6,
      location: "delhi",
      id: 4,
      verified: "yes"
    },
    {
      name: "name2",
      screen_name: "screen_name1",
      followers_count: 10,
      following_count: 10,
      location: "delhi",
      id: 5,
      verified: "yes"
    },
    {
      name: "name3",
      screen_name: "screen_name1",
      followers_count: 10,
      following_count: 10,
      location: "delhi",
      id: 6,
      verified: "yes"
    },
    {
      name: "name1",
      screen_name: "screen_name2",
      followers_count: 10,
      following_count: 10,
      location: "chennai",
      id: 7,
      verified: "yes"
    }
  ]);
  const [backup] = React.useState(data);

  const [condition, setCondition] = React.useState([]);

  const { Column } = Table;

  const applyFilter = (conditionArray = []) => {
    const newArray = conditionArray.length ? conditionArray : condition;
    newArray.map((conditions, i) => {
      if (conditions.operator === "CONTAINS") {
        // filter for name
        if (conditions.id === "name") {
          const newData =
            data.length > 0 &&
            data.filter(item => item.name.includes(conditions.value));
          if (conditions.condition && conditions.condition === "or") {
            data.map(d => newData.push(d));
            return setData(newData);
          }
          console.log("new arr", newData);
          return setData(newData);
        }
        // filter for screen_name
        if (conditions.id === "screen_name") {
          const newData = data.filter(item =>
            item.screen_name.includes(conditions.value)
          );
          return setData(newData);
        }
        // filter for location
        if (conditions.id === "location") {
          const newData = data.filter(item =>
            item.location.includes(conditions.value)
          );
          return setData(newData);
        }
      }
      if (conditions.operator === "GTE") {
        console.log("here");
        // filter for followers_count
        if (conditions.id === "followers_count") {
          const newData = data.filter(
            item => item.followers_count >= conditions.value
          );
          return setData(newData);
        }
        // filter for following_count
        if (conditions.id === "following_count") {
          const newData = data.filter(
            item => item.following_count >= conditions.value
          );
          return setData(newData);
        }
      }
      if (conditions.operator === "LTE") {
        console.log("here");
        // filter for followers_count
        if (conditions.id === "followers_count") {
          const newData = data.filter(
            item => item.followers_count <= conditions.value
          );
          return setData(newData);
        }
        // filter for following_count
        if (conditions.id === "following_count") {
          const newData = data.filter(
            item => item.following_count <= conditions.value
          );
          return setData(newData);
        }
      }
      if (conditions.operator === "EQ") {
        // filter for verified
        if (conditions.id === "verified") {
          const newData = data.filter(item => {
            if (item.verified === "yes") {
              if (conditions.value === "yes") return item;
            } else if (item.verified === "no") {
              if (conditions.value === "no") return item;
            }
          });
          return setData(newData);
        }
      }
    });
  };

  const getFilter = filter => {
    const newCondition = [
      ...condition,
      {
        id: filter.type,
        operator: filter.action,
        value: filter.value,
        condition: filter.condition
      }
    ];

    setCondition(newCondition);
    applyFilter(newCondition);
  };

  const clearState = id => {
    if (id === 0) {
      console.log("id 0", id);
      setCondition([]);
      setData(backup);
      setList([]);
      return;
    }
    const newCondition = condition.filter(cond => cond.key === id);
    setCondition(newCondition);
    const newList = list.map(comp => comp);

    setList(newList);
    applyFilter();
  };

  const addFilter = () => {
    const newList = [
      ...list,
      <Filter
        key={list.length}
        text={list.length === 0 ? "Where" : "And"}
        id={list.length}
        clearState={stateId => clearState(stateId)}
        getFilter={state => getFilter(state)}
      />
    ];
    setList(newList);
  };

  console.log("list", list);
  console.log("list length", list.length);
  console.log("condition", condition);
  console.log("data", data);

  return (
    <Container>
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Card style={{ width: "100%", marginTop: 20 }}>
            {list.map((comp, i) => (
              <span key={i}>{comp}</span>
            ))}
            <div style={{ display: "flex", marginTop: 10 }}>
              <Button type="link" onClick={addFilter}>
                + Add Filter
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Table
            dataSource={data}
            pagination={false}
            style={{ textAlign: "center" }}
          >
            <Column title="Name" dataIndex="name" key="name" />
            <Column
              title="Screen Name"
              dataIndex="screen_name"
              key="screen_name"
            />
            <Column
              title="Follwors Count"
              dataIndex="followers_count"
              key="followers_count"
            />
            <Column
              title="Following Count"
              dataIndex="following_count"
              key="following_count"
            />
            <Column title="Location" dataIndex="location" key="location" />
            <Column title="verified" dataIndex="verified" key="verified" />
          </Table>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tables;
