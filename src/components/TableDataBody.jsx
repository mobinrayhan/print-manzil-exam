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

export default function TableDataBody({ tableData }) {
  return tableData?.map((item) => (
    <tr key={item.id} className="hover:bg-gray-50">
      <td className="px-4 py-2 border-b">{item.name}</td>
      <td className="px-4 py-2 border-b">{item.email}</td>
      <td className="px-4 py-2 border-b">{formatDate(item.created_at)}</td>
      <td className="px-4 py-2 border-b">{formatDate(item.updated_at)}</td>
    </tr>
  ));
}
