import { type PropsWithChildren, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Info } from "lucide-react";
import * as Ariakit from "@ariakit/react";

import "./config.css";

type PrimitiveType = "string" | "boolean" | "integer" | "float";
type CompositeType = "array" | "map";
type Type = PrimitiveType | CompositeType;

type ConfigEntryBase<T extends Type> = {
    root?: boolean;
    type: T;
    description?: ReactNode;
    comment?: ReactNode[];
};

export type ConfigEntryValue = ConfigEntryBase<PrimitiveType> & {
    /**
     * Value of the entry
     *
     * Also serves as the default value
     */
    value?: any;
};

export type ConfigEntryMap = ConfigEntryBase<"map"> & {
    children: { key: string; value: ConfigEntry }[];
};

export type ConfigEntryArray = ConfigEntryBase<"array"> & {
    children: ConfigEntry[];
};

export type ConfigEntry = ConfigEntryValue | ConfigEntryMap | ConfigEntryArray;

const PRIMITIVE_TYPES = ["string", "boolean", "integer", "float"];

function KeyDisplay({ value }: { value: string }) {
    return (
        <>
            <span className="text-blue-500">{value}</span>:
        </>
    );
}

function ValueDisplay({ value, type }: { value: any; type: PrimitiveType }) {
    /**
     * regex for checking is a string needs to be escaped and surrounded with quotes
     *
     * not based on the spec, just a basic regex implementing this: https://stackoverflow.com/a/22235064
     */
    const INVALID_PLAIN_STRING_REGEX = /^(\d*\.?\d)|(.*[:{}\[\],&*#?|\-<>=!%@\\].*)$/;

    const TYPE_COLORS: { [key: string]: string } = {
        integer: "text-green-500",
        float: "text-green-500",
        string: "text-[#eea158]",
        boolean: "text-purple-400",
    };

    if (type === "string" && INVALID_PLAIN_STRING_REGEX.test(value))
        value = `"${(value as string).replace(/\\/g, "\\\\")}"`;

    return <span className={TYPE_COLORS[type]}> {value.toString()}</span>;
}

function Description({ entry, entryKey }: { entry: ConfigEntry; entryKey: string }) {
    return (
        <div className="mx-2 my-1 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 text-sm text-zinc-100 shadow">
            <div className="p-3 font-[monospace] text-zinc-400">
                <div className="flex flex-col gap-0">
                    <div className="flex gap-2">
                        <span>Key:</span>
                        <span className="text-zinc-200">{entryKey}</span>
                    </div>

                    <div className="flex gap-2">
                        <span>Type:</span>
                        <span className="text-cyan-400">{entry.type}</span>
                    </div>
                </div>
            </div>

            {entry.description && (
                <div className="border-t border-zinc-700 bg-zinc-900/40 p-3">
                    <p className="config-description-container font-sans text-xs text-zinc-300">{entry.description}</p>
                </div>
            )}
        </div>
    );
}

function DescriptionWrapper({
    entry,
    entryKey,
    children,
}: { entry: ConfigEntry; entryKey: string } & PropsWithChildren) {
    return (
        <Ariakit.DisclosureProvider>
            <Ariakit.Disclosure className="bg-transparent p-0">
                <div className="flex cursor-pointer items-center gap-2 rounded transition-colors duration-100 hover:bg-zinc-700/30">
                    <div>{children}</div>{" "}
                    {entry.description && <Info className="text-zinc-500" size="1rem" strokeWidth={2.5} />}
                </div>
            </Ariakit.Disclosure>
            <Ariakit.DisclosureContent>
                <Description entry={entry} entryKey={entryKey} />
            </Ariakit.DisclosureContent>
        </Ariakit.DisclosureProvider>
    );
}

function CommentDisplay({ comment }: { comment: ReactNode[] }) {
    return (
        <div>
            {comment.map((line, index) => (
                <div className="config-comment" key={index}># {line}</div>
            ))}
        </div>
    );
}

export function ConfigTree({ entry, inArray }: { entry: ConfigEntry; inArray?: boolean }) {
    switch (entry.type) {
        case "map":
            return (
                <div className={twMerge("flex flex-col", !entry.root && !inArray ? "!ml-4" : "")}>
                    {entry.children.map((childEntry) => (
                        <div key={childEntry.key}>
                            {PRIMITIVE_TYPES.includes(childEntry.value.type) ? ( // we can wrap the whole primitive types in a collapsible trigger
                                <>
                                    <CommentDisplay comment={childEntry.value.comment || []} />
                                    <DescriptionWrapper entry={childEntry.value} entryKey={childEntry.key}>
                                        <KeyDisplay value={childEntry.key} />
                                        <ConfigTree entry={childEntry.value} />
                                    </DescriptionWrapper>
                                </>
                            ) : (
                                // but we wrap only the key on composite types, so children don't trigger the collapsible
                                <>
                                    <CommentDisplay comment={childEntry.value.comment || []} />
                                    <DescriptionWrapper entry={childEntry.value} entryKey={childEntry.key}>
                                        <KeyDisplay value={childEntry.key} />
                                        <span className="ml-1 text-zinc-500 italic select-none">
                                            {" "}
                                            {`{${childEntry.value.type}}`}
                                        </span>
                                    </DescriptionWrapper>
                                    <ConfigTree entry={childEntry.value} />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            );
        case "array":
            return (
                <div className="flex flex-col">
                    <div className={twMerge("flex flex-col", !entry.root && "!ml-4")}>
                        {entry.children.map((childEntry, index) => (
                            <div
                                key={index}
                                className="flex gap-1 rounded px-1 transition-colors duration-100 hover:bg-zinc-700/30"
                            >
                                <span>-</span>
                                <ConfigTree inArray entry={childEntry} />
                            </div>
                        ))}
                    </div>
                </div>
            );
        case "boolean":
        case "float":
        case "integer":
        case "string":
            return <ValueDisplay type={entry.type} value={entry.value} />;
    }
}

export function ConfigContainer({ config }: { config: ConfigEntry }) {
    return (
        <div className="not-content !my-2 overflow-x-scroll rounded-lg border border-zinc-800 bg-[var(--code-background)] px-3 py-2 font-[monospace] text-nowrap">
            <ConfigTree entry={config} />
        </div>
    );
}
