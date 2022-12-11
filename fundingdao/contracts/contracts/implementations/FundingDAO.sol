// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../interfaces/IFundingDAO.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract FundingDAO is IFundingDAO, ReentrancyGuard, AccessControl {
    bytes32 public constant MEMBER = keccak256("MEMBER");
    bytes32 public constant STAKEHOLDER = keccak256("STAKEHOLDER");

    uint32 constant votingPeriod = 3 days;

    uint256 public proposalCount = 0;

    mapping(uint256 => Proposal) private proposals;
    mapping(address => uint256) private stakeholders;
    mapping(address => uint256) private members;
    mapping(address => uint256[]) private votes;

    modifier onlyMember(){
        if(!hasRole(MEMBER, msg.sender)) revert InvalidRole();
        _;
    }

    modifier onlyStakeholder(){
        if(!hasRole(STAKEHOLDER, msg.sender)) revert InvalidRole();
        _;
    }

    function createProposal(
        string calldata title,
        string calldata description,
        address receiverAddress,
        uint256 amount,
        string calldata imageId
    ) public payable onlyMember {
        if(msg.value < 0.1 ether) revert InadequateProposalDeposit();

        uint256 proposalId = proposalCount;
        Proposal storage proposal = proposals[proposalId];
        proposal.id = proposalId;
        proposal.description = description;
        proposal.title = title;
        proposal.receiverAddress = payable(receiverAddress);
        proposal.proposer = payable(msg.sender);
        proposal.amount = amount;
        proposal.livePeriod = block.timestamp + votingPeriod;
        proposal.isPaid = false;
        proposal.isCompleted = false;
        proposal.imageId = imageId;
        proposalCount++;

        emit NewProposal(msg.sender, amount);
    }

    function getAllProposals() public view returns (Proposal[] memory){
        Proposal[] memory tempProposals = new Proposal[](proposalCount);
        for(uint256 index = 0; index < proposalCount;)
        {
            tempProposals[index] = proposals[index];
            unchecked{
                ++index;
            }
        }
        return tempProposals;
    }

    function getProposal(uint256 proposalId)public view returns (Proposal memory)
    {
        return proposals[proposalId];
    }

    function getVotes()public view onlyStakeholder returns (uint256[] memory)
    {
        return votes[msg.sender];
    }

    function getStakeholderBal() public view onlyStakeholder returns(uint256)
    {
        return stakeholders[msg.sender];
    }

    function getMemberBal() public view onlyMember returns(uint256)
    {
        return members[msg.sender];
    }

    function isStakeholder() public view returns (bool)
    {
        return stakeholders[msg.sender] > 0;
    }

    function isMember() public view returns (bool)
    {
        return members[msg.sender] > 0;
    }

    function vote(uint256 proposalId, bool inFavour) public onlyStakeholder
    {
        Proposal storage proposal = proposals[proposalId];

        if(proposal.isCompleted || proposal.livePeriod <= block.timestamp){
            proposal.isCompleted = true;
            revert TimePeriodElapsed();
        }

        for(uint256 i = 0; i < votes[msg.sender].length;)
        {
            if(proposal.id == votes[msg.sender][i]) revert OnlySingleVoteAllowed();
            unchecked{
                ++i;
            }
        }

        if(inFavour) proposal.votesInFavour++;
        else proposal.votesAgainst++;

        votes[msg.sender].push(proposalId);
    }

    function provideFunds(uint256 proposalId, uint256 fundAmount) public payable onlyStakeholder
    {
        Proposal storage proposal = proposals[proposalId];

        if(proposal.isPaid || proposal.totalFundsRaised >= proposal.amount) revert ProposalAlreadyFunded();
        if(proposal.votesInFavour <= proposal.votesAgainst) revert ProposalDidNotPass();

        proposal.totalFundsRaised += fundAmount;
        proposal.funders.push(Funding(msg.sender, fundAmount, block.timestamp));
        if(proposal.totalFundsRaised >= proposal.amount) proposal.isCompleted = true;
    }

    function releaseFunding(uint256 proposalId) public payable onlyStakeholder
    {
        Proposal storage proposal = proposals[proposalId];

        if(proposal.totalFundsRaised < proposal.amount) revert InadequateFunds();

        proposal.isPaid = true;
        proposal.isCompleted = true;
        proposal.receiverAddress.transfer(proposal.totalFundsRaised);
        emit Payment(proposal.receiverAddress, proposal.totalFundsRaised);
    }

    function createStakeholder() public payable {
        uint256 amount = msg.value;
        if(!hasRole(STAKEHOLDER, msg.sender))
        {
            uint256 total = members[msg.sender] + amount;
            if(total >= 0.2 ether) {
                _setupRole(STAKEHOLDER, msg.sender);
                _setupRole(MEMBER, msg.sender);
                stakeholders[msg.sender] = total;
                members[msg.sender] += amount;
            } else {
                _setupRole(MEMBER, msg.sender);
                members[msg.sender] += amount;
            }
        emit NewMember(msg.sender, msg.value);

        } else {
            members[msg.sender] += amount;
            stakeholders[msg.sender] += amount;
        }
    }
}