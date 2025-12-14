"use client"

// استيراد المكتبات الأساسية من React
import { useState, useEffect } from "react"

// استيراد المكونات الجاهزة من المشروع
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// استيراد الأيقونات من مكتبة lucide-react
import {
  CheckCircle2,
  Sparkles,
  Trophy,
  Target,
  Shield,
  Heart,
  Star,
  Zap,
  Share2,
  Copy,
  Moon,
  Sun,
  TrendingUp,
  Lightbulb,
  Award,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowLeft,
  XCircle,
} from "lucide-react"

// استيراد المكونات الفرعية للتطبيق
import { CertificateGenerator } from "./certificate-generator"
import { AchievementsList } from "./achievements-list"
import { DidYouKnow } from "./did-you-know"
import { StatsChart } from "./stats-chart"

// ===== تعريف أنواع البيانات (Types) =====

// نوع السؤال: يحتوي على نص السؤال والسيناريو والخيارات
interface Question {
  id: number
  text: string
  scenario: string
  options: {
    text: string
    score: number
    feedback: string
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "صديقك يطلب منك مبلغاً كبيراً من المال ولكنك تحتاجه",
    scenario: "المال والحدود المالية",
    options: [
      {
        text: "أوافق رغم حاجتي للمال حتى لا أخسر الصداقة",
        score: 1,
        feedback: "من حقك الاعتذار عندما تكون في حاجة للمال. الأصدقاء الحقيقيون يحترمون حدودك المالية.",
      },
      {
        text: "أشرح له بصراحة أنني أحتاج المال وأعتذر بلطف",
        score: 3,
        feedback: "ممتاز! التواصل الصريح واحترام حدودك المالية هو حق أساسي لك.",
      },
      {
        text: "أتجاهل الطلب وأظهِر أنني لم أسمعه",
        score: 2,
        feedback: "من الأفضل الرد بوضوح. التواصل المباشر يحمي علاقاتك وحقوقك.",
      },
    ],
  },
  {
    id: 2,
    text: "مديرك في العمل يطلب منك العمل في إجازتك الأسبوعية",
    scenario: "العمل والوقت الشخصي",
    options: [
      {
        text: "أوافق فوراً خوفاً من فقدان وظيفتي",
        score: 1,
        feedback: "راحتك النفسية ووقتك الشخصي حق أساسي. يحق لك الاعتذار عن العمل في إجازتك.",
      },
      {
        text: "أوضح أن هذا وقت إجازتي وأستفسر عن البدائل",
        score: 3,
        feedback: "رائع! احترام وقتك الشخصي وحدودك المهنية حق أساسي لك.",
      },
      {
        text: "أوافق لكن أشعر بالاستياء والإرهاق",
        score: 1,
        feedback: "مشاعرك مهمة. من حقك التعبير عن حدودك بوضوح بدلاً من القبول والشعور بالضيق.",
      },
    ],
  },
  {
    id: 3,
    text: "شخص يشاركك صوراً أو محتوى يزعجك على وسائل التواصل",
    scenario: "الحدود الرقمية والخصوصية",
    options: [
      {
        text: "أتحمل الأمر وأبقى صامتاً حتى لا أسبب مشاكل",
        score: 1,
        feedback: "راحتك النفسية أولوية. من حقك حماية مساحتك الرقمية ووضع حدود واضحة.",
      },
      {
        text: "أخبره بلطف أن هذا المحتوى يزعجني وأطلب التوقف",
        score: 3,
        feedback: "ممتاز! وضع حدود رقمية صحية هو حق أساسي لحماية صحتك النفسية.",
      },
      {
        text: "أحظره فوراً دون توضيح السبب",
        score: 2,
        feedback: "لك الحق في ذلك، لكن التواصل الواضح قد يحل المشكلة ويحافظ على العلاقة.",
      },
    ],
  },
  {
    id: 4,
    text: "عائلتك تضغط عليك لحضور مناسبة وأنت منهك جداً",
    scenario: "العائلة والاحتياجات النفسية",
    options: [
      {
        text: "أحضر رغم إرهاقي لأنهم سيغضبون إن لم أفعل",
        score: 1,
        feedback: "صحتك النفسية والجسدية أولوية. من حقك الاعتذار والاعتناء بنفسك عند الحاجة.",
      },
      {
        text: "أشرح لهم أنني منهك وأحتاج للراحة، وأعتذر بحب",
        score: 3,
        feedback: "رائع! التواصل الصادق مع العائلة واحترام حدودك الشخصية حق أساسي لك.",
      },
      {
        text: "أذهب لكن أغادر مبكراً دون إخبار أحد",
        score: 2,
        feedback: "من الأفضل التواصل بوضوح. عائلتك ستفهم احتياجاتك عندما تعبر عنها بصراحة.",
      },
    ],
  },
  {
    id: 5,
    text: "صديق يطلب منك مساعدة متكررة دون أن يقدم شيئاً بالمقابل",
    scenario: "العلاقات المتوازنة",
    options: [
      {
        text: "أستمر في المساعدة رغم شعوري بالاستغلال",
        score: 1,
        feedback: "العلاقات الصحية تقوم على التوازن. من حقك طلب المعاملة بالمثل واحترام وقتك.",
      },
      {
        text: "أتحدث معه عن أهمية التوازن في العلاقة",
        score: 3,
        feedback: "ممتاز! التواصل الصريح عن احتياجاتك في العلاقة حق من حقوقك الأساسية.",
      },
      {
        text: "أبتعد عنه تماماً دون توضيح",
        score: 2,
        feedback: "لك الحق في حماية نفسك، لكن الحوار الصريح قد يصلح العلاقة أو ينهيها بشكل صحي.",
      },
    ],
  },
  {
    id: 6,
    text: "شخص يسألك أسئلة شخصية جداً تشعرك بعدم الارتياح",
    scenario: "الخصوصية والحدود الشخصية",
    options: [
      {
        text: "أجيب على كل الأسئلة رغم انزعاجي",
        score: 1,
        feedback: "خصوصيتك حق أساسي. لست مضطراً للإجابة على أي سؤال يجعلك غير مرتاح.",
      },
      {
        text: "أوضح بلطف أن هذا الموضوع خاص ولا أريد الحديث عنه",
        score: 3,
        feedback: "رائع! حماية خصوصيتك ووضع حدود واضحة حق من حقوقك الأساسية.",
      },
      {
        text: "أغير الموضوع بطريقة غير مباشرة",
        score: 2,
        feedback: "هذا جيد، لكن التعبير المباشر عن حدودك أكثر فعالية وصحة لك.",
      },
    ],
  },
  {
    id: 7,
    text: "تشعر بالإرهاق وتحتاج وقتاً لنفسك لكن لديك التزامات اجتماعية",
    scenario: "الرعاية الذاتية والالتزامات",
    options: [
      {
        text: "أجبر نفسي على الحضور رغم حاجتي للراحة",
        score: 1,
        feedback: "الاعتناء بصحتك النفسية حق أساسي. من المهم إعطاء الأولوية لاحتياجاتك عند الضرورة.",
      },
      {
        text: "أعتذر بصراحة وأخصص وقتاً للاعتناء بنفسي",
        score: 3,
        feedback: "ممتاز! إدراك احتياجاتك وإعطائها الأولوية هو احترام لحقوقك الشخصية.",
      },
      {
        text: "أحضر لفترة قصيرة ثم أنسحب",
        score: 2,
        feedback: "جيد، لكن من حقك الاعتذار تماماً عندما تحتاج للراحة. صحتك أولوية.",
      },
    ],
  },
  {
    id: 8,
    text: "زميل في العمل ينسب إنجازاتك لنفسه أمام الإدارة",
    scenario: "الحقوق المهنية",
    options: [
      {
        text: "أتجاهل الموضوع خوفاً من الصراعات",
        score: 1,
        feedback: "من حقك الدفاع عن إنجازاتك. صمتك قد يشجع على تكرار الأمر ويضر بمسيرتك المهنية.",
      },
      {
        text: "أتحدث معه على انفراد ثم أوضح الأمر للإدارة بشكل مهني",
        score: 3,
        feedback: "ممتاز! الدفاع عن حقوقك المهنية بطريقة احترافية يحمي إنجازاتك ومستقبلك.",
      },
      {
        text: "أشتكي للإدارة مباشرة دون التحدث معه",
        score: 2,
        feedback: "جيد أن تدافع عن حقك، لكن الحوار المباشر أولاً قد يحل المشكلة بشكل أفضل.",
      },
    ],
  },
  {
    id: 9,
    text: "شريكك يريد الوصول إلى هاتفك الشخصي ورسائلك الخاصة",
    scenario: "الخصوصية في العلاقات",
    options: [
      {
        text: "أعطيه كل ما يريد رغم عدم ارتياحي",
        score: 1,
        feedback: "خصوصيتك حق حتى في العلاقات الحميمة. الثقة لا تعني التخلي عن مساحتك الشخصية.",
      },
      {
        text: "أشرح له أن الخصوصية مهمة وأن الثقة لا تتطلب المراقبة",
        score: 3,
        feedback: "رائع! العلاقات الصحية مبنية على الثقة واحترام الخصوصية والحدود الشخصية.",
      },
      {
        text: "أوافق لكن أحذف كل شيء شخصي أولاً",
        score: 2,
        feedback: "هذا حل مؤقت، لكن من الأفضل معالجة قضية الثقة والخصوصية بشكل مباشر.",
      },
    ],
  },
  {
    id: 10,
    text: "مجموعة أصدقاء يخططون لنشاط لا يناسب ميزانيتك المالية",
    scenario: "الحدود المالية الاجتماعية",
    options: [
      {
        text: "أوافق وأتحمل العبء المالي رغم صعوبته",
        score: 1,
        feedback: "من حقك وضع حدود مالية واضحة. الأصدقاء الحقيقيون سيحترمون وضعك ويبحثون عن بدائل.",
      },
      {
        text: "أوضح وضعي المالي وأقترح نشاطاً بديلاً مناسباً",
        score: 3,
        feedback: "ممتاز! الصراحة حول الوضع المالي صحية وتبني علاقات أصيلة ومريحة.",
      },
      {
        text: "أختلق عذراً آخر وأرفض الحضور",
        score: 2,
        feedback: "جيد أنك حميت ميزانيتك، لكن الصراحة قد تؤدي لحلول أفضل وعلاقات أقوى.",
      },
    ],
  },
]

