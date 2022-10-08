import nc from 'next-connect';
import { NextApiResponse } from "next";
import { storageApi } from "../../src/libs/storageApi";
import { Credentials } from "../../src/types/Credentials";
import { upload } from "../../src/libs/multerConfig";
import { NextApiRequestWithFiles } from '../../src/types/ExtendedRequestWithFiles';
import { unlinkSync } from 'fs';


export const config = { api: { bodyParser: false, }, }

const handler = nc();
handler.use(upload.array('imgs', 200))

handler.get(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
    let data = await storageApi.getCredentials();

    let credentials: Credentials = {
        accountId: data.accountId,
        applicationKey: data.applicationKey,
        apiUrl: data.apiUrl,
        authorizationToken: data.authorizationToken,
        downloadUrl: data.downloadUrl,
        recommendedPartSize: data.recommendedPartSize,
        bucketName: data.bucketName,
        bucketId: data.bucketId
    }

    if (req.files) {
        req.files.forEach((file) => {
            unlinkSync(file.path)
        })
    }

    res.json({})
    return
})

handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
    let { manga, volume, chapter } = req.body;
    if (!manga || !volume || !chapter) {
        if (req.files) {
            req.files.forEach((file) => {
                unlinkSync(file.path)
            })
        }
        return res.json({ error: 'Dados incompletos, por favor, informar manga, volume e capitulo.' })
    }
    let data = await storageApi.getCredentials();
    let credentials: Credentials = {
        accountId: data.accountId,
        applicationKey: data.applicationKey,
        apiUrl: data.apiUrl,
        authorizationToken: data.authorizationToken,
        downloadUrl: data.downloadUrl,
        recommendedPartSize: data.recommendedPartSize,
        bucketName: data.bucketName,
        bucketId: data.bucketId
    }
    let path = `${manga}/volume-${volume}/chapter-${chapter}`
    await storageApi.uploadChapters(credentials, req.files, path)

    res.json({});
    return
})

export default handler;

// const handler: NextApiHandler = async (req, res) => {
//     let data = await storageApi.getCredentials();

//     let credentials: Credentials = {
//         accountId: data.accountId,
//         applicationKey: data.applicationKey,
//         apiUrl: data.apiUrl,
//         authorizationToken: data.authorizationToken,
//         downloadUrl: data.downloadUrl,
//         recommendedPartSize: data.recommendedPartSize,
//         bucketName: data.bucketName,
//         bucketId: data.bucketId
//     }

//     if (req.method === 'GET') {
//         let result = await storageApi.getImagesUrl(credentials, 'I Obtained a Mythic Item/chapter-02')

//         res.json({ result })
//         return
//     }


//     if (req.method === 'POST') {
//         let uploadCredentials = await storageApi.getUploadCredentials(credentials)
//         let uploadUrl = uploadCredentials.uploadUrl;
//         let uploadAuthorizationToken = uploadCredentials.authorizationToken;

//         res.json({ uploadUrl, uploadAuthorizationToken })
//         return
//     }




// }

// export default handler;