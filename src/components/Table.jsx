import { useState } from "react";
import useFetchData from "../hooks/useFetchData";

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
}

function generatePaginationOptions(totalItems, step) {
  const options = [];

  for (let i = step; i <= totalItems; i += step) {
    options.push(i);
  }

  return options;
}

let DATA_PER_PAGE = 10;
const Table = () => {
  const [searchText, setSearchText] = useState("");
  const [paginate, setPaginate] = useState(1);
  const [dataPerRow, setDataPerRow] = useState(DATA_PER_PAGE);

  const { data, error, loading } = useFetchData(
    `https://api.razzakfashion.com/?search=${searchText}&paginate=${
      paginate * dataPerRow
    }`
  );

  function handleNext() {
    setPaginate((prev) => prev + 1);
  }

  function handlePrev() {
    setPaginate((prev) => prev - 1);
  }

  function handleDataPerRow(value) {
    setDataPerRow(+value);
  }

  let renderComponent;
  if (loading) {
    renderComponent = <p>Loading....</p>;
  }
  if (error) {
    renderComponent = <p>{error}</p>;
  }
  if (!error && !loading && data) {
    const { data: tableData } = data;
    renderComponent =
      tableData?.length > 0 ? (
        tableData?.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{item.name}</td>
            <td className="px-4 py-2 border-b">{item.email}</td>
            <td className="px-4 py-2 border-b">
              {formatDate(item.created_at)}
            </td>
            <td className="px-4 py-2 border-b">
              {formatDate(item.updated_at)}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center text-gray-500 py-4 border-b">
            No results found.
          </td>
        </tr>
      );
  }

  const currentPage = data?.current_page;
  const perPage = data?.per_page;
  const total = data?.total;

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="search"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-100 text-left text-gray-700 font-bold border-b">
                Name
              </th>

              <th className="px-4 py-2 bg-gray-100 text-left text-gray-700 font-bold border-b">
                Email
              </th>
              <th className="px-4 py-2 bg-gray-100 text-left text-gray-700 font-bold border-b">
                Created At
              </th>
              <th className="px-4 py-2 bg-gray-100 text-left text-gray-700 font-bold border-b">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>{renderComponent}</tbody>

          {!loading && !error && data && (
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
                      onChange={(eve) => handleDataPerRow(eve.target.value)}
                    >
                      {generatePaginationOptions(
                        data?.total,
                        DATA_PER_PAGE
                      ).map((data) => (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      ))}
                    </select>
                  </div>

                  <span className="mr-4">
                    <span className="mr-4">
                      Showing <strong>{start}</strong> - <strong>{end}</strong>{" "}
                      of <strong>{total}</strong>
                    </span>
                  </span>
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={paginate === 1}
                    onClick={handlePrev}
                  >
                    Prev
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ml-5 disabled:cursor-not-allowed disabled:opacity-70"
                    onClick={handleNext}
                    disabled={data.per_page === data.total}
                  >
                    Next
                  </button>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;