// نوع النتيجة: يحتوي على جميع بيانات النتيجة النهائية
interface Result {
  score: number
  title: string
  emoji: string
  personality: string
  description: string
  strengths: string[]
  improvements: string[]
  funFact: string
  badge: string
  icon: typeof Shield // Corrected type for icon
  color: string
  gradient: string
}

// نوع الإنجاز: الشارات التي يحصل عليها المستخدم
interface Achievement {
  id: string
  name: string
  description: string
}

// ===== وظيفة حساب النتيجة =====
// تأخذ مجموع النقاط وترجع النتيجة المناسبة مع الوصف والنصائح
const getResult = (score: number): Result => {
  // حساب النسبة المئوية من المجموع الكلي
  const maxScore = questions.length * 3
  const percentage = (score / maxScore) * 100

  // تحديد النتيجة بناءً على النسبة المئوية
  if (percentage >= 90) {
    // سوبرمان الحدود - نتيجة ممتازة جداً
    return {
      score: percentage,
      title: "سوبرمان الحدود",
      emoji: "🦸‍♂️",
      personality: "المدافع الأسطوري",
      description:
        "واو! أنت بطل خارق في احترام حقوقك! تمتلك قوة فائقة في وضع الحدود والدفاع عن حقوقك بثقة ووضوح. الآخرون يتعلمون منك كيف يحترمون أنفسهم. أنت قدوة حقيقية!",
      strengths: ["تعرف متى تقول لا بكل ثقة", "علاقاتك متوازنة وصحية", "تحمي مساحتك الشخصية ببراعة"],
      improvements: ["ساعد الآخرين على تعلم مهاراتك", "شارك خبراتك مع من يحتاجها"],
      funFact: "الناس الذين يحترمون حدودهم يعيشون حياة أكثر سعادة بنسبة 73%",
      badge: "بطل الحدود الذهبي",
      icon: Shield,
      color: "text-yellow-500",
      gradient: "from-yellow-400 via-orange-400 to-red-400",
    }
  } else if (percentage >= 75) {
    // نينجا الحقوق - نتيجة ممتازة
    return {
      score: percentage,
      title: "نينجا الحقوق",
      emoji: "🥷",
      personality: "المحارب الذكي",
      description:
        "رائع! أنت نينجا ماهر في حماية حقوقك! تتحرك بذكاء ومرونة بين المواقف المختلفة، وتعرف متى تدافع ومتى تتفاوض. مهاراتك في التوازن مذهلة!",
      strengths: ["توازن رائع بين حقوقك وعلاقاتك", "ذكاء اجتماعي عالي", "تتعامل بحكمة مع المواقف الصعبة"],
      improvements: ["زد ثقتك في المواقف الحرجة", "لا تتردد في التعبير عن احتياجاتك"],
      funFact: "وضع الحدود الصحية يقلل من التوتر والقلق بنسبة 65%",
      badge: "محارب الحدود الفضي",
      icon: Zap,
      color: "text-purple-500",
      gradient: "from-purple-400 via-pink-400 to-red-400",
    }
  } else if (percentage >= 60) {
    // طالب الحقوق المجتهد - نتيجة جيدة
    return {
      score: percentage,
      title: "طالب الحقوق المجتهد",
      emoji: "🎓",
      personality: "المتعلم النشيط",
      description:
        "جيد جداً! أنت في رحلة تعلم رائعة نحو احترام حقوقك. لديك أساس قوي وفهم جيد، وتحتاج فقط لمزيد من الممارسة والثقة. استمر في التقدم!",
      strengths: ["وعي جيد بحقوقك الشخصية", "تحاول تحسين نفسك باستمرار", "منفتح على التعلم والنمو"],
      improvements: ["تدرب على قول لا بوضوح", "لا تخف من ردود فعل الآخرين", "ثق بحدسك وقراراتك"],
      funFact: "90% من الناس يجدون صعوبة في قول لا، لكن يمكن تعلمها!",
      badge: "متعلم الحدود البرونزي",
      icon: Star,
      color: "text-blue-500",
      gradient: "from-blue-400 via-cyan-400 to-teal-400",
    }
  } else if (percentage >= 40) {
    // المستكشف المبتدئ - نتيجة متوسطة
    return {
      score: percentage,
      title: "المستكشف المبتدئ",
      emoji: "🌱",
      personality: "البذرة النامية",
      description:
        "أنت في بداية رحلة اكتشاف حقوقك، وهذا رائع! مثل البذرة التي تنمو، أنت تحتاج للوقت والعناية. كل خطوة صغيرة تقربك من احترام نفسك أكثر. لا تستسلم!",
      strengths: ["لديك الرغبة في التحسين", "أنت صادق مع نفسك", "تبحث عن حلول لمشاكلك"],
      improvements: [
        "ابدأ بخطوات صغيرة يومية",
        "اكتب حدودك الشخصية على ورقة",
        "تعلم كيف تقول لا بطرق مختلفة",
        "اطلب الدعم من أصدقائك",
      ],
      funFact: "كل خبير في وضع الحدود كان مبتدئاً يوماً ما!",
      badge: "مستكشف الحقوق الناشئ",
      icon: Sparkles,
      color: "text-green-500",
      gradient: "from-green-400 via-emerald-400 to-teal-400",
    }
  } else {
    // المحارب الشجاع - نتيجة تحتاج تحسين
    return {
      score: percentage,
      title: "المحارب الشجاع",
      emoji: "❤️‍🔥",
      personality: "البطل الصاعد",
      description:
        "رحلتك تبدأ الآن، وهذا يحتاج لشجاعة حقيقية! أنت مثل المحارب الذي يعترف بنقاط ضعفه ليصبح أقوى. اتخاذك لهذا الاختبار هو أول خطوة نحو التغيير. أنت أقوى مما تظن!",
      strengths: ["لديك شجاعة للاعتراف بالتحديات", "أنت هنا وهذا يعني الكثير", "الرغبة في التغيير موجودة"],
      improvements: [
        "ابدأ بموقف واحد صغير اليوم",
        "اطلب مساعدة متخصص إذا احتجت",
        "انضم لمجموعة دعم",
        "تذكر: أنت تستحق الاحترام",
        "احتفل بكل انتصار صغير",
      ],
      funFact: "أصعب خطوة هي الأولى، وأنت قد قمت بها بالفعل!",
      badge: "محارب البداية الشجاع",
      icon: Heart,
      color: "text-rose-500",
      gradient: "from-rose-400 via-pink-400 to-purple-400",
    }
  }
}

