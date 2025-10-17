export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">
        關於系統
      </h1>

      {/* 系統簡介 */}
      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-700">系統簡介</h2>
        <p className="text-gray-700 leading-relaxed">
          本系統提供松山機場國際線即時到站航班資訊，整合
          <a
            href="https://data.gov.tw/dataset/37319"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-1"
          >
            政府資料開放平台--松山機場國內線即時到站航班
          </a>
          所提供的公開資料，讓使用者可以快速掌握航班動態、統計數據與最新快訊。
        </p>
      </section>

      {/* 功能特色 */}
      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-700">功能特色</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>即時航班資訊：查詢最新到站航班。</li>
          <li>統計分析：準點率、延誤趨勢圖表。</li>
        </ul>
      </section>

      {/* 技術架構 */}
      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-700">技術架構</h2>
        <p className="text-gray-700 leading-relaxed">
          前端採用 <span className="font-semibold">Next.js 14 + React</span>
          ，並使用
          <span className="font-semibold"> TailwindCSS </span>
          進行 UI 設計。 後端規劃使用{" "}
          <span className="font-semibold">ASP.NET Core API</span> 搭配
          <span className="font-semibold"> PostgreSQL</span> 資料庫。
        </p>
      </section>

      {/* 作者資訊 */}
      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-700">作者資訊</h2>
        <p className="text-gray-700">
          班級：四子三丙<br />
          學號：C112156221<br />
          姓名：林凱翊<br />
          修讀課程：軟體工程
        </p>
      </section>
    </div>
  );
}
