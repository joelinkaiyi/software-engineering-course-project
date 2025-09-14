"use client";

export default function FlightTimeline({ flights }) {
  const sortedFlights = [...flights].sort(
    (a, b) => new Date(a.expectedArrival) - new Date(b.expectedArrival)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-900">
        今日航班時間軸
      </h2>
      <div className="relative border-l-2 border-blue-200 pl-10">
        {sortedFlights.length === 0 ? (
          <p className="text-gray-500">目前沒有航班資料</p>
        ) : (
          sortedFlights.map((f) => (
            <div key={f.id} className="mb-8 relative">
              {/* 節點 (靠左一點) */}
              <div className="absolute -left-8 top-1 w-5 h-5 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              </div>

              {/* 時間 */}
              <p className="text-sm text-gray-500 mb-1">{f.expectedArrival}</p>

              {/* 航班資訊 */}
              <p className="font-bold text-gray-800">
                {f.flightNo}{" "}
                <span className="font-normal">— {f.airlineName}</span>
              </p>

              {/* 狀態 + 顏色 */}
              <p
                className={`text-sm font-bold flex items-center space-x-1 ${
                  f.status === "延誤"
                    ? "text-red-600"
                    : f.status === "準時OnTime"
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                <span>
                  {f.status === "改時TimeChg"
                    ? "🔴"
                    : f.status === "準時OnTime"
                    ? "🟢"
                    : f.status === "已到Arrived"
                    ? "🔵"
                    : f.status === "提早Early"
                    ? "🟡"
                    : "取消Cancelled"
                    ? "🟤"
                    : "⚪"}
                </span>
                <span>{f.status}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
