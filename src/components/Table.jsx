import { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import TableDataBody from "./TableDataBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

export const DATA_PER_PAGE = 10;

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
        <TableDataBody tableData={tableData} />
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
          type="search"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <TableHeader />
          <tbody>{renderComponent}</tbody>
          {!loading && !error && data && (
            <TableFooter
              data={data}
              onDataRowPerPage={handleDataPerRow}
              onNext={handleNext}
              onPrev={handlePrev}
              paginate={paginate}
            />
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;
