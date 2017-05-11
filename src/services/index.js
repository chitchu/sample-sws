import axios from 'axios';

const serviceUrl = 'https://simplywall.st/api/grid/filter?include=info,score';
const requestPayload = {
  rules: [
    ['is_fund', '=', false],
    ['primary_flag', '=', true],
    ['analyst_count', '>', 0],
    ['country_name', '=', 'AU'],
    ['value_score', '>', 1],
    ['order_by', 'market_cap', 'desc']
  ]
};
const getGrid = (offset, size) => {
  return axios.post(
    serviceUrl,
    JSON.stringify({
      ...requestPayload,
      offset,
      size
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.simplywallst.v2'
      }
    }
  );
};

export { getGrid };
