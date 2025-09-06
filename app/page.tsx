"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Calendar, Clock, Users, Brain, Target, Zap, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function SynapseAILanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div
        className="fixed w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl text-balance">
                A plataforma que organiza toda sua{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  vida acadêmica
                </span>{" "}
                em um só lugar
              </h1>
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-gray-600 text-pretty">
              Gerencie disciplinas, prazos, provas, anotações e estude de forma mais inteligente com ferramentas
              alimentadas por IA, projetadas especificamente para estudantes universitários.
            </p>

            <div className="mx-auto mt-12 max-w-md">
              <Card className="border-2 border-blue-200 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Entre na Lista de Espera</h3>
                  </div>
                  <form className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Seu nome"
                      className="border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all h-12"
                    />
                    <Input
                      type="email"
                      placeholder="Seu email"
                      className="border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all h-12"
                    />
                    <Input
                      type="tel"
                      placeholder="Número do WhatsApp"
                      className="border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all h-12"
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
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
              Por que estudantes escolhem o Synapse AI
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group border-2 border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Organização Total</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Gerencie disciplinas, provas, trabalhos e anotações tudo em uma plataforma unificada.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lembretes Inteligentes</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Nunca mais perca um prazo com notificações inteligentes e agendamento automático.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Estude Melhor</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Flashcards alimentados por IA e técnicas de recordação ativa para aprendizado mais rápido.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mantenha-se Conectado</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sincronização opcional com Google Calendar para manter tudo em perfeita harmonia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-8">
                Tudo que você precisa para o sucesso acadêmico
              </h2>

              <div className="space-y-8">
                <div className="group flex items-start gap-6 p-6 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Configuração de Currículo e Horários</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Insira facilmente suas disciplinas, horários de aula e calendário acadêmico para organização
                      completa.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-6 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                      Gerenciamento Inteligente de Calendário
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Visualize provas, trabalhos e prazos em uma interface de calendário inteligente.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-6 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Central de Materiais dos Professores</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Faça upload e organize materiais dos professores, mantendo tudo acessível.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 rounded-3xl p-8 flex items-center justify-center border-2 border-gray-200 hover:border-blue-300 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl">
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

      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6 text-balance">
            Sua vida acadêmica, finalmente organizada
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-pretty leading-relaxed">
            Cadastre-se para ser notificado por email e WhatsApp quando o Synapse AI for lançado. Seja um dos primeiros
            estudantes a transformar sua experiência acadêmica.
          </p>

          <Card className="max-w-md mx-auto border-2 border-blue-200 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-300">
            <CardContent className="p-8">
              <form className="space-y-6">
                <Input
                  type="text"
                  placeholder="Seu nome"
                  className="border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all h-12"
                />
                <Input
                  type="email"
                  placeholder="Seu email"
                  className="border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all h-12"
                />
                <Input
                  type="tel"
                  placeholder="Número do WhatsApp"
                  className="border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all h-12"
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

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Synapse AI</span>
            </div>

            <div className="flex gap-8 text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors hover:scale-105 transform">
                Contato
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors hover:scale-105 transform">
                Termos de Serviço
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors hover:scale-105 transform">
                Política de Privacidade
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">© 2025 Synapse AI – Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
