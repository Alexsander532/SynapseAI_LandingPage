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

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    
    // Adicionar scroll suave
    document.documentElement.style.scrollBehavior = 'smooth'
    
    return () => {
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

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      theme === 'light'
        ? 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
        : 'bg-gray-900'
    }`}>
      {/* Header fixo com logo e navegação */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-all duration-300 ${
        theme === 'light' 
          ? 'bg-white/80 border-gray-200' 
          : 'bg-gray-900/80 border-gray-800'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <img 
              src="/logo-synapse-ai.png" 
              alt="SynapseAI Logo" 
              className="h-16 md:h-20 lg:h-24 w-auto hover:scale-105 transition-transform duration-300"
            />
            
            {/* Menu de Navegação */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('inicio')}
                className={`transition-colors duration-300 font-medium hover:scale-105 transform cursor-pointer ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('beneficios')}
                className={`transition-colors duration-300 font-medium hover:scale-105 transform cursor-pointer ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Benefícios
              </button>
              <button 
                onClick={() => scrollToSection('funcionalidades')}
                className={`transition-colors duration-300 font-medium hover:scale-105 transform cursor-pointer ${
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
            <div className={`md:hidden backdrop-blur-sm border-t transition-colors ${
              theme === 'light'
                ? 'bg-white/95 border-gray-200'
                : 'bg-gray-900/95 border-gray-800'
            }`}>
              <nav className="px-4 py-4 space-y-4">
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className={`block w-full text-left transition-colors duration-300 font-medium py-2 ${
                    theme === 'light'
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  Início
                </button>
                <button 
                  onClick={() => scrollToSection('beneficios')}
                  className={`block w-full text-left transition-colors duration-300 font-medium py-2 ${
                    theme === 'light'
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  Benefícios
                </button>
                <button 
                  onClick={() => scrollToSection('funcionalidades')}
                  className={`block w-full text-left transition-colors duration-300 font-medium py-2 ${
                    theme === 'light'
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-gray-300 hover:text-blue-400'
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
                  <form className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Seu nome"
                      className={`transition-all h-12 ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    />
                    <Input
                      type="email"
                      placeholder="Seu email"
                      className={`transition-all h-12 ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    />
                    <Input
                      type="tel"
                      placeholder="Número do WhatsApp"
                      className={`transition-all h-12 ${
                        theme === 'light'
                          ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                          : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                      }`}
                    />
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                      <span>Entrar na Lista de Espera</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
                      Insira facilmente suas disciplinas, horários de aula e calendário acadêmico para organização
                      completa.
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
              <form className="space-y-6">
                <Input
                  type="text"
                  placeholder="Seu nome"
                  className={`transition-all h-12 ${
                    theme === 'light'
                      ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                      : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                  }`}
                />
                <Input
                  type="email"
                  placeholder="Seu email"
                  className={`transition-all h-12 ${
                    theme === 'light'
                      ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                      : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                  }`}
                />
                <Input
                  type="tel"
                  placeholder="Número do WhatsApp"
                  className={`transition-all h-12 ${
                    theme === 'light'
                      ? 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50'
                      : 'border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-600'
                  }`}
                />
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  {/* Centered text */}
                  Me notifique no lançamento
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
