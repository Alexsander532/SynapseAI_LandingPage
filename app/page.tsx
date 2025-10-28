"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SynapseBackgroundPaths } from "@/components/ui/synapse-background-paths"
import { BookOpen, Calendar, Clock, Users, Brain, Target, Zap, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useTheme } from "@/contexts/ThemeContext"

export default function SynapseAILanding() {
  const { theme } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Opções de campus
  const campusOptions = [
    'Campus I – Nova Suíça',
    'Campus II – Nova Gameleira',
    'Campus III – Leopoldina',
    'Campus IV – Araxá',
    'Campus V – Divinópolis',
    'Campus VII – Timóteo',
    'Campus VIII – Varginha',
    'Campus IX – Nepomuceno',
    'Campus X – Curvelo',
    'Campus XI – Contagem'
  ]

  // Cursos por campus
  const coursesByCampus: { [key: string]: string[] } = {
    'Campus I – Nova Suíça': [
      'Engenharia Ambiental e Sanitária',
      'Engenharia de Materiais',
      'Engenharia de Transportes',
      'Letras – Tecnologias de Edição',
      'Química Tecnológica',
      'Outro'
    ],
    'Campus II – Nova Gameleira': [
      'Administração',
      'Engenharia da Computação',
      'Engenharia Civil',
      'Engenharia Elétrica',
      'Engenharia Mecânica',
      'Outro'
    ],
    'Campus III – Leopoldina': [
      'Engenharia de Controle e Automação',
      'Engenharia de Computação',
      'Outro'
    ],
    'Campus IV – Araxá': [
      'Engenharia de Automação Industrial',
      'Engenharia Civil',
      'Engenharia de Minas',
      'Outro'
    ],
    'Campus V – Divinópolis': [
      'Engenharia da Computação',
      'Engenharia Mecatrônica',
      'Design de Moda',
      'Outro'
    ],
    'Campus VII – Timóteo': [
      'Engenharia de Computação',
      'Engenharia Metalúrgica',
      'Arquitetura e Urbanismo',
      'Outro'
    ],
    'Campus VIII – Varginha': [
      'Engenharia Civil',
      'Sistemas de Informação',
      'Outro'
    ],
    'Campus IX – Nepomuceno': [
      'Engenharia Elétrica',
      'Outro'
    ],
    'Campus X – Curvelo': [
      'Engenharia Civil',
      'Engenharia de Energia',
      'Outro'
    ],
    'Campus XI – Contagem': [
      'Engenharia Química',
      'Outro'
    ]
  }
  // Estados do primeiro formulário
  const [name1, setName1] = useState('')
  const [email1, setEmail1] = useState('')
  const [whatsapp1, setWhatsapp1] = useState('')
  const [institution1, setInstitution1] = useState('')
  const [campus1, setCampus1] = useState('')
  const [course1, setCourse1] = useState('')
  const [period1, setPeriod1] = useState('')
  const [customInstitution1, setCustomInstitution1] = useState('')
  const [customCourse1, setCustomCourse1] = useState('')
  const [customPeriod1, setCustomPeriod1] = useState('')
  
  // Estados das dores do primeiro formulário
  const [painPoints1, setPainPoints1] = useState<string[]>([])
  const [customPainPoint1, setCustomPainPoint1] = useState('')
  
  // Estados do segundo formulário
  const [name2, setName2] = useState('')
  const [email2, setEmail2] = useState('')
  const [whatsapp2, setWhatsapp2] = useState('')
  const [institution2, setInstitution2] = useState('')
  const [campus2, setCampus2] = useState('')
  const [course2, setCourse2] = useState('')
  const [period2, setPeriod2] = useState('')
  const [customInstitution2, setCustomInstitution2] = useState('')
  const [customCourse2, setCustomCourse2] = useState('')
  const [customPeriod2, setCustomPeriod2] = useState('')
  
  // Estados das dores do segundo formulário
  const [painPoints2, setPainPoints2] = useState<string[]>([])
  const [customPainPoint2, setCustomPainPoint2] = useState('')
  const [isSubmitting1, setIsSubmitting1] = useState(false)
  const [isSubmitting2, setIsSubmitting2] = useState(false)
  const [submitMessage1, setSubmitMessage1] = useState('')
  const [submitMessage2, setSubmitMessage2] = useState('')

  // Estado do cronômetro de lançamento
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Estado da barra de progresso dos 100 primeiros inscritos
  const [subscriberCount, setSubscriberCount] = useState(0)

  // Função para calcular número de inscritos baseado na data
  const calculateSubscriberCount = () => {
    // Data de início da campanha (hoje)
    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0) // Começar no início do dia de hoje
    
    const launchDate = new Date('2025-11-10T12:00:00-03:00')
    const now = new Date()
    
    const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalDaysUntilLaunch = Math.floor((launchDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    
    // Começar com 10 inscritos hoje e crescer até 97 no lançamento (deixando 3 vagas)
    const initialCount = 10
    const maxOrganicCount = 97 // 100 - 3 vagas restantes
    
    let baseCount = initialCount
    
    if (daysSinceStart > 0 && totalDaysUntilLaunch > 0) {
      // Crescimento gradual e proporcional ao tempo até o lançamento
      const progressRatio = daysSinceStart / totalDaysUntilLaunch
      const growthAmount = maxOrganicCount - initialCount
      
      // Curva de crescimento não-linear (mais lento no início, acelerando depois)
      const growthCurve = Math.pow(progressRatio, 0.8)
      baseCount = initialCount + Math.floor(growthAmount * growthCurve)
      
      // Adicionar um pouco de variação aleatória para parecer mais natural
      const randomVariation = Math.floor(Math.random() * 2)
      baseCount = Math.min(maxOrganicCount, baseCount + randomVariation)
    }
    
    // Verificar se há inscritos adicionais salvos no localStorage
    const additionalSubscribers = parseInt(localStorage.getItem('additionalSubscribers') || '0')
    
    // Garantir que não passe de 100
    return Math.min(100, baseCount + additionalSubscribers)
  }
  const calculateTimeLeft = () => {
    const launchDate = new Date('2025-11-10T12:00:00-03:00') // 10/11/2025 às 12:00 (horário de Brasília)
    const now = new Date()
    const difference = launchDate.getTime() - now.getTime()

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return { days, hours, minutes, seconds }
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  useEffect(() => {
    setIsVisible(true)
    
    // Inicializar cronômetro
    setTimeLeft(calculateTimeLeft())
    
    // Inicializar contador de inscritos
    setSubscriberCount(calculateSubscriberCount())
    
    // Atualizar cronômetro a cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000) // Atualiza a cada segundo
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    
    // Adicionar scroll suave
    document.documentElement.style.scrollBehavior = 'smooth'
    
    return () => {
      clearInterval(timer)
      window.removeEventListener("mousemove", handleMouseMove)
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Altura aproximada do header fixo
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false) // Fechar menu mobile após navegação
  }

  // Função para formatar email
  const formatEmail = (value: string) => {
    // Remove caracteres não permitidos, mantendo letras, números e caracteres válidos de email
    let formatted = value.replace(/[^a-zA-Z0-9@._-]/g, '')
    
    return formatted
  }

  // Função para formatar WhatsApp
  const formatWhatsApp = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    // Aplica a máscara (31)999999999
    if (numbers.length <= 2) {
      return `(${numbers}`
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)})${numbers.slice(2)}`
    } else {
      return `(${numbers.slice(0, 2)})${numbers.slice(2, 11)}`
    }
  }

  // Handlers para os campos
  const handleEmailChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatEmail(e.target.value)
    setEmail1(formatted)
  }

  const handleWhatsAppChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value)
    setWhatsapp1(formatted)
  }

  const handleEmailChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatEmail(e.target.value)
    setEmail2(formatted)
  }

  const handleWhatsAppChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value)
    setWhatsapp2(formatted)
  }

  // Handlers para instituição - resetar campos quando instituição mudar
  const handleInstitutionChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInstitution1(e.target.value)
    setCampus1('')
    setCourse1('')
    setPeriod1('')
    setCustomInstitution1('')
    setCustomCourse1('')
    setCustomPeriod1('')
  }

  const handleInstitutionChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInstitution2(e.target.value)
    setCampus2('')
    setCourse2('')
    setPeriod2('')
    setCustomInstitution2('')
    setCustomCourse2('')
    setCustomPeriod2('')
  }

  // Handlers para campus - resetar curso quando campus mudar
  const handleCampusChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCampus1(e.target.value)
    setCourse1('') // Resetar curso quando campus mudar
  }

  const handleCampusChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCampus2(e.target.value)
    setCourse2('') // Resetar curso quando campus mudar
  }

  // Função para enviar dados para o webhook
  const submitToWebhook = async (
    name: string, 
    email: string, 
    whatsapp: string, 
    institution: string,
    campus: string, 
    course: string, 
    period: string, 
    customInstitution: string,
    customCourse: string,
    customPeriod: string,
    formType: 'waitlist' | 'notification',
    painPoints: string[],
    customPainPoint: string
  ) => {
    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          institution,
          campus: institution === 'CEFET-MG' ? campus : '',
          course: institution === 'CEFET-MG' ? course : customCourse,
          period: institution === 'CEFET-MG' ? period : customPeriod,
          customInstitution: institution === 'Outra' ? customInstitution : '',
          formType,
          painPoints,
          customPainPoint
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar dados')
      }

      return { success: true, message: data.message }
    } catch (error) {
      console.error('Erro ao enviar para webhook:', error)
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }
  }

  // Handler para o primeiro formulário (Lista de Espera)
  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevenir propagação do evento
    
    // Validação condicional baseada na instituição
    if (!name1.trim() || !email1.trim() || !whatsapp1.trim() || !institution1.trim()) {
      setSubmitMessage1('Por favor, preencha todos os campos obrigatórios')
      // Limpar mensagem de erro após 10 segundos
      setTimeout(() => {
        setSubmitMessage1('')
      }, 10000)
      return
    }

    if (institution1 === 'CEFET-MG') {
      if (!campus1.trim() || !course1.trim() || !period1.trim()) {
        setSubmitMessage1('Por favor, preencha todos os campos do CEFET-MG')
        // Limpar mensagem de erro após 10 segundos
        setTimeout(() => {
          setSubmitMessage1('')
        }, 10000)
        return
      }
    } else if (institution1 === 'Outra') {
      if (!customInstitution1.trim() || !customCourse1.trim() || !customPeriod1.trim()) {
        setSubmitMessage1('Por favor, preencha todos os campos da instituição')
        // Limpar mensagem de erro após 10 segundos
        setTimeout(() => {
          setSubmitMessage1('')
        }, 10000)
        return
      }
    }

    // Validação das dores - pelo menos uma deve ser selecionada
    if (painPoints1.length === 0 && customPainPoint1.trim() === '') {
      setSubmitMessage1('Por favor, selecione pelo menos uma dor que você gostaria que fosse resolvida')
      // Limpar mensagem de erro após 10 segundos
      setTimeout(() => {
        setSubmitMessage1('')
      }, 10000)
      return
    }

    setIsSubmitting1(true)
    setSubmitMessage1('')

    const result = await submitToWebhook(
      name1, email1, whatsapp1, institution1, campus1, course1, period1,
      customInstitution1, customCourse1, customPeriod1, 'waitlist',
      painPoints1, customPainPoint1
    )
    
    if (result.success) {
      setSubmitMessage1('✅ Cadastro realizado com sucesso!')
      
      // Incrementar contador de inscritos e salvar no localStorage
      const currentAdditional = parseInt(localStorage.getItem('additionalSubscribers') || '0')
      const newAdditional = currentAdditional + 1
      localStorage.setItem('additionalSubscribers', newAdditional.toString())
      
      // Atualizar o contador na interface
      setSubscriberCount(calculateSubscriberCount())
      
      // Limpar formulário
      setName1('')
      setEmail1('')
      setWhatsapp1('')
      setInstitution1('')
      setCampus1('')
      setCourse1('')
      setPeriod1('')
      setCustomInstitution1('')
      setCustomCourse1('')
      setCustomPeriod1('')
      setPainPoints1([])
      setCustomPainPoint1('')
      
      // Limpar mensagem após 10 segundos
      setTimeout(() => {
        setSubmitMessage1('')
      }, 10000)
    } else {
      setSubmitMessage1(`❌ ${result.message}`)
      // Limpar mensagem de erro após 10 segundos
      setTimeout(() => {
        setSubmitMessage1('')
      }, 10000)
    }

    setIsSubmitting1(false)
  }

  // Handler para o segundo formulário (Notificação)
  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevenir propagação do evento
    
    // Validação condicional baseada na instituição
    if (!name2.trim() || !email2.trim() || !whatsapp2.trim() || !institution2.trim()) {
      setSubmitMessage2('Por favor, preencha todos os campos obrigatórios')
      // Limpar mensagem de erro após 10 segundos
      setTimeout(() => {
        setSubmitMessage2('')
      }, 10000)
      return
    }

    if (institution2 === 'CEFET-MG') {
      if (!campus2.trim() || !course2.trim() || !period2.trim()) {
        setSubmitMessage2('Por favor, preencha todos os campos do CEFET-MG')
        // Limpar mensagem de erro após 10 segundos
        setTimeout(() => {
          setSubmitMessage2('')
        }, 10000)
        return
      }
    } else if (institution2 === 'Outra') {
      if (!customInstitution2.trim() || !customCourse2.trim() || !customPeriod2.trim()) {
        setSubmitMessage2('Por favor, preencha todos os campos da instituição')
        // Limpar mensagem de erro após 10 segundos
        setTimeout(() => {
          setSubmitMessage2('')
        }, 10000)
        return
      }
    }

    // Validação das dores - pelo menos uma deve ser selecionada
    if (painPoints2.length === 0 && customPainPoint2.trim() === '') {
      setSubmitMessage2('Por favor, selecione pelo menos uma dor que você gostaria que fosse resolvida')
      // Limpar mensagem de erro após 10 segundos
      setTimeout(() => {
        setSubmitMessage2('')
      }, 10000)
      return
    }

    setIsSubmitting2(true)
    setSubmitMessage2('')

    const result = await submitToWebhook(
      name2, email2, whatsapp2, institution2, campus2, course2, period2,
      customInstitution2, customCourse2, customPeriod2, 'notification',
      painPoints2, customPainPoint2
    )
    
    if (result.success) {
      setSubmitMessage2('✅ Cadastro realizado com sucesso!')
      // Limpar formulário
      setName2('')
      setEmail2('')
      setWhatsapp2('')
      setInstitution2('')
      setCampus2('')
      setCourse2('')
      setPeriod2('')
      setCustomInstitution2('')
      setCustomCourse2('')
      setCustomPeriod2('')
      setPainPoints2([])
      setCustomPainPoint2('')
      
      // Limpar mensagem após 10 segundos
      setTimeout(() => {
        setSubmitMessage2('')
      }, 10000)
    } else {
      setSubmitMessage2(`❌ ${result.message}`)
      // Limpar mensagem de erro após 10 segundos
      setTimeout(() => {
        setSubmitMessage2('')
      }, 10000)
    }

    setIsSubmitting2(false)
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      theme === 'light'
        ? 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
        : 'bg-gray-900'
    }`}>
      {/* Header fixo com logo e navegação */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 shadow-sm ${
        theme === 'light' 
          ? 'bg-white/90 border-gray-200/50' 
          : 'bg-gray-900/90 border-gray-700/50'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5">
            <img 
              src="/logo-synapse-ai.png" 
              alt="SynapseAI Logo" 
              className="h-10 md:h-12 w-auto hover:scale-105 transition-transform duration-300"
            />
            
            {/* Menu de Navegação */}
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('inicio')}
                className={`transition-all duration-300 font-medium hover:scale-105 transform cursor-pointer text-sm ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('beneficios')}
                className={`transition-all duration-300 font-medium hover:scale-105 transform cursor-pointer text-sm ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Benefícios
              </button>
              <button 
                onClick={() => scrollToSection('funcionalidades')}
                className={`transition-all duration-300 font-medium hover:scale-105 transform cursor-pointer text-sm ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Funcionalidades
              </button>
              <ThemeToggle />
            </nav>
            
            {/* Menu Mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`transition-colors ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Menu Mobile Dropdown */}
          {isMobileMenuOpen && (
            <div className={`md:hidden backdrop-blur-md border-t transition-all duration-300 ${
              theme === 'light'
                ? 'bg-white/95 border-gray-200/50'
                : 'bg-gray-900/95 border-gray-700/50'
            }`}>
              <nav className="px-4 py-3 space-y-2">
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className={`block w-full text-left transition-all duration-300 font-medium py-2 px-2 rounded-md text-sm ${
                    theme === 'light'
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                >
                  Início
                </button>
                <button 
                  onClick={() => scrollToSection('beneficios')}
                  className={`block w-full text-left transition-all duration-300 font-medium py-2 px-2 rounded-md text-sm ${
                    theme === 'light'
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                >
                  Benefícios
                </button>
                <button 
                  onClick={() => scrollToSection('funcionalidades')}
                  className={`block w-full text-left transition-all duration-300 font-medium py-2 px-2 rounded-md text-sm ${
                    theme === 'light'
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                >
                  Funcionalidades
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-800/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-blue-700/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div
        className="fixed w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Hero Section */}
      <section id="inicio" className="relative z-10 px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight text-center transition-colors duration-300 ${
                theme === 'light'
                  ? 'text-gray-900'
                  : 'text-white'
              }`}>
                <div className="block">A plataforma que organiza toda</div>
                <div className="block">
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    a sua vida acadêmica
                  </span>
                </div>
                <div className="block text-3xl md:text-5xl">em um só lugar</div>
              </h1>
            </div>

            <p className={`mx-auto mt-8 max-w-2xl text-xl leading-8 text-pretty transition-colors duration-300 ${
              theme === 'light'
                ? 'text-gray-600'
                : 'text-gray-300'
            }`}>
              Gerencie disciplinas, prazos, provas, anotações e estude de forma mais inteligente com ferramentas
              alimentadas por IA, projetadas especificamente para estudantes universitários.
            </p>

            {/* Cronômetro de Lançamento */}
            <div className={`mx-auto mt-10 max-w-lg p-6 rounded-2xl border-2 shadow-lg transition-all duration-300 ${
              theme === 'light'
                ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                : 'bg-gradient-to-br from-gray-800 to-gray-900 border-blue-800'
            }`}>
              <div className="text-center">
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-900'
                    : 'text-white'
                }`}>
                  🚀 Lançamento em:
                </h3>
                <p className={`text-sm mb-4 transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-600'
                    : 'text-gray-300'
                }`}>
                  10 de Novembro de 2025 às 12:00
                </p>
                <div className="flex justify-center gap-4">
                  <div className={`text-center p-3 rounded-xl transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-white shadow-md'
                      : 'bg-gray-700 shadow-lg'
                  }`}>
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      theme === 'light'
                        ? 'text-blue-600'
                        : 'text-blue-400'
                    }`}>
                      {timeLeft.days}
                    </div>
                    <div className={`text-xs font-medium transition-colors duration-300 ${
                      theme === 'light'
                        ? 'text-gray-500'
                        : 'text-gray-400'
                    }`}>
                      DIAS
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-xl transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-white shadow-md'
                      : 'bg-gray-700 shadow-lg'
                  }`}>
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      theme === 'light'
                        ? 'text-blue-600'
                        : 'text-blue-400'
                    }`}>
                      {timeLeft.hours}
                    </div>
                    <div className={`text-xs font-medium transition-colors duration-300 ${
                      theme === 'light'
                        ? 'text-gray-500'
                        : 'text-gray-400'
                    }`}>
                      HORAS
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-xl transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-white shadow-md'
                      : 'bg-gray-700 shadow-lg'
                  }`}>
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      theme === 'light'
                        ? 'text-blue-600'
                        : 'text-blue-400'
                    }`}>
                      {timeLeft.minutes}
                    </div>
                    <div className={`text-xs font-medium transition-colors duration-300 ${
                      theme === 'light'
                        ? 'text-gray-500'
                        : 'text-gray-400'
                    }`}>
                      MINUTOS
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-xl transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-white shadow-md'
                      : 'bg-gray-700 shadow-lg'
                  }`}>
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      theme === 'light'
                        ? 'text-blue-600'
                        : 'text-blue-400'
                    }`}>
                      {timeLeft.seconds}
                    </div>
                    <div className={`text-xs font-medium transition-colors duration-300 ${
                      theme === 'light'
                        ? 'text-gray-500'
                        : 'text-gray-400'
                    }`}>
                      SEGUNDOS
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-md">
              <Card className={`border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                theme === 'light'
                  ? 'border-blue-300 bg-white hover:border-blue-500'
                  : 'border-blue-800 bg-gray-800 hover:border-blue-600'
              }`}>
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                      theme === 'light'
                        ? 'text-gray-900'
                        : 'text-white'
                    }`}>Entre na Lista de Espera</h3>
                  </div>

                  {/* Barra de Progresso dos 100 Primeiros */}
                  <div className={`mb-8 p-6 rounded-xl border-2 transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                      : 'bg-gradient-to-r from-gray-800 to-gray-900 border-blue-800'
                  }`}>
                    <div className="text-center mb-4">
                      <h4 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                        theme === 'light'
                          ? 'text-gray-900'
                          : 'text-white'
                      }`}>
                        🎯 Primeiros 100 Inscritos
                      </h4>
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'light'
                          ? 'text-gray-600'
                          : 'text-gray-300'
                      }`}>
                        Ganhe <strong>1 mês GRATUITO</strong> para testar todas as funcionalidades!
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className={`w-full h-4 rounded-full overflow-hidden transition-all duration-300 ${
                        theme === 'light'
                          ? 'bg-gray-200'
                          : 'bg-gray-700'
                      }`}>
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{ width: `${subscriberCount}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className={`text-sm font-medium transition-colors duration-300 ${
                          theme === 'light'
                            ? 'text-gray-600'
                            : 'text-gray-300'
                        }`}>
                          {subscriberCount}/100 inscritos
                        </span>
                        <span className={`text-sm font-bold transition-colors duration-300 ${
                          subscriberCount >= 100 
                            ? 'text-red-500' 
                            : theme === 'light'
                              ? 'text-blue-600'
                              : 'text-blue-400'
                        }`}>
                          {subscriberCount >= 100 ? 'Esgotado!' : `${100 - subscriberCount} vagas restantes`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <form className="space-y-4" onSubmit={handleSubmit1}>
                    <Input
                      type="text"
                      placeholder="Seu nome"
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      disabled={isSubmitting1}
                      className={`transition-all h-12 ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    />
                    <Input
                      type="email"
                      placeholder="exemplo@email.com"
                      value={email1}
                      onChange={handleEmailChange1}
                      disabled={isSubmitting1}
                      className={`transition-all h-12 ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    />
                    <Input
                      type="tel"
                      placeholder="(31)999999999"
                      value={whatsapp1}
                      onChange={handleWhatsAppChange1}
                      maxLength={13}
                      disabled={isSubmitting1}
                      className={`transition-all h-12 ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    />
                    <select
                      value={institution1}
                      onChange={handleInstitutionChange1}
                      disabled={isSubmitting1}
                      className={`transition-all h-12 w-full rounded-md border px-3 py-1 text-base shadow-xs outline-none ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    >
                      <option value="" className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>Selecione sua instituição</option>
                      <option value="CEFET-MG" className={theme === 'light' ? 'text-gray-900' : 'text-white'}>CEFET-MG</option>
                      <option value="Outra" className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Outra</option>
                    </select>
                    {institution1 === 'CEFET-MG' && (
                      <>
                        <select
                          value={campus1}
                          onChange={handleCampusChange1}
                          disabled={isSubmitting1}
                          className={`transition-all h-12 w-full rounded-md border px-3 py-1 text-base shadow-xs outline-none ${
                            theme === 'light'
                              ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                              : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                          }`}
                        >
                          <option value="" className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>Selecione seu campus</option>
                          {campusOptions.map((campus) => (
                            <option key={campus} value={campus} className={theme === 'light' ? 'text-gray-900' : 'text-white'}>{campus}</option>
                          ))}
                        </select>
                        {campus1 && (
                          <select
                            value={course1}
                            onChange={(e) => setCourse1(e.target.value)}
                            disabled={isSubmitting1}
                            className={`transition-all h-12 w-full rounded-md border px-3 py-1 text-base shadow-xs outline-none ${
                              theme === 'light'
                                ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                                : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                            }`}
                          >
                            <option value="" className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>Selecione seu curso</option>
                            {coursesByCampus[campus1]?.map((course) => (
                              <option key={course} value={course} className={theme === 'light' ? 'text-gray-900' : 'text-white'}>{course}</option>
                            ))}
                          </select>
                        )}
                        {course1 === 'Outro' && (
                          <Input
                            type="text"
                            placeholder="Digite o nome do seu curso"
                            value={course1}
                            onChange={(e) => setCourse1(e.target.value)}
                            disabled={isSubmitting1}
                            className={`transition-all h-12 ${
                              theme === 'light'
                                ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                                : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                            }`}
                          />
                        )}
                        <Input
                          type="text"
                          placeholder="Qual período você está cursando?"
                          value={period1}
                          onChange={(e) => setPeriod1(e.target.value)}
                          disabled={isSubmitting1}
                          className={`transition-all h-12 ${
                            theme === 'light'
                              ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                              : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                          }`}
                        />
                      </>
                    )}
                    {institution1 === 'Outra' && (
                      <>
                        <Input
                          type="text"
                          placeholder="Nome da sua instituição"
                          value={customInstitution1}
                          onChange={(e) => setCustomInstitution1(e.target.value)}
                          disabled={isSubmitting1}
                          className={`transition-all h-12 ${
                            theme === 'light'
                              ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                              : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                          }`}
                        />
                        <Input
                          type="text"
                          placeholder="Nome do seu curso"
                          value={customCourse1}
                          onChange={(e) => setCustomCourse1(e.target.value)}
                          disabled={isSubmitting1}
                          className={`transition-all h-12 ${
                            theme === 'light'
                              ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                              : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                          }`}
                        />
                        <Input
                          type="text"
                          placeholder="Qual período você está cursando?"
                          value={customPeriod1}
                          onChange={(e) => setCustomPeriod1(e.target.value)}
                          disabled={isSubmitting1}
                          className={`transition-all h-12 ${
                            theme === 'light'
                              ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                              : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                          }`}
                        />
                      </>
                    )}
                    
                    {/* Campo de Dores - aparece quando uma instituição é selecionada */}
                    {institution1 && (
                      <div className={`p-6 rounded-xl border-2 transition-all duration-300 shadow-sm ${
                        theme === 'light'
                          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300'
                          : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 hover:border-gray-500'
                      }`}>
                        <div className="mb-6">
                          <h4 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                            theme === 'light'
                              ? 'text-gray-900'
                              : 'text-white'
                          }`}>
                            Quais as duas principais dores que você gostaria que fossem resolvidas?
                          </h4>
                          <p className={`text-sm transition-colors duration-300 ${
                            theme === 'light'
                              ? 'text-gray-600'
                              : 'text-gray-400'
                          }`}>
                            Selecione uma ou mais opções:
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          {[
                            'Maior organização das minhas anotações e dos conteúdos dos professores',
                            'Controle das datas de trabalhos e provas',
                            'Planejamento e acompanhamento da grade curricular do curso',
                            'Muita matéria acumulada antes da prova'
                          ].map((painPoint, index) => (
                            <label key={index} className={`flex items-start space-x-4 cursor-pointer group p-3 rounded-lg transition-all duration-200 ${
                              theme === 'light'
                                ? 'hover:bg-white/70 hover:shadow-sm'
                                : 'hover:bg-gray-700/50'
                            }`}>
                              <input
                                type="checkbox"
                                checked={painPoints1.includes(painPoint)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setPainPoints1([...painPoints1, painPoint]);
                                  } else {
                                    setPainPoints1(painPoints1.filter(p => p !== painPoint));
                                  }
                                }}
                                disabled={isSubmitting1}
                                className={`mt-0.5 w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                                  theme === 'light'
                                    ? 'border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 hover:border-blue-400'
                                    : 'border-gray-500 text-blue-500 focus:ring-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 bg-gray-700 hover:border-blue-400'
                                }`}
                              />
                              <span className={`text-sm leading-relaxed transition-colors duration-300 font-medium ${
                                painPoints1.includes(painPoint)
                                  ? theme === 'light'
                                    ? 'text-blue-700'
                                    : 'text-blue-300'
                                  : theme === 'light'
                                    ? 'text-gray-700 group-hover:text-blue-600'
                                    : 'text-gray-300 group-hover:text-blue-400'
                              }`}>
                                {painPoint}
                              </span>
                            </label>
                          ))}
                          
                          {/* Opção "Outro" */}
                          <label className={`flex items-start space-x-4 cursor-pointer group p-3 rounded-lg transition-all duration-200 ${
                            theme === 'light'
                              ? 'hover:bg-white/70 hover:shadow-sm'
                              : 'hover:bg-gray-700/50'
                          }`}>
                            <input
                              type="checkbox"
                              checked={customPainPoint1.length > 0}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  setCustomPainPoint1('');
                                }
                              }}
                              disabled={isSubmitting1}
                              className={`mt-0.5 w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                                theme === 'light'
                                  ? 'border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 hover:border-blue-400'
                                  : 'border-gray-500 text-blue-500 focus:ring-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 bg-gray-700 hover:border-blue-400'
                              }`}
                            />
                            <span className={`text-sm leading-relaxed transition-colors duration-300 font-medium ${
                              customPainPoint1.length > 0
                                ? theme === 'light'
                                  ? 'text-blue-700'
                                  : 'text-blue-300'
                                : theme === 'light'
                                  ? 'text-gray-700 group-hover:text-blue-600'
                                  : 'text-gray-300 group-hover:text-blue-400'
                            }`}>
                              Outro
                            </span>
                          </label>
                          
                          {/* Campo de texto para "Outro" */}
                          <div className="mt-3">
                            <Input
                              type="text"
                              placeholder="Descreva suas principais dores..."
                              value={customPainPoint1}
                              onChange={(e) => setCustomPainPoint1(e.target.value)}
                              disabled={isSubmitting1}
                              className={`transition-all h-12 ${
                                theme === 'light'
                                  ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                                  : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {submitMessage1 && (
                      <div className={`text-sm p-3 rounded-md ${
                        submitMessage1.includes('✅')
                          ? theme === 'light'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-green-900/20 text-green-400 border border-green-800'
                          : theme === 'light'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-red-900/20 text-red-400 border border-red-800'
                      }`}>
                        {submitMessage1}
                      </div>
                    )}
                    <Button 
                      type="submit"
                      disabled={isSubmitting1}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <span>{isSubmitting1 ? 'Enviando...' : 'Entrar na Lista de Espera'}</span>
                      {!isSubmitting1 && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <SynapseBackgroundPaths>
        <section id="beneficios" className={`relative z-10 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          theme === 'light'
            ? 'bg-gray-50'
            : 'bg-gray-900'
        }`}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold sm:text-5xl mb-4 transition-colors duration-300 ${
              theme === 'light'
                ? 'text-gray-900'
                : 'text-white'
            }`}>
              Por que estudantes escolhem o Synapse AI
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className={`group border-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl ${
              theme === 'light'
                ? 'border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-500'
                : 'border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-blue-500'
            }`}>
              <CardContent className="p-8 text-center">
                <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  theme === 'light'
                    ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                    : 'bg-gradient-to-br from-blue-800 to-blue-900'
                }`}>
                  <Target className={`w-8 h-8 transition-colors ${
                    theme === 'light'
                      ? 'text-blue-600 group-hover:text-blue-700'
                      : 'text-blue-400 group-hover:text-blue-300'
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-900'
                    : 'text-white'
                }`}>Organização Total</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-600'
                    : 'text-gray-300'
                }`}>
                  Gerencie disciplinas, provas, trabalhos e anotações tudo em uma plataforma unificada.
                </p>
              </CardContent>
            </Card>

            <Card className={`group border-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl ${
              theme === 'light'
                ? 'border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-500'
                : 'border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-blue-500'
            }`}>
              <CardContent className="p-8 text-center">
                <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  theme === 'light'
                    ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                    : 'bg-gradient-to-br from-blue-800 to-blue-900'
                }`}>
                  <Clock className={`w-8 h-8 transition-colors ${
                    theme === 'light'
                      ? 'text-blue-600 group-hover:text-blue-700'
                      : 'text-blue-400 group-hover:text-blue-300'
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-900'
                    : 'text-white'
                }`}>Lembretes Inteligentes</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-600'
                    : 'text-gray-300'
                }`}>
                  Nunca mais perca um prazo com notificações inteligentes e agendamento automático.
                </p>
              </CardContent>
            </Card>

            <Card className={`group border-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl ${
              theme === 'light'
                ? 'border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-500'
                : 'border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-blue-500'
            }`}>
              <CardContent className="p-8 text-center">
                <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  theme === 'light'
                    ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                    : 'bg-gradient-to-br from-blue-800 to-blue-900'
                }`}>
                  <Brain className={`w-8 h-8 transition-colors ${
                    theme === 'light'
                      ? 'text-blue-600 group-hover:text-blue-700'
                      : 'text-blue-400 group-hover:text-blue-300'
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-900'
                    : 'text-white'
                }`}>Estude Melhor</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-600'
                    : 'text-gray-300'
                }`}>
                  Flashcards alimentados por IA e técnicas de recordação ativa para aprendizado mais rápido.
                </p>
              </CardContent>
            </Card>

            <Card className={`group border-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl ${
              theme === 'light'
                ? 'border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-500'
                : 'border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-blue-500'
            }`}>
              <CardContent className="p-8 text-center">
                <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  theme === 'light'
                    ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                    : 'bg-gradient-to-br from-blue-800 to-blue-900'
                }`}>
                  <Calendar className={`w-8 h-8 transition-colors ${
                    theme === 'light'
                      ? 'text-blue-600 group-hover:text-blue-700'
                      : 'text-blue-400 group-hover:text-blue-300'
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-900'
                    : 'text-white'
                }`}>Mantenha-se Conectado</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-600'
                    : 'text-gray-300'
                }`}>
                  Sincronização opcional com Google Calendar para manter tudo em perfeita harmonia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </SynapseBackgroundPaths>

      {/* Features Section */}
      <section id="funcionalidades" className={`relative z-10 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-white'
          : 'bg-gray-900'
      }`}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <h2 className={`text-4xl font-bold sm:text-5xl mb-8 transition-colors duration-300 ${
                theme === 'light'
                  ? 'text-gray-900'
                  : 'text-white'
              }`}>
                Tudo que você precisa para o sucesso acadêmico
              </h2>

              <div className="space-y-8">
                <div className={`group flex items-start gap-6 p-6 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-600 ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform ${theme === 'light' ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 'bg-gradient-to-br from-blue-800 to-blue-900'}`}>
                    <BookOpen className={`w-6 h-6 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-2 text-lg transition-colors duration-300 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Configuração de Currículo e Horários</h3>
                    <p className={`leading-relaxed transition-colors duration-300 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Insira facilmente suas disciplinas, horários de aula, calendário acadêmico e organize sua grade curricular para uma gestão completa dos seus estudos.
                    </p>
                  </div>
                </div>

                <div className={`group flex items-start gap-6 p-6 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-600 ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform ${theme === 'light' ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 'bg-gradient-to-br from-blue-800 to-blue-900'}`}>
                    <Calendar className={`w-6 h-6 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-2 text-lg transition-colors duration-300 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      Gerenciamento Inteligente de Calendário
                    </h3>
                    <p className={`leading-relaxed transition-colors duration-300 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Visualize provas, trabalhos e prazos em uma interface de calendário inteligente.
                    </p>
                  </div>
                </div>

                <div className={`group flex items-start gap-6 p-6 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-600 ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform ${theme === 'light' ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 'bg-gradient-to-br from-blue-800 to-blue-900'}`}>
                    <Users className={`w-6 h-6 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-2 text-lg transition-colors duration-300 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Central de Materiais dos Professores</h3>
                    <p className={`leading-relaxed transition-colors duration-300 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Faça upload e organize materiais dos professores, mantendo tudo acessível.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl p-8 flex items-center justify-center border-2 border-gray-600 hover:border-blue-500 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl">
                <img
                  src="/modern-academic-dashboard-interface-with-calendar-.jpg"
                  alt="Preview do Dashboard Synapse AI"
                  className="w-full h-full object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-600 rounded-full animate-bounce delay-1000 shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      <SynapseBackgroundPaths>
        <section className={`relative z-10 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          theme === 'light'
            ? 'bg-gray-50'
            : 'bg-gray-900'
        }`}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className={`text-4xl font-bold sm:text-5xl mb-6 text-balance transition-colors duration-300 ${
            theme === 'light'
              ? 'text-gray-900'
              : 'text-white'
          }`}>
            De estudante, para estudante
          </h2>
          <p className={`text-xl mb-12 text-pretty leading-relaxed transition-colors duration-300 ${
            theme === 'light'
              ? 'text-gray-600'
              : 'text-gray-300'
          }`}>
            Cadastre-se para ser notificado por email e WhatsApp quando o Synapse AI for lançado. Seja um dos primeiros
            estudantes a transformar sua experiência acadêmica.
          </p>

          <Card className={`max-w-md mx-auto border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
            theme === 'light'
              ? 'border-blue-300 bg-white hover:border-blue-500'
              : 'border-blue-800 bg-gray-800 hover:border-blue-600'
          }`}>
            <CardContent className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit2}>
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  disabled={isSubmitting2}
                  className={`transition-all h-12 ${
                    theme === 'light'
                      ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                      : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                  }`}
                />
                <Input
                  type="email"
                  placeholder="exemplo@email.com"
                  value={email2}
                  onChange={handleEmailChange2}
                  disabled={isSubmitting2}
                  className={`transition-all h-12 ${
                    theme === 'light'
                      ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                      : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                  }`}
                />
                <Input
                  type="tel"
                  placeholder="(31)999999999"
                  value={whatsapp2}
                  onChange={handleWhatsAppChange2}
                  maxLength={13}
                  disabled={isSubmitting2}
                  className={`transition-all h-12 ${
                    theme === 'light'
                      ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                      : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                  }`}
                />
                <select
                  value={institution2}
                  onChange={handleInstitutionChange2}
                  disabled={isSubmitting2}
                  className={`transition-all h-12 w-full rounded-md border px-3 py-1 text-base shadow-xs outline-none ${
                    theme === 'light'
                      ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                      : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                  }`}
                >
                  <option value="" className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>Selecione sua instituição</option>
                  <option value="CEFET-MG" className={theme === 'light' ? 'text-gray-900' : 'text-white'}>CEFET-MG</option>
                  <option value="Outra" className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Outra</option>
                </select>
                {institution2 === 'CEFET-MG' && (
                  <>
                    <select
                      value={campus2}
                      onChange={handleCampusChange2}
                      disabled={isSubmitting2}
                      className={`transition-all h-12 w-full rounded-md border px-3 py-1 text-base shadow-xs outline-none ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    >
                      <option value="" className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>Selecione seu campus</option>
                      {campusOptions.map((campus) => (
                        <option key={campus} value={campus} className={theme === 'light' ? 'text-gray-900' : 'text-white'}>{campus}</option>
                      ))}
                </select>
                {campus2 && (
                  <select
                    value={course2}
                    onChange={(e) => setCourse2(e.target.value)}
                    disabled={isSubmitting2}
                    className={`transition-all h-12 w-full rounded-md border px-3 py-1 text-base shadow-xs outline-none ${
                      theme === 'light'
                        ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                        : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                    }`}
                  >
                    <option value="" className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>Selecione seu curso</option>
                    {coursesByCampus[campus2]?.map((course) => (
                      <option key={course} value={course} className={theme === 'light' ? 'text-gray-900' : 'text-white'}>{course}</option>
                    ))}
                  </select>
                )}
                {course2 === 'Outro' && (
                  <Input
                    type="text"
                    placeholder="Digite o nome do seu curso"
                    value={course2}
                    onChange={(e) => setCourse2(e.target.value)}
                    disabled={isSubmitting2}
                    className={`transition-all h-12 ${
                      theme === 'light'
                        ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                        : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                    }`}
                  />
                )}
                    <Input
                      type="text"
                      placeholder="Qual período você está cursando?"
                      value={period2}
                      onChange={(e) => setPeriod2(e.target.value)}
                      disabled={isSubmitting2}
                      className={`transition-all h-12 ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    />
                  </>
                )}
                {institution2 === 'Outra' && (
                  <>
                    <Input
                      type="text"
                      placeholder="Nome da sua instituição"
                      value={customInstitution2}
                      onChange={(e) => setCustomInstitution2(e.target.value)}
                      disabled={isSubmitting2}
                      className={`transition-all h-12 ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    />
                    <Input
                      type="text"
                      placeholder="Nome do seu curso"
                      value={customCourse2}
                      onChange={(e) => setCustomCourse2(e.target.value)}
                      disabled={isSubmitting2}
                      className={`transition-all h-12 ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    />
                    <Input
                      type="text"
                      placeholder="Qual período você está cursando?"
                      value={customPeriod2}
                      onChange={(e) => setCustomPeriod2(e.target.value)}
                      disabled={isSubmitting2}
                      className={`transition-all h-12 ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    />
                  </>
                )}
                
                {/* Campo de Dores - aparece quando uma instituição é selecionada */}
                {institution2 && (
                  <div className={`p-6 rounded-xl border-2 transition-all duration-300 shadow-sm ${
                    theme === 'light'
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300'
                      : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 hover:border-gray-500'
                  }`}>
                    <div className="mb-6">
                      <h4 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                        theme === 'light'
                          ? 'text-gray-900'
                          : 'text-white'
                      }`}>
                        Quais as duas principais dores que você gostaria que fossem resolvidas?
                      </h4>
                      <p className={`text-sm transition-colors duration-300 ${
                        theme === 'light'
                          ? 'text-gray-600'
                          : 'text-gray-400'
                      }`}>
                        Selecione uma ou mais opções:
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        'Maior organização das minhas anotações e dos conteúdos dos professores',
                        'Controle das datas de trabalhos e provas',
                        'Planejamento e acompanhamento da grade curricular do curso',
                        'Muita matéria acumulada antes da prova'
                      ].map((painPoint, index) => (
                        <label key={index} className={`flex items-start space-x-4 cursor-pointer group p-3 rounded-lg transition-all duration-200 ${
                          theme === 'light'
                            ? 'hover:bg-white/70 hover:shadow-sm'
                            : 'hover:bg-gray-700/50'
                        }`}>
                          <input
                            type="checkbox"
                            checked={painPoints2.includes(painPoint)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPainPoints2([...painPoints2, painPoint]);
                              } else {
                                setPainPoints2(painPoints2.filter(p => p !== painPoint));
                              }
                            }}
                            disabled={isSubmitting2}
                            className={`mt-0.5 w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                              theme === 'light'
                                ? 'border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 hover:border-blue-400'
                                : 'border-gray-500 text-blue-500 focus:ring-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 bg-gray-700 hover:border-blue-400'
                            }`}
                          />
                          <span className={`text-sm leading-relaxed transition-colors duration-300 font-medium ${
                            painPoints2.includes(painPoint)
                              ? theme === 'light'
                                ? 'text-blue-700'
                                : 'text-blue-300'
                              : theme === 'light'
                                ? 'text-gray-700 group-hover:text-blue-600'
                                : 'text-gray-300 group-hover:text-blue-400'
                          }`}>
                            {painPoint}
                          </span>
                        </label>
                      ))}
                      
                      {/* Opção "Outro" */}
                      <label className={`flex items-start space-x-4 cursor-pointer group p-3 rounded-lg transition-all duration-200 ${
                        theme === 'light'
                          ? 'hover:bg-white/70 hover:shadow-sm'
                          : 'hover:bg-gray-700/50'
                      }`}>
                        <input
                          type="checkbox"
                          checked={customPainPoint2.length > 0}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              setCustomPainPoint2('');
                            }
                          }}
                          disabled={isSubmitting2}
                          className={`mt-0.5 w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                            theme === 'light'
                              ? 'border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 hover:border-blue-400'
                              : 'border-gray-500 text-blue-500 focus:ring-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 bg-gray-700 hover:border-blue-400'
                          }`}
                        />
                        <span className={`text-sm leading-relaxed transition-colors duration-300 font-medium ${
                          customPainPoint2.length > 0
                            ? theme === 'light'
                              ? 'text-blue-700'
                              : 'text-blue-300'
                            : theme === 'light'
                              ? 'text-gray-700 group-hover:text-blue-600'
                              : 'text-gray-300 group-hover:text-blue-400'
                        }`}>
                          Outro
                        </span>
                      </label>
                      
                      {/* Campo de texto para "Outro" */}
                      <div className="mt-3">
                        <Input
                          type="text"
                          placeholder="Descreva suas principais dores..."
                          value={customPainPoint2}
                          onChange={(e) => setCustomPainPoint2(e.target.value)}
                          disabled={isSubmitting2}
                          className={`transition-all h-12 ${
                            theme === 'light'
                              ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                              : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {submitMessage2 && (
                  <div className={`text-sm p-3 rounded-md ${
                    submitMessage2.includes('✅')
                      ? theme === 'light'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-green-900/20 text-green-400 border border-green-800'
                      : theme === 'light'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-red-900/20 text-red-400 border border-red-800'
                  }`}>
                    {submitMessage2}
                  </div>
                )}
                <Button 
                  type="submit"
                  disabled={isSubmitting2}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting2 ? 'Enviando...' : 'Me notifique no lançamento'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      </SynapseBackgroundPaths>

      {/* Footer */}
      <footer className={`relative z-10 border-t py-4 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-white border-gray-200'
          : 'bg-gray-900 border-gray-800'
      }`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-synapse-ai.png" 
                alt="SynapseAI Logo" 
                className="w-37 h-28 rounded-xl"
              />
              </div>

            <div className={`flex gap-8 transition-colors duration-300 ${
              theme === 'light'
                ? 'text-gray-600'
                : 'text-gray-400'
            }`}>
              <a href="#" className={`transition-colors hover:scale-105 transform ${
                theme === 'light'
                  ? 'hover:text-blue-600'
                  : 'hover:text-blue-400'
              }`}>
                Contato
              </a>
              <a href="#" className={`transition-colors hover:scale-105 transform ${
                theme === 'light'
                  ? 'hover:text-blue-600'
                  : 'hover:text-blue-400'
              }`}>
                Termos de Serviço
              </a>
              <a href="#" className={`transition-colors hover:scale-105 transform ${
                theme === 'light'
                  ? 'hover:text-blue-600'
                  : 'hover:text-blue-400'
              }`}>
                Política de Privacidade
              </a>
            </div>
          </div>

          <div className={`mt-12 pt-8 border-t text-center transition-colors duration-300 ${
            theme === 'light'
              ? 'border-gray-200'
              : 'border-gray-700'
          }`}>
            <p className={`transition-colors duration-300 ${
              theme === 'light'
                ? 'text-gray-600'
                : 'text-gray-400'
            }`}>© 2025 Synapse AI – Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
