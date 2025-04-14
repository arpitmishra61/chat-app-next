import React from 'react'
import Image from "next/image";

import { useParams } from 'next/navigation';

export default function TopBar({ setMessages }) {
    const { roomId } = useParams();
    return (
        <div className='top-bar flex'>
            <Image
                src={require(`images/avatars/share.png`)}
                alt="share"
                width={32}
                height={32}
                className="share-icon mr-4"
                onClick={async () => {
                    if (navigator.share) {
                        try {
                            await navigator.share({
                                title: "Web Share Example",
                                text: "Check out this amazing web app!",
                                url: window.location.href,
                            });
                        } catch (error) {
                            console.error('Error sharing:', error);
                        }
                    } else {
                        alert('Web Share API is not supported in this browser.');
                    }
                }}

            />
            <Image
                src={require(`images/avatars/trash-bin.png`)}
                alt="share"
                width={32}
                height={32}
                className="share-icon"
                onClick={() => {
                    localStorage.removeItem(`messages-${roomId}`)
                    setMessages([])
                }}

            />
        </div>
    )
}
