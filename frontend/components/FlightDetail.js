export default function FlightDetail({ flight }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-blue-600">
        {flight.flightNo} — {flight.airlineName}
      </h3>
      <p className="text-gray-800">
        <span className="font-semibold text-gray-800">出發地：</span>
        {flight.origin}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold text-gray-800">預計抵達：</span>
        {flight.expectedArrival}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold text-gray-800">實際抵達：</span>
        {flight.actualArrival || "尚未抵達"}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold text-gray-800">狀態：</span>
        <span
          className={
            flight.status === "延誤"
              ? "text-red-600 font-bold"
              : "text-green-600 font-bold"
          }
        >
          {flight.status}
        </span>
      </p>
      {flight.delayReason && (
        <p className="text-red-500 mt-2 font-bold">⚠️ 延誤原因：{flight.delayReason}</p>
      )}
    </div>
  );
}
