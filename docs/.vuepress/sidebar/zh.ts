import {sidebar} from "vuepress-theme-hope";

// export const zhSidebarConfig = "structure";  // 通过文件结构自动生成
export const zhSidebarConfig = sidebar({
    "/course/": "structure",
    "/daily/": "structure",
    "/java/": "structure",
    "/llm/": "structure",
    "/mysql/": "structure",
    "/interview/": "structure",
    "/knowledge_base/": "structure",
    "/leetcode/": "structure",
    "/other/": "structure",
    "/problem/": "structure",
    "/reprint/": "structure",
    "/tip/": "structure",
    "/read-paper/": "structure",
    "/trance/": "structure",
    "/paprikayi/": "structure",
    "/paper/": "structure",

    "/book/": [
        {
            text: "《设计数据密集型应用》",
            icon: "clarity:data-cluster-solid-alerted",
            collapsible: true,
            prefix: "/book/ddia/",
            children: [
                "preface",
                "ddia_sidebar",
                {
                    text: "一览",
                    collapsible: true,
                    expanded: true,
                    icon: "ic:outline-try",
                    children: ["part-i", "part-ii", "part-iii"],
                },
                {
                    text: "卷一",
                    collapsible: true,
                    icon: "tabler:square-number-1-filled",
                    children: ["ch1", "ch2", "ch3", "ch4"],
                },
                {
                    text: "卷二",
                    collapsible: true,
                    icon: "tabler:square-number-2-filled",
                    children: ["ch5", "ch6", "ch7", "ch8", "ch9"],
                },
                {
                    text: "卷三",
                    collapsible: true,
                    icon: "tabler:square-number-3-filled",
                    children: ["ch10", "ch11", "ch12"],
                },
                "glossary",
                "colophon",
                "LICENSE",
            ], // 下拉菜单
        },
        {
            text: "《设计模式-卡码网》",
            icon: "ic:baseline-design-services",
            collapsible: true,
            prefix: "/book/kama-DesignPattern/",
            children: [
                "",
                {
                    text: "创建型模式",
                    collapsible: true,
                    expanded: true,
                    icon: "mdi:create-new-folder-outline",
                    prefix: "DesignPattern/",
                    children: ["creation-patterns-overview", "1-单例模式", "2-工厂方法模式", "3-抽象工厂模式", "4-建造者模式", "5-原型模式"]
                },
                {
                    text: "结构型模式",
                    collapsible: true,
                    icon: "hugeicons:pyramid-structure-01",
                    prefix: "DesignPattern/",
                    children: ["structure-patterns-overview", "6-适配器模式", "7-代理模式", "8-装饰模式", "9-外观模式", "10-桥接模式", "11-组合模式", "12-享元模式"]
                },
                {
                    text: "行为型模式",
                    collapsible: true,
                    icon: "jam:subtraction",
                    prefix: "DesignPattern/",
                    children: ["behavior-patterns-overview", "13-观察者模式", "14-策略模式", "15-命令模式", "16-中介者模式", "17-备忘录模式", "18-模板方法模式", "19-迭代器模式", "20-状态模式", "21-责任链模式", "22-解释器模式", "23-访问者模式"]
                },
                "DesignPattern/muti-design-pattern-combination-application"
            ],
        },
        "The_Self-Cultivation_of_an_Alibaba_Engineer",
        "test_pdf"
    ],
});
