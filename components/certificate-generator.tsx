"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface CertificateGeneratorProps {
  name: string
  title: string
  score: number
  emoji: string
  badge: string
  gradient: string
}

export function CertificateGenerator({ name, title, score, emoji, badge, gradient }: CertificateGeneratorProps) {
  const generateCertificate = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 1600
    canvas.height = 1200
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    bgGradient.addColorStop(0, "#fdfbf7")
    bgGradient.addColorStop(0.3, "#fef8ee")
    bgGradient.addColorStop(0.6, "#fdf4f3")
    bgGradient.addColorStop(1, "#f7f5ff")
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.globalAlpha = 0.03
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 25; j++) {
        ctx.save()
        ctx.translate(i * 55 + 30, j * 50 + 25)
        ctx.rotate(Math.PI / 4)
        ctx.fillStyle = "#d97706"
        ctx.fillRect(-10, -10, 20, 20)
        ctx.restore()
      }
    }
    ctx.globalAlpha = 1

    const outerBorderGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    outerBorderGradient.addColorStop(0, "#d97706")
    outerBorderGradient.addColorStop(0.25, "#b45309")
    outerBorderGradient.addColorStop(0.5, "#92400e")
    outerBorderGradient.addColorStop(0.75, "#b45309")
    outerBorderGradient.addColorStop(1, "#d97706")

    ctx.strokeStyle = outerBorderGradient
    ctx.lineWidth = 30
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80)

    const middleBorderGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    middleBorderGradient.addColorStop(0, "#3b82f6")
    middleBorderGradient.addColorStop(0.5, "#8b5cf6")
    middleBorderGradient.addColorStop(1, "#ec4899")

    ctx.strokeStyle = middleBorderGradient
    ctx.lineWidth = 15
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120)

    ctx.strokeStyle = "#d97706"
    ctx.lineWidth = 4
    ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160)

    const drawCornerOrnament = (x: number, y: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Outer star
      const starGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 70)
      starGradient.addColorStop(0, "#fbbf24")
      starGradient.addColorStop(0.5, "#f59e0b")
      starGradient.addColorStop(1, "#d97706")
      ctx.fillStyle = starGradient
      ctx.shadowColor = "rgba(217, 119, 6, 0.5)"
      ctx.shadowBlur = 20

      ctx.beginPath()
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12
        const radius = i % 2 === 0 ? 65 : 35
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()

      // Inner circle
      ctx.shadowBlur = 0
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(0, 0, 28, 0, Math.PI * 2)
      ctx.fill()

      // Center jewel
      const jewelGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 20)
      jewelGradient.addColorStop(0, "#fef3c7")
      jewelGradient.addColorStop(1, "#fbbf24")
      ctx.fillStyle = jewelGradient
      ctx.beginPath()
      ctx.arc(0, 0, 20, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    ctx.shadowColor = "transparent"
    drawCornerOrnament(130, 130, 0)
    drawCornerOrnament(canvas.width - 130, 130, Math.PI / 2)
    drawCornerOrnament(130, canvas.height - 130, -Math.PI / 2)
    drawCornerOrnament(canvas.width - 130, canvas.height - 130, Math.PI)

    const headerGradient = ctx.createLinearGradient(200, 150, canvas.width - 200, 150)
    headerGradient.addColorStop(0, "#1e40af")
    headerGradient.addColorStop(0.3, "#3b82f6")
    headerGradient.addColorStop(0.5, "#8b5cf6")
    headerGradient.addColorStop(0.7, "#a855f7")
    headerGradient.addColorStop(1, "#ec4899")

    ctx.fillStyle = headerGradient
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
    ctx.shadowBlur = 15
    ctx.shadowOffsetY = 5

    ctx.beginPath()
    ctx.moveTo(200, 160)
    ctx.lineTo(canvas.width - 200, 160)
    ctx.lineTo(canvas.width - 170, 220)
    ctx.lineTo(170, 220)
    ctx.closePath()
    ctx.fill()

    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
    ctx.shadowBlur = 8
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 64px Arial"
    ctx.textAlign = "center"
    ctx.fillText("شـهــادة تـقـديــر وإنـجــاز", canvas.width / 2, 200)
    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0

    ctx.fillStyle = "#1e3a8a"
    ctx.font = "32px Arial"
    ctx.fillText("اليوم العالمي لحقوق الإنسان 2024", canvas.width / 2, 270)

    const lineGradient = ctx.createLinearGradient(canvas.width / 2 - 250, 300, canvas.width / 2 + 250, 300)
    lineGradient.addColorStop(0, "transparent")
    lineGradient.addColorStop(0.2, "#fbbf24")
    lineGradient.addColorStop(0.5, "#f59e0b")
    lineGradient.addColorStop(0.8, "#fbbf24")
    lineGradient.addColorStop(1, "transparent")
    ctx.strokeStyle = lineGradient
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 250, 300)
    ctx.lineTo(canvas.width / 2 + 250, 300)
    ctx.stroke()

    ctx.shadowColor = "rgba(251, 191, 36, 0.6)"
    ctx.shadowBlur = 40
    ctx.font = "160px Arial"
    ctx.fillText(emoji, canvas.width / 2, 480)
    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0

    const boxGradient = ctx.createLinearGradient(300, 520, 300, 800)
    boxGradient.addColorStop(0, "rgba(255, 255, 255, 0.95)")
    boxGradient.addColorStop(1, "rgba(254, 252, 232, 0.95)")
    ctx.fillStyle = boxGradient
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
    ctx.shadowBlur = 20
    ctx.fillRect(300, 520, canvas.width - 600, 300)
    ctx.shadowBlur = 0

    // Border for content box
    ctx.strokeStyle = "#fbbf24"
    ctx.lineWidth = 3
    ctx.strokeRect(300, 520, canvas.width - 600, 300)

    ctx.fillStyle = "#374151"
    ctx.font = "34px Arial"
    ctx.fillText("تُمنح هذه الشهادة تقديراً وإجلالاً لـ", canvas.width / 2, 600)

    ctx.fillStyle = "#7c3aed"
    ctx.font = "bold 56px Arial"
    ctx.fillText(title, canvas.width / 2, 680)

    // Underline for title
    ctx.strokeStyle = "#a855f7"
    ctx.lineWidth = 4
    ctx.beginPath()
    const titleWidth = ctx.measureText(title).width
    ctx.moveTo(canvas.width / 2 - titleWidth / 2 - 10, 700)
    ctx.lineTo(canvas.width / 2 + titleWidth / 2 + 10, 700)
    ctx.stroke()

    ctx.fillStyle = "#6b7280"
    ctx.font = "28px Arial"
    ctx.fillText("لتميزه في اختبار احترام الحدود والحقوق الشخصية", canvas.width / 2, 760)

    const scoreX = canvas.width / 2
    const scoreY = 900

    // Outer glow
    ctx.shadowColor = "rgba(16, 185, 129, 0.4)"
    ctx.shadowBlur = 30
    const outerScoreGradient = ctx.createRadialGradient(scoreX, scoreY, 0, scoreX, scoreY, 95)
    outerScoreGradient.addColorStop(0, "#10b981")
    outerScoreGradient.addColorStop(1, "#059669")
    ctx.fillStyle = outerScoreGradient
    ctx.beginPath()
    ctx.arc(scoreX, scoreY, 95, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // Middle ring
    ctx.strokeStyle = "#fbbf24"
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(scoreX, scoreY, 85, 0, Math.PI * 2)
    ctx.stroke()

    // Inner white circle
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.arc(scoreX, scoreY, 75, 0, Math.PI * 2)
    ctx.fill()

    // Score text
    ctx.fillStyle = "#059669"
    ctx.font = "bold 52px Arial"
    ctx.fillText(`${score}%`, scoreX, scoreY + 18)

    ctx.fillStyle = "#d97706"
    ctx.font = "bold 30px Arial"
    ctx.fillText(badge, canvas.width / 2, 1030)

    const sealX = 300
    const sealY = 1080

    // Seal background
    const sealGradient = ctx.createRadialGradient(sealX, sealY, 0, sealX, sealY, 60)
    sealGradient.addColorStop(0, "#dc2626")
    sealGradient.addColorStop(1, "#991b1b")
    ctx.fillStyle = sealGradient
    ctx.beginPath()
    ctx.arc(sealX, sealY, 60, 0, Math.PI * 2)
    ctx.fill()

    // Seal border
    ctx.strokeStyle = "#fbbf24"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(sealX, sealY, 60, 0, Math.PI * 2)
    ctx.stroke()

    // Seal inner circle
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
    ctx.beginPath()
    ctx.arc(sealX, sealY, 45, 0, Math.PI * 2)
    ctx.fill()

    // Seal text
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 20px Arial"
    ctx.fillText("معتمد", sealX, sealY)
    ctx.font = "16px Arial"
    ctx.fillText("2024", sealX, sealY + 25)

    const date = new Date().toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    ctx.fillStyle = "#6b7280"
    ctx.font = "26px Arial"
    ctx.textAlign = "right"
    ctx.fillText(`تاريخ الإصدار:`, canvas.width - 280, 1070)
    ctx.font = "bold 24px Arial"
    ctx.fillStyle = "#374151"
    ctx.fillText(date, canvas.width - 280, 1105)

    const serialNumber = `HR-${Date.now().toString().slice(-8)}`
    ctx.textAlign = "center"
    ctx.fillStyle = "#9ca3af"
    ctx.font = "20px Arial"
    ctx.fillText(`رقم الشهادة: ${serialNumber}`, canvas.width / 2, 1100)

    ctx.fillStyle = "#6b7280"
    ctx.font = "italic 24px Arial"
    ctx.fillText('"احترم نفسك وحقوقك، فأنت تستحق الأفضل دائماً"', canvas.width / 2, 1145)

    ctx.globalAlpha = 0.08
    ctx.fillStyle = "#10b981"
    ctx.font = "bold 120px Arial"
    ctx.fillText("✓", 150, canvas.height - 100)
    ctx.fillText("✓", canvas.width - 150, canvas.height - 100)
    ctx.globalAlpha = 1

    // Convert to image and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `شهادة-حقوق-الانسان-${score}-${Date.now()}.png`
        link.click()
        URL.revokeObjectURL(url)
      }
    })
  }

  return (
    <div className="space-y-2 sm:space-y-3 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/20 animate-fade-in-up">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
        <Download className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
        <h3 className="text-lg sm:text-xl font-bold">شهادتك المخصصة</h3>
      </div>
      <p className="text-center text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 px-2">
        احصل على شهادة فاخرة ومصممة بشكل احترافي توثق إنجازك المميز!
      </p>
      <Button
        onClick={generateCertificate}
        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
      >
        <Download className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        تحميل الشهادة
      </Button>
    </div>
  )
}
