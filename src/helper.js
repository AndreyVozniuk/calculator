export function negativeNumber(num){
  return num.includes('-') ? num.replace('-', '') : `-${num}`
}