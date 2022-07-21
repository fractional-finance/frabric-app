import GraphQLAPIMapper from "../graphQLAPIMapper"
import Asset from "../../../../models/asset"
import Proposal from "../../../../models/proposal"
import { Vote } from "../../../../models/vote"
import { MarketOrder } from "../../../../models/marketOrder"
import { BigNumber, utils } from "ethers"

class TheGraphAPIMapper extends GraphQLAPIMapper {
  mapAssets(rawAssets) {
    if (!rawAssets || rawAssets.length < 1) {
      return []
    }

    return rawAssets
      .map(rawAsset => {
        const proposals = this.mapProposals(rawAsset.proposals)

        var ownersMap = new Map()
        rawAsset.owners
          .forEach(ownership => {
            ownersMap.set(ownership.owner, ownership.shares)
          })

        let marketOrders = this.mapMarketOrders(rawAsset.marketOrders)

        return new Asset(
          rawAsset.id,
          rawAsset.mintedAsset.dataURI,
          rawAsset.contract,
          rawAsset.symbol,
          rawAsset.numOfShares,
          ownersMap,
          marketOrders,
          proposals
        )
      })
  }

  mapRawMarketOrders(rawOrders) {
    if (!rawOrders || rawOrders.data) return [];

    const orders = rawOrders.frabrics[0].threads; // TODO(bill): Add full path here

    // Questionable way of getting test data but will do for now
    return orders.length > 0
      ? this.mapMarketOrders(orders)
      : [{
        id: 'awpiohjd290',
        type: "buy",
        price: 7002841200000,
        totalAmount: 829092678162,
      }, {
        id: 'safasfaw',
        type: "sell",
        price: 7002841200000,
        totalAmount: 290952678162,
      }, {
        id: 'see9pfu',
        type: "buy",
        price: 7002841200000,
        totalAmount: 129092678162,
      }, {
        id: 'SF39uf',
        type: "sell",
        price: 7002841200000,
        totalAmount: 290926278162,
      }]
  }

  mapMarketOrders(rawMarketOrders) {
    if (!rawMarketOrders || rawMarketOrders.length < 1) {
      return []
    }

    return rawMarketOrders
      .map(rawMarketOrder => {
        return new MarketOrder(
          rawMarketOrder.id,
          rawMarketOrder.type,
          rawMarketOrder.price,
          rawMarketOrder.totalAmount
        )
      })
  }

  mapProposals(rawProposals) {
    if (!rawProposals || rawProposals.length < 1) {
      return []
    }

    return rawProposals
      .map(rawProposal => {
        const votes = this.mapVotes(rawProposal.votes)

        return new Proposal(
          rawProposal.id,
          rawProposal.creator,
          rawProposal.dataURI,
          rawProposal.startTimestamp,
          rawProposal.endTimestamp,
          votes
        )
      })
  }

  mapVotes(rawVotes) {
    if (!rawVotes || rawVotes.length < 1) {
      return []
    }

    return rawVotes
      .map(rawVote => {
        return new Vote(
          rawVote.id,
          rawVote.voter,
          rawVote.voteType,
          rawVote.count
        )
      })
  }
}

export default TheGraphAPIMapper