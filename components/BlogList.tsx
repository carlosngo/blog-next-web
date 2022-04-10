import {Blog} from "../interfaces/blog";
import {Grid, Card, Button, Title, Text, Space} from '@mantine/core';
import Link from 'next/link';
import Layout from "./Layout";

interface Props {
    blogs: Blog[]
}

const BlogList = ({blogs}: Props) => (
    <Grid>
        {blogs.length == 0 && <Text>No blogs found.</Text>}
        {blogs.map((blog) => (
            <Grid.Col key={blog.id} span={4}>
                <Card shadow="sm">
                    <Title order={3}>
                        {blog.title}
                    </Title>
                    <Space h="lg" />
                    <Text>{blog.spoiler}...</Text>
                    <Space h="lg"/>
                    <Link href={`/blogs/${encodeURIComponent(blog.id)}`} passHref>
                        <Button component="a">Read More</Button>
                    </Link>
                </Card>
            </Grid.Col>
        ))}

    </Grid>
)

export default BlogList;


