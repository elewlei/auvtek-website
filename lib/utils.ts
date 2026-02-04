// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并Tailwind CSS类名的实用函数。
 * 使用 clsx 来处理条件类名，使用 tailwind-merge 来合并和解决冲突的类名。
 * 
 * @param inputs - 要合并的类名（字符串、对象、数组等）
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}