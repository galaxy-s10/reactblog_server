import { _ERROR, _SUCCESS, _INFO } from '@/app/chalkTip';
import sequelize from '@/config/db';

/**
 * 转换时间格式
 */
export const formateDate = (datetime) => {
  function addDateZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  const d = new Date(datetime);
  const formatdatetime = `${d.getFullYear()}-${addDateZero(
    d.getMonth() + 1
  )}-${addDateZero(d.getDate())} ${addDateZero(d.getHours())}:${addDateZero(
    d.getMinutes()
  )}:${addDateZero(d.getSeconds())}`;
  return formatdatetime;
};

/**
 * 处理返回的分页数据
 */
export const handlePaging = (nowPage, pageSize, result) => {
  const { count } = result;
  const obj: any = {};
  obj.nowPage = +nowPage;
  obj.pageSize = +pageSize;
  obj.hasMore = obj.nowPage * obj.pageSize - count < 0;
  return { ...obj, ...result };
};

/**
 * 删除所有外键
 */
export const deleteAllForeignKeys = async () => {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const allTables = await queryInterface.showAllTables();
    console.log(_INFO(`所有表:${allTables}`));
    const allConstraint = [];
    allTables.forEach((v) => {
      allConstraint.push(queryInterface.getForeignKeysForTables([v]));
    });
    const res1 = await Promise.all(allConstraint);
    const allConstraint1 = [];
    res1.forEach((v) => {
      const tabName = Object.keys(v)[0];
      const constraint = v[tabName];
      constraint.forEach((item) => {
        allConstraint1.push(queryInterface.removeConstraint(tabName, item));
      });
      console.log(_INFO(`当前${tabName}表的外键: ${constraint}`));
    });
    await Promise.all(allConstraint1);
    console.log(_SUCCESS('删除所有外键成功！'));
  } catch (err) {
    console.log(_ERROR('删除所有外键失败！'), err);
  }
};

/**
 * 初始化表
 * @param model
 * @param method
 */
export const initTable = async (model: any, method?: 'force' | 'alter') => {
  try {
    if (method === 'force') {
      await deleteAllForeignKeys();
      await model.sync({ force: true });
      console.log(_SUCCESS(`${model.tableName}表刚刚(重新)创建！`));
    } else if (method === 'alter') {
      await deleteAllForeignKeys();
      await model.sync({ alter: true });
      console.log(_SUCCESS(`${model.tableName}表刚刚同步成功！`));
    } else {
      console.log(_INFO(`加载了${model.tableName}表`));
    }
  } catch (err) {
    console.log(_ERROR(`initTable失败`), err);
  }
};

/**
 * 去除url上的参数，获取url
 * @param url string
 * @returns string
 */
export const getUrl = (url: string) => {
  return url.replace(/\?.+/, '');
};
