import { createContext, ReactNode, useState } from "react";
import { FundingDAO__factory } from "../contracts/typechain-types";
import { Contract } from "ethers";
import { useToast } from "@chakra-ui/react";
import useConnect from "../hooks/useConnect";
import useCreateStakeholder from "../hooks/useCreateStakeholder";
import useCreateProposal from "../hooks/useCreateProposal";
import {
  getProposalHelper,
  provideFundsHelper,
  releaseFundingHelper,
  voteHelper,
} from "../helpers";

export interface IProposal {
  title: string;
  description: string;
  amount: string;
  recipient: string;
  imageId: string;
  id?: string;
  votesAgainst?: string;
  votesInFavour?: string;
  proposer?: string;
  livePeriod?: string;
}

interface IDataContext {
  account: string;
  loading: boolean;
  connect: () => Promise<void>;
  fundingDao: Contract | null;
  allProposals: IProposal[];
  isStakeholder: boolean;
  isMember: boolean;
  currentBal: string;
  allVotes: string[];
  allInvestedProposals: IProposal[];
  createStakeholder: (amount: string) => Promise<void>;
  provideFunds: (id: string, amount: string) => Promise<void>;
  getProposal: (id: string) => Promise<IProposal>;
  vote: (id: string, vote: boolean) => Promise<void>;
  releaseFunding: (id: string) => Promise<void>;
  createProposal: ({
    title,
    description,
    amount,
    recipient,
    imageId,
  }: IProposal) => Promise<void>;
}

export const DataContext = createContext<IDataContext>({
  account: "",
  loading: true,
  connect: async () => {},
  fundingDao: null,
  allProposals: [],
  isStakeholder: false,
  isMember: false,
  currentBal: "",
  allVotes: [],
  allInvestedProposals: [],
  createStakeholder: async (val) => {},
  provideFunds: async (id, amount) => {},
  createProposal: async () => {},
  vote: async () => {},
  releaseFunding: async (id) => {},
  getProposal: async (val) => {
    return {} as IProposal;
  },
});

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [fundingDao, setFundingDao] = useState<any>();
  const [allProposals, setAllProposals] = useState<IProposal[]>([]);
  const [isStakeholder, setIsStakeholder] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [currentBal, setCurrentBal] = useState("");
  const [allVotes, setAllVotes] = useState<string[]>([]);
  const [allInvestedProposals, setAllInvestedProposals] = useState<IProposal[]>(
    []
  );

  const toast = useToast();

  const FunndingDaoContractAddress =
    "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const fundingDaoContract = new Contract(
    FunndingDaoContractAddress,
    FundingDAO__factory.abi
  );

  const loadBlockchainData = async () => {
    setFundingDao(fundingDaoContract);

    setTimeout(async () => {
      const totalProposals = await fundingDao.getAllProposals();

      const tempProposals: IProposal[] = [];

      totalProposals.forEach((proposal: IProposal) => {
        tempProposals.push(proposal);
      });

      setAllProposals(tempProposals);

      const isStakeholder = await fundingDao.isStakeholder();
      setIsStakeholder(isStakeholder);

      const isMember = await fundingDao.isMember();
      setIsMember(isMember);

      if (isMember && !isStakeholder) {
        const memberBal = await fundingDao.getMemberBal();
        setCurrentBal(memberBal);
      } else if (isMember && isStakeholder) {
        const stakeholderBal = await fundingDao.getStakeholderBal();
        setCurrentBal(stakeholderBal);

        const votes = await fundingDao.getVotes();

        const res = tempProposals.filter((proposal: IProposal) => {
          const vote = votes.find((vote: string) => vote === proposal.id);
          if (vote) return true;
          return false;
        });

        setAllInvestedProposals(res);
        setAllVotes(votes);
      } else {
        setCurrentBal("");
      }
    }, 500);
  };

  const connect = useConnect(setAccount, loadBlockchainData);
  const createStakeholder = useCreateStakeholder(
    fundingDao,
    loadBlockchainData
  );
  const createProposal = useCreateProposal(fundingDao, loadBlockchainData);

  const provideFunds = (id: string, amount: string) =>
    provideFundsHelper(id, amount, fundingDao, loadBlockchainData);
  const getProposal = (id: string) => getProposalHelper(id, fundingDao);
  const releaseFunding = (id: string) =>
    releaseFundingHelper(id, fundingDao, loadBlockchainData);
  const vote = (id: string, vote: boolean) =>
    voteHelper(id, vote, fundingDao, loadBlockchainData);

  return (
    <DataContext.Provider
      value={{
        account,
        loading,
        connect,
        fundingDao,
        allProposals,
        isStakeholder,
        isMember,
        currentBal,
        allVotes,
        allInvestedProposals,
        createStakeholder,
        createProposal,
        provideFunds,
        getProposal,
        releaseFunding,
        vote,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
