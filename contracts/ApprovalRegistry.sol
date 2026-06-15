
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ApprovalRegistry {

    enum Status {
        Pending,
        Approved,
        Rejected,
        Expired
    }

    struct ApprovalRequest {
        uint256 id;
        string approvalHash;
        string requestedAmount;
        uint256 createdAt;
        uint256 expiresAt;
        Status status;
    }

    uint256 public requestCount;

    mapping(uint256 => ApprovalRequest) public requests;

    event RequestCreated(
        uint256 indexed id,
        string approvalHash,
        string requestedAmount
    );

    event RequestApproved(uint256 indexed id);

    event RequestRejected(uint256 indexed id);

    event RequestExpired(uint256 indexed id);

    function createRequest(
        string memory approvalHash,
        string memory requestedAmount
    ) public {

        requestCount++;

        requests[requestCount] = ApprovalRequest({
            id: requestCount,
            approvalHash: approvalHash,
            requestedAmount: requestedAmount,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + 72 hours,
            status: Status.Pending
        });

        emit RequestCreated(
            requestCount,
            approvalHash,
            requestedAmount
        );
    }

    function approveRequest(uint256 id) public {

        require(
            requests[id].status == Status.Pending,
            "Request is not pending"
        );

        requests[id].status = Status.Approved;

        emit RequestApproved(id);
    }

    function rejectRequest(uint256 id) public {

        require(
            requests[id].status == Status.Pending,
            "Request is not pending"
        );

        requests[id].status = Status.Rejected;

        emit RequestRejected(id);
    }

    function expireRequest(uint256 id) public {

        require(
            block.timestamp > requests[id].expiresAt,
            "Not expired yet"
        );

        require(
            requests[id].status == Status.Pending,
            "Already processed"
        );

        requests[id].status = Status.Expired;

        emit RequestExpired(id);
    }

    function getRequest(
        uint256 id
    )
        public
        view
        returns (
            uint256 requestId,
            string memory approvalHash,
            string memory requestedAmount,
            uint256 createdAt,
            uint256 expiresAt,
            Status status
        )
    {
        ApprovalRequest memory r = requests[id];

        return (
            r.id,
            r.approvalHash,
            r.requestedAmount,
            r.createdAt,
            r.expiresAt,
            r.status
        );
    }
}

