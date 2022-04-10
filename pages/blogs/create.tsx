import { Container, LoadingOverlay, Space, Title, TextInput, Textarea, Group, Button, Alert} from '@mantine/core';
import {useForm} from '@mantine/form';
import Layout from "../../components/Layout";
import {useState} from "react";
import Link from 'next/link';
import {showNotification} from '@mantine/notifications';
import {trySubmitJsonFormAsync} from "../../util/forms";

function CreateBlog() {
    const form = useForm({
        initialValues: {
            title: '',
            content: ''
        }
    });

    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (values: typeof form.values) => {
        await trySubmitJsonFormAsync({
            url: 'http://localhost:3000/blogs',
            fetchInit: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values),
            },
            onStart: () => setLoading(true),
            onSuccess: () => {
                showNotification({
                    autoClose: 5000,
                    color: 'green',
                    title: 'Success',
                    message: 'A blog was successfully created.'
                });
                form.reset();
            },
            onFailure: () => {
                showNotification({
                    autoClose: 5000,
                    color: 'red',
                    title: 'Failed',
                    message: 'Something went wrong.'
                })
            },
            onFinish: () => setLoading(false)
        })
    };

    return (
        <Layout title="Create Blog">
            <Container>
                <Title order={1}>Add a New Blog</Title>

                <form onSubmit={form.onSubmit(handleSubmit)}
                      style={{position: 'relative'}}>
                    <LoadingOverlay visible={isLoading} />
                    <Space h="lg" />
                    <TextInput
                        {...form.getInputProps('title')}
                        label="Title" placeholder="The title of your new blog" required
                    />
                    <Space h="lg" />
                    <Textarea
                        {...form.getInputProps('content')}
                        label="Content" placeholder="The content of your new blog" required
                        autosize minRows={3}
                    />
                    <Space h="xl" />
                    <Group>
                        <Button type="submit">
                            Add Blog
                        </Button>
                        <Link href="/blogs" passHref>
                            <Button component="a" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                    </Group>
                </form>
            </Container>
        </Layout>
    );
}

export default CreateBlog;