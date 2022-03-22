import { ObjectType } from './obj-type';
/**
 * 1.判断对象是否为空
 * 2.判断字符串是否有值
 * @param o {Object}
 * @return 不为空返回true 为空返回false
 */
export const isNotEmpty = (o: ObjectType | string): boolean => {
  if (o === '' || o === undefined || o === null) return false;

  if (typeof o === 'string' && o.trim().length === 0) return false;

  return true;
};

// 获取元素距离顶部位置
export const pageY = (elem: ObjectType): number => {
  return elem.offsetParent ? elem.offsetTop + pageY(elem.offsetParent) : elem.offsetTop;
};

// 取数组中n个最大数
export const maxarr = (arr: any[], len: number): any[] => {
  const max = [];
  arr.sort(function (a: number, b: number) {
    return a - b;
  });
  for (let i = 0; i < len; i++) {
    max.push(arr.pop());
  }
  return max.reverse();
};
