import {Blog} from '../../interfaces/blog';
import {Button, Container, Group, LoadingOverlay, Menu, Space, Text, TextInput, Title} from "@mantine/core";
import Layout from "../../components/Layout";
import {useForm} from "@mantine/form";
import {useState} from "react";
import Link from "next/link";
import {showNotification} from '@mantine/notifications';
import BlogTitle from "../../components/BlogTitle";
import BlogContent from "../../components/BlogContent";
import {trySubmitJsonFormAsync} from "../../util/forms";
import {useRouter} from "next/router";

interface Props {
    blog: Blog;
}

interface Params {
    id: string
}

function Blog({ blog }: Props) {
    const form = useForm({
        initialValues: {
            newTitle: blog.title,
            newContent: blog.content
        }
    });

    const [savedTitle, setSavedTitle] = useState(blog.title);
    const [savedContent, setSavedContent] = useState(blog.content);
    const [isLoading, setLoading] = useState(false);
    const [isEditable, setEditable] = useState(false);

    const router = useRouter();

    const saveChanges = async () => {
        await trySubmitJsonFormAsync({
            url: `http://localhost:3000/blogs/${blog.id}`,
            fetchInit: {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form.values),
            },
            onStart: () => setLoading(true),
            onSuccess: () => {
                showNotification({
                    autoClose: 5000,
                    color: 'green',
                    title: 'Success',
                    message: 'The blog was successfully updated.'
                });
                setSavedTitle(form.getInputProps('newTitle').value);
                setSavedContent(form.getInputProps('newContent').value);
                setEditable(false);
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
        });
    };

    const discardChanges = () => {
        form.setFieldValue('newTitle', savedTitle);
        form.setFieldValue('newContent', savedContent);
        setEditable(false);
    }

    const deleteBlog = async () => {
        await trySubmitJsonFormAsync({
            url: `http://localhost:3000/blogs/${blog.id}`,
            fetchInit: {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            },
            onSuccess: () => router.push('/blogs'),
        });
    }

    return (
        <Layout title="Blog">
            <Container>
                <LoadingOverlay visible={isLoading} />
                <Group position="apart">
                    <BlogTitle
                        inputProps={form.getInputProps('newTitle')}
                        isEditable={isEditable}
                    />
                    <Group>
                        <Link href="/blogs" passHref>
                            <Button variant="subtle" component="a">
                                Back
                            </Button>
                        </Link>
                        {!isEditable && (
                            <Menu>
                                <Menu.Item onClick={() => setEditable(true)}>Update blog</Menu.Item>
                                <Menu.Item onClick={deleteBlog} color="red">Delete blog</Menu.Item>
                            </Menu>
                        )}
                    </Group>
                </Group>
                <Space h="lg" />
                <BlogContent
                    inputProps={form.getInputProps('newContent')}
                    isEditable={isEditable}
                />
                <Space h="xl" />
                {isEditable &&
                    <Group>
                        <Button onClick={saveChanges}>
                            Save
                        </Button>
                        <Button variant="outline" onClick={discardChanges}>
                            Cancel
                        </Button>
                    </Group>
                }
            </Container>
        </Layout>
    );
}

// This function gets called at build time
export async function getStaticPaths() {
    const res = await fetch('http://localhost:3000/blogs');
    const blogs = await res.json()

    const paths = blogs.map((blog: Blog) => ({
        params: { id: blog.id.toString() },
    }))

    return { paths, fallback: false }
}


// This function gets called at build time
export async function getStaticProps({params}: any) {
    const res = await fetch(`http://localhost:3000/blogs/${params.id}`);
    const blog = await res.json();

    return {
        props: {
            blog,
        },
    }
}

export default Blog;