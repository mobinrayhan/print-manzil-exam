export default function TableHeader() {
  return (
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
  );
}
