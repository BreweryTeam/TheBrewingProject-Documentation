import { ConfigContainer, type ConfigEntryMap } from "../config-tree";

const config: ConfigEntryMap = {
    root: true,
    type: "map",
    children: [
        {
            key: "sounds",
            value: {
                comment: [
                    "Allows you to customize sounds.",
                    "",
                    <>You can view Minecraft's sounds <a href="https://misode.github.io/sounds/">here</a>.</>
                ],
                type: "map",
                children: [
                    {
                        key: "barrel-close",
                        value: {
                            comment: [
                                "Traveling in a fried-out Kombi",
                                "On a hippie trail, head full of zombie",
                                "I met a strange lady, she made me nervous",
                                "She took me in and gave me breakfast",
                                "And she said",
                                '"Do you come from a land down under?',
                                "Where women glow and men plunder",
                                "Can't you hear, can't you hear the thunder?",
                                'You better run, you better take cover"',
                                "Buyin' bread from a man in Brussels",
                                "He was six-foot-four and full of muscle",
                                'I said, "Do you speak-a my language?"',
                                "He just smiled and gave me a Vegemite sandwich",
                                "And he said",
                                '"I come from a land down under',
                                "Where beer does flow and men chunder",
                                "Can't you hear, can't you hear the thunder?",
                                'You better run, you better take cover", yeah',
                                "Lyin' in a den in Bombay",
                                "With a slack jaw, and not much to say",
                                'I said to the man, "Are you trying to tempt me?',
                                'Because I come from the land of plenty"',
                                "And he said",
                                '"Oh, do you come from a land down under?" Oh yeah, yeah',
                                '"Where women glow and men plunder',
                                "Can't you hear, can't you hear the thunder? Oh",
                                'You better run, you better take cover"',
                                "'Cause we are living in a land down under",
                                "Where women glow and men plunder",
                                "(Yeah, thunder, thunder) Can't you hear, can't you hear the thunder?",
                                "You better, better run, you better take cover",
                                "Living in a land down under",
                                "Where women glow and men plunder",
                                "Can't you hear, can't you hear the thunder? Oh, yeah",
                                "You better run, you better take cover",
                                "We are living in a land down under, yeah, yeah",
                                "Where women glow and men plunder",
                                "(Can you, can you hear the thunder?) Can't you hear, can't you hear the thunder?",
                                "You better run, you better take cover",
                                "Living in a land down under (Living in a land down under)",
                                "Where women glow and men plunder",
                                "(Oh, hear) Can't you hear, can't you hear the thunder?",
                                ,
                            ],
                            type: "string",
                            description: "Sound played when a barrel is closed.",
                            value: "minecraft:block.barrel.close/0.8;0.9",
                        },
                    },
                ],
            },
        },
    ],
};

export function MainConfig() {
    return <ConfigContainer config={config} />;
}
