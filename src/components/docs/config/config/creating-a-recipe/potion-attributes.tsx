import { ConfigContainer, type ConfigEntryMap } from "../../config-tree";

const config: ConfigEntryMap = {
    root: true,
    yamlType: "map",
    value: [
        {
            key: "potion-attributes",
            value: {
                yamlType: "map",
                value: [
                    {
                        key: "item-model",
                        value: {
                            yamlType: "string",
                            value: "minecraft:grass_block"
                        }
                    },
                    {
                        key: "map-inside-a-map",
                        value: {
                            yamlType: "map",
                            value: [
                                {
                                    key: "nested-key",
                                    value: {
                                        yamlType: "string",
                                        value: "nested-value"
                                    }
                                },
                                {
                                    key: "another-nested-key",
                                    value: {
                                        yamlType: "boolean",
                                        value: true
                                    }
                                }
                            ]
                        }
                    },
                    {
                        key: "test",
                        value: {
                            yamlType: "integer",
                            value: 123
                        }
                    },
                    {
                        key: "test2",
                        value: {
                            yamlType: "boolean",
                            value: false
                        }
                    },
                    {
                        key: "test3",
                        value: {
                            yamlType: "array",
                            value: [
                                {
                                    yamlType: "string",
                                    value: "example"
                                },
                                {
                                    yamlType: "map",
                                    value: [
                                        {
                                            key: "nested-key",
                                            value: {
                                                yamlType: "string",
                                                value: "nested-value"
                                            }
                                        },
                                        {
                                            key: "another-nested-key",
                                            value: {
                                                yamlType: "boolean",
                                                value: true
                                            }
                                        }
                                    ]
                                },
                                {
                                    yamlType: "integer",
                                    value: 456
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
}

export function PotionAttributesConfig() {
    return <ConfigContainer config={config} />;
}
