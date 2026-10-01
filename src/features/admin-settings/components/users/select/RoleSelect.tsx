import Select from "react-select";
import { useField } from "formik";
import { useRolesQuery } from "../../../api/roles.api";

type Role = {
    id: number;
    name: string;
};

type Props = {
    name: string;
};

export default function RoleSelect({ name }: Props) {
    const [field, , helpers] = useField(name);

    const { data, isLoading } = useRolesQuery(-1);

    const roles: Role[] = data?.data ?? [];

    const options = roles.map((role) => ({
        value: role.id,
        label: role.name,
    }));

    const selectedOption =
        options.find((option) => option.value === field.value) ?? null;

    return (
        <Select
            options={options}
            value={selectedOption}
            menuPortalTarget={document.body}
    styles={{
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
        }),
    }}
            onChange={(option) =>
                helpers.setValue(option?.value ?? 0)
            }
            onBlur={() => helpers.setTouched(true)}
            isLoading={isLoading}
            placeholder="اختر الدور"
            isClearable
        />
    );
}