import {Button, Group, Skeleton, Space, Title} from '@mantine/core';
import Link from 'next/link';
import BlogList from "../../components/BlogList";
import {Blog} from "../../interfaces/blog";
import {Container} from '@mantine/core';
import Layout from "../../components/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface Props {
    blogs: Blog[]
}

function Blogs({ blogs }: Props) {
    return (
        <Layout title="Blogs">
            <Container>
                <Group spacing="xl" align="end">
                    <Title order={1}>Blogs</Title>
                    <Link href="/blogs/create" passHref>
                        <Button component="a" leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                            Add Blog
                        </Button>
                    </Link>
                </Group>
                <Space h="xl"/>
                <BlogList blogs={blogs}/>
            </Container>
        </Layout>
    );
}

export default Blogs;

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://localhost:3000/blogs')
    const blogs = await res.json();

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            blogs,
        },
    }
}