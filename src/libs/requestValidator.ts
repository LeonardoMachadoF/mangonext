import prisma from '../../src/libs/prisma'

export const requestValidator = async (body: any) => {
    if (!body.manga_slug || !body.volume || !body.chapter || !body.title || !body.scan_slug) {

        return { error: 'Dados incompletos, por favor, informar manga, volume e capitulo.' }
    }
    if (isNaN(body.volume) || isNaN(body.chapter)) {
        return { error: 'Dados inválidos, por favor, informar volume e capitulo válidos.' }
    }

    if (body.volume.length < 2) {
        body.volume = `0${body.volume}`
    }
    if (body.chapter.length < 2) {
        body.chapter = `0${body.chapter}`
    }

    if (body.manga_id) {
        body.manga = await prisma.manga.findFirst({ where: { id: body.manga_id }, select: { id: true } });
    } else {
        body.manga_slug = body.manga_slug;
        body.manga = await prisma.manga.findFirst({ where: { slug: body.manga_slug }, select: { id: true } });
    }

    if (body.manga === null) {
        return { error: 'manga não encontrado!' }
    }

    return body;
}