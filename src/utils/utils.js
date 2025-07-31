// 数字处理
export const toDecimal = (value) => {
  // 先将数字转换为整数运算
  const intValue = Math.round(value * 1000); // 保留3位小数精度
  return intValue / 100000; // 除以100000得到最终结果
};
