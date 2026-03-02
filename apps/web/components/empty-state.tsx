import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Inbox, Radio, Users, Search, Bell, MessageCircle, Heart } from 'lucide-react'

type EmptyVariant = 'notifications' | 'streams' | 'followers' | 'search' | 'messages' | 'favorites' | 'default'

interface EmptyStateProps {
    variant?: EmptyVariant
    title?: string
    description?: string
    action?: {
        label: string
        href?: string
        onClick?: () => void
    }
    children?: ReactNode
}

const variantConfig: Record<EmptyVariant, { icon: ReactNode; title: string; description: string }> = {
    notifications: {
        icon: <Bell className="h-10 w-10 text-muted-foreground/30" />,
        title: 'Sem notificações',
        description: 'Quando alguém te seguir, enviar Salos ou começar uma live, vais ver aqui.',
    },
    streams: {
        icon: <Radio className="h-10 w-10 text-muted-foreground/30" />,
        title: 'Ninguém em live agora',
        description: 'Sê o primeiro a transmitir para a comunidade angolana!',
    },
    followers: {
        icon: <Users className="h-10 w-10 text-muted-foreground/30" />,
        title: 'Sem seguidores ainda',
        description: 'Partilha o teu perfil para começar a construir a tua comunidade.',
    },
    search: {
        icon: <Search className="h-10 w-10 text-muted-foreground/30" />,
        title: 'Sem resultados',
        description: 'Tenta pesquisar por outros termos ou categorias.',
    },
    messages: {
        icon: <MessageCircle className="h-10 w-10 text-muted-foreground/30" />,
        title: 'Sem mensagens',
        description: 'As tuas conversas vão aparecer aqui.',
    },
    favorites: {
        icon: <Heart className="h-10 w-10 text-muted-foreground/30" />,
        title: 'Sem favoritos',
        description: 'Adiciona creators ou streams aos teus favoritos.',
    },
    default: {
        icon: <Inbox className="h-10 w-10 text-muted-foreground/30" />,
        title: 'Nada para mostrar',
        description: 'Não há conteúdo disponível de momento.',
    },
}

export function EmptyState({ variant = 'default', title, description, action, children }: EmptyStateProps) {
    const config = variantConfig[variant]

    return (
        <div className="flex flex-col items-center justify-center p-12 md:p-20 text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                {config.icon}
            </div>
            <h3 className="font-bold text-lg">{title || config.title}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">{description || config.description}</p>
            {action && (
                <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 mt-2"
                    onClick={action.onClick}
                >
                    {action.label}
                </Button>
            )}
            {children}
        </div>
    )
}
