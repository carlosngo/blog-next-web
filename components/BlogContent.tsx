import {Text, Textarea} from '@mantine/core';
import {GetInputProps} from "@mantine/form/lib/types";

interface Props {
    inputProps: GetInputProps<"input">,
    isEditable: boolean,
}

function BlogContent({inputProps, isEditable}: Props) {
    if (isEditable) return (
        <Textarea
            {...inputProps}
            placeholder="The new content of your blog" required
            autosize minRows={3}
        />
    );
    return (
        <Text>{inputProps.value}</Text>
    );
}

export default BlogContent;