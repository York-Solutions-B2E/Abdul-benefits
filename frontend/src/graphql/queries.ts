export const DASHBOARD_QUERY = `
  query Dashboard($memberId: ID!) {
    memberById(id: $memberId) {
      firstName
      lastName
      activeEnrollment {
        coverageStart
        coverageEnd
        plan {
          name
          planYear
          networkName
        }
        active
        accumulators {
          tier
          type
          limitAmount
          usedAmount
        }
      }
    }

  claimsList(memberId: $memberId, page: 0, size: 5) {
      content {
        id
        claimNumber
        status
        totalBilled
        totalAllowed
        provider {
          name
          specialty
        }
      }
      totalElements
      totalPages
      currentPage
    }

  }
`;

export const CLAIM_DETAIL_QUERY = `
  query GetByClaimNumber($claimNumber: String!) {
    getByClaimNumber(claimNumber: $claimNumber) {
      id
      claimNumber
      serviceStartDate
      serviceEndDate
      receivedDate
      status
      totalBilled
      totalAllowed
      totalPlanPaid
      totalMemberResponsibility
      provider {
        name
        specialty
      }
      lines {
        id
        lineNumber
        cptCode
        description
        billedAmount
        allowedAmount
        deductibleApplied
        copayApplied
        coinsuranceApplied
        planPaid
        memberResponsibility
      }
      
    }
  }

`;

export const CLAIMS_QUERY = `
  query($memberId: ID!, $page: Int!, $size: Int!) {
  claimsList(memberId: $memberId, page: $page, size: $size) {
    content {
      id
      claimNumber
      status
      totalBilled
      totalAllowed
      totalMemberResponsibility
      serviceStartDate
      serviceEndDate
      provider {
        name
        specialty
      }
    }
    totalElements
    totalPages
    currentPage
  }
}`;