const quotes = [
  { text: "الحرية هي الحق في أن تقول للناس ما لا يريدون سماعه", author: "جورج أورويل" },
  { text: "حقوق الإنسان ليست منحة من الدولة، بل هي حق طبيعي لكل فرد", author: "توماس جيفرسون" },
  { text: "لا يمكن أن تكون حراً إذا كنت تحكم على الآخرين", author: "نيلسون مانديلا" },
  { text: "الكرامة الإنسانية هي أساس جميع حقوق الإنسان", author: "الإعلان العالمي لحقوق الإنسان" },
  { text: "احترم نفسك بما يكفي لتبتعد عن أي شيء لم يعد يخدمك", author: "روبرت تيو" },
]

// ===== المكون الرئيسي للاختبار =====
export function QuizApp() {
  // ===== الحالات (States) =====

  // حالة السؤال الحالي (من 0 إلى 9)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  // حالة الإجابات المخزنة (مصفوفة من النقاط)
  const [answers, setAnswers] = useState<number[]>([])

  // حالة المرحلة الحالية: بداية، اختبار، أو نتائج
  const [stage, setStage] = useState<"start" | "quiz" | "results">("start")

  // حالة إظهار قسم "هل تعلم"
  const [showDidYouKnow, setShowDidYouKnow] = useState(false)

  // حالة إظهار قائمة الإنجازات
  const [showAchievements, setShowAchievements] = useState(false)

  // الإنجازات المفتوحة في هذا الاختبار
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([])

  // النتائج السابقة المحفوظة
  const [previousResults, setPreviousResults] = useState<any[]>([])

  // حالة الوضع الليلي (مظلم/فاتح)
  const [darkMode, setDarkMode] = useState(false)

  // حالة تفعيل الصوت
  const [soundEnabled, setSoundEnabled] = useState(true)

  // ===== التأثيرات (Effects) =====

  // تحميل البيانات المحفوظة عند بدء التطبيق
  useEffect(() => {
    // تحميل النتائج السابقة من التخزين المحلي
    const savedResults = localStorage.getItem("quiz-results")
    if (savedResults) {
      setPreviousResults(JSON.parse(savedResults))
    }

    // تحميل إعداد الوضع الليلي
    const savedDarkMode = localStorage.getItem("dark-mode")
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === "true")
    }

    // تحميل إعداد الصوت
    const savedSoundEnabled = localStorage.getItem("sound-enabled")
    if (savedSoundEnabled) {
      setSoundEnabled(savedSoundEnabled === "true")
    }
  }, [])

  // تطبيق الوضع الليلي وحفظ الإعدادات
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    // حفظ الإعدادات في التخزين المحلي
    localStorage.setItem("dark-mode", darkMode.toString())
    localStorage.setItem("sound-enabled", soundEnabled.toString())
  }, [darkMode, soundEnabled])

  // ===== الوظائف =====

  // وظيفة تشغيل الأصوات باستخدام Web Audio API
  const playSound = (type: "start" | "correct" | "wrong" | "next" | "finish" | "achievement") => {
    // إذا كان الصوت معطلاً، لا تشغل شيء
    if (!soundEnabled) return

    // إنشاء سياق صوتي جديد
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // تحديد نوع الصوت حسب الحدث
    switch (type) {
      case "start":
        // صوت بداية نشط (نغمات صاعدة)
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
        break

      case "correct":
        // صوت نجاح لطيف (C-E-G)
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1)
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2)
        oscillator.type = "sine"
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.4)
        break

      case "wrong":
        // صوت لطيف للإجابة الخاطئة
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2)
        oscillator.type = "triangle"
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.25)
        break

      case "next":
        // نقرة ناعمة للانتقال
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
        oscillator.type = "square"
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.05)
        break

      case "finish":
        // موسيقى انتصار (أربع نغمات متتالية)
        const frequencies = [523.25, 659.25, 783.99, 1046.5]
        frequencies.forEach((freq, index) => {
          const osc = audioContext.createOscillator()
          const gain = audioContext.createGain()
          osc.connect(gain)
          gain.connect(audioContext.destination)
          osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.15)
          osc.type = "sine"
          gain.gain.setValueAtTime(0.2, audioContext.currentTime + index * 0.15)
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.15 + 0.3)
          osc.start(audioContext.currentTime + index * 0.15)
          osc.stop(audioContext.currentTime + index * 0.15 + 0.3)
        })
        return

      case "achievement":
        // صوت لامع للإنجازات
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(2400, audioContext.currentTime + 0.1)
        oscillator.type = "sine"
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
        break
    }
  }

  // وظيفة فحص وفتح الإنجازات بناءً على الأداء
  const checkAchievements = (totalScore: number, answersArray: number[]) => {
    const newAchievements: Achievement[] = []

    // إنجاز: الإجابة الكاملة (جميع الإجابات ممتازة)
    const perfectAnswers = answersArray.filter((s) => s === 3).length
    if (perfectAnswers === questions.length) {
      newAchievements.push({
        id: "perfect",
        name: "الإجابة الكاملة",
        description: "أجبت على جميع الأسئلة بشكل ممتاز.",
      })
    }

    // إنجاز: الدافع (5 إجابات ممتازة على الأقل)
    if (perfectAnswers >= 5) {
      newAchievements.push({
        id: "defender",
        name: "الدافع",
        description: "أجبت على خمسة أسئلة على الأقل بشكل ممتاز.",
      })
    }

    // إنجاز: الإكمال (أكمل جميع الأسئلة)
    if (answersArray.length === questions.length) {
      newAchievements.push({
        id: "complete",
        name: "الإكمال",
        description: "أكملت جميع الأسئلة.",
      })
    }

    // إنجاز: الصبر (أجرى الاختبار مرتين على الأقل)
    if (previousResults.length >= 2) {
      newAchievements.push({
        id: "persistent",
        name: "الصبر",
        description: "لقد قمت بإجراء الاختبار مرتين على الأقل.",
      })
    }

    setUnlockedAchievements(newAchievements)
    return newAchievements
  }

  // وظيفة بدء الاختبار
  const handleStart = () => {
    setStage("quiz")
    playSound("start")
  }

  // وظيفة معالجة الإجابة
  const handleAnswer = (score: number, optionIndex: number) => {
    // إضافة النقاط للمصفوفة
    setAnswers([...answers, score])

    // تشغيل الصوت المناسب (صحيح أو خاطئ)
    const currentQ = questions[currentQuestion]
    if (optionIndex === currentQ.options.findIndex((o) => o.score === 3)) {
      playSound("correct")
    } else {
      playSound("wrong")
    }
  }

  // وظيفة الانتقال للسؤال التالي أو النتائج
  const handleNext = () => {
    playSound("next")

    if (currentQuestion < questions.length - 1) {
      // الانتقال للسؤال التالي
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // إنهاء الاختبار وعرض النتائج
      playSound("finish")
      setStage("results")

      // حساب النتيجة النهائية
      const totalScore = answers.reduce((sum, score) => sum + score, 0)
      const result = getResult(totalScore)

      // حفظ النتيجة في التخزين المحلي
      const newResults = [
        ...previousResults,
        {
          date: new Date().toLocaleDateString("ar-EG"),
          score: Math.round(result.score),
          title: result.title,
        },
      ]
      setPreviousResults(newResults)
      localStorage.setItem("quiz-results", JSON.JSON.stringify(newResults))

      // فحص الإنجازات
      checkAchievements(totalScore, answers)
    }
  }

  // وظيفة إعادة الاختبار من البداية
  const resetQuiz = () => {
    setStage("start")
    setCurrentQuestion(0)
    setAnswers([])
    setShowDidYouKnow(false)
    setUnlockedAchievements([])
    setShowAchievements(false) // Reset achievement display state as well
  }

  // وظيفة المشاركة عبر وسائل التواصل
  const shareResults = (platform: string) => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0)
    const result = getResult(totalScore)
    const text = `حصلت على ${Math.round(result.score)}% في اختبار احترام الحدود! ${result.emoji} ${result.title}\n\n`
    const url = typeof window !== "undefined" ? window.location.href : ""

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
          "_blank",
        )
        break
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + url)}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(text + url).then(() => {
          alert("تم نسخ النتيجة! يمكنك مشاركتها الآن 📋")
        })
        break
    }
  }

  // وظيفة المشاركة عبر نظام التشغيل
  const handleNativeShare = async () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0)
    const result = getResult(totalScore)
    const shareData = {
      title: "اختبار احترام الحدود - اليوم العالمي لحقوق الإنسان",
      text: `حصلت على ${Math.round(result.score)}% في اختبار احترام الحدود! ${result.emoji} ${result.title}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    }
  }

  // ===== واجهة المستخدم (UI) =====

  // حساب النتيجة الحالية
  const totalScore = answers.reduce((sum, score) => sum + score, 0)
  const result = stage === "results" ? getResult(totalScore) : null

  // حساب متوسط درجات المستخدمين (محاكاة)
  const userAverage = 68

  // اختيار اقتباس عشوائي
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  // حساب توزيع الإجابات لعرضها في الرسم البياني
  const answerCounts = {
    excellent: answers.filter((s) => s === 3).length,
    good: answers.filter((s) => s === 2).length,
    needsWork: answers.filter((s) => s === 1).length,
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"}`}
    >
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-50 flex gap-2">
        {/* زر تبديل الوضع الليلي */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full shadow-lg bg-white dark:bg-gray-800 hover:scale-110 transition-all w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
        >
          {darkMode ? (
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          ) : (
            <Moon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          )}
        </Button>

        {/* زر تبديل الصوت */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="rounded-full shadow-lg bg-white dark:bg-gray-800 hover:scale-110 transition-all w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          ) : (
            <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          )}
        </Button>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 lg:py-12 max-w-5xl">
        {/* ===== شاشة البداية ===== */}
        {stage === "start" && (
          <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-3 sm:p-4 lg:p-8">
            <Card className="max-w-3xl w-full shadow-2xl border-2 animate-fade-in-up hover:shadow-3xl transition-all duration-300">
              <CardHeader className="text-center space-y-4 sm:space-y-6 lg:space-y-8 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-10">
                <div className="flex justify-center items-center gap-6 sm:gap-10 lg:gap-16 mb-4 sm:mb-6 lg:mb-8 flex-wrap">
                  <div className="animate-fade-in-up hover:scale-110 transition-transform duration-300">
                    <img
                      src="/images/photo-2025-12-08-18-13-47-20copy.jpg"
                      alt="وطن طموح"
                      className="h-16 sm:h-20 lg:h-28 w-auto object-contain drop-shadow-lg"
                    />
                  </div>
                  <div
                    className="animate-fade-in-up hover:scale-110 transition-transform duration-300"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <img
                      src="/images/photo-2025-12-08-18-13-47.jpg"
                      alt="هيمنة النجاح"
                      className="h-16 sm:h-20 lg:h-28 w-auto object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse-slow" />
                    <div className="relative animate-float">
                      <Shield className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 text-primary drop-shadow-2xl" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <Badge
                    variant="secondary"
                    className="text-xs sm:text-sm lg:text-base px-3 py-1 sm:px-4 sm:py-1.5 lg:px-6 lg:py-2 animate-fade-in-up shadow-md"
                  >
                    10 ديسمبر - اليوم العالمي لحقوق الإنسان
                  </Badge>
                  <CardTitle className="text-2xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight animate-fade-in-up text-balance px-2">
                    اختبر احترامك لحدودك
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in-up text-balance px-2">
                    رحلة تفاعلية ممتعة لاكتشاف شخصيتك في احترام الحقوق والحدود
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 lg:space-y-8 pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-10 pb-6 lg:pb-10">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 text-center">
                  <div className="p-3 sm:p-4 lg:p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 hover:scale-105 animate-fade-in-up">
                    <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary">{questions.length}</div>
                    <div className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">سؤال</div>
                  </div>
                  <div className="p-3 sm:p-4 lg:p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-100">
                    <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-secondary">5</div>
                    <div className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">دقائق</div>
                  </div>
                  <div className="p-3 sm:p-4 lg:p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-200">
                    <div className="text-2xl sm:text-3xl lg:text-5xl">✨</div>
                    <div className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">جوائز</div>
                  </div>
                </div>

                {previousResults.length > 0 && (
                  <div className="p-3 sm:p-4 lg:p-6 rounded-xl bg-muted/50 animate-fade-in-up">
                    <h3 className="text-xs sm:text-sm lg:text-base font-semibold mb-2 flex items-center gap-2">
                      <Trophy className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                      آخر نتائجك
                    </h3>
                    <div className="space-y-2">
                      {previousResults
                        .slice(-3)
                        .reverse()
                        .map((entry, i) => (
                          <div key={i} className="flex justify-between text-xs sm:text-sm lg:text-base gap-2">
                            <span className="text-muted-foreground truncate">{entry.date}</span>
                            <span className="font-semibold truncate">
                              {entry.score}% - {entry.title}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleStart}
                  size="lg"
                  className="w-full text-base sm:text-lg lg:text-xl h-12 sm:h-14 lg:h-16 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in-up bg-gradient-to-l from-primary to-secondary"
                >
                  ابدأ الاختبار الآن
                </Button>
                <p className="text-center text-xs lg:text-sm text-muted-foreground animate-fade-in-up px-2">
                  جميع إجاباتك خاصة تماماً ولن يتم مشاركتها
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ===== شاشة الاختبار ===== */}
        {stage === "quiz" && (
          <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-3 sm:p-4 lg:p-8 py-8 sm:py-12">
            <Card className="max-w-4xl w-full shadow-2xl border-2 animate-fade-in-up">
              <CardHeader className="space-y-4 sm:space-y-6 lg:space-y-8 pb-6 sm:pb-8 lg:pb-10 bg-gradient-to-br from-muted/30 to-background rounded-t-xl px-4 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="text-xs sm:text-sm lg:text-base px-3 py-1 sm:px-4 sm:py-1.5 lg:px-6 lg:py-2"
                  >
                    السؤال {currentQuestion + 1} من {questions.length}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary animate-pulse" />
                    <span className="text-base sm:text-lg lg:text-xl font-bold">{totalScore} نقطة</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 sm:h-3 lg:h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-primary to-secondary transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-10 pb-6 lg:pb-10">
                {currentQuestion > 0 && currentQuestion % 3 === 0 && <DidYouKnow />}

                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <h2 className="text-lg sm:text-xl lg:text-3xl font-bold leading-relaxed text-balance">
                    {questions[currentQuestion].text}
                  </h2>

                  {/* خيارات الإجابة */}
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {questions[currentQuestion].options.map((option, index) => {
                      const isSelected = answers[currentQuestion] === option.score // Check if this option was selected for the current question
                      const isCorrect = option.score === 3 // Assuming score 3 is the correct answer
                      const answered = answers.length > currentQuestion // Check if any answer has been submitted for this question

                      return (
                        <Button
                          key={index}
                          onClick={() => !answered && handleAnswer(option.score, index)}
                          disabled={answered}
                          variant={isSelected ? (isCorrect ? "default" : "secondary") : "outline"}
                          className={`w-full text-right justify-start h-auto min-h-[3rem] sm:min-h-[3.5rem] lg:min-h-[4rem] p-3 sm:p-4 lg:p-6 text-sm sm:text-base lg:text-lg transition-all duration-300 ${
                            !answered && "hover:scale-[1.02] hover:shadow-lg"
                          } ${
                            answered && isSelected
                              ? isCorrect
                                ? "bg-green-500 text-white border-green-600 shadow-lg"
                                : "bg-orange-500 text-white border-orange-600 shadow-lg"
                              : ""
                          }`}
                        >
                          <span className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full">
                            <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-muted flex items-center justify-center text-xs sm:text-sm lg:text-base font-bold">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1 leading-relaxed text-right">{option.text}</span>
                            {answered && isSelected && (
                              <span className="flex-shrink-0">
                                {isCorrect ? (
                                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                                ) : (
                                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                                )}
                              </span>
                            )}
                          </span>
                        </Button>
                      )
                    })}
                  </div>

                  {/* التعليق التوضيحي بعد الإجابة */}
                  {answers.length > currentQuestion && (
                    <div
                      className={`p-3 sm:p-4 lg:p-6 rounded-xl border-2 animate-fade-in-up ${
                        questions[currentQuestion].options[
                          answers[currentQuestion] === 3
                            ? questions[currentQuestion].options.findIndex((o) => o.score === 3)
                            : answers[currentQuestion] === 2
                              ? questions[currentQuestion].options.findIndex((o) => o.score === 2)
                              : questions[currentQuestion].options.findIndex((o) => o.score === 1)
                        ].score === 3
                          ? "bg-green-100 dark:bg-green-400 border-green-400 dark:border-green-500"
                          : "bg-orange-100 dark:bg-orange-400 border-orange-400 dark:border-orange-500"
                      }`}
                    >
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-balance text-gray-900 dark:text-black font-medium">
                        <strong className="dark:text-black">
                          {questions[currentQuestion].options[
                            answers[currentQuestion] === 3
                              ? questions[currentQuestion].options.findIndex((o) => o.score === 3)
                              : answers[currentQuestion] === 2
                                ? questions[currentQuestion].options.findIndex((o) => o.score === 2)
                                : questions[currentQuestion].options.findIndex((o) => o.score === 1)
                          ].score === 3
                            ? "ممتاز! "
                            : "جيد، لكن يمكنك التحسين: "}
                        </strong>
                        {questions[currentQuestion].options.find((o) => o.score === answers[currentQuestion])?.feedback}
                      </p>
                    </div>
                  )}
                </div>

                {/* أزرار التنقل */}
                <div className="flex gap-2 sm:gap-3 lg:gap-4 pt-2 sm:pt-4">
                  <Button
                    onClick={handleNext}
                    disabled={answers.length <= currentQuestion} // Disable if no answer is selected for the current question
                    size="lg"
                    className="flex-1 h-11 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 bg-gradient-to-l from-primary to-secondary"
                  >
                    {currentQuestion === questions.length - 1 ? "النتائج" : "التالي"}
                    <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ===== شاشة النتائج ===== */}
        {stage === "results" && result && (
          <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-3 sm:p-4 lg:p-8 py-8 sm:py-12">
            <div className="max-w-4xl w-full space-y-4 sm:space-y-6 lg:space-y-8">
              <Card className="shadow-2xl border-2 animate-scale-in">
                <CardHeader className="text-center space-y-4 sm:space-y-6 lg:space-y-8 pb-6 sm:pb-8 lg:pb-10 bg-gradient-to-br from-muted/30 to-background rounded-t-xl px-4 sm:px-6 lg:px-10">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${result.gradient} opacity-20 blur-3xl rounded-full animate-pulse-slow`}
                      />
                      <div className="relative">
                        <div className="text-6xl sm:text-8xl lg:text-9xl animate-bounce-in mb-2 sm:mb-4 lg:mb-6">
                          {result.emoji}
                        </div>
                        <div className={`${result.color} animate-float`}>
                          {result.icon && (
                            <result.icon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 mx-auto drop-shadow-2xl" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                    <Badge
                      className={`text-sm sm:text-base lg:text-lg px-4 py-1.5 sm:px-6 sm:py-2 lg:px-8 lg:py-3 bg-gradient-to-r ${result.gradient} text-white border-0 shadow-lg animate-fade-in-up`}
                    >
                      {result.badge}
                    </Badge>
                    <CardTitle className="text-2xl sm:text-3xl lg:text-5xl font-bold text-balance animate-fade-in-up px-2">
                      {result.title}
                    </CardTitle>
                    <div className="flex items-center justify-center gap-3 animate-fade-in-up">
                      <span
                        className={`text-5xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r ${result.gradient} bg-clip-text text-transparent drop-shadow-lg px-2`}
                      >
                        {Math.round(result.score)}%
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-muted-foreground animate-fade-in-up px-2">
                      {result.personality}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8 lg:space-y-12 pt-6 sm:pt-8 lg:pt-12 px-4 sm:px-6 lg:px-10">
                  <div className="space-y-4 lg:space-y-6 animate-fade-in-up">
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-center text-balance px-2">
                      {result.description}
                    </p>
                  </div>

                  <div className="p-4 sm:p-6 lg:p-8 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 mb-3 lg:mb-5">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">مقارنة مع المتوسط</h3>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 px-2">
                        {result.score > userAverage ? "أفضل" : "في مستوى"} من{" "}
                        {Math.round((result.score / userAverage) * 100)}% من المستخدمين
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                        المتوسط العام: {userAverage}%
                      </p>
                    </div>
                  </div>

                  <StatsChart
                    excellent={answerCounts.excellent}
                    good={answerCounts.good}
                    needsWork={answerCounts.needsWork}
                    total={questions.length}
                  />

                  <div className="p-4 sm:p-6 lg:p-8 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 animate-fade-in-up">
                    <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                      <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2">هل تعلم؟</h3>
                        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground text-pretty">
                          {result.funFact}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 animate-fade-in-up">
                    <div className="space-y-3 sm:space-y-4 lg:space-y-5 p-4 sm:p-6 lg:p-8 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold">نقاط قوتك</h3>
                      </div>
                      <ul className="space-y-2">
                        {result.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs sm:text-sm lg:text-base">
                            <span className="text-green-600 mt-1">✓</span>
                            <span className="text-pretty">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 sm:space-y-4 lg:space-y-5 p-4 sm:p-6 lg:p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold">مجالات التطوير</h3>
                      </div>
                      <ul className="space-y-2">
                        {result.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs sm:text-sm lg:text-base">
                            <span className="text-blue-600 mt-1">→</span>
                            <span className="text-pretty">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {unlockedAchievements.length > 0 && (
                    <>
                      <Button
                        onClick={() => setShowAchievements(!showAchievements)}
                        className="w-full bg-gradient-to-r from-accent to-primary shadow-lg hover:scale-105 transition-all text-sm sm:text-base lg:text-lg h-12 sm:h-14 lg:h-16"
                      >
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2" />
                        إنجازاتي ({unlockedAchievements.length})
                      </Button>
                      {showAchievements && <AchievementsList achievements={unlockedAchievements} />}
                    </>
                  )}

                  {/* تحسين مربع الاقتباسات للجوال */}
                  <div className="p-4 sm:p-6 lg:p-8 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 border-r-4 border-secondary animate-fade-in-up">
                    <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-secondary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-base sm:text-lg lg:text-xl italic mb-2 text-balance">"{randomQuote.text}"</p>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">- {randomQuote.author}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 lg:space-y-6 animate-fade-in-up">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-center flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      شارك نتيجتك
                    </h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                      <Button
                        variant="outline"
                        onClick={() => shareResults("twitter")}
                        className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white border-0 shadow-lg hover:scale-105 transition-all text-xs sm:text-sm lg:text-base h-10 sm:h-auto lg:h-12"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-1 sm:ml-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                        تويتر
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => shareResults("facebook")}
                        className="bg-[#4267B2] hover:bg-[#365899] text-white border-0 shadow-lg hover:scale-105 transition-all text-xs sm:text-sm lg:text-base h-10 sm:h-auto lg:h-12"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-1 sm:ml-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        فيسبوك
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => shareResults("whatsapp")}
                        className="bg-[#25D366] hover:bg-[#1fb855] text-white border-0 shadow-lg hover:scale-105 transition-all text-xs sm:text-sm lg:text-base h-10 sm:h-auto lg:h-12"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-1 sm:ml-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.173-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        واتساب
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => shareResults("copy")}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:scale-105 transition-all text-xs sm:text-sm lg:text-base h-10 sm:h-auto lg:h-12"
                      >
                        <Copy className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-1 sm:ml-2" />
                        نسخ
                      </Button>
                    </div>
                    {navigator.share && (
                      <Button
                        onClick={handleNativeShare}
                        className="w-full bg-gradient-to-r from-primary to-secondary shadow-lg hover:scale-105 transition-all text-sm sm:text-base lg:text-lg h-12 sm:h-14 lg:h-16 mt-2"
                      >
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2" />
                        مشاركة النتيجة
                      </Button>
                    )}
                  </div>

                  <CertificateGenerator
                    name="المشارك"
                    title={result.title}
                    score={Math.round(result.score)}
                    emoji={result.emoji}
                    badge={result.badge}
                    gradient={result.gradient}
                  />

                  <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      className="flex-1 shadow-lg hover:scale-105 transition-all text-sm sm:text-base lg:text-lg h-12 sm:h-14 lg:h-16 bg-transparent"
                    >
                      <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2" />
                      إعادة الاختبار
                    </Button>
                    <Button
                      onClick={() => setShowAchievements(!showAchievements)}
                      className="flex-1 bg-gradient-to-r from-accent to-primary shadow-lg hover:scale-105 transition-all text-sm sm:text-base lg:text-lg h-12 sm:h-14 lg:h-16"
                    >
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2" />
                      إنجازاتي ({unlockedAchievements.length})
                    </Button>
                  </div>

                  {showAchievements && <AchievementsList achievements={unlockedAchievements} />}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
