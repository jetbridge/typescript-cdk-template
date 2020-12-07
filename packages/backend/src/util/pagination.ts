interface PaginatedResponse {
    items?: any[]
    paginationData?: PaginationData
    statusCode?: number
    message?: string
}

interface PagesData {
    pageSize: number
    pageNumber: number
}

interface PaginationData {
    totalCount: number
    totalPages: number
    firstPage: number
    lastPage: number
    page: number
    previousPage?: number
    nextPage?: number
}

function getPagesData(query_params?: Object): PagesData {
    let pageSize = 25
    let pageNumber = 1
    if (query_params) {
        if ("pageSize" in query_params) {
            pageSize = Number(query_params["pageSize"])
        }
        if ("pageNumber" in query_params) {
            pageNumber = Number(query_params["pageNumber"])
        }
    }
    return {
        pageSize: pageSize,
        pageNumber: pageNumber,
    }
}

function getPaginationData(total_object_count: number, pagesData: PagesData): PaginationData {
    let totalPagesCount = Math.ceil(total_object_count / pagesData.pageSize)

    let paginationData: PaginationData = {
        "totalCount": total_object_count,
        "totalPages": totalPagesCount,
        "firstPage": 1,
        "lastPage": totalPagesCount,
        "page": pagesData.pageNumber,
    }

    if (pagesData.pageNumber !== 1) {
        paginationData.previousPage = pagesData.pageNumber - 1
    }
    if (pagesData.pageNumber !== totalPagesCount) {
        paginationData.nextPage = pagesData.pageNumber + 1
    }

    return paginationData
}

export { getPagesData, getPaginationData, PagesData, PaginatedResponse, PaginationData }
