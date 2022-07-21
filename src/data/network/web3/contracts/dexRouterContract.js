/* global BigInt */
import EthereumClient from "../ethereum/ethereumClient"

const contractAbi = [
  // Make a buy order
  "function buy(address token, address tradeToken, uint256 payment, uint256 price, uint256 minimumAmount)", 
]

/**
 * Dexrouter contract
 * @param {EthereumClient} ethereumClient Ethereum client
 */
class DexRouterContract {
  constructor(
    ethereumClient,
    contractAddress
  ) {
    this.contract = ethereumClient.getContract(contractAddress, contractAbi)
    this.mutableContract = ethereumClient.getMutableContract(this.contract)
  }

  /**
   * @ Execute a token swap
   * @param {string} token Token address to be purchased
   * @param {string} tradeToken Token address to be sold
   * @param {BigInt} payment Amount of tradeToken (`tradeToken`) to be sold
   * @param {BigInt} price Purchase price in whole tokens
   * @param {BigInt} minimumAmount Minimum amount of tokens (`token`) received (in whole tokens)
   * @return {BigInt} filled uint256 quantity of succesfully purchased tokens (`token`) 
   */
  async buy(
    token,
    tradeToken,
    payment,
    price,
    minimumAmount,
  ) {
    let tx = await this.mutableContract
      .buy(
        token,
        tradeToken,
        payment,
        price,
        minimumAmount,
      );

    return (await tx.wait()).status;
  }

}

export default DexRouterContract;
