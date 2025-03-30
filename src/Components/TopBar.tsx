import React from 'react'
import ShareButton from "../images/avatars/share.png"
import Image from "next/image";

export default function TopBar() {
    return (
        <div className='top-bar'>
            <Image
                src={require(`images/avatars/share.png`)}
                alt="share"
                width={32}
                height={32}
                className="share-icon"
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
        </div>
    )
}
