"use client";

import Chat from "../components/chat";
import {useEffect, useState} from "react";
import axios from "axios";
import {FiTrash} from "react-icons/fi";
import {Select} from "antd";

const ollama_url = process.env.ollama_url;

const Home = () => {

    const [models, setModels] = useState([]);
    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState(undefined);


    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let chatStorage = localStorage.getItem("chats");
        if (!!chatStorage) {
            setChats(JSON.parse(chatStorage));
        }

        axios.get(`${ollama_url}/api/tags`)
            .then(res => {
                setModels(res.data?.models || [])
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    const [selectedModel, setSelectedModel] = useState(null);


    const updateChat = chat => {
        let found = chats.find(c => c.uid === chat.uid);
        if (found) {
            chats[chats.indexOf(found)] = chat;
        } else {
            chats.unshift(chat);
        }
        setChats([...chats]);
        localStorage.setItem("chats", JSON.stringify(chats.slice(0, 20)));
    }


    const onSendMessage = (message) => {
        setLoading(true)
        if (!selectedModel) {
            setSelectedModel(models[0]?.name)
        }
        let currentChat = chat || {
            uid: new Date().getTime(),
            model: selectedModel || models[0]?.name,
            title: message,
            messages: []
        };
        currentChat.messages.push({
            role: "user",
            content: message
        });
        setChat(currentChat);
        updateChat(currentChat);
        axios.post(`${ollama_url}/api/chat`, {
            model: currentChat.model,
            messages: currentChat.messages,
            stream: false
        })
            .then(res => {
                currentChat.messages.push(res.data.message);
                setChat(currentChat);
                updateChat(currentChat);
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <div className="flex">
            <div className="w-[300px] bg-gray-100">
                <div className="p-4">
                    <div
                        role={"button"}
                        onClick={() => {
                            setChat(undefined)
                        }}
                        className="bg-gray-200 px-3 py-2 rounded text-center">
                        + New Chat
                    </div>
                </div>
                {chats?.map((c, i) => (
                    <div key={i} onClick={() => {
                        setChat(c)
                        setSelectedModel(c.model)
                    }}
                         className={`group relative p-4 cursor-pointer ${chat?.uid === c.uid ? "bg-gray-200" : ""}`}>
                        <div className="truncate max-w-52">{c.title}</div>
                        <div className="text-xs">{c.model}</div>
                        <div
                            role={"button"}
                            onClick={(e) => {
                                e.stopPropagation();
                                let newChats = chats.filter(chat => chat.uid !== c.uid);
                                setChats(newChats);
                                localStorage.setItem("chats", JSON.stringify(newChats));
                            }}
                            className="absolute hidden group-hover:block right-4 top-4">
                            <FiTrash className="text-red-500"/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-4">
                    <Select
                        size={"large"}
                        value={selectedModel}
                        placeholder={"Select Model"}
                        onChange={(value) => setSelectedModel(value)}
                        className="">
                        {models.map((m, i) => (
                            <Select.Option key={i} value={m.name}>{m.name}</Select.Option>
                        ))}
                    </Select>

                </div>
                <Chat messages={chat?.messages || []} onSend={onSendMessage}/>
            </div>
        </div>
    )
}

export default Home;