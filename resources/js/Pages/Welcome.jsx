import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout';

export default function Welcome(props) {
    return (
        <div>
            <Head title="Welcome" />
            <Layout>
                <h1>Hello, Laravel from Inertia.js with React!</h1>
                <p>Laravel Version: {props.laravelVersion}</p>
                <p>PHP Version: {props.phpVersion}</p>
                <p>PAGE: {props.page}</p>
            </Layout>

        </div>
    );
}
