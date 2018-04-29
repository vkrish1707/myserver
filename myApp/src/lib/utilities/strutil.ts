export function elipsis(str: string, limit: number = 60): string {
    let newstr: string = str;
    if (newstr.length > limit) {
        newstr = str.slice(0, limit-3) + "...";
    }
    
    return newstr;
}