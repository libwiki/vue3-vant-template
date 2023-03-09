import home_gray from "../assets/tabbar_icons/home_gray.png";
import home_light from "../assets/tabbar_icons/home_light.png";
import classify_gray from "../assets/tabbar_icons/classify_gray.png";
import classify_light from "../assets/tabbar_icons/classify_light.png";
import mine_gray from "../assets/tabbar_icons/mine-gray.png";
import mine_light from "../assets/tabbar_icons/mine_light.png";

interface ITabbarItem {
    title: string
    routeName: string
    icon: string
    iconActive: string
}

const Tabbar: { defaultIndex: number, data: ITabbarItem[] } = {
    defaultIndex: 0,
    data: [
        {
            title: "首页",
            routeName: "home",
            icon: home_gray,
            iconActive: home_light,
        },
        {
            title: "分类",
            routeName: "category",
            icon: classify_gray,
            iconActive: classify_light,
        },
        {
            title: "我的",
            icon: mine_gray,
            routeName: "mine",
            iconActive: mine_light,
        }
    ]
};

export default Tabbar;
