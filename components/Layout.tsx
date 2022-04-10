import React, { ReactNode } from 'react';
import Head from 'next/head';
import {Alert, Space} from '@mantine/core';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";


type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title }: Props) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Space h="xl" />
        <Space h="xl" />
        {children}
    </div>
)

export default Layout