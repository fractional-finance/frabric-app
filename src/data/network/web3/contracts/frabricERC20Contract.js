/* global BigInt */
import EthereumClient from "../ethereum/ethereumClient"
import contractAbi from "./abi/FrabricERC20";

/**
 * Frabric ERC20 contract
 * @param {EthereumClient} ethereumClient Ethereum client
 */
class FrabricERC20Contract {
  constructor(
    ethereumClient,
    contractAddress
  ) {
    this.contract = ethereumClient.getContract(contractAddress, contractAbi)
    this.mutableContract = ethereumClient.getMutableContract(this.contract)
  }
  
  // General token functions

  /**
   * Query token balance of an account
   * @param {string} account Address of account to query
   */
  async balanceOf(account) {
    try {
      return await this.contract.balanceOf(account);
    } catch(e) {
      console.log(e);
    }
  }

  // Query decimals of token
  async decimals() {
    try {
      return await this.contract.decimals(); 
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Mint new tokens, only available to owner
   * @param {string} to Address to send new tokens to
   * @param {BigInt} amount Amount of new tokens to mint
   */
  async mint(to, amount) {
    try {
      const tx = await this.mutableContract.mint(to, amount);
      return (tx.wait()).status;
    } catch(e) {
      console.log(e);
      return 0;
    }
  }

  /**
   * Burn tokens
   * @param {BigInt} amount Amount of tokens to burn
   */
  async burn(amount) {
    try {
      const tx = await this.mutableContract.burn(amount);
      return (tx.wait()).status;
    } catch(e) {
      console.log(e);
      return 0;
    }
  }

  // Whitelisting functions

  /**
   * Check if a user is whitelisted
   * @param {string} person Address of user to be queried
   */
  async whitelisted(person) {
    try {
      return await this.contract.whitelisted(person);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Check if a user has been removed
   * @param {string} person Address of user to be queried
   */
  async removed(person) {
    try {
      return await this.contract.removed(person);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Whitelist a user
   * @param {string} person Address of user to be whitelisted
   */
  async whitelist(person) {
    try {
      return await this.contract.whitelisted(person);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Set KYC status for a user, only callable by owner
   * @param {string} person Address of user to have KYC status added
   * @param {string} hash KYC hash to be stored on chain
   * @param {BigInt} nonce Number used once for each KYC, to prevent replays
   */
  async setKYC(person, hash, nonce) {
    try {
      const tx = await this.mutableContract.setKYC(
        person,
        hash,
        nonce,
      );
      return (tx.wait()).status;
    } catch(e) {
      console.log(e);
      return 0;
    }
  }

  /**
   * Remove user from the whitelist, only callable by owner
   * @param {string} person Address of user to be removed
   * @param {BigInt} fee Fee associated with removal of user `person`
   */
  async remove(person, fee) {
    try {
      const tx = await this.mutableContract.remove(
        person,
        fee,
      );
      return (tx.wait()).status;
    } catch(e) {
      console.log(e);
      return 0;
    }
  }

  /**
   * Remove user from the whitelist, only callable by owner
   * @param {string} person Address of user to have removal triggered on
   */
  async triggerRemoval(person) {
    try {
      const tx = await this.mutableContract.triggerRemoval(person);
      return (tx.wait()).status;
    } catch(e) {
      console.log(e);
      return 0;
    }
  }

  // Check if token transfers are paused
  async paused() {
    try {
      return await this.contract.paused();
    } catch(e) {
      console.log(e);
    }
  }

  // Pause token transfer, only callable by owner
  async pause() {
    try {
      const tx = await this.mutableContract.pause();
      return (tx.wait()).status;
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Convert a token quantity to atomic units
   * @param {BigInt} amount Amount of full tokens to be converted to atomic units
   */
  async atomic(amount) {
    try {
      return await this.contract.atomic(amount);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Withdraw trade tokens for user
   * @param {string} trader User to have tokens withdrawn
   */
  async withdrawTradeToken(trader) {
    try {
      const tx = await this.mutableContract.withdrawTradeToken(trader);
      return (tx.wait()).status;
    } catch(e) {
      console.log(e);
      return 0;
    }
  }

  /**
   * Execute a token purchase order
   * @param {string} trader User executing the trade
   * @param {BigInt} price Purchase price per whole token (presumably 1e18 atomic units)
   * @param {BigInt} minimumAmount Minimum amount of tokens received (in whole tokens)
   */
  async buy(trader, price, minimumAmount) {
    try {
      const tx = await this.mutableContract.buy(
        trader,
        price,
        minimumAmount,
      );
      return (tx.wait()).status;
    } catch(e) {
      console.log(e);
      return 0;
    }
  }

  /**
   * Execute a token sell order
   * @param {BigInt} price Sell price per whole token (presumably 1e18 atomic units)
   * @param {BigInt} amount Amount of tokens to be sold (in whole tokens)
   */
  async sell(price, amount) {
    try {
      const tx = await this.mutableContract.sell(
        price,
        amount,
      );
      return (tx.wait()).status;
    } catch(e) {
      console.log(e)
      return 0;
    }
  }

  /**
   * Cancel an existing order of either the caller or a removed user
   * @param {BigInt} price Price that the order to be cancelled exists at
   * @param {Number} i Index of order at given price point
   */
  async cancelOrder(price, i) {
    try {
      const tx = await this.mutableContract.cancelOrder(
        price,
        i,
      );
      return (tx.wait()).status;
    } catch(e) {
      console.log(e);
      return 0;
    }
  }

  /**
   * Get the order type at a pricepoint
   * @param {BigInt} price Price at which to retrieve order type
   */
  async pointType(price) {
    try {
      return await this.contract.pointType(price);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Get the number of orders at a pricepoint
   * @param {BigInt} price Price at which to retrieve order number at
   */
  async orderQuantity(price) {
    try {
      return await this.contract.orderQuantity(price);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Get address of trader for a given order
   * @param {BigInt} price Price that the order to be queried exists at
   * @param {Number} i Index of order at given price point
   */
  async orderTrader(price, i) {
    try {
      return await this.contract.orderTrader(
        price,
        i
      );
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Get size of a given order
   * @param {BigInt} price Price that the order to be queried exists at
   * @param {Number} i Index of order at given price point
   */
  async orderAmount(price, i) {
    try {
      return await this.contract.orderAmount(
        price,
        i,
      );
    } catch(e) {
      console.log(e);
    }
  }
}

export default FrabricERC20Contract;
