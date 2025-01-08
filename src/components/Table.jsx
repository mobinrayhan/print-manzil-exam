import { useState } from "react";
import useFetchData from "../hooks/useFetchData";

function formatDate(date) {
  const options = {
    weekday: "long", // "Monday"
    year: "numeric", // "2025"
    month: "long", // "January"
    day: "numeric", // "8"
  };

  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
}

const Table = () => {
  const [searchText, setSearchText] = useState("");
  const { data, error, loading } = useFetchData(
    `https://api.razzakfashion.com/?search=${searchText}`
  );

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

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
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
                  <span className="mr-4">
                    Showing 1 - <strong>{data.last_page}</strong> of{" "}
                    <strong>{data.total}</strong>
                  </span>
                  <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    Prev
                  </button>
                  <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ml-5">
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
