import { NextRequest, NextResponse } from 'next/server'

interface FormData {
  name: string
  email: string
  whatsapp: string
  formType: 'waitlist' | 'notification'
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, whatsapp, formType } = body

    // Validação básica dos dados
    if (!name || !email || !whatsapp) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Validação de WhatsApp (formato brasileiro)
    const whatsappRegex = /^\(\d{2}\)\d{9}$/
    if (!whatsappRegex.test(whatsapp)) {
      return NextResponse.json(
        { error: 'WhatsApp deve estar no formato (31)999999999' },
        { status: 400 }
      )
    }

    // Preparar dados para envio ao n8n
    const webhookData: FormData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      whatsapp: whatsapp.trim(),
      formType: formType || 'waitlist',
      timestamp: new Date().toISOString()
    }

    // Enviar para o webhook do n8n
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
    
    if (!n8nWebhookUrl) {
      console.error('N8N_WEBHOOK_URL não configurada')
      return NextResponse.json(
        { error: 'Configuração do webhook não encontrada' },
        { status: 500 }
      )
    }

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData)
    })

    if (!n8nResponse.ok) {
      console.error('Erro ao enviar para n8n:', n8nResponse.statusText)
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      )
    }

    // Log para debug (remover em produção)
    console.log('Dados enviados para n8n:', {
      name: webhookData.name,
      email: webhookData.email,
      formType: webhookData.formType,
      timestamp: webhookData.timestamp
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Dados enviados com sucesso!',
        timestamp: webhookData.timestamp
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Método GET para testar se a API está funcionando
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Webhook API está funcionando',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  )
}