import {
    codeBlockPlugin,
    codeMirrorPlugin,
    directivesPlugin,
    headingsPlugin,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin
} from "@mdxeditor/editor";
import {dracula} from "thememirror";
import {codeHeader} from "./codemirror/header";
import {EditorView} from "@codemirror/view";
import '@mdxeditor/editor/style.css';

const MDXViewer = ({value}) => {
    return (
        <MDXEditor
            className="mdx mdx-viewer"
            plugins={[
                directivesPlugin(),
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                codeBlockPlugin({
                    codeBlockEditorDescriptors: [],
                    defaultCodeBlockLanguage: 'js'
                }),
                codeMirrorPlugin({
                    codeBlockLanguages: {
                        js: 'JavaScript',
                        css: 'CSS',
                        swift: 'Swift',
                        java: 'Java',
                        python: 'Python',
                        kotlin: 'Kotlin',
                        ruby: 'Ruby',
                        go: 'Go',
                        c: 'C',
                        cpp: 'C++',
                        php: 'PHP',
                        sql: 'SQL',
                        shell: 'Shell',
                        typescript: 'TypeScript',
                        json: 'JSON',
                        markdown: 'Markdown',
                        html: 'HTML',
                        xml: 'XML',
                        yaml: 'YAML',
                        diff: 'Diff',
                    },
                    codeMirrorExtensions: [
                        dracula,
                        codeHeader(),
                        EditorView.editable.of(false),
                    ],
                    autoLoadLanguageSupport: true,
                }),
                imagePlugin({
                    imageUploadHandler: () => {
                        return Promise.resolve('https://picsum.photos/200/300')
                    },
                }),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                tablePlugin(),
                linkPlugin(),
                linkDialogPlugin({}),
            ]}
            markdown={value || ""}
            readOnly
        />
    )
}

export default MDXViewer