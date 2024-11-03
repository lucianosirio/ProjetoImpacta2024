import prismaClient from "../prisma";



class ConsIDCustomerService {

    async execute(){

        const idcustomer = prismaClient.customer.findFirst()

    }


}