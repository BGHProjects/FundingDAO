// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IFundingDAO {

    //////////////
    // FUNCTIONS
    //////////////

    /// @notice Retrieves the proposal associated with the inputted ID
    /// @param proposalId The uint256 representing which proposal is to be retrieved
    function getProposal(uint256 proposalId) external returns (Proposal memory);

    /// @notice Retrieves each proposal that the user has voted on
    /// @dev Only stakeholders can call this function
    function getVotes() external returns (uint256[] calldata);

    /// @notice Retrieves the number of tokens the stakeholder has provided to the DAO
    /// @dev Only stakeholders can call this function
    function getStakeholderBal() external returns(uint256);

    /// @notice Retrieves the number of tokens the member has provided to the DAO
    /// @dev Only members can call this function
    function getMemberBal() external returns(uint256);

    /// @notice Determines if the caller is a stakeholder of the DAO or not
    function isStakeholder() external returns (bool);

    /// @notice Determines if the caller is a member of the DAO or not
    function isMember() external returns (bool);

    /// @notice Adds a vote either for or against an inputted proposal
    /// @dev Only stakeholders can call this function
    /// @param proposalId The id that represents a proposal in the DAO
    /// @param inFavour Whether the vote is in favour of the proposal or not
    function vote(uint256 proposalId, bool inFavour) external;

    /// @notice Adds an inputted amount of funds to an inputted proposal
    /// @dev Only stakeholders can call this function
    /// @param proposalId The id that represents a proposal in the DAO
    /// @param fundAmount How much the user is sending to the proposal
    function provideFunds(uint256 proposalId, uint256 fundAmount) external payable;

    /// @notice Pays about the amount raised for a proposal to the proposal's receiver address
    /// @dev Only stakeholders can call this function
    /// @param proposalId The id that represents a proposal in the DAO
    function releaseFunding(uint256 proposalId) external payable; 

    /// @notice Makes the user who calls this function a new member or stakeholder of the DAO
    function createStakeholder() external payable;

    //////////////
    // STRUCTS
    //////////////

    /// @dev Holds the data related to payments to the DAO
    /// @param payer The address who is paying the DAO
    /// @param amount The amount being paid to the DAO
    /// @param timestamp When the amount was paid to the DAO
    struct Funding {
        address payer; 
        uint256 amount;
        uint256 timestamp;
    }

    /// @dev Holds all the details relevant to a Proposal in the DAO
    /// @param id Identifier used in the DAO's internal proposals mapping
    /// @param amount How much funding is required for this proposal
    /// @param livePeriod The period of time in which the proposal can be voted on
    /// @param votesInFavour How many votes are in favour of this proposal
    /// @param votesAgainst How many votes are against this proposal
    /// @param title The title of this proposal
    /// @param description A short description of this proposal
    /// @param isCompleted Whether or not this proposal has been completed
    /// @param isPaid Whether or not this proposal has been paid
    /// @param receiverAddress The address to be funded if the proposal passes
    /// @param proposer The address that proposed this proposal
    /// @param totalFundsRaised Amount indicating how much funds were raised for this proposal
    /// @param funders A list of who funded this proposal
    struct Proposal {
        uint256 id;
        uint256 amount;
        uint256 livePeriod;
        uint256 votesInFavour;
        uint256 votesAgainst;
        string title;
        string description;
        bool isCompleted;
        bool isPaid;
        address payable receiverAddress;
        address proposer;
        uint256 totalFundsRaised;
        Funding[] funders;
    }

    //////////////
    // EVENTS
    //////////////

    /// @notice Emitted when a new member has joined the DAO
    /// @param fromAddress The address of the new member of the DAO
    /// @param amount The amount that the new member provided
    event NewMember(address indexed fromAddress, uint256 amount);

    /// @notice Emitted when a new proposal is created on the DAO
    /// @param proposer The address of the user who made the proposal
    /// @param amount The amount that is required for the proposal
    event NewProposal(address indexed proposer, uint256 amount);

    /// @notice Emitted when a payment has been made
    /// @param stakeholder The address of the user who made the payment
    /// @param amount The amount that was paid
    event Payment(address indexed stakeholder, uint256 amount);

    //////////////
    // ERRORS
    //////////////

    /// @dev The time period for the proposal has elapsed
    error TimePeriodElapsed();

    /// @dev The user has already voted on this proposal
    error OnlySingleVoteAllowed();

    /// @dev The funds required for the proposal have already been provided
    error ProposalAlreadyFunded();

    /// @dev The proposal was not selected for funding
    error ProposalDidNotPass();

    /// @dev The funds required for the proposal are not met
    error InadequateFunds();

    /// @dev Caller does not have the correct role to perform this action
    error InvalidRole();

    /// @dev Caller did not provide enough tokens in order to create a proposal
    error InadequateProposalDeposit();
}