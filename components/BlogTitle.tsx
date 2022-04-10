import {Title, TextInput} from '@mantine/core';
import {GetInputProps} from "@mantine/form/lib/types";

interface Props {
    inputProps: GetInputProps<"input">,
    isEditable: boolean,
}

function BlogTitle({inputProps, isEditable}: Props) {
    if (isEditable) return (
        <TextInput {...inputProps}
                   placeholder="The new title of your new blog" />
    );
    return (
        <Title order={1}>{inputProps.value}</Title>
    );
}

export default BlogTitle;