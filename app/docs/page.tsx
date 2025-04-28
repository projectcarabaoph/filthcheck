import fs from 'fs';
import path from 'path';

import DocsContainer from '@/app/docs/_components/docs-container';
import { serverClient } from '@/utils/supabase/server-client';
import type { IUserData } from '@/context/_types';

const Docs = async () => {

    const supabase = await serverClient()

    const { data: { user } } = await supabase.auth.getUser()


    const filePath = path.join(process.cwd(), 'app/docs/_lib/markdown.txt');
    const markdownText = fs.readFileSync(filePath, 'utf-8');

    return (
        <DocsContainer markdownText={markdownText} user={user as IUserData} />
    )
}

export default Docs