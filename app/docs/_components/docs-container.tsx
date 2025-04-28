'use client'

import Link from 'next/link';
import paths from '@/utils/paths/paths.config';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import type { IDocsContainer } from '@/app/docs/_types';

export default function DocsContainer({ markdownText, user }: IDocsContainer) {

    return (
        <div className="bg-white max-w-4xl h-auto flex flex-col justify-center items-center rounded-md p-4 mx-auto">
            <div

                className="prose lg:prose-xl w-full max-w-4xl rounded-lg flex flex-col justify-center text-wrap break-words overflow-hidden whitespace-normal p-4 md:px-10"
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {markdownText}
                </ReactMarkdown>
            </div>
            <div className='flex flex-row justify-between'>
                <Link className='text-md hover:underline' href={user ? paths.app.home : paths.marketing.landing}>
                    Go back
                </Link>
            </div>
        </div>
    )
}
