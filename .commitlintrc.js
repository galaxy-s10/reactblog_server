const { _INFO, emoji } = require('./src/app/chalkTip');

console.log(
  _INFO(`读取：${__filename.slice(__dirname.length + 1)}`),
  emoji.get('white_check_mark')
);

module.exports = {
  extends: ['@commitlint/config-conventional'],
};
