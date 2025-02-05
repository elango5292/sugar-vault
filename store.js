import { address } from "bitcoinjs-lib"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import * as helpers from "./helpers"

const chromeLocalStorage = {
  getItem: async (name) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(name, (result) => {
        resolve(result[name] || null)
      })
    })
  },
  setItem: async (name, value) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [name]: value }, () => {
        resolve(value)
      })
    })
  },
  removeItem: async (name) => {
    return new Promise((resolve) => {
      chrome.storage.local.remove(name, () => {
        resolve()
      })
    })
  }
}

export const walletStore = create(
  persist(
    (set) => ({
      wallets: {},
      activeWallet: {
        name: "",
        address: "",
        key: ""
      },
      balance: 0,
      isConnected: false,

      addWallet: (wallet) => {
        set((state) => ({
          ...state,
          wallets: {
            ...state.wallets,
            [wallet.address]: wallet
          }
        }))
      },

      removeWallet: (address) => {
        set((state) => {
          const { [address]: _, ...newWallets } = state.wallets
          return {
            ...state,
            wallets: newWallets
          }
        })
      },
      setActiveWallet: (address) => {
        set((state) => {
          // Ensure the wallet exists before setting it as active
          if (state.wallets[address]) {
            return {
              activeWallet: state.wallets[address],
              isConnected: true
            }
          }
          return state
        })
      }
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => chromeLocalStorage)
    }
  )
)
