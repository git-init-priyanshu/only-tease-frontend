export const getTokenId = ({
  subscriptionId,
  modelId,
}: {
  modelId: string;
  subscriptionId: number;
}) => {
  return BigInt(1e18) * BigInt(modelId) + BigInt(subscriptionId).toString();
};
