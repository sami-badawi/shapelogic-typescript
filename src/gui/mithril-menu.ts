import * as m from 'mithril'

export function makeMenuItem(title: string, callback: () => void): m.Vnode<any, any> {
    const top = m('li', { onclick: callback }, title);
    return top
}

export function makeMenu(
    menuTitle: string,
    titles: string[],
    callbackFactory: (title: string) => () => void): m.Vnode<any, any> {
    const children = titles.map(title => makeMenuItem(title, callbackFactory(title)))
    const top = m('li', { class: "dropdown" }, [menuTitle, m('ul', { class: "drop-nav" }, children)]);
    return top
}

export function makeHeaderWithMenu(
    menuTitle: string,
    titles: string[],
    callbackFactory: (title: string) => () => void): m.Vnode<any, any> {
    const menu = makeMenu(
        menuTitle,
        titles,
        callbackFactory)
    const top = m('header', { class: "main-header" },
        m('ul', { class: "main-nav" }, [menu]));
    return top
}

function callbackFactoryAlert(title: string): () => void {
    return () => alert(title)
}

export function makeHeaderWithMenuTest(): m.Vnode<any, any> {
    console.log("makeHeaderWithMenuTest start")
    const res = makeHeaderWithMenu(
        "menuTitle",
        ["Item1", "Item2"],
        callbackFactoryAlert)
    console.log("makeHeaderWithMenuTest done")
    return res
}