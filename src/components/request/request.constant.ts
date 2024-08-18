export const getBadgeColor = (action_code: string) => {
  switch (action_code) {
    case 'UPDATE':
      return '#d2f4fd';
    case 'DELETE':
      return '#ffe5e5';
    case 'CREATE':
      return '#DDF3E4';
    default:
      return '#C2E6FF';
  }
};
