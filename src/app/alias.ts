// import { _INFO } from './chalkTip.js';

const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAlias('@', path.join(process.cwd(), '/src'));

const aliasOk = () => {
  console.log('添加路径别名成功!');
};
export default aliasOk;
