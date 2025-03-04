import * as React from "react"
import { Switch } from "@/components/ui/switch"

export function CustomToggle({ title, onCheckedChange }) {
    const [checked, setChecked] = React.useState(false)
    const onCheckedChangeCover = (checked) => {
        setChecked(checked)
        onCheckedChange(checked)
    }
    return (
        <div className="flex items-center space-x-2">
            <Switch id={title} checked={checked} onCheckedChange={onCheckedChangeCover} />
            <label
                htmlFor={title}
                className="text-sm font-medium whitespace-nowrap"
            >
                {title}
            </label>
        </div>
    )
}

