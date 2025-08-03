import { type ReactNode } from "react";

type YamlType = "map" | "array" | "string" | "boolean" | "integer" | "float";
const PRIMITIVE_TYPES = ["string", "boolean", "integer", "float"];

type ConfigEntry<T extends YamlType, S> = {
    root?: boolean;
    yamlType: T;
    metadata?: {
        breweryType?: string;
    };
    value: S;
};

export type ConfigEntryMap = ConfigEntry<"map", { key: string; value: ConfigEntry<any, any> }[]>;
export type ConfigEntryArray = ConfigEntry<"array", ConfigEntry<any, any>[]>;

export type ConfigEntryString = ConfigEntry<"string", string>;
export type ConfigEntryBoolean = ConfigEntry<"boolean", boolean>;
export type ConfigEntryInteger = ConfigEntry<"integer", number>;
export type ConfigEntryFloat = ConfigEntry<"float", number>;

export type CompositeConfigEntry = ConfigEntryMap | ConfigEntryArray;
export type PrimitiveConfigEntry = ConfigEntryString | ConfigEntryBoolean | ConfigEntryInteger | ConfigEntryFloat;
export type AnyConfigEntry = CompositeConfigEntry | PrimitiveConfigEntry;

export type ConfigTreeRendererContext = {
    path: AnyConfigEntry[];
};

function MapRenderer({ entry }: { entry: ConfigEntryMap }) {
    return (
        <span className="config-map">
            {entry.value.map((childEntry) => (
                <span key={childEntry.key}>
                    <span className="config-key">{childEntry.key}</span>: <ConfigTree entry={childEntry.value} />
                </span>
            ))}
        </span>
    );
}

export function ConfigTree({ entry, context }: { entry: AnyConfigEntry; context?: ConfigTreeRendererContext }) {
    if (!context) {
        context = { path: [] };
    }

    switch (entry.yamlType) {
        case "map": {
            const newContext = {
                path: [...context.path, entry],
            };

            return (
                <span>in progress</span>
            );
        }
        case "array": {
            const newContext = {
                path: [...context.path, entry],
            };
            return (
                <>
                    {entry.value.map((item, index) => (
                        <span>in progress</span>
                    ))}
                </>
            );
        }

        case "string":
        case "boolean":
        case "integer":
        case "float":
            return <span>in progress</span>;
    }
}

export function ConfigContainer({ config }: { config: AnyConfigEntry }) {
    return (
        <pre className="not-content">
            <ConfigTree entry={config} />
        </pre>
    );
}
