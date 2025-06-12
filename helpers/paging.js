const { PER_PAGE } = require('../constants/common');

async function Paging(
  Model,
  limit = PER_PAGE,
  page = 1,
  bodyQuery = {},
  bodyPopulate = [],
  bodySort = {},
) {
  const data = await Model.find(bodyQuery)
    .populate(bodyPopulate)
    .limit(limit)
    .skip(limit * (page - 1))
    .sort(bodySort);

  const count = await Model.countDocuments(bodyQuery);

  return {
    page: +page,
    limit,
    total_page: Math.ceil(count / limit),
    data,
  };
}

module.exports = Paging;
