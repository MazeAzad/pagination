export const paginate = (data) => {
    const itemPerPage = 10;
    const pages = Math.ceil(data.length / itemPerPage);
    const newData = Array.from({ length: pages }, (element, index) => {
        let start = index * itemPerPage;
        return data.slice(start, start + itemPerPage);
    })
    return newData;
}