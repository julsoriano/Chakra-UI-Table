import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Stack,
  Spinner,
  Progress,
  Center,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import useCats from "./useCats";

const EmptyState = () => {
  return (
    <Box textAlign="center">
      <SearchIcon fontSize="9xl" mt={20} color="blue.500" />
      <Text textAlign="center" my={10}>
        No cats found!
      </Text>
    </Box>
  );
};

const ErrorState = () => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>An error occured!</AlertTitle>
      <AlertDescription>Please contact us for assistance.</AlertDescription>
    </Alert>
  );
};

const TableComponent = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCats({ page });

  if (isError) {
    return <ErrorState />;
  }

  if (isLoading && !data) {
    return (
      <Center h="100vh">
        <Spinner
          margin="auto"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (data?.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {isLoading && (
        <Progress size="xs" isIndeterminate w="100%" position="fixed" top="0" />
      )}
      <Box p="3" w="100%" position="relative">
        <Table colorScheme="blue" overflow="none">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Origin</Th>
              <Th>Type</Th>
              <Th>Body type</Th>
              <Th>Coat</Th>
              <Th>Pattern</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((cat) => (
              <Tr key={cat.name}>
                <Td p="2">
                  <Box
                    bgImage={cat.imgUrl}
                    w="150px"
                    h="150px"
                    backgroundSize="cover"
                  />
                </Td>
                <Td>{cat.name}</Td>
                <Td>{cat.origin}</Td>
                <Td>{cat.type}</Td>
                <Td>{cat.bodyType}</Td>
                <Td>{cat.coat}</Td>
                <Td>{cat.pattern}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Stack spacing="2" direction="row" mt="3" justifyContent="center">
          <Button onClick={() => setPage(1)}>1</Button>
          <Button onClick={() => setPage(2)}>2</Button>
        </Stack>
      </Box>
    </>
  );
};

export default TableComponent;
