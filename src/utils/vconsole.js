// 这是移动端控制台调试工具，需要调试就打开,不用就注释
import vConsole from "vconsole";
console.log(process.env.NODE_ENV);
process.env.NODE_ENV === "development" ? new vConsole() : "";

console.log(process.env.NODE_ENV);
