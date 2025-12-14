"use client"

import { Lightbulb } from "lucide-react"

const facts = [
  "الإعلان العالمي لحقوق الإنسان صدر في 10 ديسمبر 1948 وتُرجم إلى أكثر من 500 لغة!",
  "كل إنسان له الحق في الحياة والحرية والأمان على شخصه - المادة 3 من الإعلان العالمي",
  "احترام الحدود الشخصية يقلل من التوتر ويحسن جودة العلاقات بنسبة كبيرة",
  "تعلم قول 'لا' بشكل صحي هو مهارة يمكن تطويرها مع الممارسة",
  "الأشخاص الذين يضعون حدوداً واضحة يتمتعون بصحة نفسية أفضل",
]

export function DidYouKnow() {
  const randomFact = facts[Math.floor(Math.random() * facts.length)]

  return (
    <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-r-4 border-indigo-500 animate-slide-down mb-6">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1 animate-pulse" />
        <div>
          <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-1">هل تعلم؟</h4>
          <p className="text-sm text-muted-foreground text-balance">{randomFact}</p>
        </div>
      </div>
    </div>
  )
}
