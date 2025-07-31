export function localSet(key, info) {
  const type = typeof info;
  if (info === null || info === undefined) {
    return localStorage.setItem(key, "null");
  }
  if (type === "string" || type === "number" || type === "boolean") {
    // 基本类型直接存储，无需额外处理
    return localStorage.setItem(key, info);
  }
  // 其他情况（对象、数组等）转为 JSON 字符串
  return localStorage.setItem(key, JSON.stringify(info));
}

export function localGet(key) {
  const value = localStorage.getItem(key);
  if (value === null) return null; // key 不存在

  // 尝试直接解析 JSON（可能是对象或数组）
  try {
    return JSON.parse(value);
  } catch {
    // 解析失败，说明是基本类型
    if (value === "true") return true;
    if (value === "false") return false;
    if (!isNaN(value)) return parseFloat(value); // 数字
    return value; // 字符串
  }
}

export function localRemove(key) {
  return localStorage.removeItem(key);
}

// sessionStorage 版本（逻辑相同）
export function sessSet(key, info) {
  const type = typeof info;
  if (info === null || info === undefined) {
    return sessionStorage.setItem(key, "null");
  }
  if (type === "string" || type === "number" || type === "boolean") {
    return sessionStorage.setItem(key, info);
  }
  return sessionStorage.setItem(key, JSON.stringify(info));
}

export function sessGet(key) {
  const value = sessionStorage.getItem(key);
  if (value === null) return null;

  try {
    return JSON.parse(value);
  } catch {
    if (value === "true") return true;
    if (value === "false") return false;
    if (!isNaN(value)) return parseFloat(value);
    return value;
  }
}

export function sessRemove(key) {
  return sessionStorage.removeItem(key);
}
