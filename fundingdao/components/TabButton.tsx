import { Center, Text } from "@chakra-ui/react";
import Link from "next/link";
import { inactiveGrey } from "../consts/colours";

interface ITabButton {
  title: string;
  isActive: boolean;
  url: string;
}

const TabButton = ({ title, isActive, url }: ITabButton) => (
  <Link href={url}>
    <Center
      h="40px"
      w="fitContent"
      p="10px"
      borderBottomColor={isActive ? "orange" : inactiveGrey}
      borderBottomWidth={isActive ? "3px" : undefined}
    >
      <Text fontSize="18px" color={isActive ? "orange" : inactiveGrey}>
        {title}
      </Text>
    </Center>
  </Link>
);

export default TabButton;
