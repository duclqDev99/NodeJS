const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['vi', 'en'],
  directory: path.join(__dirname, '../locales'), 
  defaultLocale: 'vi',
  objectNotation: true,
  register: global, 
  autoReload: true,
  updateFiles: false,
  syncFiles: true,
});

module.exports = i18n;
