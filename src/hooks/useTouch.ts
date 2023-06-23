/**
 * 按下点和抬起点距离超过maxDistance单位时，抬起事件将不会触发
 * 例：比如div模拟按钮时，监听该div的光标抬起按钮时。如果抬起的位置不在div内事件依然是触发的。
 * 需要解决该问题提可用该助手函数
 * @param func
 * @param maxDistance
 */
export function useTouch(func: (...args: any) => void, maxDistance = 20) {

    let startDistanceX = -1 // 触摸开始X轴位置
    let startDistanceY = -1 // 触摸开始Y轴位置
    return {
        onDown(e: TouchEvent) {
            startDistanceX = e.touches[0].screenX
            startDistanceY = e.touches[0].screenY
        },
        onUp(e: TouchEvent, ...args: any) {
            let moveDirection = EMoveDirection.no;
            if (startDistanceX > -1 && startDistanceY > -1) {
                let endDistanceX = e.changedTouches[0].screenX
                let endDistanceY = e.changedTouches[0].screenY
                let moveDistanceX = startDistanceX - endDistanceX
                let moveDistanceY = startDistanceY - endDistanceY

                // 判断滑动距离超过40 且 时间小于500毫秒

                if ((Math.abs(moveDistanceX) > maxDistance || Math.abs(moveDistanceY) > maxDistance)) {
                    // 判断X轴移动的距离是否大于Y轴移动的距离
                    if (Math.abs(moveDistanceX) > Math.abs(moveDistanceY)) {
                        // 左右
                        moveDirection = moveDistanceX > 0 ? EMoveDirection.left : EMoveDirection.right
                        // console.log(moveDistanceX > 0 ? '左' : '右')
                    } else {
                        // 上下
                        // console.log(moveDistanceY > 0 ? '上' : '下')
                        moveDirection = moveDistanceX > 0 ? EMoveDirection.up : EMoveDirection.down
                    }
                }
            }
            if (moveDirection === EMoveDirection.no) { // 未触发滑动
                func(...args);
            }
            startDistanceX = -1;
            startDistanceY = -1;

        },
    }
}

export enum EMoveDirection {
    no, // 未滑动
    up,
    right,
    down,
    left,
}