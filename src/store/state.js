import ServiceProvider from "../services/provider"
import { networks, WalletState } from "../models/walletState"
import { MarketOrderType } from "../models/marketOrder"
import { bigIntMax, bigIntMin } from "../utils/common"
import router from "../router/index"
import { Vote } from "../models/vote"

const wallet = ServiceProvider.wallet()
const market = ServiceProvider.market()
const dao = ServiceProvider.dao()
const dex = ServiceProvider.dex()

function state() {
  return {
    user: {
      wallet: WalletState
    },
    platform: {
      assets: null,
      proposals: new Map()
    },
    interface: {
      alert: null
    },
    exchange: {
      orders: null,
    }
  }
}

/**
 * Note: 
 * I haven"t spent too much time figuring out how to pass arguments to Vuex getters, only knowing that it"s not well-supported natively.
 * So for the first implementation whenever we need to get a subset of data for particular parameters —
 * — we return a Map from the corresponding getter, so that the consuming part can access the data with one key lookup operation.
 * 
 * Pretty suboptimal, but at the time of writing this the bigger picture matters the most!
 */

const getters = {
  userWalletAddress(state) {
    return state.user.wallet.address
  },

  userEthBalance(state) {
    return state.user.wallet.ethBalance
  },

  walletError(state) {
    return state.user.wallet.error
  },

  allAssets(state) {
    return state.platform.assets
  },

  assetsById(state) {
    var assetMap = new Map()
    state.platform.assets
      ?.forEach(asset => {
        assetMap.set(asset.id, asset)
      })

    return assetMap
  },

  marketplaceActiveAssets(state) {
    return state.platform.assets
  },

  assetMarketOrders(state) {
    return state.exchange.orders;
  },

  ownedAssets(state) {
    return state.platform.assets
      ?.filter(asset => { return asset.owners.get(state.user.wallet.address) }) || null
  },

  // TODO: Quick implementation for testing, need something smarter than that
  bestAssetPrices(state) {
    var assetPriceMap = new Map()

    state.platform.assets
      ?.forEach(asset => {
        let buyPrices = asset.marketOrders
          .filter(o => { return o.orderType == MarketOrderType.Buy })
          .map(o => { return o.price })
        let sellPrices = asset.marketOrders
          .filter(o => { return o.orderType == MarketOrderType.Sell })
          .map(o => { return o.price })

        const prices = {
          bid: bigIntMax(buyPrices),
          ask: bigIntMin(sellPrices)
        }

        assetPriceMap.set(asset.id, prices)
      })

    console.log("Best asset prices:")
    console.log(assetPriceMap)

    return assetPriceMap
  },

  assetProposals(state) {
    return state.platform.proposals
  },

  proposalsById(state) {
    var proposalsMap = new Map()

    console.log(state.platform.proposals.values())

    Array.from(state.platform.proposals.values())
      .flatMap(p => { return p })
      .forEach(p => { proposalsMap.set(p.id, p) })

    return proposalsMap
  },

  activeAlert(state) {
    return state.interface.alert
  }
}

const actions = {
  async syncWallet(context, params) {
    const walletState = await wallet.getState()
    if (walletState.error) {
      params.$toast.error(walletState.error.msg)
    }
    else {
      if (walletState.chainId !== networks.rinkeby) {
        params.$toast.show('Wallet connected, but you seem to be on the wrong network! Switch to Rinkeby in your wallet.')
      }
      else {
        params.$toast.success('Wallet connected!')
      }
    }
    context.commit("setWallet", walletState)
  },

  async refreshOwnedAssetsData(context) {
    let assets = await market.getAssetsOnTheMarket()
    context.commit("setAssets", assets)
  },

  async refreshMarketplaceData(context) {
    let assets = await market.getAssetsOnTheMarket()
    context.commit("setAssets", assets)
  },

  async swapToAsset(context, params) {
    const asset = params.asset
    const amount = params.amount

    const price = context.getters.bestAssetPrices.get(asset.id).ask
    params.$toast.info("Confirming transaction...", {
      duration: false
    });

    const status = await market.buy(asset, amount, price);
    params.$toast.clear();
    console.log(params, params?.$toast);

    if (status) {
      params.$toast.success("Transaction confirmed!");
    } else {
      params.$toast.error("Transaction failed. See details in MetaMask.");
    }
  },

  async refreshProposalsDataForAsset(context, params) {
    context.dispatch("refreshMarketplaceData")

    let assetId = params.assetId

    let assetProposals = await dao.getProposalsForAsset(assetId)

    console.log("New Proposals")
    console.log(assetProposals)

    context.commit("setProposalsForAsset", { assetId: assetId, proposals: assetProposals })
  },

  async createProposal(context, params) {
    let asset = context.getters.assetsById.get(params.assetId)
    let title = params.title
    let description = params.description

    params.$toast.show("Confirming transaction...", {
      duration: false
    });

    const status = await dao.createProposal(asset, title, description);
    params.$toast.clear();

    if (status) {
      params.$toast.success("Transaction confirmed!");
      context.dispatch("refreshProposalsDataForAsset", { assetId: params.assetId })
      router.push("/dao/" + params.assetId + "/proposals")
    } else {
      params.$toast.error("Transaction failed. See details in MetaMask.");
    }
  },

  async voteOnProposal(context, params) {
    let asset = context.getters.assetsById.get(params.assetId)
    let proposal = context.getters.proposalsById.get(params.proposalId)
    let voteType = params.voteType

    params.$toast.show("Confirming transaction...", {
      duration: false
    })

    const status = await dao.vote(asset, proposal, voteType);
    params.$toast.clear();

    if (status) {
      params.$toast.success("Transaction confirmed!");
      context.dispatch("refreshProposalsDataForAsset", { assetId: params.assetId })
    } else {
      params.$toast.error("Transaction failed. See details in MetaMask.");
    }
  },

  async fetchDexOrders(context, params) {
    const FRABRIC_ID = "0";
    let orders = await dex.getThreadOrders(FRABRIC_ID, params.assetId.toString());
    context.commit("setOrders", orders);
  },

  async createBuyOrder(context, params) {

  },

  async createSellOrder(context, params) {

  },
}

const mutations = {
  setWallet(state, wallet) {
    state.user.wallet = wallet
    if (wallet.error) {
      console.log(wallet.error);
    }
  },

  setEthBalance(state, ethBalance) {
    state.user.wallet.ethBalance = ethBalance
  },

  setAssets(state, assets) {
    state.platform.assets = assets
  },

  setOrders(state, orders) {
    state.exchange.orders = orders;
  },

  setProposalsForAsset(state, { proposals, assetId }) {
    state.platform.proposals.set(assetId, proposals)
  },

  setAlert(state, alert) {
    state.interface.alert = alert
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}