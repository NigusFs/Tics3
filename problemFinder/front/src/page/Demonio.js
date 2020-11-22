import React, { useEffect, useState } from "react";
import {
  PlayCircleOutlined,
  PauseOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { FormText } from "react-bootstrap";

function initialState() {
  // Llamar a la api para saber el estado
  return false;
}

function Demonio() {
  const [clicked, setClicked] = useState(false);
  const [state, setState] = useState(initialState());
  useEffect(() => {
    if (clicked) {
      console.log("Cambiando a ", state);
      if (state) {
        console.log("Llamando a la API para que inicie el demonio");
      } else {
        console.log("LLamando a la API para que pare el demonio");
      }
    }
  });
  if (state) {
    return (
      <Tooltip title="turn off">
        <Button
          type="link"
          onClick={(e) => {
            setState(false);
            if (!clicked) {
              setClicked(true);
            }
          }}
        >
          <PauseOutlined style={{ fontSize: "32px", color: "#000000" }} />
        </Button>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="turn on">
        <Button
          type="link"
          onClick={(e) => {
            setState(true);
            if (!clicked) {
              setClicked(true);
            }
          }}
        >
          <CaretRightOutlined style={{ fontSize: "32px", color: "#000000" }} />
        </Button>
      </Tooltip>
    );
  }
}

export default Demonio;
