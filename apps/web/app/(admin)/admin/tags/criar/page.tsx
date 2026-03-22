"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function TagsCriarPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Criar Tag</h1>
  <div className="max-w-lg space-y-3"><input placeholder="Nome da tag" className="w-full px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /><Button onClick={() => toast.success("Tag criada!")} className="text-xs">Criar</Button></div></div>) }
