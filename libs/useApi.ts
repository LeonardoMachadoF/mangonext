import prisma from './prisma';

export const useApi = {
    getMangas: async () => {
        return await prisma.manga.findMany()
    }
}