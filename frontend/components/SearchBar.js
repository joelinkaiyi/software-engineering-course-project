"use client";

export default function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onSearch(value); // 即時觸發搜尋
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        placeholder="輸入航班號碼 / 航空公司 / 出發地"
        onChange={handleChange}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
