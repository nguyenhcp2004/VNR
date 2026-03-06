'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  ArrowLeft, 
  ChevronDown, 
  Target, 
  Users, 
  Swords,
  Flag,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Star
} from 'lucide-react'
import Link from 'next/link'

interface DebatePoint {
  id: number
  myth: string
  mythDetail: string
  reality: string
  realityDetails: string[]
}

interface TimelineEvent {
  date: string
  title: string
  description: string
  icon: React.ReactNode
}

export default function ComparePage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [showConclusion, setShowConclusion] = useState(false)

  const debatePoints: DebatePoint[] = [
    {
      id: 1,
      myth: 'Thắng lợi do bối cảnh quốc tế',
      mythDetail: 'Không có chiến lược rõ ràng, chỉ là "tận dụng thời cơ"',
      reality: 'Đường lối đúng, mục tiêu rõ ràng',
      realityDetails: [
        '1939: Chuyển hướng chiến lược → ưu tiên giải phóng dân tộc',
        '1941: Hội nghị Trung ương 8, thành lập Việt Minh',
        'Xác định rõ: độc lập dân tộc là nhiệm vụ hàng đầu'
      ]
    },
    {
      id: 2,
      myth: 'Khởi nghĩa bùng phát tự nhiên',
      mythDetail: 'Nhân dân tự phát nổi dậy khi Nhật đầu hàng',
      reality: 'Xây dựng lực lượng lâu dài, có hệ thống',
      realityDetails: [
        'Chính trị: Mặt trận Việt Minh, tổ chức quần chúng rộng khắp',
        'Quân sự: Cứu quốc quân, Việt Nam Tuyên truyền Giải phóng quân (1944)',
        'Căn cứ địa: Việt Bắc - hậu phương vững chắc'
      ]
    },
    {
      id: 3,
      myth: 'Nhật đầu hàng → cách mạng thắng',
      mythDetail: 'Chỉ cần chờ thời cơ, không cần chuẩn bị',
      reality: 'Chủ động nắm bắt và tạo thời cơ',
      realityDetails: [
        '9/3/1945: Nhật đảo chính Pháp → Đảng ra chỉ thị "Nhật–Pháp bắn nhau và hành động của chúng ta"',
        'Cao trào kháng Nhật cứu nước lan rộng',
        '8/1945: Tổng khởi nghĩa toàn quốc - giành chính quyền trong 2 tuần'
      ]
    }
  ]

  const timelineEvents: TimelineEvent[] = [
    {
      date: '11/1939',
      title: 'Chuyển hướng chiến lược',
      description: 'Đặt giải phóng dân tộc lên hàng đầu',
      icon: <Target className="w-5 h-5" />
    },
    {
      date: '05/1941',
      title: 'Thành lập Việt Minh',
      description: 'Mặt trận đoàn kết toàn dân',
      icon: <Users className="w-5 h-5" />
    },
    {
      date: '12/1944',
      title: 'Thành lập Giải phóng quân',
      description: 'Đội Việt Nam Tuyên truyền Giải phóng quân',
      icon: <Swords className="w-5 h-5" />
    },
    {
      date: '09/03/1945',
      title: 'Nhật đảo chính Pháp',
      description: 'Chỉ thị "Nhật–Pháp bắn nhau..."',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      date: '08/1945',
      title: 'Tổng khởi nghĩa',
      description: 'Giành chính quyền toàn quốc',
      icon: <Flag className="w-5 h-5" />
    },
    {
      date: '02/09/1945',
      title: 'Tuyên ngôn Độc lập',
      description: 'Khai sinh nước Việt Nam DCCH',
      icon: <Star className="w-5 h-5" />
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span>Phản biện quan điểm sai lệch</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-100 mb-4">
              &ldquo;Cách mạng Tháng Tám chỉ là{' '}
              <span className="relative">
                <span className="text-red-400">ăn may</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute left-0 right-0 top-1/2 h-1 bg-red-500 origin-left"
                />
              </span>
              ?&rdquo;
            </h1>
            
            <p className="text-xl text-amber-200/70 max-w-3xl mx-auto">
              Phân tích khoa học chứng minh thắng lợi là kết quả của đường lối đúng đắn, 
              chuẩn bị lâu dài và nghệ thuật chớp thời cơ
            </p>
          </motion.div>

          {/* Main Argument Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-amber-900/30 to-red-900/20 backdrop-blur-md rounded-3xl p-8 border border-amber-500/30 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Myth Side */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-red-300">Quan điểm sai</h3>
                </div>
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                  <p className="text-red-200 text-lg leading-relaxed">
                    Nhật thua trận → khoảng trống quyền lực → Cách mạng chỉ &ldquo;tận dụng thời cơ&rdquo; một cách may mắn
                  </p>
                </div>
              </div>

              {/* Reality Side */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-green-300">Sự thật lịch sử</h3>
                </div>
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
                  <p className="text-green-200 text-lg leading-relaxed">
                    Thắng lợi là kết quả của: <strong>Đường lối đúng</strong> + <strong>Lực lượng mạnh</strong> + <strong>Nghệ thuật chớp thời cơ</strong>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Debate Points */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-amber-100 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-300" />
              Phản biện từng luận điểm
            </h2>

            {debatePoints.map((point, index) => (
              <motion.div
                key={point.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-amber-500/30 transition-all duration-300"
              >
                {/* Card Header */}
                <button
                  onClick={() => setExpandedCard(expandedCard === point.id ? null : point.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 font-bold">
                      {point.id}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-amber-100">Luận điểm {point.id}</h3>
                      <p className="text-sm text-red-300/80">&ldquo;{point.myth}&rdquo;</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCard === point.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-amber-300" />
                  </motion.div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedCard === point.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Myth Detail */}
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="p-5 bg-red-500/10 border border-red-500/20 rounded-xl"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <AlertTriangle className="w-5 h-5 text-red-400" />
                              <span className="font-semibold text-red-300">Quan điểm sai</span>
                            </div>
                            <p className="text-red-200/90">{point.mythDetail}</p>
                          </motion.div>

                          {/* Reality Detail */}
                          <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="p-5 bg-green-500/10 border border-green-500/20 rounded-xl"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400" />
                              <span className="font-semibold text-green-300">Phản biện</span>
                            </div>
                            <p className="text-green-200/90 font-medium">{point.reality}</p>
                          </motion.div>
                        </div>

                        {/* Evidence List */}
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-amber-400" />
                            <span className="font-semibold text-amber-300">Bằng chứng lịch sử</span>
                          </div>
                          <ul className="space-y-3">
                            {point.realityDetails.map((detail, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <div className="mt-1.5 w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
                                <span className="text-amber-100/90">{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-amber-100 flex items-center gap-3 mb-8">
              <Clock className="w-6 h-6 text-amber-300" />
              Dòng thời gian chuẩn bị (1939–1945)
            </h2>

            <div className="relative">
              {/* Timeline Events */}
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="relative flex items-start gap-6 pl-16"
                  >
                    {/* Connector Line - only between icons, not through them */}
                    {index < timelineEvents.length - 1 && (
                      <div className="absolute left-[23px] top-12 w-0.5 h-[calc(100%+1.5rem-48px)] bg-gradient-to-b from-amber-500 to-amber-400" />
                    )}
                    
                    {/* Icon Circle */}
                    <div className="absolute left-0 w-12 h-12 bg-amber-950 border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-300 z-10">
                      {event.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-amber-500/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm font-medium">
                          {event.date}
                        </span>
                        <h4 className="font-bold text-amber-100">{event.title}</h4>
                      </div>
                      <p className="text-amber-200/70">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Conclusion */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative"
          >
            <button
              onClick={() => setShowConclusion(!showConclusion)}
              className="w-full p-6 bg-gradient-to-r from-amber-600/20 to-red-600/20 backdrop-blur-md border border-amber-500/30 rounded-2xl hover:border-amber-400/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500 rounded-xl">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-100">Kết luận</h3>
                </div>
                <motion.div
                  animate={{ rotate: showConclusion ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-amber-300" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence>
              {showConclusion && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-8 bg-gradient-to-br from-amber-900/30 to-red-900/20 border border-t-0 border-amber-500/30 rounded-b-2xl -mt-2">
                    <div className="flex items-start gap-4 mb-6">
                      <CheckCircle2 className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-xl font-bold text-amber-100 mb-2">
                          Không phải &ldquo;ăn may&rdquo; — Đó là tất yếu lịch sử
                        </h4>
                        <p className="text-amber-200/80 leading-relaxed">
                          Thắng lợi của Cách mạng Tháng Tám là kết quả tất yếu của:
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center"
                      >
                        <Target className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                        <h5 className="font-bold text-amber-100 mb-1">Đường lối chiến lược đúng</h5>
                        <p className="text-sm text-amber-200/70">Chuyển hướng kịp thời, mục tiêu rõ ràng</p>
                      </motion.div>

                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center"
                      >
                        <Users className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                        <h5 className="font-bold text-amber-100 mb-1">Chuẩn bị lực lượng toàn diện</h5>
                        <p className="text-sm text-amber-200/70">Chính trị, quân sự, căn cứ địa</p>
                      </motion.div>

                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center"
                      >
                        <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                        <h5 className="font-bold text-amber-100 mb-1">Nghệ thuật chớp thời cơ</h5>
                        <p className="text-sm text-amber-200/70">Nắm bắt và tận dụng thời cơ lịch sử</p>
                      </motion.div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center text-green-200 font-medium"
                    >
                      → Thắng lợi của sự lãnh đạo đúng đắn và chuẩn bị lâu dài của Đảng và nhân dân
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
