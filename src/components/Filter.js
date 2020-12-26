import React from "react";
import { Select, Input, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Filter = ({ clearState, text, getFilter, id }) => {
  const [state, setState] = React.useState({
    type: "",
    action: "",
    value: "",
    id,
    condition: text === "And" ? "and" : "where"
  });

  const handleChangeType = e => setState({ ...state, type: e });
  const handleChangeCondition = e => setState({ ...state, condition: e });
  const handleChangeAction = e => setState({ ...state, action: e });
  const changeValue = e => {
    const updatedState = { ...state, value: e.target.value };
    setState(updatedState);
    if (state.type && state.action) getFilter(updatedState);
  };

  const changeVeriified = value => {
    console.log("val from filter", value);
    const newState = {
      ...state,
      value: value === false ? "no" : "yes"
    };
    setState(newState);
    console.log("state from filter", state);
    // pass state to parent

    // using newState instead of state as state update, being asynchronus, sometimes
    // may take a while to update
    // which may give "" to the parent
    if (newState.type && newState.action) getFilter(newState);
  };

  const { Option } = Select;

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex" }}>
        {text === "And" ? (
          <Select
            defaultValue={state.condition}
            style={{ width: 120 }}
            onChange={handleChangeCondition}
          >
            <Option value="and">And</Option>
            <Option value="or">Or</Option>
          </Select>
        ) : (
          "Where"
        )}
        <Space style={{ marginLeft: 10 }}>
          <Select style={{ width: 140 }} onChange={handleChangeType}>
            <Option value="name">Name</Option>
            <Option value="screen_name">Screen Name</Option>
            <Option value="followers_count">Followers Count</Option>
            <Option value="following_count">Following Count</Option>
            <Option value="location">Location</Option>
            <Option value="verified">Verified</Option>
          </Select>
          <Select
            style={{ width: 140, marginLeft: 20 }}
            onChange={handleChangeAction}
          >
            <Option
              value="CONTAINS"
              disabled={
                state.type === "followers_count" ||
                state.type === "following_count" ||
                state.type === "verified"
                  ? true
                  : false
              }
            >
              Contains
            </Option>
            <Option
              value="EQ"
              disabled={
                state.type === "followers_count" ||
                state.type === "following_count" ||
                state.type === "name" ||
                state.type === "screen_name" ||
                state.type === "location"
                  ? true
                  : false
              }
            >
              Equals
            </Option>
            <Option
              value="GTE"
              disabled={
                state.type === "screen_name" ||
                state.type === "name" ||
                state.type === "location" ||
                state.type === "verified"
                  ? true
                  : false
              }
            >
              {">="}
            </Option>
            <Option
              value="LTE"
              disabled={
                state.type === "screen_name" ||
                state.type === "name" ||
                state.type === "location" ||
                state.type === "verified"
                  ? true
                  : false
              }
            >
              {"<="}
            </Option>
          </Select>
          {state.type === "verified" ? (
            <Select
              name="verified"
              style={{ width: 140 }}
              onChange={changeVeriified}
              disabled={!state.action}
            >
              <Option value={true}>True</Option>
              <Option value={false}>False</Option>
            </Select>
          ) : (
            <Input
              style={{ width: 140, marginLeft: 20 }}
              placeholder="Value"
              onChange={changeValue}
              disabled={!state.action}
            />
          )}

          <Button
            icon={<DeleteOutlined />}
            style={{ marginLeft: 20 }}
            onClick={() => clearState(state.id)}
          />
        </Space>
      </div>
    </div>
  );
};

export default Filter;
