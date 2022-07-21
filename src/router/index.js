import { createRouter, createWebHashHistory } from "vue-router"
import MyAssets from "@/components/sections/MyAssets.vue"
import Marketplace from "@/components/sections/Marketplace.vue"
import Swap from "@/components/sections/Swap.vue"
import Voting from "@/components/sections/Voting.vue"
import Proposal from "@/components/sections/Proposal.vue"
import NewProposal from "@/components/sections/NewProposal.vue"
import MarketListDetailVue from "../components/views/market/MarketListDetail.vue"
import DEX from "../components/sections/DEX.vue";

export default new createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/assets"
    },
    {
      path: "/assets",
      alias: "/",
      name: "myAssets",
      component: MyAssets
    },
    {
      path: "/market",
      name: "market",
      component: Marketplace
    },
    /* {
          path: "/swap",
          name: "swap",
          component: Swap
    }, */
    {
      path: "/dao/:assetId/proposals",
      name: "dao",
      props: true,
      component: Voting
    },
    {
      path: "/dao/:assetId/proposals/:proposalId",
      name: "proposal",
      props: true,
      component: Proposal
    },
    {
      path: "/dao/:assetId/proposals/create",
      name: "newProposal",
      props: true,
      component: NewProposal
    },
    {
      path: "/dao//details",
      name: "assetDetails",
      props: true,
      component: MarketListDetailVue
    },
    {
      path: "/exchange",
      name: "exchange",
      component: DEX,
    }
  ]
})