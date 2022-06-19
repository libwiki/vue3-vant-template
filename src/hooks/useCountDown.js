import {reactive} from "vue";

const _countDownDataKey = "ms_count_down_data_key"

export function useCountDown(countDownDataKey = _countDownDataKey) {
    const data = reactive({
        value: 0,
        endTime: 0, // 计时器结束时间戳
    });

    function recover() {
        try {
            const d = JSON.parse(localStorage.getItem(countDownDataKey)) || {};
            if (!d.value || !d.endTime || d.endTime <= Date.now()) {
                clear()
                return '计时器已经到期了';
            }
            const value = Math.floor((d.endTime - Date.now()) / 1000);
            if (value <= 0) {
                return '计时器不足1s了';
            }
            data.endTime = d.endTime;
            start(value, false);
        } catch (e) {

        }
    }

    function clear() {
        start(0, false)
    }

    function start(count, isNewTimer = true) {
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
            start();
        }, 1000);
    }

    return {
        start,
        clear,
        recover,
        data,
    }
}
