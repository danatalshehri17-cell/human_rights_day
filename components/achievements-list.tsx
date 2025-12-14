"use client"
import { Trophy, Target, CheckCircle, Flame } from "lucide-react"

interface AchievementsListProps {
  achievements: string[]
}

const achievementData: Record<string, { title: string; description: string; icon: any; color: string }> = {
  perfect: {
    title: "الكمال المطلق",
    description: "حصلت على إجابة ممتازة في جميع الأسئلة!",
    icon: Trophy,
    color: "from-yellow-400 to-orange-400",
  },
  defender: {
    title: "المدافع الشجاع",
    description: "أجبت بشكل ممتاز على 5 أسئلة أو أكثر",
    icon: Target,
    color: "from-blue-400 to-cyan-400",
  },
  complete: {
    title: "المثابر",
    description: "أكملت الاختبار بالكامل",
    icon: CheckCircle,
    color: "from-green-400 to-emerald-400",
  },
  persistent: {
    title: "الملتزم",
    description: "أعدت الاختبار أكثر من مرة!",
    icon: Flame,
    color: "from-red-400 to-pink-400",
  },
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  if (achievements.length === 0) return null

  return (
    <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-600" />
        <h3 className="text-xl font-bold">الشارات المكتسبة</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const data = achievementData[achievement]
          if (!data) return null
          const Icon = data.icon
          return (
            <div
              key={achievement}
              className="p-4 rounded-lg bg-gradient-to-br from-background to-muted border-2 border-primary/20 animate-bounce-in"
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full bg-gradient-to-br ${data.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{data.title}</h4>
                  <p className="text-xs text-muted-foreground">{data.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
