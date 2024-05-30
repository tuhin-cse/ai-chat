import {EditorView, Panel, showPanel} from "@codemirror/view"

export function codeHeader() {
    return showPanel.of(codeHeaderPanel)
}


const getHeader = (view) => {
    let language = view.state.facet(EditorView.contentAttributes)?.find((attr) => !!attr['data-language'])?.['data-language'];

    let code = encodeURIComponent(view.state.doc.toString().trim());

    return `<div class="flex justify-between items-center">
    <div class="capitalize">${language}</div>
    <a role="button" onclick="navigator.clipboard.writeText(decodeURIComponent('${code}'))" class="flex gap-1">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.0375 8.22H6.6975C6.38684 8.22 6.135 7.96816 6.135 7.6575C6.135 7.34684 6.38684 7.095 6.6975 7.095H9.0375C9.34816 7.095 9.6 7.34684 9.6 7.6575C9.6 7.96816 9.34816 8.22 9.0375 8.22Z" fill="#9BA1A5"/>
<path d="M6.6975 9.4275H11.3025C11.6132 9.4275 11.865 9.67934 11.865 9.99C11.865 10.3007 11.6132 10.5525 11.3025 10.5525H6.6975C6.38684 10.5525 6.135 10.3007 6.135 9.99C6.135 9.67934 6.38684 9.4275 6.6975 9.4275Z" fill="#9BA1A5"/>
<path d="M10.6725 11.625H6.6975C6.38684 11.625 6.135 11.8768 6.135 12.1875C6.135 12.4982 6.38684 12.75 6.6975 12.75H10.6725C10.9832 12.75 11.235 12.4982 11.235 12.1875C11.235 11.8768 10.9832 11.625 10.6725 11.625Z" fill="#9BA1A5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.7025 1.5C11.3094 1.49916 11.8106 1.97395 11.8425 2.58C13.6237 2.78028 14.9772 4.27524 15 6.0675V13.635C14.9959 15.6008 13.4033 17.1934 11.4375 17.1975H6.5625C4.5967 17.1934 3.00413 15.6008 3 13.635V6.0675C3.02281 4.27524 4.37631 2.78028 6.1575 2.58C6.19311 1.97564 6.6921 1.50291 7.2975 1.5H10.7025ZM10.7175 2.58H7.2975V3.4725H10.7175V2.58ZM13.875 13.635C13.875 14.9824 12.7849 16.0759 11.4375 16.08H6.5625C5.21509 16.0759 4.12499 14.9824 4.125 13.635V6.0675C4.12798 4.87416 4.99452 3.85844 6.1725 3.6675C6.26457 4.21602 6.74132 4.61649 7.2975 4.6125H10.7025C11.2587 4.61649 11.7354 4.21602 11.8275 3.6675C13.0055 3.85844 13.872 4.87416 13.875 6.0675V13.635Z" fill="#9BA1A5"/>
</svg>
<span>Copy</span> 
</a>
</div>`

}


function codeHeaderPanel(view) {
    let dom = document.createElement("div")
    dom.style.backgroundColor = '#202425'
    dom.style.padding = '8px 24px'
    dom.style.color = '#9BA1A5'
    dom.innerHTML = getHeader(view)


    return {
        top: true,
        dom,
        update(update) {
            if (update.docChanged) {
                dom.innerHTML = getHeader(view)
            }
        }
    }
}
