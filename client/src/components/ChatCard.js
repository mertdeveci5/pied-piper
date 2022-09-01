import React from "react";
import { Flex, Box, chakra, HStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const ChatCard = ({ id, name, avatar }) => {
  return (
    <>
      <Flex
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        height="min-content"
        alignItems="center"
        justifyContent="center"
        rounded="lg"
      >
        <Flex
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
        >
          <Box
            w={1 / 3}
            bgSize="cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80')",
            }}
          ></Box>

          <Box
            w={2 / 3}
            p={{
              base: 4,
              md: 4,
            }}
          >
            <chakra.h1
              fontSize="2xl"
              fontWeight="bold"
              color="gray.800"
              _dark={{
                color: "white",
              }}
            >
              {JSON.stringify(name)}
            </chakra.h1>

            <chakra.p
              mt={2}
              fontSize="sm"
              color="gray.600"
              _dark={{
                color: "gray.400",
              }}
            >
              The id is {JSON.stringify(id)}
            </chakra.p>
          </Box>
        </Flex>
      </Flex>
      ;
    </>
  );
};

export default ChatCard;
