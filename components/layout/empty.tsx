import * as React from 'react';
import { LayoutProps } from '@/models/index';


export default function EmptyLayout({children}: LayoutProps) {
    return (
        <>
        {children}
        </>
    );
}
