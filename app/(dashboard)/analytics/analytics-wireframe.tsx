import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Target,
  MessageSquare,
  Hash,
  Clock,
  Zap,
  Award,
  Eye,
  ThumbsUp,
  Share2,
  Bookmark,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AnalyticsScreen() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  // Mock data
  const engagementTrend = [
    { date: "Week 1", rate: 3.2, captions: 12 },
    { date: "Week 2", rate: 3.8, captions: 15 },
    { date: "Week 3", rate: 4.1, captions: 18 },
    { date: "Week 4", rate: 4.2, captions: 22 },
  ];

  const stylePerformance = [
    { style: "Question-based", count: 45, avgEngagement: 4.8 },
    { style: "Story-driven", count: 32, avgEngagement: 4.2 },
    { style: "Hook-first", count: 28, avgEngagement: 3.9 },
    { style: "Direct CTA", count: 22, avgEngagement: 3.5 },
  ];

  const platformBreakdown = [
    { name: "Instagram", value: 52, color: "#E4405F" },
    { name: "LinkedIn", value: 28, color: "#0A66C2" },
    { name: "Twitter", value: 20, color: "#1DA1F2" },
  ];

  const topCaptions = [
    {
      id: 1,
      text: "Behind every successful launch is a team that believed when no one else did...",
      platform: "instagram",
      engagement: 6.8,
      likes: 342,
      comments: 28,
      saves: 89,
    },
    {
      id: 2,
      text: "Here's what nobody tells you about building in public 👇",
      platform: "linkedin",
      engagement: 5.9,
      likes: 278,
      comments: 45,
      saves: 67,
    },
    {
      id: 3,
      text: "Quick win: This one strategy 3x'd our engagement rate",
      platform: "twitter",
      engagement: 5.2,
      likes: 189,
      comments: 34,
      saves: 52,
    },
  ];

  const bestTimes = [
    { day: "Mon", time: "9-11am", score: 4.5 },
    { day: "Tue", time: "2-4pm", score: 4.8 },
    { day: "Wed", time: "9-11am", score: 4.3 },
    { day: "Thu", time: "11am-1pm", score: 5.1 },
    { day: "Fri", time: "3-5pm", score: 3.9 },
  ];

  const platformIcons = {
    instagram: <Instagram className="w-4 h-4" />,
    linkedin: <Linkedin className="w-4 h-4" />,
    twitter: <Twitter className="w-4 h-4" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Analytics
                  </h1>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    PRO
                  </span>
                </div>
                <p className="text-gray-500">
                  Track what's working and optimize your strategy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                {["7d", "30d", "90d", "All"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      timeRange === range
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {range === "7d"
                      ? "Last 7 days"
                      : range === "30d"
                      ? "Last 30 days"
                      : range === "90d"
                      ? "Last 90 days"
                      : "All time"}
                  </button>
                ))}
              </div>

              <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Metric 1 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                <TrendingUp className="w-3 h-3" />
                +12%
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">4.2%</p>
            <p className="text-sm text-gray-600">Avg. Engagement Rate</p>
            <p className="text-xs text-gray-400 mt-2">vs. previous period</p>
          </div>

          {/* Metric 2 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                <TrendingUp className="w-3 h-3" />
                +8%
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">127</p>
            <p className="text-sm text-gray-600">Total Captions</p>
            <p className="text-xs text-gray-400 mt-2">this period</p>
          </div>

          {/* Metric 3 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                <TrendingUp className="w-3 h-3" />
                +24%
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">6.8%</p>
            <p className="text-sm text-gray-600">Best Performing</p>
            <p className="text-xs text-gray-400 mt-2">Question-based style</p>
          </div>

          {/* Metric 4 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                <Award className="w-3 h-3" />
                Peak
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">Thu</p>
            <p className="text-sm text-gray-600">Best Day to Post</p>
            <p className="text-xs text-gray-400 mt-2">11am-1pm window</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Engagement Trend */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Engagement Trend
                </h3>
                <p className="text-sm text-gray-500">
                  Your performance over time
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-600">Engagement Rate</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={engagementTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#9333ea"
                  strokeWidth={3}
                  dot={{ fill: "#9333ea", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Platform Distribution
              </h3>
              <p className="text-sm text-gray-500">Where you're posting</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={platformBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-4">
              {platformBreakdown.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {platform.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {platform.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Style Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Caption Style Performance
              </h3>
              <p className="text-sm text-gray-500">
                Which styles drive the most engagement
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 text-sm font-medium rounded-lg">
              <Target className="w-4 h-4" />
              Insight: Focus on question-based captions
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stylePerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                type="number"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                dataKey="style"
                type="category"
                width={120}
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="avgEngagement"
                fill="#9333ea"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Captions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Top Performing Captions
              </h3>
              <p className="text-sm text-gray-500">
                Your best content this period
              </p>
            </div>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {topCaptions.map((caption, index) => (
              <div
                key={caption.id}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Rank Badge */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : index === 1
                        ? "bg-gray-200 text-gray-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    #{index + 1}
                  </div>

                  <div className="flex-1">
                    {/* Caption Text */}
                    <p className="text-sm text-gray-900 mb-3 leading-relaxed">
                      {caption.text}
                    </p>

                    {/* Metrics Row */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-2 py-1 rounded flex items-center gap-1 text-xs font-medium ${
                            caption.platform === "instagram"
                              ? "bg-pink-100 text-pink-700"
                              : caption.platform === "linkedin"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {
                            platformIcons[
                              caption.platform as keyof typeof platformIcons
                            ]
                          }
                          {caption.platform.charAt(0).toUpperCase() +
                            caption.platform.slice(1)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-gray-900">
                          {caption.engagement}%
                        </span>
                        <span className="text-gray-500">engagement</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {caption.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {caption.comments}
                        </div>
                        <div className="flex items-center gap-1">
                          <Bookmark className="w-4 h-4" />
                          {caption.saves}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="shrink-0 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 text-sm font-medium rounded-lg transition-colors">
                    Reuse Style
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Posting Times */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Best Times to Post
            </h3>
            <p className="text-sm text-gray-500">
              When your audience is most engaged
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {bestTimes.map((item) => (
              <div
                key={item.day}
                className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200 hover:border-purple-300 transition-colors"
              >
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  {item.day}
                </p>
                <p className="text-xs text-gray-600 mb-3">{item.time}</p>
                <div className="flex items-center justify-center gap-1">
                  <div
                    className={`w-full h-2 rounded-full ${
                      item.score > 4.5
                        ? "bg-green-500"
                        : item.score > 4.0
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }`}
                    style={{ width: `${(item.score / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs font-medium text-gray-700 mt-2">
                  {item.score}% avg
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Recommendation
                </p>
                <p className="text-sm text-gray-600">
                  Your audience is most active on Thursdays between 11am-1pm.
                  Schedule your best content during this window for maximum
                  reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
