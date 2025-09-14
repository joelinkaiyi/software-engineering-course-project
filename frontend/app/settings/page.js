"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    refreshInterval: 60,
    notificationMethod: "browser",
    trackedStatuses: [],
  });

  // 讀取設定
  useEffect(() => {
    fetch("http://localhost:5197/api/UserSettings")
      .then((res) => res.json())
      .then((data) => {
        // 確保有預設值，避免 undefined
        setSettings({
          refreshInterval: data.refreshInterval ?? 60,
          notificationMethod: data.notificationMethod ?? "browser",
          trackedStatuses: Array.isArray(data.trackedStatuses)
            ? data.trackedStatuses
            : [],
        });
      })
      .catch((err) => console.error("載入設定失敗:", err));
  }, []);

  const saveSettings = async () => {
    await fetch("http://localhost:5197/api/UserSettings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    alert("設定已儲存！");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-900">系統設定</h2>

      {/* 刷新頻率 */}
      <label className="block mb-2 text-gray-800">資料刷新頻率</label>
      <select
        className="border p-2 rounded mb-4 w-full text-gray-700"
        value={settings.refreshInterval}
        onChange={(e) =>
          setSettings({
            ...settings,
            refreshInterval: parseInt(e.target.value),
          })
        }
      >
        <option value={60}>1 分鐘</option>
        <option value={300}>5 分鐘</option>
        <option value={600}>10 分鐘</option>
      </select>

      {/* 通知方式 */}
      <label className="block mb-2 text-gray-800">通知方式</label>
      <div className="space-y-2 mb-4 text-gray-700">
        <label>
          <input
            type="radio"
            checked={settings.notificationMethod === "browser"}
            onChange={() =>
              setSettings({ ...settings, notificationMethod: "browser" })
            }
          />
          瀏覽器通知
        </label>
        <label>
          <input
            type="radio"
            checked={settings.notificationMethod === "email"}
            onChange={() =>
              setSettings({ ...settings, notificationMethod: "email" })
            }
          />
          Email
        </label>
      </div>

      {/* 追蹤航班狀態 */}
      <label className="block mb-2 text-gray-800">追蹤航班狀態</label>
      {["準時", "延誤", "取消"].map((status) => (
        <label key={status} className="block text-gray-700">
          <input
            type="checkbox"
            checked={settings.trackedStatuses.includes(status)}
            onChange={(e) => {
              const newStatuses = e.target.checked
                ? [...settings.trackedStatuses, status]
                : settings.trackedStatuses.filter((s) => s !== status);
              setSettings({ ...settings, trackedStatuses: newStatuses });
            }}
          />
          {status}
        </label>
      ))}

      <button
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded"
        onClick={saveSettings}
      >
        儲存設定
      </button>
    </div>
  );
}
