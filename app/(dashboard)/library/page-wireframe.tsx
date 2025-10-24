import React, { useState } from "react";
import {
  Home,
  Sparkles,
  BookMarked,
  Target,
  BarChart3,
  Settings,
  Search,
  Filter,
  Grid3x3,
  List,
  Copy,
  Edit2,
  Trash2,
  Instagram,
  Linkedin,
  Twitter,
  MoreVertical,
  Download,
  Tag,
  Check,
  X,
  Calendar,
  TrendingUp,
  Zap,
  ChevronDown,
} from "lucide-react";

export default function SavedLibrary() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedCaptions, setSelectedCaptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const savedCaptions = [
    {
      id: 1,
      text: "Exciting news! 🎉 We're launching something special next week that's going to change how you create content. Can you guess what it is? Drop your guesses below! 👇",
      platform: "instagram",
      style: "Teaser",
      savedDate: "2024-01-20",
      performance: "high",
      tags: ["product launch", "engagement"],
      engagementRate: "6.2%",
    },
    {
      id: 2,
      text: "Behind the scenes of building a product people actually want: Talk to users early, ship fast, and don't be afraid to pivot. What's your #1 product lesson?",
      platform: "linkedin",
      style: "Thought Leadership",
      savedDate: "2024-01-19",
      performance: "high",
      tags: ["product", "lessons"],
      engagementRate: "5.8%",
    },
    {
      id: 3,
      text: "Coffee first, creativity second ☕️ What's your morning ritual that helps you stay productive? Mine: 1. Coffee 2. Quick workout 3. Review goals. Let me know yours!",
      platform: "instagram",
      style: "Engagement",
      savedDate: "2024-01-18",
      performance: "medium",
      tags: ["lifestyle", "routine"],
      engagementRate: "4.3%",
    },
    {
      id: 4,
      text: "Quick tip: Your audience doesn't want perfection, they want authenticity. Show up as you are, share your process, and watch engagement soar. 📈",
      platform: "twitter",
      style: "Educational",
      savedDate: "2024-01-17",
      performance: "medium",
      tags: ["tips", "authenticity"],
      engagementRate: "4.1%",
    },
    {
      id: 5,
      text: "5 things I learned launching my first product: 1. Launch before you're ready 2. Listen more than you talk 3. Iterate based on feedback 4. Celebrate small wins 5. Community > marketing budget",
      platform: "linkedin",
      style: "Listicle",
      savedDate: "2024-01-15",
      performance: "high",
      tags: ["product launch", "lessons"],
      engagementRate: "7.1%",
    },
    {
      id: 6,
      text: "That feeling when you finally solve a problem you've been stuck on for days... 🎯 What's your latest win? Celebrate with me in the comments!",
      platform: "instagram",
      style: "Relatable",
      savedDate: "2024-01-14",
      performance: "medium",
      tags: ["wins", "celebration"],
      engagementRate: "3.9%",
    },
    {
      id: 7,
      text: "Hot take: Your content doesn't need to go viral. It needs to resonate with the RIGHT people. Quality audience > vanity metrics every time. 💯",
      platform: "twitter",
      style: "Hot Take",
      savedDate: "2024-01-12",
      performance: "high",
      tags: ["marketing", "strategy"],
      engagementRate: "6.8%",
    },
    {
      id: 8,
      text: "New week, new opportunities. What's one goal you're crushing this week? Let's keep each other accountable! 💪",
      platform: "instagram",
      style: "Motivational",
      savedDate: "2024-01-10",
      performance: "low",
      tags: ["motivation", "goals"],
      engagementRate: "2.7%",
    },
  ];

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: <Instagram className="w-4 h-4" />,
      linkedin: <Linkedin className="w-4 h-4" />,
      twitter: <Twitter className="w-4 h-4" />,
    };
    return icons[platform];
  };

  const getPlatformColor = (platform) => {
    const colors = {
      instagram: "bg-pink-100 text-pink-600",
      linkedin: "bg-blue-100 text-blue-600",
      twitter: "bg-sky-100 text-sky-600",
    };
    return colors[platform];
  };

  const getPerformanceColor = (performance) => {
    const colors = {
      high: "text-green-600 bg-green-50",
      medium: "text-yellow-600 bg-yellow-50",
      low: "text-gray-600 bg-gray-50",
    };
    return colors[performance];
  };

  const handleSelectCaption = (id) => {
    setSelectedCaptions((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleCopy = (text) => {
    setToastMessage("Caption copied! 📋");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleDelete = () => {
    setToastMessage(`${selectedCaptions.length} caption(s) deleted`);
    setShowToast(true);
    setSelectedCaptions([]);
    setTimeout(() => setShowToast(false), 2000);
  };

  const togglePlatformFilter = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleStyleFilter = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">
              Caption Studio
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors group relative"
            >
              <Sparkles className="w-5 h-5 group-hover:text-purple-600 transition-colors" />
              <span>New Caption</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-purple-50 text-purple-700 font-medium transition-colors"
            >
              <BookMarked className="w-5 h-5" />
              <span>Saved Library</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Target className="w-5 h-5" />
              <span>Brand Voice</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Usage</span>
            </a>
          </div>

          <div className="my-4 border-t border-gray-200"></div>

          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </div>
        </nav>

        <div className="px-4 pb-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Free Plan
              </span>
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <div className="mb-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">6</span>
                <span className="text-sm text-gray-500">/ 10 left</span>
              </div>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 w-[40%]"></div>
            </div>
            <button className="w-full py-2 px-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Saved Library
              </h1>
              <p className="text-gray-500">
                Your collection of high-performing captions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search captions, tags, or platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg font-medium transition-colors ${
                  selectedPlatforms.length > 0 || selectedStyles.length > 0
                    ? "border-purple-300 bg-purple-50 text-purple-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filter
                {(selectedPlatforms.length > 0 ||
                  selectedStyles.length > 0) && (
                  <span className="ml-1 px-1.5 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                    {selectedPlatforms.length + selectedStyles.length}
                  </span>
                )}
              </button>

              {/* Filter Dropdown */}
              {filterOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg border border-gray-200 shadow-lg z-10">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Filters</h3>
                      <button
                        onClick={() => {
                          setSelectedPlatforms([]);
                          setSelectedStyles([]);
                        }}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Clear all
                      </button>
                    </div>

                    {/* Platform Filters */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Platform
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["instagram", "linkedin", "twitter"].map(
                          (platform) => (
                            <button
                              key={platform}
                              onClick={() => togglePlatformFilter(platform)}
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                selectedPlatforms.includes(platform)
                                  ? `${getPlatformColor(
                                      platform
                                    )} border-2 border-current`
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {getPlatformIcon(platform)}
                              <span className="capitalize">{platform}</span>
                              {selectedPlatforms.includes(platform) && (
                                <Check className="w-3 h-3" />
                              )}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    {/* Style Filters */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Style
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Teaser",
                          "Educational",
                          "Engagement",
                          "Thought Leadership",
                        ].map((style) => (
                          <button
                            key={style}
                            onClick={() => toggleStyleFilter(style)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                              selectedStyles.includes(style)
                                ? "bg-purple-100 text-purple-700 border-2 border-purple-300"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                      >
                        <option value="recent">Recently Saved</option>
                        <option value="performance">Best Performance</option>
                        <option value="platform">Platform</option>
                        <option value="style">Style</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "list"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar - Shows when items selected */}
        {selectedCaptions.length > 0 && (
          <div className="bg-purple-50 border-b border-purple-200 px-8 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-900">
                {selectedCaptions.length} caption
                {selectedCaptions.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-red-50 border border-gray-300 hover:border-red-300 rounded-lg text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <button
                  onClick={() => setSelectedCaptions([])}
                  className="p-1.5 hover:bg-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Total Saved</div>
              <div className="text-2xl font-bold text-gray-900">8</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Avg. Engagement</div>
              <div className="text-2xl font-bold text-gray-900">5.1%</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Top Platform</div>
              <div className="flex items-center gap-2 mt-1">
                <Instagram className="w-5 h-5 text-pink-600" />
                <span className="text-lg font-bold text-gray-900">
                  Instagram
                </span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Best Style</div>
              <div className="text-lg font-bold text-gray-900">
                Thought Leadership
              </div>
            </div>
          </div>

          {/* Caption Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-4">
              {savedCaptions.map((caption) => (
                <div
                  key={caption.id}
                  className={`bg-white rounded-lg border transition-all ${
                    selectedCaptions.includes(caption.id)
                      ? "border-purple-300 ring-2 ring-purple-100"
                      : "border-gray-200 hover:border-purple-200 hover:shadow-md"
                  }`}
                >
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCaptions.includes(caption.id)}
                          onChange={() => handleSelectCaption(caption.id)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-200"
                        />
                        <div
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${getPlatformColor(
                            caption.platform
                          )}`}
                        >
                          {getPlatformIcon(caption.platform)}
                          <span className="capitalize">{caption.platform}</span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium ${getPerformanceColor(
                            caption.performance
                          )}`}
                        >
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          {caption.engagementRate}
                        </span>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    {/* Caption Text */}
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-4">
                      {caption.text}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {caption.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(caption.savedDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(caption.text)}
                          className="p-2 hover:bg-purple-50 text-gray-600 hover:text-purple-600 rounded transition-colors"
                          title="Copy"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-purple-50 text-gray-600 hover:text-purple-600 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {savedCaptions.map((caption) => (
                <div
                  key={caption.id}
                  className={`bg-white rounded-lg border transition-all ${
                    selectedCaptions.includes(caption.id)
                      ? "border-purple-300 ring-2 ring-purple-100"
                      : "border-gray-200 hover:border-purple-200"
                  }`}
                >
                  <div className="p-4 flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedCaptions.includes(caption.id)}
                      onChange={() => handleSelectCaption(caption.id)}
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate mb-2">
                        {caption.text}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div
                          className={`inline-flex items-center gap-1 ${getPlatformColor(
                            caption.platform
                          )} px-2 py-0.5 rounded`}
                        >
                          {getPlatformIcon(caption.platform)}
                          <span className="capitalize">{caption.platform}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {caption.style}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded ${getPerformanceColor(
                            caption.performance
                          )}`}
                        >
                          {caption.engagementRate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(caption.savedDate).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(caption.text)}
                        className="p-2 hover:bg-purple-50 text-gray-600 hover:text-purple-600 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-purple-50 text-gray-600 hover:text-purple-600 rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideUp">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
