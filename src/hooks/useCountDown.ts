import {reactive} from "vue";

const _countDownDataKey = "ms_pc_count_down_data_key"

/**
 * 倒计时处理钩子 数据存贮在localStorage中
 * @param countDownDataKey string key是唯一的，同一个key能取到唯一的一个倒计时定时器
 */
export function useCountDown(countDownDataKey = _countDownDataKey) {
    const data = reactive({
        value: 0,
        endTime: 0, // 计时器结束时间戳
    });
    return {
        data,
        /**
         * 用户刷新页面时需要调用(回复倒计时计时器)
         * 保证用户刷新页面时恢复倒计时
         * @return string|undefined 通常返回一个一个提示语则表示当前全局的倒计时定时器已经到期了
         */
        recover(): string | undefined {
            try {
                const d = JSON.parse(localStorage.getItem(countDownDataKey) || "") || {};
                if (!d.value || !d.endTime || d.endTime <= Date.now()) {
                    this.clear()
                    return '计时器已经到期了';
                }
                const value = Math.floor((d.endTime - Date.now()) / 1000);
                if (value <= 0) {
                    return '计时器不足1s了';
                }
                data.endTime = d.endTime;
                this.start(value, false);
            } catch (e) {

            }
        },
        /**
         * 启动一个倒计时计时器
         * @param count
         * @param isNewTimer
         */
        start(count?: number, isNewTimer = true) {
            if (count) {
                data.value = count;
                if (isNewTimer) {
                    data.endTime = (count * 1000) + Date.now();
                }
            }
            if (data.value <= 0) {
                localStorage.removeItem(countDownDataKey)
                return;
            }
            localStorage.setItem(countDownDataKey, JSON.stringify(data));
            setTimeout(() => {
                data.value--;
                this.start();
            }, 1000);
        },
        // 清除倒计时
        clear() {
            this.start(0, false)
        }
    }
}
