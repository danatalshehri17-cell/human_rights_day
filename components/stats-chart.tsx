"use client"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface StatsChartProps {
  excellent: number
  good: number
  needsWork: number
  total: number
}

export function StatsChart({ excellent, good, needsWork, total }: StatsChartProps) {
  const excellentPercent = (excellent / total) * 100
  const goodPercent = (good / total) * 100
  const needsWorkPercent = (needsWork / total) * 100

  return (
    <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-muted/50 to-background animate-fade-in-up">
      <h3 className="text-xl font-bold text-center mb-4">توزيع إجاباتك</h3>

      {/* Visual bar chart */}
      <div className="flex h-12 rounded-lg overflow-hidden shadow-lg">
        <div
          className="bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-white font-bold text-sm transition-all duration-500"
          style={{ width: `${excellentPercent}%` }}
        >
          {excellent > 0 && excellent}
        </div>
        <div
          className="bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm transition-all duration-500"
          style={{ width: `${goodPercent}%` }}
        >
          {good > 0 && good}
        </div>
        <div
          className="bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm transition-all duration-500"
          style={{ width: `${needsWorkPercent}%` }}
        >
          {needsWork > 0 && needsWork}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold">ممتاز</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{excellent}</div>
          <div className="text-xs text-muted-foreground">{Math.round(excellentPercent)}%</div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">جيد</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{good}</div>
          <div className="text-xs text-muted-foreground">{Math.round(goodPercent)}%</div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <XCircle className="w-5 h-5 text-orange-600" />
            <span className="font-semibold">يحتاج تحسين</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">{needsWork}</div>
          <div className="text-xs text-muted-foreground">{Math.round(needsWorkPercent)}%</div>
        </div>
      </div>
    </div>
  )
}
