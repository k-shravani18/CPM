import prisma from "@/utils/Prisma";


const connection = async () => {
    prisma.$connect()
}

export const getInstance =  async() => {
    return await prisma.instances.findMany(
        {
           orderBy:{
            id:'desc'
           }
        }
    )
}
