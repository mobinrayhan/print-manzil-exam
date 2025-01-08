import { DATA_PER_PAGE } from "./Table";

function generatePaginationOptions(totalItems, step) {
  const options = [];

  for (let i = step; i <= totalItems; i += step) {
    options.push(i);
  }

  return options;
}

export default function TableFooter({
  onNext,
  onPrev,
  paginate,
  onDataRowPerPage,
  data,
}) {
  const currentPage = data?.current_page;
  const perPage = data?.per_page;
  const total = data?.total;

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);

  return (
    <tfoot>
      <tr>
        <td colSpan="4" className="px-4 py-2 text-right">
          <div className="inline-block mr-8">
            <p className="inline-block mr-3">Row Per Page</p>
            <select
              name="perPageData"
              id="perPageData"
              className="border p-2"
              defaultValue={data?.per_page}
              onChange={(eve) => onDataRowPerPage(eve.target.value)}
            >
              {generatePaginationOptions(data?.total, DATA_PER_PAGE).map(
                (data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                )
              )}
            </select>
          </div>

          <span className="mr-4">
            <span className="mr-4">
              Showing <strong>{start}</strong> - <strong>{end}</strong> of{" "}
              <strong>{total}</strong>
            </span>
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={paginate === 1}
            onClick={onPrev}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ml-5 disabled:cursor-not-allowed disabled:opacity-70"
            onClick={onNext}
            disabled={data.per_page === data.total}
          >
            Next
          </button>
        </td>
      </tr>
    </tfoot>
  );
}
