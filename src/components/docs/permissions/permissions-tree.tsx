type PermissionDefinition = {
    name: string;
    description: string;
    default?: string;
};

type PermissionHierarchy = {
    parent: string;
    children: string[];
};

type PermissionsData = {
    permissions: PermissionDefinition[];
    hierarchy: PermissionHierarchy[];
};

const permissions: PermissionsData = {
    permissions: [
        {
            name: "brewery.barrel.create",
            description: "Allows the user to create barrels.",
        },
        {
            name: "brewery.barrel.access",
            description: "Allows the user to access barrels.",
        },
        {
            name: "brewery.distillery.create",
            description: "Allows the user to create distilleries.",
        },
        {
            name: "brewery.distillery.access",
            description: "Allows the user to access distilleries.",
        },
        {
            name: "brewery.cauldron.access",
            description: "Allows the user to access cauldrons.",
        },
        {
            name: "brewery.cauldron.time",
            description: "Allows the user to use a clock on a cauldron to check brewing time.",
        },
        {
            name: "brewery.structure.access",
            description: "Allows the user to access any type of structure.",
        },
        {
            name: "brewery.structure.create",
            description: "Allows the user to create any type of structure.",
            default: "true",
        },
        {
            name: "brewery.command.create",
            description: "Allows the user to use the /tbp create command.",
        },
        {
            name: "brewery.command.status",
            description: "Allows the user to use the /tbp status command.",
        },
        {
            name: "brewery.command.event",
            description: "Allows the user to use the /tbp event command.",
        },
        {
            name: "brewery.command.reload",
            description: "Allows the user to use the /tbp reload command.",
        },
        {
            name: "brewery.command.info",
            description: "Allows the user to use the /tbp info command.",
        },
        {
            name: "brewery.command.seal",
            description: "Allows the user to use the /tbp seal command.",
        },
        {
            name: "brewery.command.other",
            description: "Allows the user to use other /tbp commands.",
        },
        {
            name: "brewery.command.replicate",
            description: "Allows the user to use the /tbp replicate command.",
        },
        {
            name: "brewery.command.version",
            description: "Allows the user to use the /tbp version command.",
        },
        {
            name: "brewery.command.encryption",
            description: "Allows the user to use the /tbp encryption command.",
        },
        {
            name: "brewery.command",
            description: "Allows the user to use /tbp commands.",
            default: "op",
        },
        {
            name: "brewery.override.kick",
            description: "Prevents the user from being kicked by events (the pass out event).",
            default: "op",
        },
        {
            name: "brewery.override.effect",
            description: "Prevents the user from receiving brew's potion effects.",
        },
        {
            name: "brewery.override.drunk",
            description: "Prevents the user from having their modifiers changed. (e.g. prevents alcohol)",
        },
        {
            name: "brewery.override",
            description: "Prevents the user from being affected by certain TBP mechanics. Recommended for admins/mods.",
        },
        {
            name: "brewery",
            description: "Main permission node for TBP.",
        },
    ],
    hierarchy: [
        {
            parent: "brewery.barrel.create",
            children: ["brewery.barrel.access"],
        },
        {
            parent: "brewery.distillery.create",
            children: ["brewery.distillery.access"],
        },
        {
            parent: "brewery.cauldron.access",
            children: ["brewery.cauldron.time"],
        },
        {
            parent: "brewery.structure.access",
            children: ["brewery.barrel.access", "brewery.distillery.access", "brewery.cauldron.access"],
        },
        {
            parent: "brewery.structure.create",
            children: ["brewery.structure.access", "brewery.barrel.create", "brewery.distillery.create"],
        },
        {
            parent: "brewery.command",
            children: [
                "brewery.command.create",
                "brewery.command.status",
                "brewery.command.event",
                "brewery.command.reload",
                "brewery.command.info",
                "brewery.command.seal",
                "brewery.command.other",
                "brewery.command.replicate",
                "brewery.command.version",
                "brewery.command.encryption",
            ],
        },
        {
            parent: "brewery.override",
            children: ["brewery.override.kick", "brewery.override.effect", "brewery.override.drunk"],
        },
        {
            parent: "brewery",
            children: ["brewery.command", "brewery.structure.create", "brewery.override"],
        },
    ],
};

function DefaultValue({ value }: { value?: string }) {
    const colors = {
        true: "green",
        false: "red",
        op: "orange",
    };
    if (!value) return <span>-</span>;
    return <span style={{ color: colors[value as keyof typeof colors] || "black" }}>{value}</span>;
}

export function PermissionsTree() {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Permission</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions.permissions.map((perm) => (
                        <tr key={perm.name}>
                            <td>
                                <code>{perm.name}</code>
                            </td>
                            <td>
                                <DefaultValue value={perm.default} />
                            </td>

                            <td>{perm.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* TODO: Hierarchy */}
        </>
    );
}
