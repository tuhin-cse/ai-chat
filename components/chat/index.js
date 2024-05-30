import {FiArrowRight, FiSend} from "react-icons/fi";
import {useState} from "react";
import Markdown from "./markdown";

const Chat = ({messages, onSend}) => {

    const [message, setMessage] = useState("");


    return (
        <>
            <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
                <div id="messages"
                     className="flex-grow space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    <div className="flex flex-col justify-end min-h-full">
                        {messages.map((m, i) => (
                            <div key={i} className={`chat-message flex ${m.role === "user" ? "justify-end" : ""}`}>
                                <div
                                    className={`px-4 py-2 max-w-2xl rounded-lg inline-block bg-gray-100 text-gray-900 ${m.role === "user" ? "rounded-br-none" : "rounded-bl-none"}`}>
                                    <Markdown value={m.content}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="mb-3 bg-gray-100 rounded-md">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    onSend(message);
                                    setMessage("");
                                }
                            }}
                            placeholder="Write your message!"
                            rows={2}
                            className="w-full focus:outline-none scrollbar-w-2 focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 p-4 bg-transparent"/>
                        <div className="flex justify-end items-end px-4 pb-4">

                            <FiArrowRight
                                role={"button"}
                                onClick={() => {
                                    onSend(message);
                                    setMessage("");
                                }}
                                className="text-xl text-gray-600 cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default Chat;