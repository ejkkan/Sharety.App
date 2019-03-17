export const formatSubscribingCharities = (charities, subscriptionItems) =>
  charities.map(charity => {
    return {
      ...charity,
      subscribing: !!subscriptionItems.find(
        item => item.charity.id === charity.id
      )
    };
  });
