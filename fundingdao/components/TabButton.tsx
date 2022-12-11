import { Center, Text } from "@chakra-ui/react";
import Link from "next/link";
import { blueSecondary, inactiveGrey } from "../consts/colours";

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
      borderBottomColor={isActive ? blueSecondary : inactiveGrey}
      borderBottomWidth={isActive ? "3px" : undefined}
    >
      <Text fontSize="18px" color={isActive ? blueSecondary : inactiveGrey}>
        {title}
      </Text>
    </Center>
  </Link>
);

export default TabButton;
