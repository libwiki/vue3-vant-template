interface ISysSetting {
    /**
     * 是否锁定body的滚动效果(锁定body后再ios浏览器中的预览效果会更好，未锁定的页面是可以进行整体的"上下拉动"的)
     * 为了保证开发的便捷，默认为：true, 锁定
     */
    lockBodyScroll: boolean,
}

const SysSetting: ISysSetting = {
    lockBodyScroll: true
}

export default SysSetting;