"use client"


import dynamic from "next/dynamic";

// @ts-ignore
const MDXViewer = dynamic(() => import('./mdxview'), {
    ssr: false
})


const Markdown = ({ value }) => {


    return (
        <div className="mdxview">
            <MDXViewer value={value} />
        </div>
    )
}

export default Markdown