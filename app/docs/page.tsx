import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from 'next/link';
import paths from '@/utils/paths/paths.config';
import { useUser } from '@/context/user-context';

const Docs = () => {

    const filePath = path.join(process.cwd(), 'app/docs/_lib/markdown.txt');
    const markdownText = fs.readFileSync(filePath, 'utf-8');

    const user = useUser()

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
                <Link className='text-md hover:underline' href={user.id ? paths.app.home : paths.marketing.landing}>
                    Go back
                </Link>
            </div>
        </div>
    )
}

export default Docs