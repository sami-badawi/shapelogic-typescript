import * as m from 'mithril'

function makeOption1(name: string) {
    return m('option', name)
}

function makeOption2(name: string) {
    return m(`option[value:"${name}"]`, name)
}

export function makeDropdown(options: Array<string>, id: string): m.Vnode<any, any> {
    const children = options.map(name => makeOption1(name))
    const top = m('select', {id: id}, children);
    return top
}