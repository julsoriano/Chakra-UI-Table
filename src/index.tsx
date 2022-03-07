import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import Table from "./Table";

const rootElement = document.getElementById("root");
render(
  <ChakraProvider>
    <Table />
  </ChakraProvider>,
  rootElement
);
