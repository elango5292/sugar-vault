import { walletStore } from "../store"

export default function Main() {
  const { activeWallet } = walletStore()
  return (
    <div clasName="text-lg font-semibold">
      <div className="text-3xl font-bold">{activeWallet.name}</div>
    </div>
  )
}
