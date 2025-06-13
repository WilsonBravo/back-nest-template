const path = require('path');
const formatCommand = 'prettier --check';

module.exports = {
  '**/*.{js,jsx,ts,tsx,json}': () => formatCommand,
};
