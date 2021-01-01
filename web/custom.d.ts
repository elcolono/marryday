
// svg files are not javascript and can't be used as javascript module .. so declare a module an import it in tsoncig.json 
declare module "*.svg" {
    const content: any;
    export default content;
}