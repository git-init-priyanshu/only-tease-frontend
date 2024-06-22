export const getSubscriptionId = () => {
  const subscriptionId = Math.floor(Math.random() * (1e12 - 1 + 1)) + 1;
  return subscriptionId;
};
