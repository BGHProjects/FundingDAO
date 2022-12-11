import { Flex, Center, Text, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../contexts/dataContext";
import { navyMain, blueSecondary } from "../consts/colours";
import TabButton from "./TabButton";
import { dataAttr } from "@chakra-ui/utils";

const Navbar = () => {
  const { account, connect, isMember, isStakeholder } = useContext(DataContext);

  const router = useRouter();

  const notPartOfDAO = !isMember && !isStakeholder;

  const buttonData = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Create Proposal",
      url: "/create-proposal",
    },
    {
      title: "Stakeholder Lounge",
      url: "/stakeholder-lounge",
    },
    {
      title: "Investments",
      url: "/investments",
    },
  ];

  return (
    <>
      <Flex
        w="full"
        h="70px"
        as="nav"
        alignItems="center"
        bg={navyMain}
        justifyContent="space-between"
        p="10px"
      >
        <Center justifyContent="space-between" p="10px">
          <Link href="/">
            <Text color="white" fontSize="24">
              FundingDAO
            </Text>
          </Link>
          <Center borderRadius="5px" bg={blueSecondary} ml="30px" p="10px">
            {notPartOfDAO
              ? "Not a Member"
              : isStakeholder
              ? "Stakeholder"
              : "Member"}
          </Center>
        </Center>
        {account ? (
          <Center w="120px" h="40px" borderRadius="5px" bg="orange" mr="20px">
            <Text color="white">{account.slice(0, 10)}...</Text>
          </Center>
        ) : (
          <Center
            w="120px"
            h="40px"
            borderRadius="5px"
            bg="orange"
            onClick={() => connect()}
            cursor="pointer"
            mr="20px"
          >
            <Text color="white" fontWeight="bold">
              Connect
            </Text>
          </Center>
        )}
      </Flex>
      <Center as="nav" w="full" h="100px">
        <HStack justifySelf="flex-end" spacing={5} mr="10px">
          {buttonData.map((data) => {
            const condOption: Record<string, boolean> = {
              Home: true,
              "Create Proposal": isMember,
              "Stakeholder Lounge": isMember,
              Investments: isStakeholder,
            };

            return (
              condOption[data.title] && (
                <TabButton
                  key={JSON.stringify(data)}
                  title={data.title}
                  isActive={router.asPath === data.url}
                  url={data.url}
                />
              )
            );
          })}
        </HStack>
      </Center>
    </>
  );
};

export default Navbar;
