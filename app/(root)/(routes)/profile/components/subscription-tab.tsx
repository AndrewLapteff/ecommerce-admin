const SubscriptionTab = ({ plan }: { plan: string }) => {
  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Plan</h3>
      <span className="text-black">STATUS: </span>
      <span className="font-bold">{plan}</span>
    </>
  )
}

export default SubscriptionTab
