export interface Pagination{
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class WynikPaginacji<T>{
    items?: T; //Uzytkonik[]
    pagination?: Pagination
}