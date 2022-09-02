import React, { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { ConnectKitButton } from "connectkit";
import { Avatar, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
const TopBar = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (address) {
      toast({
        title: "Connected",
        description: `Connected with ${address}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/chats");
    }
  }, []);

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="red"
        w="100%"
        p="2px 2px 2px 2px"
        borderWidth="5px"
      >
        <Menu>
          <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
            <Avatar size="sm" cursor="pointer" name={""} src={""} />
          </MenuButton>
          <MenuButton>
            <Text fontSize="2xl" fontFamily="Work sans">
              Styx
            </Text>
          </MenuButton>
          <MenuButton>
            <div
              style={{
                alignItems: "center",
                marginLeft: "auto",
                background: "green",
              }}
            >
              <ConnectKitButton />
            </div>
          </MenuButton>
        </Menu>
      </Box>
    </>
  );
};

export default TopBar;
