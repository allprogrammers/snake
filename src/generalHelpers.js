export const width = 10;
export const height = 10;
export const delayConst = 500;

export function mod(a,b){
    return ((a%b)+b)%b;
}

export function calculateNextStep(currentPos, dir){
    return [mod(currentPos[0]+dir[0],width),mod(currentPos[1]+dir[1],height)]
}