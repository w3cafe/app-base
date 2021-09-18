

if (!global._moduleList) global._moduleList = new Set();


export function registerModule(moduleClass) {
    global._moduleList.add(moduleClass);
}