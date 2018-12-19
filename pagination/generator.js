
var userPagination = {

    paginator: function (userData, callBack) {
        var per_page = userData.size;
        var page = userData.page;

        page = page || 1,
            per_page = per_page || 10,
            offset = (page - 1) * per_page,

            paginatedItems = userData.userSortDataList.slice(offset).slice(0, per_page),
            total_pages = Math.ceil(userData.userSortDataList.length / per_page);

        callBack(null, paginatedItems);
    }
};

module.exports = userPagination;