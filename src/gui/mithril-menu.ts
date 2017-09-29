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
    const dropdownItems = m('ul', { class: "drop-nav" }, children)
    const top = m('li', { class: "dropdown" }, [menuTitle, dropdownItems,]);
    return top
}

function makeLi(title: string, message?: string): m.Vnode<any, any> {
    const res = m('li', { onclick: () => alert(message ? message : title) }, title)
    return res
}

//<span class="logo" href="#"></span>
function makeLogo(): m.Vnode<any, any> {
    const res = m('span', { class: "logo", href: "#" })
    return res
}

type TitleCallbackFunction = (string) => () => void

export function makeHeaderWithMenu(
    menuTitle: string,
    titles: string[],
    callbackFactory: TitleCallbackFunction): m.Vnode<any, any> {
    const menu = makeMenu(
        menuTitle,
        titles,
        callbackFactory)
    return menu
}

function makeMenuBar(menus: m.Vnode<any, any>[]) {
    const home = makeLi("Home")
    const about = makeLi("About", "ShapeLogic TypeScript\nTesting menu system")
    const logo = makeLogo()
    const all = menus.concat([about])
    const fullMenu = m('ul', { class: "main-nav" }, all)
    const topWithMenu = m('header', { class: "main-header" },
        [logo, fullMenu]);
    const top = m('div',
        [fullMenu]);
    return top

}

function callbackFactoryAlert(title: string): () => void {
    return () => alert(title)
}

export function makeHeaderWithMenuTest(callbackFactory: TitleCallbackFunction = callbackFactoryAlert): m.Vnode<any, any> {
    const colorSwap = [
        'rgba',
        'rbga',
        'gbra',
        'bgra',
        'rrra',
        'ggga',
        'bbba']

    const imageOperations = [
        'inverse',
        'edge',
        'threshold']

    const swap = makeHeaderWithMenu(
        "Swap",
        colorSwap,
        callbackFactory)
    const other = makeHeaderWithMenu(
        "Operations",
        imageOperations,
        callbackFactory)
    const res = makeMenuBar([swap, other])
    // console.log(JSON.stringify(res))
    return res
}