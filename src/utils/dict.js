const data = {
  // 牌局类型
  typeList: [
    { value: "1", label: "百家乐" },
    { value: "2", label: "龙虎" },
    { value: "3", label: "轮盘" },
    { value: "4", label: "骰宝" },
    { value: "5", label: "牛牛" },
    { value: "12", label: "炸金花" },
    { value: "100002", label: "二人麻将" },
    { value: "100004", label: "百人牛牛" },
    { value: "100009", label: "加倍斗地主" },
    { value: "100033", label: "经典抢庄牛牛" },
    { value: "100037", label: "卡五星麻将" },
  ],
  tableStatus: [
    { value: "normal", label: "正常" },
    { value: "settle", label: "已结算" },
    { value: "cancel", label: "已取消" },
  ],
  businessType: [
    { value: "PAYOUT", label: "正常结算" },
    { value: "DISCARD", label: "跳局结算" },
    { value: "CANCEL", label: "取消局" },
    { value: "REPAYOUT", label: "重算局" },
  ],
  fgGameType: [
    { value: "hunter", label: "捕猎" },
    { value: "chess", label: "棋牌" },
    { value: "slot", label: "老虎机" },
    { value: "arcade", label: "水果机" },
  ],
  g9GameType: [
    { value: "1", label: "街机游戏" },
    { value: "2", label: "捕鱼游戏" },
    { value: "3", label: "牌类游戏" },
    { value: "4", label: "电子游戏" },
  ],
  wmGameType: [
    { value: "101", label: "百家乐" },
    { value: "102", label: "龙虎" },
    { value: "103", label: "轮盘" },
    { value: "104", label: "骰宝" },
    { value: "105", label: "牛牛" },
    { value: "106", label: "三公" },
    { value: "107", label: "番摊" },
    { value: "108", label: "色碟" },
    { value: "111", label: "炸金花" },
    { value: "128", label: "安达巴哈" },
  ],
  dbPeopleGameType: [
    { value: "2001", label: "经典百家乐" },
    { value: "2002", label: "极速百家乐" },
    { value: "2003", label: "竞咪百家乐" },
    { value: "2004", label: "包桌百家乐" },
    { value: "2005", label: "共咪百家乐" },
    { value: "2006", label: "龙虎" },
    { value: "2007", label: "轮盘" },
    { value: "2008", label: "骰宝" },
    { value: "2009", label: "牛牛" },
    { value: "2010", label: "炸金花" },
    { value: "2011", label: "三公" },
    { value: "2012", label: "(旧)21点" },
    { value: "2013", label: "多台" },
    { value: "2014", label: "高额贵宾百家乐" },
    { value: "2015", label: "斗牛" },
    { value: "2016", label: "保险百家乐" },
    { value: "2019", label: "德州扑克" },
    { value: "2020", label: "番摊" },
    { value: "2021", label: "21点" },
    { value: "2022", label: "色碟" },
    { value: "2023", label: "温州牌九" },
    { value: "2025", label: "安达巴哈" },
    { value: "2026", label: "印度炸金花" },
    { value: "2027", label: "劲舞百家乐" },
    { value: "2028", label: "滚球" },
    { value: "2029", label: "六合彩" },
    { value: "2030", label: "主播百家乐" },
    { value: "2031", label: "3D" },
    { value: "2032", label: "5D" },
    { value: "2034", label: "闪电百家乐" },
    { value: "2036", label: "多利" },
    { value: "2038", label: "电投百家乐" },
  ],
  // 皇冠体育注单状态
  hgSportStatus: [
    { value: "Open", label: "投注已确认" },
    { value: "Settled", label: "投注已结算" },
    { value: "Canceled", label: "投注已取消" },
    { value: "Void", label: "投注作废" },
  ],
};

export const getDict = (name) => {
  return data[name] || [];
};
export const getDictLabel = (name, value) => {
  if (value == null) return "-"; // 👈 null 或 undefined 时直接返回 '-'
  const val = value + "";
  const dict = data[name];
  const obj = dict?.find((item) => item.value == val);
  return obj?.label || "-";
};
